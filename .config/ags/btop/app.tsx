import app from "ags/gtk4/app";
import request from "@/request";
import { BtopWindow } from "./src/windows/btop";
const css = "/home/alienware/.config/ags/btop/src/style/main.css";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "btop",
   main() {
      app.apply_css(css, true);
      app.get_monitors().map(BtopWindow);
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
