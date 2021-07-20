---
layout: project
description: Eine Webkarte vom Berliner Stadtgebiet, die Temperatur, Wind und Schattenbereiche anzeigt.
lang: de
title: Erfrischungskarte
subtitle: Erfrischungsbereiche in Berlin
type: prototype
colorMode: bright
featuredImage: /projects/erfrischungskarte/images/featured-badewasser.jpg
thumbnail: /projects/erfrischungskarte/images/placeholder.png
heroImage: /projects/erfrischungskarte/images/erfrischungskarte_hero.png
socialMediaImage: /projects/erfrischungskarte/images/placeholder.png
visible: true
featured: true
authors:
  - evelyne-brie
externalUrl: https://erfrischungskarte.odis-berlin.de/
start: 2021-07-01
end: 2021-07-01
status: finished
date: 2021-07-20
redirect_from:
  - /projects/erfrischungskarte/index.html

---

## Worum geht es?

Berlin liegt in einer gemäßigten Klimazone mit Jahreszeitenklima, seine geografische und topgrafische Lage führen zu kühlen bis warmen Sommern und milden Wintern, gleichzeitig aber zu launischen, unbeständigen Wetterlagen. Gerade das Schwitzproblem dürfte in Zukunft ein größeres werden: In den Jahren 1971 – 2000 lag die durchschnittliche Anzahl Sommertage pro Jahr bei 29,1 Tagen, davon waren 5,9 Tage Hitzetage. An Sommertagen steigt die Lufttemperatur auf 25 Grad oder höher, an Hitzetagen auf 30 Grad oder höher. Laut Landesamt für Umwelt Berechnungen steigen diese Zahlen laut Klimawandel in den nächsten Jahren signifikant an. In naher Zukunft gibt es demnach im Schnitt rund 46,2 Sommertage in Berlin, davon 12,8 Hitzetage. Die Region könnte sogar Tage mit mehr als 40 Grad bekommenwas es bisher so nicht gab. Eine derartige Hitze belastet aber den menschlichen Organismus stark, der sich immer auf ungefähr 37 Grad halten muss.

## Wie funktioniert das?

Was kann man machen? Aufgrund der differenzierten Topographie kann es zum Teil erhebliche Unterschiede innerhalb des Stadtgebietes geben. So sind z.B. im Sommer Unterschiede von mehr als 5 °C bei der Tiefsttemperatur zwischen bestimmten Gebieten der Innenstadt und des Stadtrands ohne weiteres möglich und Windgeschwindigkeiten sind statistisch unterschiedlich zu verschiedenen Tageszeiten. Und dass es sich auf einer schattigen Parkbank am See besser sits im Bus weißt man sowieso.

Diese Orte zu finden und Klima in der Stadt besser zu verstehen, dabei hilft die [Erfrischungskarte](https://erfrischungskarte.odis-berlin.de/), eine Webkarte vom Berliner Stadtgebiet, die Temperatur(-verhältnisse), Wind(-verhältnisse) und Schattenbereiche anzeigt. Diese Daten können für jede Stunde des Tages zwischen 10 und 20 Uhr angezeigt werden. Die Karte gibt also Informationen darüber an welchen Orten vergleichsweise höhere oder niedrigere Temperaturen und Windstärken vorherrschen und zu welchen Uhrzeiten wo Schatten und Sonne zu erwarten sind. Mit der Karte werden also unter anderem Bereiche visualisieren, in denen sich die BürgerInnen in Berlin an heißen Tagen erfrischen können. Mit unserer Teilfunktion können NützerInnen auch Ihren Lieblingsbereich teilen.

Es gibt immer mehr Hitzewellen, dennoch waren Informationen über Erfrischungsmöglichkeiten für die Bevölkerung vor unserem Projekt nicht leicht zugänglich. Es gibt zwar Daten und Karten dazu, jedoch nicht in dieser kombinierten, neu klassifizierten und interaktiven Form, wie in unserer Erfrischungskarte. Was sogar komplett neu für Berlin ist, ist die Visualisierung von Schatten über den Tagesverlauf. Diese Informationen kann man nirgendwo anders finden. Die Informationen zu Temperatur und Wind beruhen auf Daten zu Modellierungen von durchschnittlichen Werten, bereitgestellt von der SenSW. Für beide Themen liegen jeweils 2 Datensätze für unterschiedliche Zeitpunkte des Tages vor. Diese Daten interpolieren wir, um Daten für jede Stunde des Tages zu erhalten. Die Schatten berechnen wir aus einem digitalen Geländemodell. Ergänzt wird die Karte durch ‚Points of Interests‘, also die Darstellung von Orten die im Zusammenhang mit den Daten interessant sein könnten, z.B. Spring- und Trinkbrunnen und Parkbänke. Alle zugrundeliegenden Daten sind Open Data.

Dieses Projekt ist eine Kooperation zwischen dem City Lab Berlin und der Open Data Informationsstelle (ODIS).