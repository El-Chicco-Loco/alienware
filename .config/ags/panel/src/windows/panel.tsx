import { PanelModule } from "../modules/panel/panel";
import { Popup } from "@/src/widgets/popup";
import { Gtk } from "ags/gtk4";

export function PanelWindow() {
   return (
      <Popup 
         visible={true} 
         name={"panel"} 
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
      >
         <PanelModule />
      </Popup>
   );
}
