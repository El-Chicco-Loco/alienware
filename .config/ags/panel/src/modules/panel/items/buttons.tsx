import { getNetworkIconBinding, icons, VolumeIcon } from "@/src/lib/icons";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import AstalBluetooth from "gi://AstalBluetooth?version=0.1";
import AstalPowerProfiles from "gi://AstalPowerProfiles?version=0.1";
import AstalWp from "gi://AstalWp?version=0.1";
import { createBinding, createComputed, createState, For } from "ags";
import app from "ags/gtk4/app";
import { resetCss } from "@/src/services/styles";
import { Button } from "@/src/widgets/button";
import { config, theme } from "@/options";
import { timeout } from "ags/time";
import Adw from "gi://Adw?version=1";
import { dependencies } from "@/src/lib/utils";
// import { qs_page, qs_page_set } from "../../../windows/panel";
import { qs_page, qs_page_set } from "@/request";
import { profiles_names } from "../../power/power";
import Weather from "@/src/services/weather";
import AstalNotifd from "gi://AstalNotifd?version=0.1";
import { FunctionsList } from "@/src/widgets/baritem";
import { toggleWindow } from "@/src/lib/utils";
const network = AstalNetwork.get_default();
const bluetooth = AstalBluetooth.get_default();
const powerprofile = AstalPowerProfiles.get_default();
const wp = AstalWp.get_default();
const notifd = AstalNotifd.get_default();


/* function VolumeButton() {
   const speaker = wp.get_default_speaker();
   const mute = createBinding(speaker, "mute");
   const volume = createBinding(speaker, "volume");
   const level = createComputed(() => {
      if (mute()) return "";
      else return `${Math.floor(volume() * 100)}%`;
   });

   return (
      <Button
         icon={VolumeIcon}
         label={"Volume"}
         subtitle={level((level) => (level !== "" ? level : "None"))}
         onClicked={() => speaker.set_mute(!speaker.get_mute())}
         onArrowClicked={() => qs_page_set("volume")}
         arrow={"separate"}
         ArrowClasses={mute((p) => {
            const classes = ["arrow"];
            !p && classes.push("active");
            return classes;
         })}
         ButtonClasses={mute((p) => {
            const classes = ["qs-button-box-arrow"];
            !p && classes.push("active");
            return classes;
         })}
      />
   );
}

function MicrophoneButton() {
   const microphone = wp.get_default_microphone();
   const mute = createBinding(microphone, "mute");
   const volume = createBinding(microphone, "volume");
   const level = createComputed(() => {
      if (mute()) return "";
      else return `${Math.floor(volume() * 100)}%`;
   });

   return (
      <Button
         icon={icons.microphone.default}
         label={"Microphone"}
         subtitle={level((level) => (level !== "" ? level : "None"))}
         onClicked={() => microphone.set_mute(!microphone.get_mute())}
         onArrowClicked={() => qs_page_set("volume")}
         arrow={"separate"}
         ArrowClasses={mute((p) => {
            const classes = ["arrow"];
            !p && classes.push("active");
            return classes;
         })}
         ButtonClasses={mute((p) => {
            const classes = ["qs-button-box-arrow"];
            !p && classes.push("active");
            return classes;
         })}
      />
   );
}

function PowerProfilesButton() {
   const activeprofile = createBinding(powerprofile, "activeProfile");

   return (
      <Button
         icon={activeprofile((profile) => icons.powerprofiles[profile])}
         label={"Power"}
         subtitle={activeprofile((profile) => profiles_names[profile])}
         arrow={"separate"}
         onClicked={() => {
            const active = activeprofile.peek();
            const set =
               active === "performance" || active === "power-saver"
                  ? "balanced"
                  : "performance";
            powerprofile.set_active_profile(set);
         }}
         onArrowClicked={() => qs_page_set("power")}
         ArrowClasses={activeprofile((profile) => {
            const classes = ["arrow"];
            if (profile == "performance" || profile == "power-saver") {
               classes.push("active");
            }
            return classes;
         })}
         ButtonClasses={activeprofile((profile) => {
            const classes = ["qs-button-box-arrow"];
            if (profile == "performance" || profile == "power-saver") {
               classes.push("active");
            }
            return classes;
         })}
      />
   );
} */

