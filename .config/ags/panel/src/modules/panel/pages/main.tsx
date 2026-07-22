import { Gtk } from "ags/gtk4";
import { QSSliders } from "../items/sliders";
import { MprisPlayers } from "../items/media";
import { QSButtons } from "../items/qsbuttons";
import { BatteryIcon } from "@/src/lib/icons";
import AstalBattery from "gi://AstalBattery?version=0.1";
import { createBinding } from "ags";
const battery = AstalBattery.get_default();
const spacing = 10;

function Battery() {
   return (
      <button
         cssClasses={["qs-header-button", "battery-button"]}
         visible={createBinding(battery, "isPresent")}
         focusOnClick={false}
      >
         <box spacing={spacing}>
            <image iconName={BatteryIcon} pixelSize={24} />
            <label
               label={createBinding(battery, "percentage").as(
                  (p) => `${Math.floor(p * 100)}%`,
               )}
            />
         </box>
      </button>
   );
}

export function Header() {
   return (
      <box spacing={spacing} class={"header"} hexpand={false}>
         <Battery />
         <box hexpand />
      </box>
   );
}

export function MainPage() {
   return (
      <box
         $type={"named"}
         name={"main"}
         class={"qs-main-page"}
         orientation={Gtk.Orientation.HORIZONTAL}
         spacing={spacing}
      >
         <Header />
         <QSButtons />
         <QSSliders />
         <MprisPlayers />
      </box>
   );
}
