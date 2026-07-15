import { icons } from "@/src/lib/icons";
import BarItem from "@/src/widgets/baritem";
import { windows_names } from "@/windows";
import { isVertical } from "../bar";
import { config, theme } from "@/options";

export function QuickSettings() {
   const conf = config.bar.modules.quicksettings;

   return (
      <BarItem
         id={"quicksettings"}
         window={windows_names.quicksettings}
         onHoverEnter={"open-qs"}
         onHoverLeave={"close-qs"}
      />
   );
}
