import { AppLauncherModule } from "../modules/applauncher/applauncher";
import { Popup } from "@/src/widgets/popup";
import { Gtk } from "ags/gtk4";

export function AppLauncherWindow() {
   return (
      <Popup 
         visible={false} 
         name={"applauncher"} 
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
      >
         <AppLauncherModule />
      </Popup>
   );
}
