import { windows_names } from "@/windows";
import { QuickSettingsModule } from "../modules/quicksettings/quicksettings";
import { BarItemPopup } from "@/src/widgets/baritempopup";
import Adw from "gi://Adw?version=1";
import { attachHover, handleHover } from "@/src/widgets/baritem";


export function QuickSettingsWindow() {
   return (
      <BarItemPopup
         name={windows_names.quicksettings}
         module={"quicksettings"}
         width={440}
      >
         <Adw.Clamp
            class={"hoverarea"}
            $={(self) => {
                        attachHover(self, () => {
                           handleHover("open-qs-popup");
                        }, () => {
                           handleHover("close-qs-popup");
                        });
                     }}
         >
            <QuickSettingsModule />
         </Adw.Clamp>
      </BarItemPopup>
   );
}
