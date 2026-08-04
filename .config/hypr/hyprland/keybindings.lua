---------------------
---- KEYBINDINGS ----
---------------------


local mod     = "SUPER"
local scriptsDir  = os.getenv("HOME") .. "/.config/hypr/scripts"
local UserScripts = os.getenv("HOME") .. "/.config/hypr/UserScripts"
local notify  = require("utils.notify")
local ags_window = "NONE"

-- ─────────────────────────────────────────────────────────────
-- STANDARD
-- ─────────────────────────────────────────────────────────────
hl.bind(mod .. " + Q",         hl.dsp.window.close(),                                           { desc = "Close active window" })
hl.bind(mod .. " + SHIFT + Q", function() user.window.kill_active() end,                        { desc = "Kill active window" })
hl.bind(mod .. " + B",      hl.dsp.exec_cmd("brave"),                                           { desc = "Open default browser" })
hl.bind(mod .. " + T",      hl.dsp.exec_cmd("kitty"),                                           { desc = "Open terminal" })
hl.bind(mod .. " + E",      hl.dsp.exec_cmd("thunar"),                                          { desc = "File manager" })
hl.bind(mod .. " + W",      hl.dsp.window.float({ action = "toggle" }),                         { desc = "Toggle floating" })
hl.bind(mod .. " + F",      hl.dsp.window.fullscreen(),                                         { desc = "Toggle floating" })
hl.bind(mod .. " + C",      hl.dsp.exec_cmd("code"),                                            { desc = "Launch VSCode" })


-- ─────────────────────────────────────────────────────────────
-- AGS WINDOWS
-- ─────────────────────────────────────────────────────────────
-- Panel
hl.gesture({ fingers = 3, direction = "down", action = function() 
    hl.exec_cmd("ags request open panel -i panel") 
end})
hl.gesture({ fingers = 3, direction = "up", action = function() 
    hl.exec_cmd("ags request close panel -i panel") 
end})

-- Applauncher
hl.bind(mod .. " + Space", hl.dsp.exec_cmd("ags request toggle applauncher -i applauncher"))

-- Powermenu
hl.bind(mod .. " + Delete", hl.dsp.exec_cmd("ags request toggle powermenu -i powermenu"))

-- Btop
hl.gesture({ fingers = 4, direction = "left", action = function() 
    hl.exec_cmd("ags request open btop -i btop") 
end})
hl.gesture({ fingers = 4, direction = "right", action = function() 
    hl.exec_cmd("ags request close btop -i btop") 
end})

-- -- Applauncher and powermenu
-- hl.gesture({ fingers = 4, direction = "down", action = function() 
--     if ags_window == "LAUNCHER" then
--         ags_window = "NONE"
--         hl.exec_cmd("ags request close applauncher -i applauncher") 
--     elseif ags_window == "NONE" then
--         ags_window = "POWER"
--         hl.exec_cmd("ags request open powermenu -i powermenu") 
--     end
-- end})
-- hl.gesture({ fingers = 4, direction = "up", action = function() 
--     if ags_window == "NONE" then
--         ags_window = "LAUNCHER"
--         hl.exec_cmd("ags request open applauncher -i applauncher") 
--     elseif ags_window == "POWER" then
--         ags_window = "NONE"
--         hl.exec_cmd("ags request close powermenu -i powermenu") 
--     end
-- end})


-- ─────────────────────────────────────────────────────────────
-- WORKSPACES AND WINDOWS
-- ─────────────────────────────────────────────────────────────
-- Swap monitor
hl.bind(mod .. " + Tab",         hl.dsp.window.move({ monitor = "+1" }))

-- Move windows
hl.bind(mod .. " + left",    hl.dsp.window.move({ workspace = "-1" }))
hl.bind(mod .. " + right",   hl.dsp.window.move({ workspace = "+1" }))

-- Swap windows
hl.bind(mod .. " + CTRL + left",     hl.dsp.window.swap({ direction = "l" }))
hl.bind(mod .. " + CTRL + right",    hl.dsp.window.swap({ direction = "r" }))
hl.bind(mod .. " + CTRL + up",       hl.dsp.window.swap({ direction = "u" }))
hl.bind(mod .. " + CTRL + down",     hl.dsp.window.swap({ direction = "d" }))

