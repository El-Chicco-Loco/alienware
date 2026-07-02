-- Settings configuration
-- Based on UserSettings.conf and UserDecorations.conf

local colors = require("wallust-colors")

hl.config({
    dwindle = {
        preserve_split = true,
        special_scale_factor = 0.8,
    },
    master = {
        new_status = "master",
        new_on_top = 1,
        mfact = 0.6,
    },
    general = {
        border_size = 0,
        gaps_in = 5,
        gaps_out = 10,
        gaps_workspaces = 50,
        layout = "master",
        resize_on_border = true,
        no_focus_fallback = true,
        allow_tearing = true,
    },
    input = {
        kb_layout = "us",
        repeat_rate = 50,
        repeat_delay = 300,
        sensitivity = 0,
        numlock_by_default = false,
        left_handed = false,
        follow_mouse = 0,
        float_switch_override_focus = false,
        natural_scroll = true,
        touchpad = {
            disable_while_typing = true,
            clickfinger_behavior = false,
            middle_button_emulation = false,
            tap_to_click = true,
            drag_lock = false,
            natural_scroll = true,
        },
    },
    gestures = {
        workspace_swipe_distance = 500,
        workspace_swipe_invert = true,
        workspace_swipe_min_speed_to_force = 30,
        workspace_swipe_cancel_ratio = 0.3,
        workspace_swipe_create_new = true,
        workspace_swipe_forever = false,
    },
    misc = {
        disable_hyprland_logo = true,
        disable_splash_rendering = true,
        mouse_move_enables_dpms = true,
        enable_swallow = false,
        swallow_regex = "^(kitty)$",
        focus_on_activate = false,
        initial_workspace_tracking = 0,
        middle_click_paste = false,
        enable_anr_dialog = true,
        anr_missed_pings = 15,
        allow_session_lock_restore = true,
    },
    debug = {
        vfr = true,
        disable_logs = true,
    },
    binds = {
        workspace_back_and_forth = true,
        allow_workspace_cycles = true,
        pass_mouse_when_bound = false,
    },
    xwayland = {
        enabled = true,
        force_zero_scaling = true,
    },
    render = {
        direct_scanout = 0,
    },
    cursor = {
        sync_gsettings_theme = true,
        no_hardware_cursors = 2,
        enable_hyprcursor = true,
        warp_on_change_workspace = 2,
        no_warps = true,
    },
    decoration = {
        rounding = 20,
        active_opacity = 0.8,
        inactive_opacity = 0.8,        
        fullscreen_opacity = 1,

        shadow = {
            enabled      = false,
        },

        blur = {
            enabled = true,
            xray = true,
            special = false,
            new_optimizations = true,
            size = 3,
            passes = 1,
            brightness = 1,
            noise = 0.05,
            contrast = 0.89,
            vibrancy = 0.5,
            vibrancy_darkness = 0.5,
            popups = false,
            popups_ignorealpha = 0.6,
            input_methods = true,
            input_methods_ignorealpha = 0.8,
        },
    },
})

hl.gesture({ fingers = 3, direction = "horizontal", action = "workspace" })
