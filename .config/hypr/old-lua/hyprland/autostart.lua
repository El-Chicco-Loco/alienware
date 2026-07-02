-------------------
---- AUTOSTART ----
-------------------


local scripts = os.getenv("HOME") .. "/.config/hypr/scripts"

-- ─────────────────────────────────────────────────────────────
-- STARTUP
-- ─────────────────────────────────────────────────────────────
hl.on("hyprland.start", function ()

    -- Wallpaper
    hl.exec_cmd("awww-daemon --format xrgb")
    -- hl.exec_cmd("awww img ~/Pictures/wallpaper/wallpaper.GIF --transition-bezier .43,1.19,1,.4 --transition-fps 10 --transition-type grow --transition-pos 0.925,0.977 --transition-duration 2 --transition-step 5")


    hl.exec_cmd("dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
    hl.exec_cmd("systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
    hl.exec_cmd(scripts .. "/Dropterminal.sh kitty &")
    hl.exec_cmd(scripts .. "/Polkit.sh")
    -- hl.exec_cmd("nm-applet --indicator")
    -- hl.exec_cmd("nm-tray")                                      -- For Ubuntu
    -- hl.exec_cmd("swaync")

    -- hl.exec_cmd("qs -c overview")                               -- Quickshell Overview
    hl.exec_cmd("hypridle")
    -- hl.exec_cmd(scripts .. "/Hyprsunset.sh init")

    -- Clipboard manager
    hl.exec_cmd("wl-paste --type text  --watch cliphist store")
    hl.exec_cmd("wl-paste --type image --watch cliphist store")


    -- XDG Desktop Portals (for screensharing, file opening, etc.)
    -- user.system.start_portals()

    -- Polkit
    -- user.system.start_polkit()


    -- hl.exec_cmd("blueman-applet")
    -- hl.exec_cmd(scripts .. "/KeybindsLayoutInit.sh")

    hl.exec_cmd("ags quit -i controlpanel && cd $HOME/.config/ags/controlpanel " ..
    "&& ags run . || cd $HOME/.config/ags/controlpanel && ags run .")
    hl.timer(function()
        hl.exec_cmd("ags quit -i workspaces && cd $HOME/.config/ags/workspaces " .. 
        "&& ags run . || cd $HOME/.config/ags/workspaces && ags run .")
    end, { timeout = 2000, type = "oneshot" })
    


    
    hl.timer(function()
        hl.exec_cmd("awcc p")
    end, { timeout = 5000, type = "oneshot" })
end)



-- XDG Desktop Portals (for screensharing, file opening, etc.)
-- user.system.start_portals()

-- Polkit
-- user.system.start_polkit()


hl.on("workspace.active", function (ws)
    local id = ws.name

    -- hl.dsp.workspace.rename({ workspace = 3, name = 4 })

    

    
    hl.notification.create({
        text = "switched to ws " .. id,
        timeout = 2000,
        icon = "ok",
    })
    
end)