---
layout: project
description: "Die Daten von Fahrten mit Bike-Sharing Rädern wurden für einen Zeitraum von 3 Monaten gesammelt und ausgewertet."
lang: de
title: "Leihfahrräder in Berlin: Erste Auswertungen"
subtitle: Welche Erkenntnisse liefern Bike-Sharing-Daten?
type: publication
colorMode: bright
thumbnail: /projects/bike-analysis/images/thumbnail.png
heroImage: /projects/bike-analysis/images/hero.png
socialMediaImage: /projects/bike-analysis/images/social_media.jpg
visible: true
featured: false
authors:
  - alexandra-kapp
start: 2019-04-01
end: 2019-08-22
status: ongoing
date: 2019-08-22
assets:
  js:
    - 'https://d3js.org/d3.v4.min.js'
    - ../js/index.js
    - ../js/linechart.js
    - ../data/start_counts.geojson
    - ../data/ring.geojson
    - ../data/start_at_subway.geojson
    - ../js/map.js
  css:
    - ../styles/index.css
    - ../styles/linechart.css
    - https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
materialsIncluded:
  - name: Source Code
    link: "https://github.com/technologiestiftung/bike-sharing"

---
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
crossorigin=""></script>

_In den letzten Monaten haben wir uns im Lab intensiver mit den [Bike- und Scooter-Sharing-Angeboten Berlins](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/) befasst. Zum einen weil diese Angebote für die Mobilitätswende eine immer wichtigere Rolle spielen, zum anderen aber auch weil sich aus den Daten der Dienstleister interessante Einsichten in das Mobilitätsverhalten der Stadtbevölkerung gewinnen lassen. Unsere Datenanalystin [Alexandra Kapp](https://twitter.com/lxndrkp) hat ein paar hunderttausend Fahrten ausgewertet und zeigt hier erste Ergebnisse aus dem laufenden Projekt._

Mehr als 10.000 Leihfahrräder stehen durch diverse Anbieter auf Berlins Straßen bereit. Für welche Strecken werden die Räder genutzt? Wie hoch ist deren Auslastung? Zu welchen Zeiten werden sie hauptsächlich verwendet? All das sind relevante Fragen für die Stadt.

Wir haben über die letzten dreieinhalb Monate Daten zu drei verschiedenen Anbietern (Nextbike, Lidlbike und Mobike) gesammelt und ausgewertet. 

Die gesamte Anzahl aller vorhandenen Räder im Untersuchungs­zeitraum zeigt die folgende Tabelle:

<div class = 'project-text'>
<table class = 'table'> <tr> <th></th> <th>Gesamt</th><th>Nextbike</th> <th>Lidlbike</th> <th>Mobike</th></tr>
<tr> <td>Fahrräder insgesamt</td> <td>15.375</td><td>2.396</td> <td>3.633</td> <td>9.346</td></tr>
</table>
</div>
Die Daten von Mobike wurden für die weiteren Streckenanalysen entfernt, da diese zu unzuverlässig waren. 

Die weiteren Analysen basieren auf den Daten von Lidlbike und Nextbike.

In den Daten von Nextbike sind keine Fahrräder erfasst, die an Stationen ausgeliehen oder zurückgegeben wurden (lediglich "free-floating" Fahrräder). Somit sind die Auswertungen nur eingeschränkt gültig.

Täglich summieren sich die gefahren Kilometer mit Fahrrädern der beiden Anbieter auf durchschnittlich 8181 km (Median: 8760 km). Mit durchschnittlich 2830 Fahrten à 2,9 km (Median: 2,4 km) pro Tag. Im Median dauert eine Fahrt 30 min (im Durchschnitt 1h 36 min, was für einige Ausreißer mit sehr langen Ausleihzeiten spricht).

## Mobilitätsgewinn oder Touristen-Attraktion?

Unter der Woche starten die meisten Fahrten morgens zwischen 8 und 10 Uhr sowie nachmittags gegen 18 Uhr. Am Wochenende verteilen sich die meisten Fahrten über die Mittagszeit.

<div id= "word_count_linechart" alt="Liniendiagramm mit Anzahlen an schriftlichen Anfragen nach Jahren"></div>
{% include macro-subline-markdown.html caption="Summierte Anzahl an Fahrten nach Tag und Uhrzeit." %}
<p></p>

Vergleicht man diese Ergebnisse mit der [Analyse von Civity](http://scooters.civity.de/) zu E-Scootern zeigen sich deutliche Unterschiede im Nutzungsverhalten:
E-Scooter entsprechen nicht den typischen Berufsverkehr-Mustern: am Wochenende gibt es mehr Fahrten als unter der Woche und unter der Woche gibt es keine Morgen- und Abendpeaks. Diese Muster lassen sich im Gegensatz dazu bei den Leihfahrrädern feststellen.

Dies macht deutlich, dass sich die Nutzergruppen für Bike-Sharing und E-Scooter-Sharing nicht zwangsläufig überschneiden und dass diese beiden Entwicklungen bei der Analyse und sogar der Regulierung möglicherweise getrennt behandelt werden müssen.

## 30% der verfügbaren Fahrräder werden täglich genutzt
An einem Tag werden im Median 30% der Fahrräder auch bewegt. Jedes Fahrrad fährt im Schnitt 1,8 Fahrten pro Tag.

## 15% der Fahrten starten / enden an U-/S-Bahnhaltestellen
Leihfahrräder sollen auch als Transportmittel der "letzten Meile" dienen, d.h. für die letzten Meter zwischen ÖPNV und Start- oder Ankunftsort. Daher ist interessant zu betrachten, wie häufig Fahrräder an U- und S-Bahnhaltestellen ausgeliehen werden.
Ca. 15% der von uns registrierten Fahrten starten in der Nähe (100 m Radius) einer Haltestelle. Besonders viele Fahrten starten am Hauptbahnhof, dem Potsdamer Platz und Bahnhof Zoo.

Die folgende Karte zeigt, von welchen Haltestellen wie häufig Fahrräder ausgeliehen werden.

<div class="map" id= "mapvbb" alt=""></div>
{% include macro-subline-markdown.html caption="Anzahl Fahrten, die an entsprechender Haltestelle beginnen." %}
<p></p>

## Die meisten Fahrten gibt es zu und vom Alexanderplatz
Das Angebot aller Anbieter beschränkt sich auf den Ring. Die meisten Fahrten starten in Mitte und Friedrichshain-Kreuzberg. Der Alexanderplatz und die Oranienburger Straße sind besonders beliebte Startpunkte.

<div class= "map" id= "map" alt=""></div>
{% include macro-subline-markdown.html caption="Anzahl Fahrten, die in entsprechendem Planungsraum starten." %}
<p></p>

Wie in den Daten zu sehen ist, profitieren aktuell Einwohner*innen außerhalb des Rings kaum von den Leihfahrrad-Angebote Berlins. Das "Problem der letzten Meile" ist aber hauptsächlich außerhalb des Rings ein tatsächliches Problem. Plätze mit vielen Leihfahrrädern, wie beispielsweise bestimmte U- oder S-Bahnhöfe, deuten zudem darauf hin, wo dringend zusätzliche Fahrradabstellplätze gebraucht werden.

## Visualisierung 
Eine Visualisierung der einzelnen Fahrten wurde im Rahmen eines [CityLAB](https://www.citylab-berlin.org/) Projekts erstellt und ist [hier](https://bikesharing.citylab-berlin.org/) verfügbar. Die Routen von Lidlbikes und Nextbikes können für einzelne Tage und Uhrzeiten angeschaut werden.

{% include macro-image-section-markdown-link.html src="../images/viz.png" link="https://bikesharing.citylab-berlin.org/" %}

{% include macro-subline-markdown.html caption="Screenshot der Visualisierung einzelner Fahrradrouten." %}

# Datenquellen
Die Datenschnittstellen von Mobike, Lidlbike und Nextbike wurden über im Zeitraum vom 1. April bis 11. Juli alle vier Minuten abgefragt ([Details zur API Abfrage hier](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/)) und die Standorte der Fahrräder abgespeichert. Anhand der Standortdaten zu verfügbaren Daten wurden Start- und Endpunkte einzelner Fahrten abgeleitet. Mithilfe von [OSRM](http://project-osrm.org/) wurde ein Routing für alle Fahrten erstellt. Der Datensatz wurde nach bestem Wissen bereinigt, um Ausreißer und nicht plausible Daten zu entfernen. Dazu gehören Fahrten unter 200 m, Start- und Endpunkte außerhalb von Berlin und Fahrten die schneller als 30 km/h waren. Daraus resultieren knapp 0,6 Millionen Fahrten. Die Daten von Mobike wurden für diese Streckenanalysen entfernt, da diese Daten sehr fehlerbehaftet und nicht plausibel waren. Somit resultieren 300.000 Fahrten von Lidlbike und Nextbike für die drei Monate, auf deren Basis die Analysen erstellt wurden.
Für mehr Details siehe die Jupyter Notebooks [hier](https://github.com/technologiestiftung/bike-sharing/blob/master/README.md).

_Anmerkung: Der Artikel wurde am 25.9.2019 editiert: Die Datengrundlage von nextbike Fahrrädern wurde genauer auf reine "free-floating" Fahrräder spezifiziert._
