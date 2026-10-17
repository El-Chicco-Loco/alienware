import app from "ags/gtk4/app";
import request from "@/request";
import { WriterWindow } from "./src/windows/writer";
const css = "/home/alienware/.config/ags/writer/src/style/main.css";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "writer",
   main() {
      app.apply_css(css, true);
      app.get_monitors().map(WriterWindow);
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