-- ─────────────────────────────────────────────────────────────
-- MEDIA CONTROLS
-- ─────────────────────────────────────────────────────────────
hl.bind("XF86AudioRaiseVolume", function() user.audio.volume_up() end,     { locked = true, repeating = true, desc = "Volume up" })
hl.bind("XF86AudioLowerVolume", function() user.audio.volume_down() end,   { locked = true, repeating = true, desc = "Volume down" })
hl.bind("XF86AudioMicMute",     function() user.audio.mic_toggle() end,    { locked = true, desc = "Toggle mic mute" })
hl.bind("XF86AudioMute",        function() user.audio.volume_toggle() end, { locked = true, desc = "Toggle mute" })
hl.bind("XF86Sleep",            hl.dsp.exec_cmd("systemctl suspend"),      { locked = true, desc = "Suspend" })
hl.bind("XF86Rfkill",           function() user.system.airplane_mode() end,{ locked = true, desc = "Toggle airplane mode" })

-- Media playback controls
hl.bind("XF86AudioPlay", function() user.audio.media_play() end,  { locked = true, desc = "Play/pause media" })
hl.bind("XF86AudioPause", function() user.audio.media_play() end, { locked = true, desc = "Play/pause media" })
hl.bind("XF86AudioNext",  function() user.audio.media_next() end, { locked = true, desc = "Next track" })
hl.bind("XF86AudioPrev",  function() user.audio.media_prev() end, { locked = true, desc = "Previous track" })
hl.bind("XF86AudioStop",  function() user.audio.media_stop() end, { locked = true, desc = "Stop media" })

-- Screenshots
hl.bind(mod .. " + Print",              function() user.session.screenshot("now") end,    { desc = "Screenshot" })
hl.bind(mod .. " + SHIFT + Print",      function() user.session.screenshot("area") end,   { desc = "Screenshot region" })
hl.bind(mod .. " + CTRL + Print",       function() user.session.screenshot("5") end,      { desc = "Screenshot (5s timer)" })
hl.bind(mod .. " + CTRL + SHIFT + Print", function() user.session.screenshot("10") end,   { desc = "Screenshot (10s timer)" })
hl.bind("ALT + Print",                  function() user.session.screenshot("window") end, { desc = "Screenshot active window" })
hl.bind(mod .. " + SHIFT + S",          function() user.session.screenshot("swappy") end, { desc = "Screenshot to swappy" })

-- Brightness
hl.bind("F10", function() user.display.brightness_down() end,      { locked = true, repeating = true, desc = "Screen brightness down" })
hl.bind("F11",   function() user.display.brightness_up() end,        { locked = true, repeating = true, desc = "Screen brightness up" })

-- Switch power modes
hl.bind("F1", function() 
    local handle = io.popen("awcc qm")
    local result = handle:read("*a")
    handle:close()
    notify.send({ text = result:gsub("%s+$", ""), timeout = 3000 })
end,                                                                    { release = true, desc = "Get current mode" })
hl.bind("F1 + F2", function() 
    hl.exec_cmd("awcc b")
    notify.send({ text = "Switched to power mode: Balanced", timeout = 3000 })
end,                                                                                    { desc = "Switch to balanced mode" })
hl.bind("F1 + F3", function() 
    hl.exec_cmd("awcc p")
    notify.send({ text = "Switched to power mode: Performance", timeout = 3000 })
end,                                                                                    { desc = "Switch to performance mode" })
hl.bind("F1 + F4", function() 
    hl.exec_cmd("awcc m")
    notify.send({ text = "Switched to power mode: Manual", timeout = 3000 })
end,                                                                                    { desc = "Switch to manual mode" })
hl.bind("F1 + F5", function() 
    hl.exec_cmd("awcc g")
    notify.send({ text = "Switched to power mode: Gaming", timeout = 3000 })
end,                                                                                    { desc = "Switch to game mode" })
