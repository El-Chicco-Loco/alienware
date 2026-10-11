import { createState } from "ags";
import { subprocess } from "ags/process";
import { Gtk } from "ags/gtk4";
import { theme } from "@/options";

/** Project that gets executed by the button below. */
const ASR_DIR = "/home/alienware/Desktop/AI_assistant";
const ASR_CMD = [
   "bash",
   "-lc",
   `cd ${ASR_DIR} && exec ./.venv/bin/python ASR_writer.py`,
];

/** Run ASR_writer/main.py inside its own virtualenv. */
export function runASR(onExit?: (code: number) => void) {
   const proc = subprocess({
      cmd: ASR_CMD,
      out: (line) => console.log(`[ASR] ${line}`),
      err: (line) => console.error(`[ASR] ${line}`),
   });

   if (onExit) proc.connect("exit", (_, code: number) => onExit(code));

   return proc;
}

export function quitASR(onExit?: (code: number) => void) {
   const proc = subprocess({
      cmd: "^C",
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
      setStatus("running");
      setRecording(true);
      runASR((code) => setStatus(code === 0 ? "done" : `failed (exit ${code})`));
   }

   function stop() {
      setStatus("ready");
      setRecording(false);
      quitASR((code) => setStatus(code === 0 ? "done" : `failed (exit ${code})`));
   }

   return (
      <box
         name={"ASR"}
         class={"ASR"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={theme.spacing}
      >
         <button
            label={"Start ASR"}
            sensitive={status((s) => s !== "running")}
            onClicked={start}
         />
         <switch
            class={"toggle"}
            valign={Gtk.Align.CENTER}
            active={recording}
            onNotifyActive={({ state }) => {
               if (state) {
                  setStatus("ON");
                  start();
               } else {
                  setStatus("OFF");
                  stop();
               }
               return true
            }}
         />
         <label label={status((s) => `ASR: ${s}`)} />
      </box>
   );
}
