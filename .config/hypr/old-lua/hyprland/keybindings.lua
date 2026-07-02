---------------------
---- KEYBINDINGS ----
---------------------


local mainMod     = "SUPER"
local scriptsDir  = os.getenv("HOME") .. "/.config/hypr/scripts"
local UserScripts = os.getenv("HOME") .. "/.config/hypr/UserScripts"

-- ─────────────────────────────────────────────────────────────
-- STANDARD
-- ─────────────────────────────────────────────────────────────

hl.bind(mainMod .. " + Q",      hl.dsp.window.close())                                          -- Close focused window
hl.bind(mainMod .. " + SPACE",  hl.dsp.exec_cmd(                                                -- Display app launcher
    "ags quit -i applauncher && cd $HOME/.config/ags/applauncher && ags run . " ..
    "|| cd $HOME/.config/ags/applauncher && ags run ."))
hl.bind(mainMod .. " + B",      hl.dsp.exec_cmd("brave"))                                       -- Open default browser
hl.bind(mainMod .. " + T",      hl.dsp.exec_cmd("kitty"))                                       -- Open terminal
hl.bind(mainMod .. " + E",      hl.dsp.exec_cmd("thunar"))                                      -- File manager
hl.bind(mainMod .. " + W",      hl.dsp.window.float({ action = "toggle" }))                     -- Toggle floating
hl.bind(mainMod .. " + F",      hl.dsp.window.fullscreen())                     -- Toggle floating
hl.bind(mainMod .. " + C",      hl.dsp.exec_cmd("code"))                                        -- Launch VSCode
hl.bind(mainMod .. " + DELETE", hl.dsp.exec_cmd(                                                -- Display power menu
    "ags quit -i powermenu && cd $HOME/.config/ags/powermenu && ags run . " ..
    "|| cd $HOME/.config/ags/powermenu && ags run ."))
hl.bind(mainMod .. " + P",      hl.dsp.exec_cmd(                                                -- Display toolbar
    "ags quit -i controlpanel && cd $HOME/.config/ags/controlpanel && ags run . " ..
    "|| cd $HOME/.config/ags/controlpanel && ags run ."))
hl.bind(mainMod .. " + O",      hl.dsp.exec_cmd(                                                -- Display toolbar
    "ags quit -i workspaces && cd $HOME/.config/ags/workspaces && ags run . " ..
    "|| cd $HOME/.config/ags/workspaces && ags run ."))

-- ─────────────────────────────────────────────────────────────
-- FEATURES / EXTRAS
-- ─────────────────────────────────────────────────────────────

-- hl.bind(mainMod .. " + H",             hl.dsp.exec_cmd(scriptsDir .. "/KeyHints.sh"))           -- Help / cheat sheet
-- hl.bind(mainMod .. " + ALT + R",       hl.dsp.exec_cmd(scriptsDir .. "/Refresh.sh"))            -- Refresh bar and menus
-- hl.bind(mainMod .. " + ALT + E",       hl.dsp.exec_cmd(scriptsDir .. "/RofiEmoji.sh"))          -- Emoji menu
-- hl.bind(mainMod .. " + S",             hl.dsp.exec_cmd(scriptsDir .. "/RofiSearch.sh"))         -- Web search
-- hl.bind(mainMod .. " + CTRL + S",      hl.dsp.exec_cmd("rofi -show window"))                   -- Window switcher
-- hl.bind(mainMod .. " + ALT + O",       hl.dsp.exec_cmd(scriptsDir .. "/ChangeBlur.sh"))         -- Toggle blur
-- hl.bind(mainMod .. " + SHIFT + G",     hl.dsp.exec_cmd(scriptsDir .. "/GameMode.sh"))           -- Toggle game mode
-- hl.bind(mainMod .. " + ALT + L",       hl.dsp.exec_cmd(scriptsDir .. "/ChangeLayout.sh"))       -- Toggle master/dwindle layout
-- hl.bind(mainMod .. " + ALT + V",       hl.dsp.exec_cmd(scriptsDir .. "/ClipManager.sh"))        -- Clipboard manager
-- hl.bind(mainMod .. " + CTRL + R",      hl.dsp.exec_cmd(scriptsDir .. "/RofiThemeSelector.sh"))  -- Rofi theme selector
-- hl.bind(mainMod .. " + CTRL + SHIFT + R", hl.dsp.exec_cmd(                                      -- Rofi theme selector (modified)
--     "pkill rofi || true && " .. scriptsDir .. "/RofiThemeSelector-modified.sh"))

-- ─────────────────────────────────────────────────────────────
-- WORKSPACES
-- ─────────────────────────────────────────────────────────────
hl.bind(mainMod .. " + SHIFT + left",   hl.dsp.focus({ workspace = "-1" }))
hl.bind(mainMod .. " + SHIFT + right",  hl.dsp.focus({ workspace = "+1" }))


-- ─────────────────────────────────────────────────────────────
-- WINDOWS
-- ─────────────────────────────────────────────────────────────
-- Move windows
hl.bind(mainMod .. " + CTRL + left",   hl.dsp.window.move({ workspace = "-1" }))
hl.bind(mainMod .. " + CTRL + right",  hl.dsp.window.move({ workspace = "+1" }))

-- Swap windows
hl.bind(mainMod .. " + ALT + left",  hl.dsp.window.swap({ direction = "l" }))
hl.bind(mainMod .. " + ALT + right", hl.dsp.window.swap({ direction = "r" }))