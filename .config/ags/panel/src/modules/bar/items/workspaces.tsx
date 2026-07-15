import { Gdk, Gtk } from "ags/gtk4";
import { createBinding, createComputed, For, createState } from "ags";
import { compositor } from "@/src/lib/compositor";
import { config, theme } from "@/options";
import { attachHoverScroll, getAppInfo, truncateByFormat } from "@/src/lib/utils";
import { icons } from "@/src/lib/icons";
import BarItem, { FunctionsList } from "@/src/widgets/baritem";
import { isVertical, orientation } from "../bar";

const focusedWorkspace = compositor.focusedWorkspace();
let hideTimeout: ReturnType<typeof setTimeout> | null = null;


export function Workspaces({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
   if (!compositor.isHyprland() && !compositor.isNiri()) {
      console.warn("Bar: workspaces module skipped: no compositor available");
      return <box visible={false} />;
   }

   const conf = config.bar.modules.workspaces;
   const workspaces = compositor.monitorWorkspaces(gdkmonitor);
   

   function WorkspaceButton({ ws }: { ws: any }) {
      // const windows = compositor.workspaceWindows(ws);
      // const windowCount = windows((w) => w.length);

      // const visible = createComputed(() => {
      //    if (conf["hide-empty"]) {
      //       const focused = focusedWorkspace();
      //       return (
      //          windowCount() > 0 ||
      //          (focused &&
      //             compositor.workspaceId(focused) ===
      //                compositor.workspaceId(ws))
      //       );
      //    }
      //    return true;
      // });

      const classNames = focusedWorkspace((fws) => {
         const classes = ["bar-item", "workspaces", "minimal"];
         if (
            fws &&
            compositor.workspaceId(fws) === compositor.workspaceId(ws)
         ) {
            classes.push("active");
         }
         // if (!conf["workspace-format"].includes("{windows}"))
         //    classes.push("minimal");
         // if (windowCount() === 0) classes.push("empty");
         return classes;
      });


      let [space, setSpace] = createState(0);
      let [pws, setPws] = createState(ws);
      
      const steps = 10;

      focusedWorkspace.subscribe(() => {
         const fws = focusedWorkspace((fws) => {return fws})
         const pos = compositor.workspaceId(ws) - compositor.workspaceId(fws());
         let sp = 0;
         let sepr = (theme.bar.spacing + 27);
         if (compositor.workspaceId(ws) === 1) {
            sp = 860 + pos*sepr;
            const sign = Math.sign(compositor.workspaceId(pws()) - compositor.workspaceId(fws()));

            if (hideTimeout) clearTimeout(hideTimeout);
            for (let n=0; n<steps; n++) {
               hideTimeout = setTimeout(() => {
                  setSpace(sp - sign*sepr + sign*n*sepr/steps);
               }, 10*n);
            }
         }
         setPws(fws())
      });

      let opacity = focusedWorkspace((fws) => {
         const pos = Math.abs(compositor.workspaceId(ws) - compositor.workspaceId(fws));
         let offset = 0.75;
         if (compositor.workspaceId(fws) === compositor.workspaceId(ws)) {
            offset = 1;
         }
         let opacity = offset - pos*0.25;
         return opacity;
      });

      return <BarItem
            cssClasses={classNames}
            onPrimaryClick={/* () => compositor.focusWorkspace(ws) */''}
            format={conf["workspace-format"]}
            visible={true}
            marginStart={space}
            opacity={opacity}
            data={{
               id: (
                  <label
                     label={compositor.workspaceId(ws).toString()}
                     hexpand={isVertical}
                  />
               )
            }}
         />;
   }



   // let [vis, setVis] = createState(0);
   // // let hideTimeout: ReturnType<typeof setTimeout> | null = null;
// 
   // focusedWorkspace.subscribe(() => {
   //    if (hideTimeout) clearTimeout(hideTimeout);
   //    hideTimeout = setTimeout(() => {
   //       setVis(0.5);
   //    }, 50);
   //    hideTimeout = setTimeout(() => {
   //       setVis(1);
   //    }, 100);
   //    hideTimeout = setTimeout(() => {
   //       setVis(0.5);
   //    }, 1500);
   //    hideTimeout = setTimeout(() => {
   //       setVis(0);
   //    }, 1500);
   // });

   return (
      <box
         visible={true}
         spacing={theme.bar.spacing}
         orientation={orientation}
         hexpand={true}
         halign={Gtk.Align.START}
         cssClasses={["workspaces", "",]}
         $={(self) =>
            {
               attachHoverScroll(self, ({ dx }) => {
                  if (dx < 0) {
                     FunctionsList[
                        conf["on-scroll-down"] as keyof typeof FunctionsList
                     ]();
                  } else if (dx > 0) {
                     FunctionsList[
                        conf["on-scroll-up"] as keyof typeof FunctionsList
                     ]();
                  }
               });

            }
         }
      >

         <For each={workspaces}>{(ws) => <WorkspaceButton ws={ws} />}</For>
      
      </box>
   );
}
