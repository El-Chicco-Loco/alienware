-- Environment variables for Hyprland
-- Based on ENVariables.conf

-- Toolkit Backend Variables
hl.env("GDK_BACKEND", "wayland,x11,*")
hl.env("CLUTTER_BACKEND", "wayland")
hl.env("SDL_VIDEODRIVER", "wayland")

-- XDG Specifications
hl.env("XDG_CURRENT_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_DESKTOP", "Hyprland")
hl.env("XDG_SESSION_TYPE", "wayland")

-- QT Variables
hl.env("QT_AUTO_SCREEN_SCALE_FACTOR", "1")
hl.env("QT_WAYLAND_DISABLE_WINDOWDECORATION", "1")
hl.env("QT_QPA_PLATFORMTHEME", "qt6ct")
hl.env("QT_QPA_PLATFORM", "wayland;xcb")

-- hyprland-qt-support
hl.env("QT_QUICK_CONTROLS_STYLE", "org.hyprland.style")

-- xwayland apps scale fix
hl.env("GDK_SCALE", "1")
hl.env("QT_SCALE_FACTOR", "1")

-- Cursor theme
hl.env("HYPRCURSOR_THEME", "Adwaita")
hl.env("HYPRCURSOR_SIZE", "24")

-- Firefox
hl.env("MOZ_ENABLE_WAYLAND", "1")

-- Electron apps
hl.env("ELECTRON_OZONE_PLATFORM_HINT", "auto")

-- Default editor from 01-UserDefaults.conf
hl.env("EDITOR", "code")

-- GTK theme
hl.env("GTK_THEME", "WhiteSur-Dark-solid-grey-nord")
hl.env("ICON_THEME", "WhiteSur-nord-dark")

-- Nvidia
hl.env("GBM_BACKEND", "nvidia-drm")
hl.env("__GLX_VENDOR_LIBRARY_NAME", "nvidia")
hl.env("LIBVA_DRIVER_NAME", "nvidia")