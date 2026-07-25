import { AppLauncherModule } from "../modules/applauncher/applauncher";
import { Popup } from "@/src/widgets/popup";
import { Astal, Gtk } from "ags/gtk4";
const { TOP, BOTTOM, RIGHT, LEFT } = Astal.WindowAnchor;

export function AppLauncherWindow() {
   return (
      <Popup 
         visible={false} 
         name={"applauncher"} 
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
         height={800}
      >
         <AppLauncherModule />
      </Popup>
   );
}
