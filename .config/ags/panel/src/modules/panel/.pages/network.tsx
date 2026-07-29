import { theme } from "@/options";
import { NetworkModule } from "../../network/network";
import { Gtk } from "ags/gtk4";
import { createComputed } from "ags";
import { qs_page, qs_page, height, height_set } from "../panel"


export function NetworkPage() {
   const H = createComputed(() => {
      console.log('height at network = ', height());
      return height();
   });

   
   return (
      <box
         visible
         $type={"named"}
         name={"network"}
         class={"qs-menu-page"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
         heightRequest={H}
      >
         <NetworkModule showArrow={true} />
      </box>
   );
}
