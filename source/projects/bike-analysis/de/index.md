---
layout: project
description: ""
lang: de
title: Wie bewegt sich Berlin?
subtitle: Welche Informationen Bike-Sharing Daten liefern
type: publication
colorMode: bright
featuredImage: /projects/bike-analysis/images/featured.jpg
thumbnail: /projects/bike-analysis/images/thumbnail.jpg
heroImage: /projects/bike-analysis/images/hero.jpg
socialMediaImage: /assets/images/social_media.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-07-10
end: 2019-07-10
status: ongoing
date: 2019-07-10
assets:
  js:
    - ../js/index.js
    - ../js/linechart.js
    - ../data/start_counts.geojson
    - ../js/map.js
    - 'https://d3js.org/d3.v4.min.js'
  css:
    - ../styles/index.css
    - https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
materialsIncluded:
  - name: Source Code
    link: "#"

---
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
crossorigin=""></script>

Mehr als 10.000 Leihfahrräder stehen auf Berlins Straßen bereit. Für welche Strecken werden die Räder genutzt? Wie hoch ist deren Auslastung? Zu welchen Zeiten werden sie hauptsächlich verwendet? All das sind relevante Fragen für die Stadt Berlin.

Wir haben über drei Monate Daten zu drei verschiedenen Anbietern gesammelt und ausgewertet.

Über den gesamten Erhebungszeitraum wurden knapp 15.000 Fahrräder erfasst. Nicht alle Fahrräder sind immer verfügbar - wahrscheinlich für Wartungen o.ä., sodass täglich um die 8.000 Fahrräder bereit stehen. Die Daten von Mobike wurden für diese Streckenanalysen entfernt, da diese Daten nicht plausibel waren. Die weiteren Analysen basieren auf den Daten von Lidlbike und Nextbike (ca. 4000 täglich verfügbare Fahrräder).

<div class = 'project-text'>
<table class = 'table'> <tr> <th></th> <th>Gesamt</th><th>Nextbike</th> <th>Lidlbike</th> <th>Mobike</th></tr> 
<tr> <td>Median</td> <td>xx</td><td>xx</td> <td>xx</td> <td>xx</td> </tr> 
<tr> <td>Max.</td> <td>xx</td><td>xx</td> <td>xx</td> <td>xx</td></tr> 
<tr> <td>Gesamter Zeitraum</td> <td>xx</td><td>xx</td> <td>xx</td> <td>xx</td></tr> 
</table>
</div>

## Täglich werden 8181 km gefahren

Täglich summieren sich dich gefahren Kilometer auf durchschnittlich 8181 km (Median: 8760 km). Mit durchschnittlich 2830 Fahrten à 2,9 km (Median: 2,4 km) pro Tag. Im Median dauert eine Fahrt 24 min (im Durchschnitt 1h 40 min, was für einige Ausreißer mit sehr langen Ausleihzeiten spricht).

-- Histrogramm mit gefahrenen Streckenlängen

## Mobilitätsgewinn oder Touristen-Attraktion?

Unter der Woche starten die meisten Fahrten morgens zwischen 8 und 10 Uhr sowie nachmittags gegen 18 Uhr. Am Wochenende verteilen sich die meisten Fahrten über die Mittagszeit.

<div id= "word_count_linechart" alt="Liniendiagramm mit Anzahlen an schriftlichen Anfragen nach Jahren"></div>

Vergleicht man diese Ergebnisse mit der [Analyse von Civity](http://scooters.civity.de/) zu E-Scootern zeigen sich deutliche Unterschiede im Nutzungsverhalten: 
E-Scooter entsprechen nicht den typischen Berufsverkehr-Mustern: am Wochenende gibt es mehr Fahrten als unter der Woche und unter der Woche gibt es keine Morgen- und Abendpeaks. Diese Muster lassen sich im Gegensatz dazu bei den Leihfahrrädern feststellen. 
Zusätzlich werden die Leihfahrräder für längere Strecken ausgeliehen (2,9 km vs. 1,9 km).

## 45% der verfügbaren Fahrräder werden täglich genutzt

45% der Fahrräder werden auch an einem Tag gefahren. Die durchschnittliche Auslastung liegt bei 3 %. Jedoch ist die Auslastung von Nextbike grundsätzlich wesentlich höher (16%), als die von Lidlbike. Da die Ausleihzeiten hier häufig mehrere Stunden sind, deutet dies entweder auf Probleme bei der Rückgabe, oder dauerhaftes umstellen der Fahrräder (bspw. an die Stationen) durch den Betreiber.
Jedes Fahrrad fährt im Schnitt 1,8 Fahrten pro Tag.

## 14% der Fahrten starten / enden an U-/S-Bahnhaltestellen

## Die meisten Fahrten gibt es zu und vom Alexanderplatz
Das Angebot aller Anbieter beschränkt sich auf den Ring. Die meisten Fahrten starten in Mitte und Friedrichshain-Kreuzberg. Besonders am Alexanderplatz und an der Oranienburgerstr. starten die meisten Fahrten.
  
<div id= "map" alt=""></div>

## Zunehmende Fahrten mit besserem Wetter
Im Mai nehmen die Fahrten stetig zu. Ende Juni (Sommerferienbeginn) sinken die Fahrtzahlen erneut.

-- Linechart Anzahl Fahrten nach Tagen

# Datenursprung
Die Datenschnittstellen von Mobike, Lidlbike und Nextbike wurden über drei Monate alle vier Minuten abgefragt ((Details zur API Abfrage hier)[https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/])) und die Standorte der Fahrräder abgespeichert. Der Datensatz wurde nach bestem Wissen bereinigt, um Ausreißer und nicht plausible Daten zu entfernen. Dazu gehören Fahrten unter 100 m, Start- und Endpunkte außerhalb von Berlin und Fahrten die schneller als 30 km/h waren. Daraus resultieren knapp 0,6 Millionen Fahrten. Die Start- und Endpunkte wurden mit dem Open Source Routing von OSRM gerouted, um wahrscheinliche Streckenverläufe und Distanzen zu erhalten. Die Daten von Mobike wurden für diese Streckenanalysen entfernt, da diese Daten 
sehr fehlerbehaftet und nicht plausibel waren. Somit resultieren 300.000 Fahrten von Lidlbike und Nextbike für die drei Monate, auf deren Basis die Analysen erstellt wurden.
Für mehr Details siehe das Jupyter Notebook (hier)[https://github.com/technologiestiftung/bike-sharing/blob/master/src/analysis/analysis.ipynb].