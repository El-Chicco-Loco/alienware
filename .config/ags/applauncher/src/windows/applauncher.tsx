import { AppLauncherModule } from "../modules/applauncher/applauncher";
import { Popup } from "@/src/widgets/popup";

export function AppLauncherWindow() {
   return (
      <Popup visible={false} name={"applauncher"} width={800} height={500}>
         <AppLauncherModule />
      </Popup>
   );
}
