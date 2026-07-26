import { PanelModule } from "../modules/panel/panel";
import { Popup } from "@/src/widgets/popup";
import { Astal, Gtk } from "ags/gtk4";
const { TOP, RIGHT, LEFT } = Astal.WindowAnchor;

export function PanelWindow() {
   return (
      <Popup 
         visible={true} 
         name={"panel"}
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
         anchor={TOP | LEFT | RIGHT}
      >
         <PanelModule />
      </Popup>
   );
}
