import { Gdk, Gtk } from "ags/gtk4";
import { For, createState } from "ags";
import { compositor } from "@/src/lib/compositor";
import { config, theme } from "@/options";
import { attachHoverScroll } from "@/src/lib/utils";
import BarItem, { FunctionsList } from "@/src/widgets/baritem";

const focusedWorkspace = compositor.focusedWorkspace();
let hideTimeout: ReturnType<typeof setTimeout> | null = null;









export function Workspaces({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
   if (!compositor.isHyprland() && !compositor.isNiri()) {
      console.warn("Bar: workspaces module skipped: no compositor available");
      return <box visible={false} />;
   }

   const conf = config.bar.modules.workspaces;
   const workspaces = compositor.monitorWorkspaces(gdkmonitor);   


   let [arr, setArr] = createState([]);
   focusedWorkspace.subscribe(() => {
         const fws = focusedWorkspace((fws) => {return fws})
         
         setArr(workspaces().map((ws) => {
            if (ws.id === compositor.workspaceId(fws())-2 || ws.id === compositor.workspaceId(fws())-1 || ws.id === compositor.workspaceId(fws())
            || ws.id === compositor.workspaceId(fws())+1 || ws.id === compositor.workspaceId(fws())+2) {
               return ws;
            }            
         }).filter((element) => element !== undefined)
      )
   });









   function WorkspaceButton({ ws }: { ws: any }) {
      const classNames = ["bar-item"];
      const steps = 10;
      // const item_width = 10;
      const offset = 75;
      const spacing = 46; //theme.bar.spacing;
      let [space, setSpace] = createState(0);
      let [pws, setPws] = createState(ws);
      
      function UpdateSpacing () {
         const fws = focusedWorkspace((fws) => {return fws});
         const ws1 = compositor.workspaceId(arr().at(0));       
         if (compositor.workspaceId(ws) === ws1) {
            const pos = compositor.workspaceId(ws) - (workspaces().indexOf(fws()));
            let sp = 0;

            sp = offset + pos*spacing;
            const sign = Math.sign(compositor.workspaceId(pws()) - compositor.workspaceId(fws()));
            console.log('-------------------- ', compositor.workspaceId(ws))
            console.log('previous: ', compositor.workspaceId(pws()), 'focused: ', compositor.workspaceId(fws()));
            console.log(sign);

            if (hideTimeout) clearTimeout(hideTimeout);
            for (let n=0; n<steps; n++) {
               hideTimeout = setTimeout(() => {
                  setSpace(sp); //  - sign*spacing + sign*n*spacing/steps);
               }, 50*n);
            }
         }
         else {
            setSpace(0);
         }
         setPws(fws())
      }

      UpdateSpacing();
      focusedWorkspace.subscribe(() => {
         UpdateSpacing();
      });

      let opacity = focusedWorkspace((fws) => {
         const pos = Math.abs(compositor.workspaceId(ws) - compositor.workspaceId(fws));
         let offset = 0.75;
         if (compositor.workspaceId(fws) === compositor.workspaceId(ws)) {
            offset = 1;
         }
         let opacity = offset - pos*0.3;
         return opacity;compositor.workspaceId(ws)
      });

      return <BarItem
            cssClasses={classNames}
            onPrimaryClick={""}
            format={conf["workspace-format"]}
            visible={true}
            marginStart={space}
            opacity={opacity}
            data={{
               id: (
                  <label
                     label={compositor.workspaceId(ws).toString()}
                     hexpand={false}
                  />
               )
            }}
         />;
   }





   


   return (
      <box
         visible={true}
         spacing={theme.bar.spacing}
         orientation={"top"}
         hexpand={false}
         halign={Gtk.Align.START}
         cssClasses={["workspaces", "",]}
      >

         <For each={arr}>{(ws) => <WorkspaceButton ws={ws} />}</For>
      
      </box>
   );
}
