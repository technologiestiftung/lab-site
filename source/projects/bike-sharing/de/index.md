---
layout: project
description: ""
lang: de
title: Bike Sharing Anbieter in Berlin
subtitle: Datenbereitstellung im Test und der Nutzen einheitlicher Standards
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

materialsIncluded:

  - name: Source Code
    link: "#"



---

In Berlin steht man im Schnitt 154 Stunden im Stau. Damit führt Berlin die Liste als Stau-Hauptstadt an. Zusätzlich müssen umweltfreundlichere  Lösungen und damit neue Verkehrskonzepte her. Letztes Jahr wurde bereits das Mobilitätsgesetz verabschiedet, dass den Weg für umfangreiche Maßnahmen zu einer besseren Fahrradinfrastruktur bereitet. Neben privaten Fahrrädern nehmen immer mehr Leihräder Platz Berlins Straßen ein. Dies wird nicht nur positiv aufgenommen, sondern ist immer wieder Anlass für Beschwerden, da Gehwege und Plätze blockiert werden. Nun sind auch E-Tretroller ein aktuelles Thema, was die Debatte um die Platzverteilung auf Berlins Straßen erneut befeuert. 

Anbieter können Fahrräder und Roller ohne Genehmigung in der Stadt abstellen und die Verwaltung hat keine Kontrolle über die Standorte der Räder. Daher gibt es in einigen Städten, beispielsweise Los Angeles, USA, bereits verpflichtende Standards die eingehalten werden müssen. MDS: Mobility Data Specification - definiert zum einen wie Daten der Fahrräder offen bereitgestellt werden müssen zum anderen werden Städte ermächtigt digital Verbotszonen einzurichten und Auswertungen von historischen Daten zu erhalten. [Hier](https://radforschung.org/log/rollersharing-was-staedte-lernen-koennen/) wird die Spezifikation und deren Nutzen ausführlich erläutert. Zusammengefasst: "Mit der Übernahme des Vorgehens und der Mobility Data Specification aus Los Angeles, erhalten Städte Echtzeit-Einblick auf die Scootersituation und können verhältnismäßig regulierend eingreifen – eine Reaktion auf Feedback und nötige Infrastukturverbesserungen sind aber auch dringend notwendig. Das bringt uns in der Mobilitätswende wieder ein Stückchen nach vorn."

Einige Fahrradanbieter stellen bereits Datenschnittstellen bereit (APIs), sodass die Standorte der Fahrräder öffentlich verfügbar sind. Für Berlin haben wir uns nun angeschaut, wie die aktuelle Datenlage der Fahrradanbieter aussieht, um herauszufinden welchen Nutzen die Mobility Data Specification MDS für Berlin bringen würde, oder ob man die aktuellen APIs bereits ausreichen.

## Die Kandidaten
Wir haben die fünf Fahrradanbieter, die aktuell in Berlin Fahrräder bereitstellen angeschaut: DB Bike Nextbike (Deezer), (Lidlbike), Donkey Bike, Mobike und Lime Bike.

Grundsätzlich lässt sich sagen: Jeder Anbieter stellt die Fahrraddaten anders bereit. Das heißt im Umkehrschluss, dass man sich für jeden Anbieter einzeln die API anschauen muss und abwandeln, um sie in eine gemeinsame Darstellung oder Datenbank zu bekommen. Allein das bedeutet erstmal ein zeitlicher Mehraufwand.

Jede API birgt dann wieder eigene Probleme und Schwierigkeiten. Hier im Detail:
### Der Musterschüler: Nextbike

{% include macro-image-section-markdown-small.html src="../images/nextbike.jpg" caption="Nextbike Fahrrad" %}

Nextbike (in Berlin Deezer) setzt mit die GBFS (General Bike Feed Specification)um, die Teil der MDS Spezifikation ist.
Ohne zusätzlichen Schlüssel (API Key) können mittels einer Abfrage alle Fahrradstandorte in Berlin abgefragt werden. Die Umsetzung dieser API lief am unkompliziertesten und fehlerfrei. 

### Mit API Schlüssel und Paginierung: DB Bike

{% include macro-image-section-markdown-small.html src="../images/lidlbike.jpg" caption="Lidlbike Fahrrad" %}

Für die DB Fahrräder (in Berlin Lidlbike) wird ein API Key benötigt. Dieser kann sehr einfach angefragt werden und stellt grundsätzlich kein Problem dar. Jedoch werden die Daten mit Paginierung zurück gegeben, sodass pro Seite maximal 50 Fahrräder angezeigt werden, sodass bei ca. 2000 Fahrrädern 40 Anfragen notwendig sind. Dies braucht zum einen mehr Zeit, zum anderen erreicht man damit die maximale Anfrageanzahl von 30 Anfragen pro Minute, wenn man die Standorte aller Fahrräder auf einmal erhalten möchte.
Bei unserem Test sind immer wieder Fehlermeldungen unterschiedlicher Art aufgetreten.
Positiv lässt sich die sehr gute Dokumentation anmerken.

### Begrenzter Radius: Mobike

{% include macro-image-section-markdown-small.html src="../images/mobike.jpg" caption="Mobike Fahrräder" %}

Für Mobike konnten wir keine offizielle Dokumentation finden. Ein anderer Nutzer hat eine [knappe Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Mobike.md) bereitgestellt, auf deren Basis wir gearbeitet haben:
Die Schnittstelle von Mobike liefert nur Fahrräder in einem Radius von 500 Metern. Somit haben wir ein Netz von 240 Radiuszentren berechnet, die den Berliner Ring abdecken. Entsprechend sind 240 Abfragen notwendig, um alle Fahrräder zu erhalten. Dies dauert nicht zum einen relativ lang mit ein bis zwei Minuten, zum anderen werden häufig Fehlermeldungen zurück gegeben.

### Keine Daten: Donkey Republic Bike
Donkey Republic Bike stellt keine API zur Verfügung. 

### Komplizierte Validierung und unklare Daten: Lime Bike

{% include macro-image-section-markdown-small.html src="../images/limebike.jpg" caption="Limebike Fahrrad" %}

Für Limebike konnten wir ebenfalls keine offizielle Dokumentation finden, dafür diese [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md). Der Zugang zur API erfolgt über einen komplizierten Login Prozess, bei dem im ersten Schritt ein Code angefordert werden muss, der per SMS zugeschickt wird. Mit diesem Code kann dann im nächsten Schritt einen Token angefordert werden. Zusätzlich zum Token wird ein Websession Cookie benötigt, mit dem man schließlich die Daten erhält. 
Jedoch ist unklar, für welches Gebiet die Daten zurückgegeben werden. Man kann zwar mit zwei Koordinaten eine Bounding Box definieren, jedoch werden auch Fahrräder außerhalb dieser Bounding Box zurückgegeben. Zusätzlich kann eine User Latitude und User Longitude angegeben werden, doch auch hier ist unklar, inwiefern sich dies auf die zurückgegeben Daten auswirkt. Zusätzlich ist die die Rückgabe auf 50 Fahrräder beschränkt.

## Fazit
Die aktuelle Lage der Datenschnittstellen ist durchwachsen. Nicht alle Anbieter stellen die Daten öffentlich bereit. Es war mühsam für alle Anbieter herauszufinden, wie die Daten bereitgestellt werden, da nicht immer eine gute Dokumentation vorlag. Auch bei guter Dokumentation muss für jeden Anbieter die Abfrage anders gestaltet werden und es müssen Workarounds gefunden werden, wenn man Informationen zu allen Fahrrädern haben möchte.
Somit wäre unserer Meinung nach eine verbindliche Vorgabe eines einheitlichen Standards in Berlin sinnvoll. Es wird damit deutlich einfacher einen Überblick über die Leihfahrräder und Tretroller zu erhalten. Potenzielle zukünftige Vorgaben, wie eingegrenzte Abstellflächen, könnten dadurch einfach umgesetzt und kontrolliert werden. 

Zusätzlich ist der Vorteil für die Anbieter, dass keine Dokumentation geschrieben und gepflegt werden muss, sondern auf den offiziellen Standard verwiesen werden kann.

# TODO: rechtliche Lage
