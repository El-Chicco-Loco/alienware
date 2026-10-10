import { ASR } from "../modules/writer/writer";
import { Popup } from "@/src/widgets/popup";
import { Astal, Gtk } from "ags/gtk4";
const { TOP } = Astal.WindowAnchor;

export function WriterWindow() {
   return (
      <Popup
         name={"writer"}
         halign={Gtk.Align.CENTER}
         valign={Gtk.Align.TOP}
         anchor={TOP}
      >
         <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
            <label label={"CIAO"} />
            <ASR />
         </box>
      </Popup>
   );
}
