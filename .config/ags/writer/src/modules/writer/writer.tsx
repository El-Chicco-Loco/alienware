import { createState } from "ags";
import { subprocess } from "ags/process";
import { Gtk } from "ags/gtk4";
import { theme } from "@/options";
import app from "ags/gtk4/app";
import { Visualizer } from "./mic-visualizer";

/** Project that gets executed by the button below. */
const ASR_DIR = "/home/alienware/Desktop/AI_assistant";
const ASR_START_CMD = [
   "bash",
   "-lc",
   `cd ${ASR_DIR} && exec ./.venv/bin/python ASR_writer.py`,
];
const ASR_STOP_CMD = [
   "bash",
   "-lc",
   "kill $(procs | grep -i './.venv/bin/python ASR_writer.py' | cut -d' ' -f2)",
];

/** Run ASR_writer/main.py inside its own virtualenv. */
export function runASR(onExit?: (code: number) => void) {
   const proc = subprocess({
      cmd: ASR_START_CMD,
      out: (line) => console.log(`[ASR] ${line}`),
      err: (line) => console.error(`[ASR] ${line}`),
   });

   if (onExit) proc.connect("exit", (_, code: number) => onExit(code));

   return proc;
}

export function quitASR(onExit?: (code: number) => void) {
   const proc = subprocess({
      cmd: ASR_STOP_CMD,
      out: (line) => console.log(`[ASR] ${line}`),
      err: (line) => console.error(`[ASR] ${line}`),
   });

   if (onExit) proc.connect("exit", (_, code: number) => onExit(code));

   return proc;
}

export function ASR() {
   const [status, setStatus] = createState("ready");
   const [recording, setRecording] = createState(true);

   function start() {
      setStatus("recording");
      setRecording(false);
      runASR();
   }

   function stop() {
      setStatus("ready");
      setRecording(true);
      quitASR();
   }

   app.connect("window-toggled", () => {
      if (recording()) {
         start();
      }
      else {
         stop();
      }
   })

   return (
      <box
         name={"ASR"}
         class={"ASR"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
      >
         <label label={status}/>
         <Visualizer />
      </box>
   );
}
