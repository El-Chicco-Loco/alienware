import { Gdk, Gtk } from "ags/gtk4";
// import { Workspaces } from "./items/workspaces";
// import { Clock } from "./items/clock";
// import { Launcher } from "./items/launcher";
// import { Tray } from "./items/tray";
// import { RecordIndicator } from "./items/recordindicator";
// import { Keyboard } from "./items/keyboard";
// import { Weather } from "./items/weather";
import { config, theme } from "@/options";
// import { windows_names } from "@/windows";
// import { Volume } from "./items/volume";
// import { Network } from "./items/network";
// import { Bluetooth } from "./items/bluetooth";
// import { Battery } from "./items/battery";
import { QuickSettings } from "../../../controlpanel/src/modules/bar/items/qss";
// import { Clipboard } from "./items/clipboard";
// import { PowerMenu } from "./items/powermenu";
// import { NotificationsList } from "./items/notificationslist";
// import { Separator } from "./items/separator";
// import { CPU } from "./items/cpu";
// import { RAM } from "./items/ram";
// import { Microphone } from "./items/microphone";
// import { ScreenBrightness } from "./items/brightness";

const { position, modules, size } = config.bar;
const { spacing } = theme.bar;
export const isVertical = position === "right" || position === "left";
console.log("############ baverticalr")
console.log(isVertical)
export const orientation = isVertical
   ? Gtk.Orientation.VERTICAL
   : Gtk.Orientation.HORIZONTAL;

function BarModule({
   gdkmonitor,
   $,
}: JSX.IntrinsicElements["window"] & { gdkmonitor: Gdk.Monitor }) {
   const Bar_Items = {
      // workspaces: () => <Workspaces gdkmonitor={gdkmonitor} />,
      // notificationslist: () => <NotificationsList />,
      quicksettings: () => <QuickSettings />,
      // cpu: () => <CPU />,
      // ram: () => <RAM />,
   } as Record<string, any>;

}
