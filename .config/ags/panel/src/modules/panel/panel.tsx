import Gtk from "gi://Gtk";
import { NetworkPage } from "./pages/network";
import { MainPage } from "./pages/main";
import { BluetoothPage } from "./pages/bluetooth";
import { createEffect, createState } from "ags";
export const [qs_page, qs_page_set] = createState("main");
export const [height, height_set] = createState(100);

export function PanelModule() {

   return (
      <stack
         visible={true}
         transitionDuration={200}
         class={"stack"}
         vhomogeneous={false}
         hhomogeneous={false}
         interpolate_size={false}
         transitionType={Gtk.StackTransitionType.CROSSFADE}
         valign={Gtk.Align.START}
         halign={Gtk.Align.CENTER} 
         hexpand={false}        
         $={(self) => {
            self.set_halign(Gtk.Align.CENTER)
            self.set_valign(Gtk.Align.START)

            createEffect(() => {
               const page = qs_page();
               self.set_visible_child_name(page);

               if (page == "main") {
                  height_set(100);
               } else if (page == "network") {
                  height_set(700);
               }

               // force GTK to actually recompute + reallocate,
               // otherwise shrinking silently gets ignored
               self.queue_resize();
               const root = self.get_root() as Gtk.Window;
               root?.set_default_size(-1, -1);
               root?.queue_resize();
               root?.set_valign(Gtk.Align.TOP);
               root?.set_halign(Gtk.Align.CENTER);
            });
         }}
      >
         <MainPage />
         <NetworkPage />
         <BluetoothPage />
      </stack>
   );
}
