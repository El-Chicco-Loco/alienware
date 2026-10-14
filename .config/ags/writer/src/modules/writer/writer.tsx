import { createState } from "ags";
import { subprocess } from "ags/process";
import { Gtk } from "ags/gtk4";
import { theme } from "@/options";
import app from "ags/gtk4/app";

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
   // const [status, setStatus] = createState("ready");
   const [recording, setRecording] = createState(false);

   function start() {
      // setStatus("running");
      setRecording(true);
      // runASR((code) => setStatus(code === 0 ? "done" : `failed (exit ${code})`));
      runASR();
   }

   function stop() {
      // setStatus("ready");
      setRecording(false);
      // quitASR((code) => setStatus(code === 0 ? "done" : `failed (exit ${code})`));
      quitASR();
   }

   console.log(app.get_window("writer"));
   // setInterval(() => {console.log(app.get_window("writer")?);}, 1000);

   return (
      <box
         name={"ASR"}
         class={"ASR"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
      >
         <switch
            class={"toggle"}
            valign={Gtk.Align.CENTER}
            active={recording}
            onNotifyActive={({ state }) => {
               if (state) {
                  // setStatus("ON");
                  console.log("---------------------------------")
                  console.log(app.get_window("writer"));
                  start();
               } else {
                  // setStatus("OFF");
                  stop();
               }
               return true
            }}
         />
      </box>
   );
}
