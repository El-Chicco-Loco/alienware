import { theme } from "@/options";
import { PowerModule } from "../../power/power";
import { Gtk } from "ags/gtk4";

export function PowerPage() {
   return (
      <box
         $type={"named"}
         name={"power"}
         class={"qs-menu-page"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
      >
         <PowerModule showArrow={true} />
      </box>
   );
}
