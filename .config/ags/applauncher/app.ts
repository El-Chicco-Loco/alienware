import app from "ags/gtk4/app"
import request from "@/request";
import { windows_names } from "@/windows";
import { AppLauncherWindow } from "./src/windows/applauncher";
const css = "/home/alienware/.config/ags/style/main.css";

app.start({
  icons: "/home/alienware/.icons/WhiteSur-nord-dark",
  instanceName: "applauncher",
  main() {
    app.apply_css(css, true);
    app.get_monitors().map(AppLauncherWindow)
    app.get_window(windows_names.applauncher)?.show();
  },
    requestHandler(argv, response) {
    request(argv, response);
  },
})
