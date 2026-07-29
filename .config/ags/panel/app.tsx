import app from "ags/gtk4/app";
import request from "@/request";
import { MainWindow, NetworkWindow, BluetoothWindow } from "./src/windows/panel";
const css = "/home/alienware/.config/ags/panel/src/style/main.css";

app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "panel",
   main() {
      app.apply_css(css, true);
      app.get_monitors().map(MainWindow);
      app.get_monitors().map(NetworkWindow);
      app.get_monitors().map(BluetoothWindow);
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
