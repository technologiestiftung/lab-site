---
layout: project
description: Raspberry Pi, Automation, Hacking & Web Radio
lang: de
title: Automation & Hacking mit dem Raspberry Pi
subtitle: Das neueste Tutorial des Ideation & Protyping Lab beleuchtet die Tiefen der Automatisierung und erklärt "Wie man sein Bluetooth-Radio zum Autoplay Web Radio hackt."
type: publication
colorMode: bright
thumbnail: /projects/webRadio/images/thumbnail_second.jpg
heroImage: /projects/webRadio/images/hero.jpg
socialMediaImage: /projects/webRadio/images/featuredImage.jpg
visible: true
featured: false
authors:
  - julia-zimmermann
start: 2019-11-12
end: 2019-11-20
status: finished
date: 2019-11-20

assets:
  css:
    - ../styles/index.css

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/werkstatt/blob/master/HowTo_WebRadio.md"

redirect_from:
  - /projects/webRadio/index.html

---

*Auch das Ideation & Prototyping Lab möchten im Zeitalter der zunehmenden Automation Schritt halten und hat daher das hauseigene Bluetooth-Radio des [CityLAB Berlin](https://www.citylab-berlin.org/) zum Web Radio transformatiert. Das dabei entstandene Tutorial beschäftigt sich mit dem **Raspberry Pi** (RasPi), dessen **Autostart-Konfiguration** & **Bluetooth Radios**. Wie das Alles zusammenhängt und wie man sich mit Hilfe eines RasPi's ein Autoplay Web Radio hackt, das soll in diesem Artikel beschrieben werden. Das ausführlich Tutorial findet ihr auf [GitHub](https://github.com/technologiestiftung/werkstatt/blob/master/HowTo_WebRadio.md)*.

## Die Idee
In Zeiten der zunehmenden Automation wollten wir einmal mehr hinter die Kulissen blicken und ein bluetooth-fähiges Radio mit Hilfe eines Raspberry Pi 3 und einem **Autostart-Programm** zu einem Autoplay Web Radio hacken. Die Kommunikation vom Laptop zum RasPi erfolgt dabei über SSH - vom RasPi zum Radio über Bluetooth. Die gesamte Konfiguration (Bluetooth, VLC-Mediaplayer Command, Delays etc.) wurde in ein **Shell-Skript** geschrieben, welches schließlich mit der Autostart-Datei des Raspberry's verknüpft wurde. 

## Die Hard- und Software
Hardwareseitig ist dieses Projekt sehr leicht zu realisieren, da man lediglich:
* einen Laptop
* einen Raspberry 3 und
* ein Bluetooth-fähiges Radio

benötigt. Die Anleitung funktioniert natürlich auch mit anderen Einplatinencomputern unter Linux – solange diese ein boardinternes Chipset für die WLAN- und Bluetooth-Funktion verbaut haben.

Damit der Laptop mit dem Raspberry kommunizieren kann, muss zunächst einmal ein Betriebssystem auf den RasPi aufgesetzt werden – in unserem Falle Rasbian. Nach erfolgreicher Installation des Betriebssystems kann mit der Konfiguration des Raspberry's begonnen werden. Je nachdem ob der RasPi headless (via SSH) oder mit head (via Tastatur und Monitor) betrieben werden soll, dient das **Netzwerkprotokoll Secure Shell (SSH) als Kommunikationsschnittstelle** zu unserem RasPi. In unserem Tutorial wurde die headless Inbetriebnahme unter Nutzung von SSH beschrieben und darüber hinaus das kryptografische Verschlüsselungsverfahren der SSH beleuchtet.

{% include macro-image-section-markdown.html src="../images/webRadio_network.jpeg" caption="Schnittstellen zwischen den einzelnen Devices (©eigene Darstellung, Technologiestiftung Berlin) "%}

## RasPi mit dem Radio verbinden
Die meisten von uns verbinden sich tagtäglich via Bluetooth mit anderen Devices – ganz einfach unter Nutzung des Graphic User Interface (GUI) mit Tastatur und Maus. Das ist in der Regel auch schneller, doch in unserem Workshop stellen wir die Verbindung lediglich mit ein paar Terminal-Commands her, denn genau hier liegt die **Magie der Automation**. Speichert man die Commands in einem Shell-Skript und bindet dieses kleine Skript in den Autostart des Raspberrys ein, verbindet sich der Raspberry beim nächsten Hochfahren automagically mit dem Bluetooth-Radio. 

Zum Verbinden mit dem Radio sind einige Befehle notwendig, wobei die angegebene MAC-Adresse des Radios durch die des eigenen Radios ausgetauscht werden muss. Zunächst öffnet man die Bluetooth-Steuerung.
*Hinweis: **$** kennzeichnet einen Befehl; **>** die Rückgabe des Terminals.*

```shell
$ bluetoothctl
> Agent registered
```
Mit diesem Command started eine eigene Bluetooth-Shell **[bluetoothctl]#**. Alle nachfolgenden **$-Commands** sind als [bluetooth]#-Commands zu verstehen.
```
$ power on
> changing power on succeeded

$ default-agent
> Default agent request successful

$ pairable on
> changing pairable on succeeded
```
Wichtiger command, falls man sich erneut(!) mit dem gleichen Gerät verbinden möchte:
```
$ remove 12:34:56:78:9A:BC
> changing pairable on succeeded
```
Als nächstes wird die Umgebung nach Bluetooth-Devices gescannt. An dieser Stelle sollte die MAC-Adresse des eigenen Radios erscheinen.
```
$ scan on
> Discovery started
> [CHG] Device 12:34:56:78:9A:BC 12-34-56-78-9A-BC

$ scan off
> Discovery stopped
```
Sobald das Radio im Scan auftaucht, kann man sich damit pairen. Durch das pairen wird das Radio ist die Liste der bekannten Bluetooth.Devices aufgenommen.
```
$ pair 12:34:56:78:9A:BC
> Attempting to pair with 12:34:56:78:9A:BC
> [CHG] Device 12:34:56:78:9A:BC Connected: yes
> [CHG] Device 12:34:56:78:9A:BC ServicesResolved: yes
> [CHG] Device 12:34:56:78:9A:BC Paired: yes
> Pairing successful
```
Mit dem nachfolgenden Command wird überprüft, ob das Pairing wirklich geklappt hat. Das Radio sollte gelistet werden.
```
$ devices
> Device 12:34:56:78:9A:BC MeinRadioName
```
Damit sich der RasPi automatisch mit dem Radio verbindet, sobald es eingeschaltet wird, ist folgender Command nötig:
```
$ trust 12:34:56:78:9A:BC
> [CHG] Device 12:34:56:78:9A:BC Trusted: yes
> Changing 12:34:56:78:9A:BC trust succeeded
```
Finally: mit dem Radio verbinden.
```
$ connect 12:34:56:78:9A:BC
```

## Web Radio per Autostart abspielen

Damit der Aha-Effekt größer und das Ergebnis hörbar ist, haben wir das Shell-Skript um einen weiteren Command ergänzt. Mit dem Command. *Hinweis: wir befinden uns wieder in der default Shell.*
```shell
$ vlc meinePlaylist.m3u
```
öffnet der bereits vorinstalliert VLC-Mediaplayer die eigens erstellte Playlist "meinePlaylist". Alle darin befindlichen Dateien wie mp3-Dateien oder weitere Playlists, beispielsweise die Playlist eures Lieblings-Web-Radios, werden mit dem Command nacheinander abgespielt. In die Playlist muss demnach lediglich eine URL zum entsprechenden Web-Radiosender hinterlegt werden.

**Last but not least: das Shell-Skript in den Autostart einbinden.** Um ein Programm in den Autostart des Raspberry's einzubinden gibt es verschiedene Möglichkeiten. In unserem Tutorial haben wir eine **.desktop-Datei** erstellt, um unser Skript mit jedem Hochfahren des RasPi's auszuführen. 
```shell
$ sudo geany /etc/xdg/autostart/NameDerDatei.desktop&
```
*Nice To Know: durch das kaufmännische "Und" am Ende des Befehls, könnt ihr das Terminal weiterhin bedienen, obwohl der Texteditor geöffnet ist.*
Die .desktop-Dateien haben eine vorgeschriebene schematische Struktur, die es zu berücksichtigen gilt.
```plain
[Desktop Entry]
Type=Application
Name=irgendeinName
Terminal=false
Exec=/bin/sh /usr/bin/meinSkript.sh
```
Nach dem Attribut "Exec=..." wird der beim Autostart auszuführende Befehl angegeben. Da wir für die Verbindung via Bluetooth und das Abspielen des Web-Radiosenders mehrere Befehle benötigen, verlinken wir an dieser Stelle also zu unserem bereits erstellten Shell Skript "meinSkript.sh".

## Ausblick

Wer jetzt neugierig geworden ist und gerne selber aktiv werden möchte, findet weitere Instruktionen im ausführlichen [Tutorial auf GitHub](https://github.com/technologiestiftung/werkstatt/blob/master/HowTo_WebRadio.md). Darin wird unter anderem erklärt wie:
* die IP des RasPi's abfragt werden kann.
* der RasPi über SSH angesteuert werden kann.
* die .desktop-Autostart-Datei angelegt und abgelegt werden sollte.
* der Audio-Ausgang des Raspberry eingerichtet werden kann.
* uvm.


Wer zu Hause etwas experimentieren möchte, jedoch keinen eigenen RasPi besitzt, der kann sich **RasPis + Zubehör kostenlos via [Hacking Box](https://www.technologiestiftung-berlin.de/hackingbox/) ausleihen.** Darüber hinaus bietet das [CityLAB Berlin](https://www.citylab-berlin.org/) monatlich stattfindende, partizipative Workshops zu Themen wie Internet of Things, Mikrokontroller, Smart Home und Hardware Hacking an. 

Bei Fragen rund um das Thema *RasPi & Web Radio* hilft [Julia Zimmermann](mailto:Zimmermann@technologiestiftung-berlin.de) gerne weiter.