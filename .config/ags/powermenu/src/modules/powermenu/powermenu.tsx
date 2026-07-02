import Gtk from "gi://Gtk";
import { icons } from "@/src/lib/icons";
import PowerMenu from "powermenu/src/services/powermenu";
const powermenu = PowerMenu.get_default();

type MenuButtonProps = {
   icon: string;
   label: string;
   clicked: () => void;
};

function MenuButton({ icon, label, clicked }: MenuButtonProps) {
   return (
      <button class={"menubutton"} onClicked={clicked} focusOnClick={false}>
         <box
            orientation={Gtk.Orientation.VERTICAL}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
            spacing={10}
         >
            <image iconName={icon} pixelSize={32} />
            <label label={label} />
         </box>
      </button>
   );
}

const list = ["Sleep", "Logout", "Reboot", "Shutdown"];

export function PowerMenuModule() {

   return (
      <box spacing={10}>
         {list.map((value) => (
            <MenuButton
               icon={icons.powermenu[value.toLowerCase()]}
               label={value}
               clicked={() => powermenu.action(value)}
            />
         ))}
      </box>
   );
}
