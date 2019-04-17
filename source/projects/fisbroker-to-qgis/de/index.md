---
layout: project
description: Eine Anleitung wie man Daten aus dem Berliner Geodatenkatalog FIS-Broker
  herunterzuladen kann.
lang: de
title: "HOW TO: Download aus dem Geodatenportal FIS-Broker"
subtitle: Mit QGIS Daten herunterladen und weiterverwenden
type: publication
colorMode: bright
featuredImage: /projects/fisbroker-to-qgis/images/featured.jpg
thumbnail: /projects/fisbroker-to-qgis/images/thumbnail.jpg
heroImage: /projects/fisbroker-to-qgis/images/hero.jpg
socialMediaImage: /projects/fisbroker-to-qgis/social_media.jpg
visible: true
featured: false
authors:
  - alexandra-kapp
start: 2019-01-20
end: 2019-01-31
status: finished
date: 2019-01-31

redirect_from:
  - /projects/fisbroker-to-qgis/index.html

---

_Der [FIS-Broker](https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/) ist eine wahre Goldgrube wenn es um offene Geodaten aus Berlin geht. Allerdings ist die Datenplattform gerade für Ungeübte nicht ganz einfach zu bedienen. Zumindest erreichen uns bei [ODIS](http://odis-berlin.de) immer wieder Anfragen, wie man an die Datenbestände des Brokers herankommt. Im Folgenden erklärt unsere ODIS-Geodaten-Expertin [Alexandra Kapp](https://twitter.com/lxndrkp), wie ihr die offenen Geodaten des Landes herunterladen und für eigene Zwecke nutzen könnt. Viel Spaß beim Stöbern!_

Der [FIS-Broker](https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/) ist der Geodatenkatalog der Stadt Berlin. Alle öffentlich verfügbaren Daten mit Raumbezug werden hier bereitgestellt, beispielsweise Fahrradwege, Standorte von Schulen oder Wohn- und Grünflächen. Diese werden auf einer Karte visualisiert und Sachdaten werden tabellarisch angezeigt. Häufig besteht jedoch Bedarf, die Daten auch für andere Zwecke weiterzuverarbeiten. Ein Download in gängigen Formaten wie GeoJSON oder CSV ist jedoch nicht möglich, stattdessen findet man lediglich die URL eines WFS-Servers.

Daten mit QGIS downloaden
-------------------------

Es gibt verschiedene Möglichkeiten, Daten eines WFS/WMS Servers herunterzuladen. Programmierer\*innen können mit [mit dem Python Package der OK Labs Berlin](https://github.com/codeforberlin/wfs-downloader) oder [diesem Code für R](https://github.com/patperu/fisbroker_data) die Daten downloaden. Für einen Download ohne Programmierkenntnisse empfehlen wir die Open Source Software [QGIS](https://www.qgis.org/de/site), die [hier](https://www.qgis.org/de/site/forusers/download.html) kostenlos zum Download bereitsteht. In QGIS können die Daten anschließend in eigenen Karten weiterverarbeitet werden oder u.a. als GeoJSON, Shape-File, GML oder CSV exportiert werden.  
  
**Die Schritte im einzelnen:**  
  

Wählt im QGIS-Interface über das Menü _"Layer > Layer hinzufügen"_ oder über die Menüleiste auf der linken Seite _"WFS-Layer hinzufügen"_ aus.

{% include macro-image-section-markdown-small.html src="../images/new_wfs_layer.png" caption="Neues WFS-Layer hinzufügen" %}

Es öffnet sich ein Fenster mit den bestehenden Serververbindungen. Stellt eine neue Serververbindung her.


{% include macro-image-section-markdown-small.html src="../images/neue_verbindung.png" caption="Neue Serververbindung hinzufügen" %}

In dem neu geöffneten Fenster wird die URL des Servers abgefragt. Sucht hierfür im FIS-Broker den Datensatz, den ihr herunterladen möchtet. In diesem Beispiel verwenden wir den Datensatz zu den Standorten der öffentlichen Schulen. Klickt in der rechten Leiste des FIS-Brokers unter _"Datenbereitstellung"_ auf _"zum Downloaddienst (WFS)"_. Hierbei ist es wichtig, den WFS-Link auszuwählen, da über den WMS-Link nur eine Rastergrafik ohne Vektor- und Sachdaten heruntergeladen wird.

{% include macro-image-section-markdown-small.html src="../images/schulen.png" caption="Datensatz im FIS-Broker" %}

Der Link öffnet ein neues Fenster mit den Angaben zum WFS-Server. Hier benötigen wir die _"Rechneradresse"_.

{% include macro-image-section-markdown-small.html src="../images/get_link.png" caption="Download Details im FIS-Broker" %}

Kopiert die Rechneradresse in QGIS in das URL-Feld von _"Verbindungsdetails"_, das sich zuvor geöffnet hatte. Der Name kann nach Belieben gewählt werden, der Rest der Felder wird hier nicht benötigt. Anschließend mit _"OK"_ bestätigen.

{% include macro-image-section-markdown-small.html src="../images/server_benennen.png" caption="Verbindungsdetails angeben" %}

Mit einem Klick auf _"Verbinden"_ wird die Verbindung zum Server hergestellt und der Name des Datensatzes sollte in der Tabelle angezeigt werden. Diesen anklicken und per Buttonklick _"hinzufügen"_.

{% include macro-image-section-markdown-small.html src="../images/verbinden.png" caption="Verbindung zum Server herstellen" %}

Falls der Datensatz nicht direkt angezeigt wird, das Browser-Fenster mit dem Pfeil-Symbol _"aktualisieren"_.

{% include macro-image-section-markdown-small.html src="../images/aktualisieren.png" caption="Browser-Fenster aktualisieren" %}

Anschließend sollte der Layer des Datensatzes im Browserfenster unter _"WFS"_ zu finden sein.

{% include macro-image-section-markdown-small.html src="../images/aktualisiert.png" caption="aktualisiertes Browser-Fenster" %}

Durch Doppelklick oder Drag-and-Drop in das Layerfenster erscheinen die Datenpunkte in der Kartenansicht. In diesem Beispiel sind jetzt alle Schulen Berlins dargestellt. Mit QGIS kann die Darstellung nach Belieben angepasst werden. Beispielsweise kann eine Karte darunter gelegt, die Markierungen der Datenpunkte verändert oder weitere Layer (bspw. Bezirksgrenzen) hinzugefügt werden. Wer mehr wissen will, kann gerne einen Blick in die [ausführlichen Skripte zur Einführung in QGIS](https://drive.google.com/file/d/1EB9rbJBm41Gv8rQ1N7wHTpDcx6Bq5X7W/view) werfen, die Sebastian Meier für unsere ODIS-Workshops erstellt hat.  
  
Um die Sachdaten direkt in QGIS anzuschauen, klickt mit einem Rechtsklick auf den Layer und wählt _"Attributtabelle öffnen"_ aus.

{% include macro-image-section-markdown-small.html src="../images/go_to_table.png" caption="Attributtabelle öffnen" %}

{% include macro-image-section-markdown-small.html src="../images/attributtabelle.png" caption="Attributtabelle" %}

Mit einen Rechtsklick auf den Layer und _"Speichern als..."_ können die Daten des Layers im gewünschtem Format (Shape-File, GeoJSON, GML,CSV etc.) gespeichert werden.

{% include macro-image-section-markdown-small.html src="../images/go_to_save.png" caption="Layer speichern als ..." %}

{% include macro-image-section-markdown-small.html src="../images/save.png" caption="in gewünschtem Format speichern" %}
  