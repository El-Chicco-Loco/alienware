import { theme } from "@/options";
import { NetworkModule } from "../network/network";
import { Gtk } from "ags/gtk4";


export function NetworkPage() {
   
   return (
      <box
         visible
         $type={"named"}
         name={"network"}
         class={"qs-menu-page"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
         heightRequest={500}
      >
         <NetworkModule showArrow={true} />
      </box>
   );
}
