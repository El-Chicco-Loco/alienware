import GLib from "gi://GLib"
import app from "ags/gtk4/app";
import Vte from "gi://Vte?version=3.91"
import { Astal } from "ags/gtk4";
import { Gdk } from "ags/gtk4";


export function BtopWindow() {
   
   const terminal = new Vte.Terminal({
      hexpand: true,
      vexpand: true,
   })

   // Correct signature: 9 arguments
   terminal.spawn_async(
      Vte.PtyFlags.DEFAULT,         // pty_flags
      null,                         // working_directory
      ["/bin/bash", "-c", "btop"],  // argv
      null,                         // envv
      GLib.SpawnFlags.DEFAULT,      // spawn_flags
      null,                         // child_setup
      -1,                           // timeout
      null,                         // cancellable
      null                          // callback (must be function or null)
   )

   const fg = new Gdk.RGBA();
   fg.parse('transparent');
   const bg = new Gdk.RGBA();
   bg.parse('#161616');
   terminal.set_colors(fg, bg, []);

   return (
      <window
         visible={false}
         name={"btop"}
         namespace={"btop"}
         class={"btop"}
         layer={Astal.Layer.TOP}
         anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
         application={app}
         child={terminal}
      />
   );
}
