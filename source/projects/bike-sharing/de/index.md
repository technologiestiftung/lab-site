---
layout: project
description: ""
lang: de
title: Bike Sharing Anbieter in Berlin
subtitle: API Test und der Sinn einheitlicher Standards
type: publication
colorMode: bright
featuredImage: /projects/bike-sharing/images/featured.jpg
thumbnail: /projects/bike-sharing/images/thumbnail.jpg
heroImage: /projects/bike-sharing/images/hero.jpg
socialMediaImage: /icons/social_media.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-04-08
end: 2019-04-08
status: ongoing
date: 2019-04-08
assets:
  js:
    - ../js/index.js
  css:
    - ../css/index.css
materialsIncluded:
  - name: images
    link: "#"
  - name: video
    link: "#"
  - name: press text
    link: "#"
  - name: Source Code
    link: "#"
redirect_from:
  - /projects/123456789/
  - /old-site-path/my-amazing-post/

---

Fahrräder sind entscheidend in der Debatte um neue Verkehrskonzepte in der Stadt. Leihfahrrad-Anbieter sprießen seit Jahren aus dem Boden. Jetzt sind E-Tretroller ein weiteres heißes Thema. Immer mehr Leihräder nehmen Platz auf Berlins Straßen ein. Dies wird nicht nur positiv aufgenommen, sondern ist immer wieder Anlass für Beschwerden. Anbieter können Fahrräder und Roller ohne Genehmigung in der Stadt abstellen und die Verwaltung hat keine Kontrolle über die Standorte der Räder. Daher gibt es in einigen Städten, beispielsweise Los Angeles, USA, bereits verpflichtende Standards die eingehalten werden müssen. MDS: Mobility Data Specification - definiert wie Daten der Fahrräder offen bereitgestellt werden müssen. [Hier](https://www.zukunft-mobilitaet.net/169402/analyse/rollersharing-regulierung-kommunen-international-mobility-data-specification/) wird die Spezifikation und deren Nutzen ausführlich erläutert. "**tl;dr**: Mit der Übernahme des Vorgehens und der Mobility Data Specification aus Los Angeles, erhalten Städte Echtzeit-Einblick auf die Scootersituation und können verhältnismäßig regulierend eingreifen – eine Reaktion auf Feedback und nötige Infrastukturverbesserungen sind aber auch dringend notwendig. Das bringt uns in der Mobilitätswende wieder ein Stückchen nach vorn."

Die Fahrradanbieter stellen bereits Datenschnittstellen bereit (APIs), sodass die Standorte der Fahrräder öffentlich verfügbar sind. Für Berlin haben wir uns nun angeschaut, wie die aktuelle Datenlage der Fahrradanbieter aussieht, um herauszufinden welchen Nutzen die Mobility Data Specification MDS für Berlin bringen würde, oder ob man über aktuelle APIs bereits die gleiche Information erhalten kann.

## Die Kandidaten
Dafür haben wir die Fahrradanbieter DB Bike (Lidlbike), Nextbike (Deezer), Mobike und Lime Bike angeschaut.

Grundsätzlich lässt sich sagen: Jeder Anbieter stellt die Fahrraddaten anders bereit. Das heißt im Umkehrschluss, dass man sich für jeden Anbieter einzeln die API anschauen muss und abwandeln, um sie in eine gemeinsame Darstellung oder Datenbank zu bekommen. Allein das bedeutet erstmal ein zeitlicher Mehraufwand.

Jede API birgt dann wieder eigene Probleme und Schwierigkeiten.
### Der Musterschüler: Nextbike
Nextbike (in Berlin Deezer) setzt mit die GBFS (General Bike Feed Specification). die MDS baut wiederum auf GBFS auf.
Ohne zusätzlichen Schlüssel (API Key) können mittels einer Abfrage alle Fahrradstandorte in Berlin abgefragt werden. Die Umsetzung dieser API lief am unkompliziertesten und ohne fehlerfrei. 

### Mit Schlüssel und Paginierung: DB Bike
Für die DB Fahrräder (in Berlin Lidlbike) wird ein API Key benötigt. Dieser kann sehr einfach angefragt werden und stellt grundsätzlich kein Problem dar. Jedoch werden pro Anfrage maximal 50 Fahrräder zurück gegeben, sodass bei ca. 2000 Fahrrädern 40 Anfragen notwendig sind. Dies braucht zum einen mehr Zeit, zum anderen erreicht man damit die maximale Anfrageanzahl von 30 Anfragen pro Minute, wenn man die Standorte aller Fahrräder auf einmal erhalten möchte.
Bei unserem Test sind immer wieder Fehlermeldungen unterschiedlicher Art aufgetreten.
Dafür ist die API sehr gut dokumentiert.

### Begrenzter Radius: Mobike
Für Mobike konnten wir keine offizielle Dokumentation finden. Ein anderer Nutzer hat eine knappe Dokumentation bereitgestellt, auf deren Basis wir gearbeitet haben:
Die Schnittstelle von Mobike liefert nur Fahrräder in einem Radius von 500 Metern. Somit haben wir ein Netz von 240 Radiuszentren berechnet, die den Berliner Ring abdecken. Entsprechend sind 240 Abfragen notwendig, um alle Fahrräder zu erhalten. Dies dauert nicht nur ein bis zwei Minuten, sondern wirft auch häufig Fehler.

### Keine Daten: Donkey Republic Bike
Donkey Republic Bike stellt keine API zur Verfügung. 

### ? Lime Bike

## Fazit
Die aktuelle Lage der Datenschnittstellen ist durchwachsen. Nicht alle Anbieter stellen die Daten öffentlich bereit. Es war mühsam für alle Anbieter herauszufinden, wie die Daten bereitgestellt werden, da nicht immer eine gute Dokumentation vorlag. Auch bei guter Dokumentation muss für jeden Anbieter die Abfrage anders gestaltet werden und es müssen Workarounds gefunden werden, wenn man Informationen zu allen Fahrrädern haben möchte.
Somit wäre unserer Meinung nach eine verbindliche Vorgabe eines einheitlichen Standards in Berlin sinnvoll. Es wird damit deutlich einfacher einen Überblick über die Leihfahrräder und Tretroller zu erhalten. Potenzielle zukünftige Vorgaben, wie eingegrenzte Abstellflächen, könnten dadurch einfach umgesetzt und kontrolliert werden. 

Zusätzlich ist der Vorteil für die Anbieter, dass keine Dokumentation geschrieben und gepflegt werden muss, sondern auf den offiziellen Standard verwiesen werden kann.

# TODO: rechtliche Lage
