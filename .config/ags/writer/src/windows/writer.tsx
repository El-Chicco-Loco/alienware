import { ASR } from "../modules/writer/writer";
import { Popup } from "@/src/widgets/popup";
import { Astal, Gtk } from "ags/gtk4";
const { BOTTOM } = Astal.WindowAnchor;

export function WriterWindow() {
   return (
      <Popup
         name={"writer"}
         halign={Gtk.Align.CENTER}
         valign={Gtk.Align.TOP}
         anchor={BOTTOM}
      >
         <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
            <ASR />
         </box>
      </Popup>
   );
}



