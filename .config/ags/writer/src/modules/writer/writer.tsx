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

export function ASR() {
   const [status, setStatus] = createState("ready");

   function start() {
      setStatus("running");
      runASR((code) => setStatus(code === 0 ? "done" : `failed (exit ${code})`));
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
         <label label={status((s) => `ASR: ${s}`)} />
      </box>
   );
}
