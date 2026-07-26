import { Gdk, Gtk } from "ags/gtk4";
import { onCleanup } from "ags";
import app from "ags/gtk4/app";
import { attachHoverScroll, bash, hasBarItem, toggleQsModule, toggleWindow } from "../lib/utils";
import { theme } from "@/options";
// import { isVertical, orientation } from "../modules/bar/bar";
import { windows_names } from "@/windows";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import AstalNiri from "gi://AstalNiri?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import ScreenRecorder from "@/src/services/screenrecorder";
import { compositor } from "../lib/compositor";
import Brightness from "../services/brightness";


 
export const FunctionsList = {


   "screenrecord-toggle": () => {
      const sr = ScreenRecorder.get_default();
      if (sr) {
         if (sr.recording) sr.stop();
         else sr.start();
      }
   },
} as Record<string, any>;
 





export default function BarItem({
   id = "",
   window = "",
   children,
   format,
   data = {},
   onHoverEnter = "default",
   onHoverLeave = "default",
   onPrimaryClick = "default",
   onSecondaryClick = "default",
   onMiddleClick = "default",
   onScrollUp = "default",
   onScrollDown = "default",
   ...rest
}: BarItemProps) {
   const content = format ? parseFormat(format, data) : children;
 
   return (
      <box
         name={id}
         class={"bar-item"}

      >

      </box>
   );
}

