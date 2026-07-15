---------------------
---- KEYBINDINGS ----
---------------------


local mod     = "SUPER"
local scriptsDir  = os.getenv("HOME") .. "/.config/hypr/scripts"
local UserScripts = os.getenv("HOME") .. "/.config/hypr/UserScripts"
local notify  = require("utils.notify")

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
hl.bind(mod .. " + SPACE",  hl.dsp.exec_cmd("ags request toggle applauncher -i applauncher"),   { desc = "Display app launcher" })
hl.bind(mod .. " + DELETE", hl.dsp.exec_cmd("ags request toggle powermenu -i powermenu"),       { desc = "Display power menu" })
hl.bind(mod .. " + P",      hl.dsp.exec_cmd("ags request toggle btop -i btop"),                 { desc = "Display btop window" })
hl.bind(mod .. " + RETURN", hl.dsp.exec_cmd("ags request toggle panel -i panel"), { desc = "Display control panel" })
-- hl.bind(mod .. " + P",      hl.dsp.exec_cmd(
--     "ags quit -i controlpanel && cd $HOME/.config/ags/controlpanel && ags run . " ..
--     "|| cd $HOME/.config/ags/controlpanel && ags run ."),                               { desc = "Display controlpanel" })
-- hl.bind(mod .. " + O",      hl.dsp.exec_cmd(
--     "ags quit -i workspaces && cd $HOME/.config/ags/workspaces && ags run . " ..
--     "|| cd $HOME/.config/ags/workspaces && ags run ."),                                 { desc = "Display workspaces" })
-- hl.bind(mod .. " + G",     function() user.window.game_mode() end,            { desc = "Toggle game mode" })


-- ─────────────────────────────────────────────────────────────
-- WORKSPACES AND WINDOWS
-- ─────────────────────────────────────────────────────────────
hl.bind(mod .. " + Tab",         hl.dsp.focus({ workspace = "m+1" }), { desc = "Next workspace" })
hl.bind(mod .. " + SHIFT + Tab", hl.dsp.focus({ workspace = "m-1" }), { desc = "Previous workspace" })

-- Move windows
hl.bind(mod .. " + CTRL + left",    hl.dsp.window.move({ workspace = "-1" }))
hl.bind(mod .. " + CTRL + right",   hl.dsp.window.move({ workspace = "+1" }))
hl.bind(mod .. " + ALT + left",   hl.dsp.window.move({ monitor = "-1" }))
hl.bind(mod .. " + ALT + right",   hl.dsp.window.move({ monitor = "+1" }))

-- Swap windows
hl.bind(mod .. " + SHIFT + left",     hl.dsp.window.swap({ direction = "l" }))
hl.bind(mod .. " + SHIFT + right",    hl.dsp.window.swap({ direction = "r" }))
hl.bind(mod .. " + SHIFT + up",       hl.dsp.window.swap({ direction = "u" }))
hl.bind(mod .. " + SHIFT + down",     hl.dsp.window.swap({ direction = "d" }))

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
hl.bind("F1 + F2", function() 
    hl.exec_cmd("awcc b")
    local handle = io.popen("awcc qm")
    local result = handle:read("*a")
    handle:close()
    notify.send({ text = result:gsub("%s+$", ""), timeout = 3000 })
end,                                                                                    { desc = "Switch to balanced mode" })
hl.bind("F1 + F3", function() 
    hl.exec_cmd("awcc p")
    local handle = io.popen("awcc qm")
    local result = handle:read("*a")
    handle:close()
    notify.send({ text = result:gsub("%s+$", ""), timeout = 3000 })
end,                                                                                    { desc = "Switch to performance mode" })
hl.bind("F1 + F4", function() 
    hl.exec_cmd("awcc m")
    local handle = io.popen("awcc qm")
    local result = handle:read("*a")
    handle:close()
    notify.send({ text = result:gsub("%s+$", ""), timeout = 3000 })
end,                                                                                    { desc = "Switch to manual mode" })
hl.bind("F1 + F5", function() 
    hl.exec_cmd("awcc g")
    local handle = io.popen("awcc qm")
    local result = handle:read("*a")
    handle:close()
    notify.send({ text = result:gsub("%s+$", ""), timeout = 3000 })
end,                                                                                    { desc = "Switch to game mode" })
