import { MainPage } from "../modules/panel/main";
import { NetworkPage } from "../modules/panel/network";
import { BluetoothPage } from "../modules/panel/bluetooth";
import { Popup } from "@/src/widgets/popup";
import { Astal, Gtk } from "ags/gtk4";
import { createEffect, createState } from "ags";
import { qs_page, qs_page_set } from "@/request";
import { MprisPlayers } from "../modules/panel/items/media";
// export const [qs_page, qs_page_set] = createState("main");
const { TOP, RIGHT, LEFT } = Astal.WindowAnchor;

export function MainWindow() {
   return (
      <Popup 
         visible={true} 
         name={"main"}
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
         anchor={TOP}
      >
         <box orientation={Gtk.Orientation.VERTICAL} hexpand={false}>
            <MainPage />
            <MprisPlayers />
            <box hexpand />
         </box>
         
      </Popup>
   );
}

export function NetworkWindow() {
   return (
      <Popup 
         visible={true} 
         name={"network"}
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
         anchor={TOP}
      >
         <NetworkPage />
      </Popup>
   );
}

export function BluetoothWindow() {
   return (
      <Popup 
         visible={true} 
         name={"bluetooth"}
         halign={Gtk.Align.CENTER} 
         valign={Gtk.Align.TOP}
         anchor={TOP}
      >
         <BluetoothPage />
      </Popup>
   );
}
