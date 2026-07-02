import Gtk from "gi://Gtk";
import app from "ags/gtk4/app"
import PowerMenu from "powermenu/src/services/powermenu";
import { createBinding, createState } from "ags";
import Pango from "gi://Pango?version=1.0";
import Adw from "gi://Adw?version=1";
const powermenu = PowerMenu.get_default();


export function UpdateLabel() {
   const [countdown, setCountdown] = createState(3)

   setInterval(() => {
      setCountdown(prev => {return prev - 1});
   }, 1000);

   var currentLabel = powermenu.label;

   return countdown.as(
      (n) => `${currentLabel} ${n} seconds`
   );
}



export function VerificationModule() {
   
   return (
      <box orientation={Gtk.Orientation.VERTICAL} spacing={20}>
         <label label={createBinding(powermenu, "title")} class={"title"} />
         <Adw.Clamp maximumSize={400}>
            <label
               label={UpdateLabel()}
               wrap
               justify={Gtk.Justification.CENTER}
               wrapMode={Pango.WrapMode.CHAR}
               class={"label"}
            />
         </Adw.Clamp>
         <box homogeneous={true} spacing={10}>
            <button
               label={"Cancel"}
               focusOnClick={false}
               onClicked={() => {
                  powermenu.cancelAction();
                  // hideWindows();
                  app.get_window("verification")?.hide();
                  app.get_window("powermenu")?.show();
               }}
            />
         </box>
      </box>
   );
}
