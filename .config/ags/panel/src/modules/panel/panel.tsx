import Gtk from "gi://Gtk";
import { NetworkPage } from "./pages/network";
import { MainPage } from "./pages/main";
import { BluetoothPage } from "./pages/bluetooth";
import { PowerPage } from "./pages/power";
import { createEffect, createState } from "ags";
export const [qs_page, qs_page_set] = createState("main");

export function PanelModule() {

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
