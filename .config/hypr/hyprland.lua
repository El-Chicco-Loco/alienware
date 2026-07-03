
configDir = os.getenv("HOME") .. "/.config/hypr"


-- ─────────────────────────────────────────────────────────────
-- MONITOR CONFIGURATION
-- ─────────────────────────────────────────────────────────────
hl.monitor({
    output   = "",
    mode     = "preferred",
    position = "auto",
    scale    = "1",
})







-- ─────────────────────────────────────────────────────────────
-- LOAD MODULES
-- ─────────────────────────────────────────────────────────────
user = require("user-functions")
require("hyprland/env")             -- Environment variables
require("hyprland/settings")        -- General settings, decorations, input
require("hyprland/animations")      -- Bezier curves and animations
require("hyprland/window-rules")    -- Window and layer rules       
require("hyprland/autostart")       -- Autostart applications
require("hyprland/keybindings")     -- Keybindings



