import app from "ags/gtk4/app";
import { Astal, Gtk } from "ags/gtk4";

type PopupProps = JSX.IntrinsicElements["window"] & {
   children?: any;
   name: string;
   width?: number;
   height?: number;
   margin?: number;
};

/**
 * Layer-shell popup that is visible as soon as it is created.
 *
 * Pass `visible={false}` to start hidden, then control it later with
 * `app.get_window(name)?.show()` / `.hide()`.
 */
export function Popup({
   children,
   name,
   width,
   height,
   margin = 0,
   visible = true,
   anchor = Astal.WindowAnchor.TOP,
   halign = Gtk.Align.CENTER,
   valign = Gtk.Align.TOP,
   ...props
}: PopupProps) {
   return (
      <window
         {...props}
         name={name}
         namespace={name}
         class={name}
         application={app}
         visible={visible}
         layer={Astal.Layer.OVERLAY}
         keymode={Astal.Keymode.ON_DEMAND}
         exclusivity={Astal.Exclusivity.IGNORE}
         anchor={anchor}
         halign={halign}
         valign={valign}
         widthRequest={width}
         heightRequest={height}
         margin_top={margin}
         margin_bottom={margin}
         margin_start={margin}
         margin_end={margin}
      >
         <box class={name}>{children}</box>
      </window>
   );
}
