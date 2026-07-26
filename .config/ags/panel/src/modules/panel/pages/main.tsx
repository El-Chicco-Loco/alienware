import { Gtk } from "ags/gtk4";
import { QSSliders } from "../items/sliders";
import { MprisPlayers } from "../items/media";
import { QSButtons } from "../items/qsbuttons";
import { icons, VolumeIcon, BatteryIcon } from "@/src/lib/icons";
import AstalBattery from "gi://AstalBattery?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import Brightness from "panel/src/services/brightness";
import { createBinding } from "ags";
const wp = AstalWp.get_default();
const speaker = wp.get_default_speaker();
const battery = AstalBattery.get_default();
const brightness = Brightness.get_default();
const spacing = 10;

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
         <box hexpand />
      </box>
   );
}

export function MainPage() {
   return (
      <box
         $type={"named"}
         name={"main"}
         class={"panel-main-page"}
         orientation={Gtk.Orientation.VERTICAL}
         spacing={spacing}
      >
         <Header />
         <QSButtons />
         <Footer />
         <MprisPlayers />
      </box>
   );
}
