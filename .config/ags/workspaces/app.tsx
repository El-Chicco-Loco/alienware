import app from "ags/gtk4/app";
import request from "@/request";
import { BarWindow } from "./src/windows/workspaces";
import app from "ags/gtk4/app";
import { createBinding, For, onCleanup, This } from "ags";
import { compositor } from "@/src/lib/compositor";
import { createState, onCleanup } from "gnim";


const css = "/home/alienware/.config/ags/style/main.css";
const focusedWorkspace = compositor.focusedWorkspace();  
const [visible, setVisible] = createState(false);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

focusedWorkspace.subscribe(() => {
   setVisible(true);
   if (hideTimeout) clearTimeout(hideTimeout);
   hideTimeout = setTimeout(() => {
      setVisible(false);
   }, 1000);
});


app.start({
   icons: "/home/alienware/.icons/WhiteSur-nord-dark",
   instanceName: "workspaces",
   main() {
      app.apply_css(css, true);

      const monitors = createBinding(app, "monitors");   

      <For each={monitors}>
         {(monitor) => (
         <This this={app}>
            <BarWindow
            visible={visible}
               gdkmonitor={monitor}
               $={(self) => onCleanup(() => self.destroy())}
            />
         </This>
         )}
      </For>;
   },
   requestHandler(argv, response) {
      request(argv, response);
   },
});
