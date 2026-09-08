import { Gtk } from "ags/gtk4";
import { QSSliders } from "./items/sliders";
import { MprisPlayers } from "./items/media";
import { Buttons } from "./items/buttons";
import { icons, VolumeIcon, BatteryIcon } from "@/src/lib/icons";
import AstalBattery from "gi://AstalBattery?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "panel/src/services/brightness";
import { createBinding, createState, createComputed } from "ags";
import { createPoll } from "ags/time";
import { exec, execAsync } from "ags/process";
const wp = AstalWp.get_default();
const speaker = wp.get_default_speaker();
const battery = AstalBattery.get_default();
const brightness = Brightness.get_default();
const spacing = 10;




import AstalNetwork from "gi://AstalNetwork";
const network = AstalNetwork.get_default();

function BatteryIndicator() {
   return (
      <button
         class={"value-indicator"}
         visible={createBinding(battery, "isPresent")}
         focusOnClick={false}
      >
         <box spacing={0.5*spacing}>
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
         <box spacing={0.5*spacing}>
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
         <box spacing={0.5*spacing}>
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

function TimeIndicator() {
   const time = createPoll("", 1000, `bash -c "date +%H:%M"`);

   return (
      <button
         class={"value-indicator"}
         visible={true}
         focusOnClick={false}
      >
         <box spacing={0.5*spacing}>
            <image iconName={icons.clock} pixelSize={24} />
            <label
               label={time}
               halign={Gtk.Align.START}
               valign={Gtk.Align.CENTER}
            />
         </box>
      </button>
   );
}

function IdleIndicator() {
   const [status, setStatus] = createState(false);

   const idle = createPoll("", 500, async () => {
      try {
         await execAsync(["pgrep", "-x", "hypridle"])
         setStatus(true);
         return "on";
      } catch {
         setStatus(false);
         return "off";
      }
   })

   return (
      <box class={"header"} spacing={spacing}>
         <button
            class={"value-indicator"}
            visible={true}
            focusOnClick={false}
         >
            <box spacing={0.5*spacing}>
               <label
                  label={"idle"}
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
            active={status}
            onNotifyActive={({ state }) => {
               if (state) {
                  execAsync("hypridle").catch(console.error)
               } else {
                  execAsync(["pkill", "hypridle"]).catch(console.error)
               }
               return true
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
      <box spacing={2*spacing} class={"footer"} hexpand={false}>
         <VolumeIndicator />
         <BrightnessIndicator />
         <TimeIndicator />
         <IdleIndicator />
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
