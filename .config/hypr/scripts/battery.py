import psutil
import subprocess
import time

def send_notification(percent):
    res = subprocess.run(["notify-send", "-p", f"Battery low: {percent}%", "-u", "critical"], capture_output=True, check=True)
    return res

def close_notification(notif_id: int):
	subprocess.run([
		"dbus-send", "--type=method_call",
		"--dest=org.freedesktop.Notifications",
		"/org/freedesktop/Notifications",
		"org.freedesktop.Notifications.CloseNotification",
		f"uint32:{notif_id}"
	])

def force_sleep():
    subprocess.run(["systemctl", "suspend"], check=True)

while True:
	battery = psutil.sensors_battery()
	percent = int(battery.percent)

	if percent <= 20 and not battery.power_plugged:
		res = send_notification(percent)
		id = int(res.stdout.strip())

		while not psutil.sensors_battery().power_plugged:
			time.sleep(1)

		close_notification(id)
			

	if percent <= 5 and not battery.power_plugged:
		force_sleep()
	
	time.sleep(5) # check every 60 seconds