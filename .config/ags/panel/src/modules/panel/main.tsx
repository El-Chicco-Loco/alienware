import { Gtk } from "ags/gtk4";
import { QSSliders } from "./items/sliders";
import { MprisPlayers } from "./items/media";
import { Buttons } from "./items/buttons";
import { icons, VolumeIcon, BatteryIcon } from "@/src/lib/icons";
import AstalBattery from "gi://AstalBattery?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "panel/src/services/brightness";
import { createBinding, createState } from "ags";
import { createPoll } from "ags/time";
import { exec, execAsync } from "ags/process";
const wp = AstalWp.get_default();
const speaker = wp.get_default_speaker();
const battery = AstalBattery.get_default();
const brightness = Brightness.get_default();
const spacing = 10;




import AstalNetwork from "gi://AstalNetwork";
const network = AstalNetwork.get_default();

const idle = createState()

function BatteryIndicator() {
   return (
      <button
         class={"value-indicator"}
         visible={createBinding(battery, "isPresent")}
         focusOnClick={false}
      >
         <box spacing={spacing}>
            <image iconName={BatteryIcon} pixelSize={24} />
            <label
               label={
                  createBinding(battery, "percentage").as(
                     (level) => `${Math.floor(level * 100)}%`)
               }
            />
         </box>
      </button>
   );
}

function VolumeIndicator() {

   return (
      <button
         class={"value-indicator"}
         visible={true}
         focusOnClick={false}
      >
         <box spacing={spacing}>
            <image iconName={VolumeIcon} pixelSize={24} />
            <label
               label={
                  createBinding(speaker, "volume").as(
                     (level) => `${Math.floor(level * 100)}%`)
                  }
            />
         </box>
      </button>
   );
}

function BrightnessIndicator() {

   return (
      <button
         class={"value-indicator"}
         visible={true}
         focusOnClick={false}
      >
         <box spacing={spacing}>
            <image iconName={icons.brightness} pixelSize={24} />
            <label
               label={
                  createBinding(brightness, "screen").as(
                     (level) => `${Math.floor(level * 100)}%`)
                  }
            />
         </box>
      </button>
   );
}

function IdleIndicator() {
   const idle = createPoll("", 1000, async () => {
      try {
         await execAsync(["pgrep", "-x", "hypridle"])
         return "yes"
      } catch {
         return "no"
      }
   })

   const date = createPoll("", 1000, `bash -c "date +%H:%M"`);
   // const idle = createPoll("", 1000, "pgrep -x hypridle");

   // const out = exec("if [[ 'pgrep -x hypridle' == '' ]]; then echo true; fi");
   // console.log(out);

   return (
      <box class={"header"} spacing={spacing}>
      <button
         class={"value-indicator"}
         visible={true}
         focusOnClick={false}
      >
         <box spacing={spacing}>
            <image iconName={icons.idle} pixelSize={24} />
            <label
               label={date}
               halign={Gtk.Align.START}
               valign={Gtk.Align.CENTER}
            />

            <label
               label={idle}
               halign={Gtk.Align.START}
               valign={Gtk.Align.CENTER}
            />

            
            
         </box>
      </button>
      <switch
                  class={"toggle"}
                  valign={Gtk.Align.CENTER}
                  active={true}
                  onNotifyActive={({ state }) => {
                     if (state) {
                        execAsync("hypridle").catch(console.error)
                     } else {
                        execAsync(["pkill", "hypridle"]).catch(console.error)
                     }
                     return true // we manage visual state via the poll
                  }}
               />
            </box>
   );
}


export function Header() {
   return (
      <box spacing={spacing} class={"header"} hexpand={false}>
         <BatteryIndicator />
         <box hexpand />
      </box>
   );
}

export function Footer() {
   return (
      <box spacing={spacing} class={"footer"} hexpand={false}>
         <VolumeIndicator />
         <BrightnessIndicator />
         <IdleIndicator />
         <box hexpand />
      </box>
   );
}


export function MainPage() {

   return (
      <box
         visible
         $type={"named"}
         name={"main"}
         class={"panel-main-page"}
         orientation={Gtk.Orientation.HORIZONTAL}
         spacing={spacing}
         heightRequest={40}
      >
         <Header />
         <Buttons />
         <Footer />         
      </box>
   );
}
