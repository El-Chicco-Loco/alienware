// import app from "ags/gtk4/app";
// import request from "@/request";
// import app from "ags/gtk4/app";
// import { createBinding, For, onCleanup, This } from "ags";
// import { BtopWindow } from "./src/windows/btop";
// const css = "/home/alienware/.config/ags/style/main.css";
// 
// 
// app.start({
//    icons: "/home/alienware/.icons/WhiteSur-nord-dark",
//    instanceName: "btop",
//    main() {
//       app.apply_css(css, true);
//       app.get_monitors().map(BtopWindow);
//    },
//    requestHandler(argv, response) {
//       request(argv, response);
//    },
// });


import app from "ags/gtk4/app"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio"
import GLib from "gi://GLib"
import Vte from "gi://Vte?version=3.91"
import { Astal, Gdk } from "ags/gtk4";

const css = "/home/alienware/.config/ags/style/main.css";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "btop",
    main() {
      app.apply_css(css, true);
      const terminal = new Vte.Terminal({
         hexpand: true,
         vexpand: true,
      })

      const shell = GLib.getenv("SHELL") || "/bin/bash"
      terminal.spawn_async(
         Vte.PtyFlags.DEFAULT,
         GLib.get_home_dir(),
         [shell],
         null,
         GLib.SpawnFlags.DEFAULT,
         null,
         -1,
         null,
         (term, pid, error) => {
               if (error) {
                  console.error("Failed to spawn shell:", error.message)
               }
         }
      )
      

      const window = new Gtk.Window({
         title: "AGS Terminal",
         default_width: 800,
         default_height: 600,
         child: terminal,
      })

      window.connect("destroy", () => app.quit())
      window.present()
    },
})
