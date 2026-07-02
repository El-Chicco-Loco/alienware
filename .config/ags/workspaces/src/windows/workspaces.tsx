import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Workspaces } from "../modules/workspaces";


export function BarWindow({
   visible,
   gdkmonitor,
   $,
}: JSX.IntrinsicElements["window"] & { gdkmonitor: Gdk.Monitor }) {

   return (
      <window
         visible={visible}
         name={"workspaces"}
         namespace={"workspaces"}
         class={"workspaces"}
         gdkmonitor={gdkmonitor}
         widthRequest={250}
         layer={Astal.Layer.TOP}
         anchor={Astal.WindowAnchor.TOP}
         application={app}
         $={(self) => {
            if ($) $(self);
         }}
      >
         <box
            class={"panel"}
            halign={Gtk.Align.START}   // don't stretch horizontally
            hexpand={false}
         >
            <Workspaces gdkmonitor={gdkmonitor} />
         </box>
         
      </window>
   );
}