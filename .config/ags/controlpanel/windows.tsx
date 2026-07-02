import app from "ags/gtk4/app";
import { createEffect, createState, onCleanup } from "ags";
export const [qs_page, qs_page_set] = createState("main");

export const windows_names = {
  bar: "bar",
  bar_shadow: "barshadow",
  applauncher: "applauncher",
  notifications_popup: "notificationspopup",
  quicksettings: "quicksettings",
  osd: "osd",
  powermenu: "powermenu",
  verification: "verification",
  weather: "weather",
  calendar: "calendar",
  notificationslist: "notificationslist",
  volume: "volume",
  network: "network",
  bluetooth: "bluetooth",
  power: "power",
  clipboard: "clipboard",
};

export function hideWindows() {
  const ignore = [
    windows_names.bar,
    windows_names.bar_shadow,
    windows_names.osd,
  ];

  app
    .get_windows()
    .filter((window) => !ignore.includes(window.name))
    .forEach((w) => {
      app.get_window(w.name)?.hide();
    });
  qs_page_set("main");
}
