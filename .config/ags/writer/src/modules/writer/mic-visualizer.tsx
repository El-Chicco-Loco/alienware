// AGS 3.x (GTK4) example: live visualizer of the default microphone using AstalCava
// Needs: libastal-cava, libastal-wireplumber (AstalWp), cava installed.
// Run with: ags run mic-visualizer-ags3.tsx

import { Gtk } from "ags/gtk4"
import { createBinding } from "ags"
import { execAsync } from "ags/process"
import Cava from "gi://AstalCava"
import AstalWp from "gi://AstalWp"

const BARS = 20

const wp = AstalWp.get_default()!
const audio = wp.audio!

const cava = Cava.get_default()!
// PULSE opens a real record stream on the source, which wakes a suspended mic.
// (works on PipeWire too, through pipewire-pulse)
cava.input = Cava.Input.PULSE
cava.bars = BARS
cava.framerate = 60

// NEVER give cava a null/empty source: it segfaults. Only set it when we have a real name.
export function setSource(name: string | null | undefined) {
    const n = name?.trim()
    if (!n) return false
    console.log("cava source ->", n)
    cava.source = n
    return true
}

// The node name (what `pactl get-default-source` prints) is the reliable source.
// AstalWp's `name` can still be null right after startup, so ask pactl directly.
export async function syncSource() {
    try {
        const out = await execAsync(["pactl", "get-default-source"])
        if (setSource(out)) return
    } catch (e) {
        console.log("pactl failed:", e)
    }
    // Fallback: AstalWp endpoint (may be null if not populated yet)
    setSource(audio.defaultMicrophone?.name)
}

syncSource()

// Follow the default microphone if it changes (or appears late)
audio.connect("notify::default-microphone", () => syncSource())

// One accessor holding the whole array of 0..1 values
const values = createBinding(cava, "values")

export function Visualizer() {
    return (
        <box class="mic-visualizer" spacing={4}>
            {/* Create the bars once; each one reads its own index from `values` */}
            {Array.from({ length: BARS }, (_, i) => (
                <levelbar
                    class="levelbar"
                    orientation={Gtk.Orientation.VERTICAL}
                    inverted
                    minValue={0}
                    maxValue={1}
                    value={values((v) => v[i] ?? 0)}
                    heightRequest={50}
                    widthRequest={10}
                />
            ))}
        </box>
    )
}
