import { windows_names } from "@/windows";
import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { QuickSettings } from "../modules/bar/items/quicksettings";


export function BarWindow({
   gdkmonitor,
   $,
}: JSX.IntrinsicElements["window"] & { gdkmonitor: Gdk.Monitor }) {

   return (
      <window
         visible
         name={windows_names.bar}
         namespace={windows_names.bar}
         class={windows_names.bar}
         gdkmonitor={gdkmonitor}
         layer={Astal.Layer.TOP}
         anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP}
         application={app}
         $={(self) => {
            if ($) $(self);
         }}
      >
         <QuickSettings gdkmonitor={gdkmonitor} />
      </window>
   );
}