function InternetButton() {
   const wifi = network.wifi;
   const wired = network.wired;
   const connectivity = createBinding(network, "connectivity");
   const primary = createBinding(network, "primary");
   const enabled = createBinding(wifi, "enabled");

   const active = createComputed(() => {
      connectivity();
      if (
         primary() === AstalNetwork.Primary.WIRED &&
         network.wired.internet === AstalNetwork.Internet.CONNECTED
      )
         return true;
      if (wifi !== null) return enabled();
   });

   const subtitle = createComputed(() => {
      connectivity();
      if (primary() === AstalNetwork.Primary.WIRED) {
         if (wired.internet === AstalNetwork.Internet.CONNECTED) {
            return "Wired";
         }
      }
      if (primary() === AstalNetwork.Primary.WIFI) {
         return wifi.ssid;
      }
      return "";
   });

   return (
      <Button
         icon={getNetworkIconBinding()}
         label={subtitle((text) => (text !== "" ? text : "Network"))}
         onClicked={() => {
            if (
               network.primary === AstalNetwork.Primary.WIFI ||
               network.primary === AstalNetwork.Primary.UNKNOWN
            ) {
               wifi.set_enabled(!wifi.enabled);
            }
         }}
         onArrowClicked={() => {
            wifi.scan();
            qs_page_set("network");
            app.get_window("network").show();
            app.get_window("main").hide();
         }}
         arrow={network.wifi !== null ? "separate" : "none"}
         ArrowClasses={active((p) => {
            const classes = ["arrow"];
            p && classes.push("active");
            return classes;
         })}
         ButtonClasses={active((p) => {
            const classes = ["qs-button-box-arrow"];
            p && classes.push("active");
            return classes;
         })}
      />
   );
}

function BluetoothButton() {
   const powered = createBinding(bluetooth, "isPowered");
   const connected = createBinding(bluetooth, "isConnected");
   const devices = createBinding(bluetooth, "devices");
   // const connDevices = createBinding(bluetooth, "connectedDevices");
   const device = createComputed(
      () => (devices().filter((device) => (device.connected==true))),
   );

   // device((d) => (d.length>0 ? `${d.length} device${d.length>1 ? "s" : ""} paired` : "Bluetooth"))
   
   // console.log('---------------------------------');
   // console.log(bluetooth.devices);
// 
   // const label = createComputed(() => bluetooth.devices.filter((device) => (device.connected==true)).length);
// 
// 
   function watchDevice(device: Bluetooth.Device) {
      device.connect("notify::connected", () => {
         if (device.connected) {
               print(`${device.name} connected`);
               setLabel(`${bluetooth.devices.filter((device) => (device.connected==true)).length} devices`);
         } else {
               print(`${device.name} disconnected`);
               setLabel(`${bluetooth.devices.filter((device) => (device.connected==true)).length} devices`);
         }
      })
   }

   // watch devices already known at startup
   for (const device of bluetooth.get_devices()) {
      watchDevice(device)
   }

   bluetooth.connect("device-added", (_bt, device) => {
      watchDevice(device)
   })


   const [label, setLabel] = createState("boo");

   bluetooth.connect("device-added", (_bt, device) => {
      console.log(`${bluetooth.devices.filter((device) => (device.connected==true)).length} devices`);
      setLabel(`${bluetooth.devices.filter((device) => (device.connected==true)).length} devices`);
   })

   return (
      <Button
         icon={icons.bluetooth}
         label={label
         }
         arrow={"separate"}
         onClicked={() => bluetooth.toggle()}
         onArrowClicked={() => {
            qs_page_set("bluetooth");
            app.get_window("bluetooth").show();
            app.get_window("main").hide();
         }}
         ArrowClasses={powered((p) => {
            const classes = ["arrow"];
            p && classes.push("active");
            return classes;
         })}
         ButtonClasses={powered((p) => {
            const classes = ["qs-button-box-arrow"];
            p && classes.push("active");
            return classes;
         })}
      />
   );
}

export function Buttons() {

   return (
      <Adw.WrapBox
         class={"qs-buttons"}
         child_spacing={theme.spacing}
         lineSpacing={theme.spacing}
         widthRequest={440 - theme.window.padding * 2}
         heightRequest={40}
         naturalLineLength={440 - theme.window.padding * 2}
      >
         <InternetButton />
         <BluetoothButton />
      </Adw.WrapBox>
   );
}
