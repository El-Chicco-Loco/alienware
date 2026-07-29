import { toggleWindow } from "./src/lib/utils";
import { createState } from "ags";
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
}
