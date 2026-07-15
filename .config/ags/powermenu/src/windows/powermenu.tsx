import { PowerMenuModule } from "../modules/powermenu/powermenu";
import app from "ags/gtk4/app";
import Powermenu from "../services/powermenu";
import { VerificationModule } from "../modules/powermenu/verification";
import { Popup } from "@/src/widgets/popup";
import { Gtk } from "ags/gtk4";
const powermenu = Powermenu.get_default();

export function PowerMenuWindow() {
   return (
      <Popup 
         visible={false} 
         name={"powermenu"} 
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.CENTER}
      >
         <PowerMenuModule />
      </Popup>
   );
}

export function VerificationWindow() {
   const appconnect = app.connect("window-toggled", (_, win) => {
      const winName = win.name;
      const visible = win.visible;

      if (winName == "verification" && !visible) {
         powermenu.cancelAction();
      }
   });

   return (
      <Popup
         name={"verification"} 
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.CENTER}
      >
         <VerificationModule />
      </Popup>
   );
}
