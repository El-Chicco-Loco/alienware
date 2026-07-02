import app from "ags/gtk4/app";
import "/home/alienware/.config/ags/common/src/services/styles";
import request from "@/request";
import { BarWindow } from "./src/windows/bar";
import app from "ags/gtk4/app";
import { createBinding, For, onCleanup, This } from "ags";
import { QuickSettingsWindow } from "./src/windows/quicksettings";
import { NotificationsListWindow } from "./src/windows/notificationslist";
import { NotificationsWindow } from "./src/windows/notifications";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "controlpanel",
   main() {
      QuickSettingsWindow()
   
      const monitors = createBinding(app, "monitors");
   
      <For each={monitors}>
         {(monitor) => (
         <This this={app}>
            <BarWindow
               gdkmonitor={monitor}
               $={(self) => onCleanup(() => self.destroy())}
            />
         </This>
         )}
      </For>;
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
