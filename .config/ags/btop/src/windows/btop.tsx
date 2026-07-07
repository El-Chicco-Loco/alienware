import { windows_names } from "@/windows";
import { QuickSettingsModule } from "../modules/quicksettings/quicksettings";
import { BarItemPopup } from "@/src/widgets/baritempopup";
import Adw from "gi://Adw?version=1";
import { attachHover, handleHover } from "@/src/widgets/baritem";
import app from "ags/gtk4/app"
import Gtk from "gi://Gtk?version=4.0"
import Gio from "gi://Gio"
import GLib from "gi://GLib"
import Vte from "gi://Vte?version=3.91"
import { Astal, Gdk } from "ags/gtk4";
import { QuickSettings } from "../modules/bar/items/quicksettings";
import { Popup } from "@/src/widgets/popup";
import { PowerMenuModule } from "../../../powermenu/src/modules/powermenu/powermenu";


export function BtopWindow({
   gdkmonitor,
   $,
}: JSX.IntrinsicElements["window"] & { gdkmonitor: Gdk.Monitor }) {
   
   const terminal = new Vte.Terminal({
      hexpand: true,
      vexpand: true,
   })

   const shell = GLib.getenv("SHELL") || "/bin/bash"

   // Correct signature: 9 arguments
   terminal.spawn_async(
      Vte.PtyFlags.DEFAULT,      // pty_flags
      null,                      // working_directory
      [shell],                   // argv
      null,                      // envv
      GLib.SpawnFlags.DEFAULT,   // spawn_flags
      null,                      // child_setup
      -1,                        // timeout
      null,                      // cancellable
      null                       // callback (must be function or null)
   )
   const command = "btop"  // Include \n to execute
   terminal.feed(command.repeat(1)) 
   terminal.feed("\n".repeat(1)) 

   return (
      <window
         visible
         title="AGS Terminal"
         defaultWidth={800}
         defaultHeight={600}
         child={terminal}
      />
   );
}
