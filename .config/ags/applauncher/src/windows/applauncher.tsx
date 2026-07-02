import { windows_names } from "@/windows";
import { config } from "@/options";
import { AppLauncherModule } from "../modules/applauncher/applauncher";
import { Popup } from "@/src/widgets/popup";
const { width, height } = config.launcher;

export function AppLauncherWindow() {
   return (
      <Popup name={windows_names.applauncher} width={width} height={height}>
         <AppLauncherModule />
      </Popup>
   );
}
