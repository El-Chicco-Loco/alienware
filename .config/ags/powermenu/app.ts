import app from "ags/gtk4/app"
import request from "@/request";
import {PowerMenuWindow} from "./src/windows/powermenu"
const css = "/home/alienware/.config/ags/style/main.css";

app.start({
  icons: "/home/alienware/.icons/WhiteSur-nord-dark",
  instanceName: "powermenu",
  
  main() {
    app.apply_css(css, true);
    app.get_monitors().map(PowerMenuWindow);
  },
  requestHandler(argv, response) {
    request(argv, response);
  },
})
