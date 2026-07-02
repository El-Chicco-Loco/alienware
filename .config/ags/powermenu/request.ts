import app from "ags/gtk4/app";
import ScreenRecorder from "./src/services/screenrecorder";
import { hasBarItem, toggleQsModule, toggleWindow } from "./src/lib/utils";
const screenrecorder = ScreenRecorder.get_default();

export default function request(
   args: string[],
   response: (res: string) => void,
): void {
   if (args[0] == "toggle" && args[1]) {
      switch (args[1]) {
         case "applauncher":
            toggleWindow("applauncher");
            break;
         case "quicksettings":
            toggleWindow("quicksettings");
            break;
         case "calendar":
            toggleWindow("calendar");
            break;
         case "powermenu":
            toggleWindow("powermenu");
            break;
         case "clipboard":
            toggleWindow("clipboard");
            break;
         case "weather":
            toggleQsModule("weather");
            break;
         case "notificationslist":
            toggleQsModule("notificationslist");
            break;
         case "volume":
            toggleQsModule("volume");
            break;
         case "network":
            toggleQsModule("network");
            break;
         case "bluetooth":
            toggleQsModule("bluetooth");
            break;
         case "power":
            toggleQsModule("power", "battery");
            break;
         default:
            print("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   } else {
      switch (args[0]) {
         case "screenrecord":
            screenrecorder.start();
            break;
         default:
            print("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   }
}
