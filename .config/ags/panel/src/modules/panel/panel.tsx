import Gtk from "gi://Gtk";
import { NetworkPage } from "./pages/network";
import { MainPage } from "./pages/main";
import { BluetoothPage } from "./pages/bluetooth";
import { PowerPage } from "./pages/power";
import { createEffect, createState } from "ags";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import AstalBluetooth from "gi://AstalBluetooth?version=0.1";
export const [qs_page, qs_page_set] = createState("main");

export function PanelModule() {
   const network = AstalNetwork.get_default();
   const bluetooth = AstalBluetooth.get_default();

   return (
      <stack
         visible={true}
         transitionDuration={200}
         class={"stack"}
         vhomogeneous={false}
         hhomogeneous={false}
         interpolate_size={true}
         transitionType={Gtk.StackTransitionType.CROSSFADE}
         $={(self) => {
            createEffect(() => {
               const page = qs_page();
               self.set_visible_child_name(page);
            });
         }}
      >
         <MainPage />
         <NetworkPage />
         <BluetoothPage />
         <PowerPage />
      </stack>
   );
}
