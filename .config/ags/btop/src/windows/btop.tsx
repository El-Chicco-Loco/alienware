import GLib from "gi://GLib"
import app from "ags/gtk4/app";
import Vte from "gi://Vte?version=3.91"
import { Astal } from "ags/gtk4";


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
