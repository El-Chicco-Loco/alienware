import { toggleWindow } from "./src/lib/utils";
import { createState } from "ags";
import app from "ags/gtk4/app";
export const [qs_page, qs_page_set] = createState("main");

export default function request(
   args: string[],
   response: (res: string) => void,
): void {
   if (args[0] == "toggle" && args[1]) {
      switch (args[1]) {
         case "applauncher":
            toggleWindow("applauncher");
            break;
         case "btop":
            toggleWindow("btop");
            break;
         case "panel":
            toggleWindow(qs_page());
            qs_page_set("main");
            break;
         case "powermenu":
            toggleWindow("powermenu");
            break;
         default:
            console.error("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   }

   if (args[0] == "open" && args[1]) {
      switch (args[1]) {
         case "applauncher":
            app.get_window("applauncher").show();
            break;
         case "btop":
            app.get_window("btop").show();
            break;
         case "panel":
            app.get_window(qs_page()).show();
            qs_page_set("main");
            break;
         case "powermenu":
            app.get_window("powermenu").show();
            break;
         default:
            console.error("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   }

   if (args[0] == "close" && args[1]) {
      switch (args[1]) {
         case "applauncher":
            app.get_window("applauncher").hide();
            break;
         case "btop":
            app.get_window("btop").hide();
            break;
         case "panel":
            app.get_window(qs_page()).hide();
            qs_page_set("main");
            break;
         case "powermenu":
            app.get_window("powermenu").hide();
            break;
         default:
            console.error("Unknown request:", request);
            return response("Unknown request");
            break;
      }
      return response("ok");
   }

}
