local notify  = require("utils.notify")

-- ─────────────────────────────────────────────────────────────
-- ON STARTUP
-- ─────────────────────────────────────────────────────────────
hl.on("hyprland.start", function()
    -- Make sure any running tmux instances don't hold on to this old variable
    hl.exec_cmd("tmux setenv -g HYPRLAND_INSTANCE_SIGNATURE \"" .. os.getenv("HYPRLAND_INSTANCE_SIGNATURE") .. "\"")
    
    -- Fire up an ssh agent
    local sock = os.getenv("SSH_AUTH_SOCK")
        or ("/run/user/" .. (os.getenv("UID") or "1000") .. "/ssh-agent.sock")
    hl.exec_cmd("ssh-agent -D -a " .. sock)
    
    -- Wallpaper stuff
    hl.exec_cmd("awww-daemon --format xrgb")

    -- Cursor stuff
    hl.exec_cmd("hyprctl setcursor Adwaita 24")
    
    -- DBus environment
    hl.exec_cmd("dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
    hl.exec_cmd("systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
    
    -- XDG Desktop Portals (for screensharing, file opening, etc.)
    user.system.start_portals()
    hl.exec_cmd("gsettings set org.gnome.desktop.interface gtk-theme " .. os.getenv("GTK_THEME"))
    hl.exec_cmd("gsettings set org.gnome.desktop.interface icon-theme " .. os.getenv("ICON_THEME"))
    hl.exec_cmd("gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'")

    -- Polkit
    user.system.start_polkit()
    
    -- Startup apps
    hl.exec_cmd("nm-applet --indicator")
    hl.exec_cmd("swaync")
    hl.exec_cmd("blueman-applet")
    
    -- Clipboard manager
    hl.exec_cmd("wl-paste --type text --watch cliphist store")
    hl.exec_cmd("wl-paste --type image --watch cliphist store")
    
    -- Starting hypridle to start hyprlock
    hl.exec_cmd("hypridle")

    -- Special workspace for keepassxc
    hl.exec_cmd("keepassxc", { workspace = "special:keepassxc" })

    -- AGS
    hl.exec_cmd("$HOME/.config/ags/powermenu/dist/app.js")
    hl.timer(function()
        hl.exec_cmd("$HOME/.config/ags/applauncher/dist/app.js") 
    end, { timeout = 500, type = "oneshot" })
    hl.timer(function()
        hl.exec_cmd("$HOME/.config/ags/btop/dist/app.js")
    end, { timeout = 1000, type = "oneshot" })
    hl.timer(function()
        hl.exec_cmd("$HOME/.config/ags/panel/dist/app.js")
    end, { timeout = 1500, type = "oneshot" })
    
    -- Power mode
    hl.timer(function()
        hl.exec_cmd("awcc m")
    end, { timeout = 2000, type = "oneshot" })

    -- Battery check
    hl.exec_cmd("python " .. configDir .. "/scripts/battery.py")
end)

hl.on("monitor.added", function(monitor)
    -- Wallpaper stuff
    if not monitor.name == "eDP-1" then
        notify.send({ text = "Monitor " .. monitor.name .. " added", timeout = 3000 })
        hl.exec_cmd("awww img ~/Pictures/wallpaper/wallpaper.GIF --transition-bezier .43,1.19,1,.4 --transition-fps 10 --transition-type grow --transition-pos 0.925,0.977 --transition-duration 2 --transition-step 5")
    end
end)