import app from "ags/gtk4/app"
import request from "@/request";
import { AppLauncherWindow } from "./src/windows/applauncher";
const css = "/home/alienware/.config/ags/applauncher/src/style/main.css";

app.start({
  icons: "/home/alienware/.icons/WhiteSur-nord-dark",
  instanceName: "applauncher",
  main() {
    app.apply_css(css, true);
    app.get_monitors().map(AppLauncherWindow)
  },
    requestHandler(argv, response) {
    request(argv, response);
  },
})
