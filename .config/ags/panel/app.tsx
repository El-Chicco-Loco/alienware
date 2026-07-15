import app from "ags/gtk4/app";
import request from "@/request";
import { PanelWindow } from "./src/windows/panel";
const css = "/home/alienware/.config/ags/style/main.css";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "panel",
   main() {
      app.apply_css(css, true);
      app.get_monitors().map(PanelWindow);
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
