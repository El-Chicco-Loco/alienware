-- Window rules and layer rules
-- Based on UserConfigs/WindowRules.conf

-- local window = require("user-functions.window")


local float_dialogs = {
    { title = "^Open$" },
    { title = "^Open File(.*)$" },
    { title = "^Select a File(.*)$" },
    { title = "^Open Folder(.*)$" },
    { title = "^Save As(.*)$" },
    { title = "^Rename(.*)$" },
    { title = "^Library(.*)$" },
    { title = "^File Upload(.*)$" },
    { title = "^(.*)(wants to save)$" },
    { title = "^(.*)(wants to open)$" },
    { title = "^(Choose wallpaper)(.*)$" },
    { title = "^Authenticate$" },
}

for _, cfg in ipairs(float_dialogs) do
    hl.window_rule({
        name  = "float-dialog-" .. cfg.title,
        match = { title = cfg.title },
        center = true,
        float  = true,
        opacity = 2.0,
    })
end

local opaque_window = {
    { class = "brave-browser" },
    { class = "vlc" },
    { class = "Ryujinx" },
    { class = "gimp" },
    { class = "org.gnome.Loupe" },
}

for _, cfg in ipairs(opaque_window) do
    hl.window_rule({
        name  = "opaque-window-" .. cfg.class,
        match = { class = cfg.class },
        float  = false,
        opacity = 2.0,
    })
end

hl.window_rule({
    name  = "fullscreen-opacity",
    match = { fullscreen = true },
    opacity = 2.0,
    float = false,
})

hl.window_rule({
    name  = "floating-opacity",
    match = { float = true },
    opacity = 2.0,
})