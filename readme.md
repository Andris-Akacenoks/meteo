To run script with systemd:

sudo vim /lib/systemd/system/meteo_script.service

Contents:

[Unit]
Description=Meteo script
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/python /var/www/html/project/src/mytelnet.py
Restart=always

[Install]
WantedBy=multi-user.target

Configure systemd

Now the unit file has been defined we can tell systemd to start it during the boot sequence :

sudo systemctl daemon-reload
sudo systemctl enable myscript.service

Reboot the Pi and your custom service should run :
sudo reboot

Step 4 – Check status of your service
You can check the status of your service using :

sudo systemctl status myscript.service

Source:
https://www.raspberrypi-spy.co.uk/2015/10/how-to-autorun-a-python-script-on-boot-using-systemd/