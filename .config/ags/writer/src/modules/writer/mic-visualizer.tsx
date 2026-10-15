// AGS v2 / Astal example: live visualizer of the default microphone using AstalCava
// Needs: libastal-cava, libastal-wireplumber, and cava (libcava) installed.
// Run with: ags run mic-visualizer.tsx

import { App, Astal } from "astal/gtk3"
import { bind } from "astal"
import Cava from "gi://AstalCava"
import Wp from "gi://AstalWp"

const audio = Wp.get_default()!.audio
const mic = audio.defaultMicrophone

const cava = Cava.get_default()!
cava.input = Cava.Input.PIPEWIRE // use Cava.Input.PULSE if you are on PulseAudio
cava.source = mic.name            // node name of the default microphone
cava.bars = 20
cava.framerate = 60

// Keep Cava pointed at the right mic if the default one changes
audio.connect("notify::default-microphone", () => {
    const m = audio.defaultMicrophone
    if (m) cava.source = m.name
})

export function Visualizer() {
    return (
        <box className="mic-visualizer" spacing={4}>
            {bind(cava, "values").as((vals) =>
                vals.map((v) => (
                    <levelbar
                        orientation={1} // vertical
                        inverted
                        value={v}
                        heightRequest={80}
                        widthRequest={8}
                    />
                ))
            )}
        </box>
    )
}

/*App.start({
    css: `
        window { background: transparent; }
        .mic-visualizer { padding: 12px; background: rgba(0,0,0,0.6); border-radius: 12px; }
        levelbar block.filled { background: #89b4fa; border-radius: 4px; }
        levelbar trough { min-width: 8px; }
    `,
    main() {
        return (
            <window
                name="mic-visualizer"
                application={App}
                visible
                anchor={Astal.WindowAnchor.BOTTOM}
                exclusivity={Astal.Exclusivity.IGNORE}
            >
                <Visualizer />
            </window>
        )
    },
})*/
