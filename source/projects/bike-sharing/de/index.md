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

In Berlin steht man im Schnitt 154 Stunden im Stau. Damit führt Berlin die Liste als Stau-Hauptstadt an. Es muss nicht mehr die Debatte geführt werden, ob neue Verkehrskonzepte benötigt werden, sondern wie diese aussehen sollten. Letztes Jahr wurde bereits das Mobilitätsgesetz verabschiedet, dass den Weg für umfangreiche Maßnahmen zu einer besseren Fahrradinfrastruktur bereitet. Neben privaten Fahrrädern nehmen immer mehr Leihräder Platz auf Berlins Straßen ein. Seit wenigen Monaten ist Uber mit der Marke _Jump_ der neuste Anbieter. Die Leihfahrräder werden nicht nur positiv aufgenommen, sondern sind auch Anlass für Beschwerden, da Gehwege und Plätze blockiert werden. Nun dürfen seit Ende Mai auch E-Tretroller nach einer hitzigen Debatte von Befürworter\*innen und Gegner\*innen auf deutsche Straßen. Es wird befürchtet, dass unkontrolliert abgestellte E-Scooter die Gehwege pflastern werden.

Anbieter können Fahrräder und Roller ohne Genehmigung in der Stadt abstellen und die Verwaltung hat keine Kontrolle über die Standorte der Räder. Es steckt jedoch ein riesiges Potenzial an Daten für die Stadtplanung und Verkehrssteuerung in diesen Daten. In anderen Städten wird dieses Potenzial besser genutzt, beispielsweise Los Angeles (USA), die mit der Mobility Data Specification (MDS) verpflichtende Standards für Anbieter vorgeben.

### MDS: Mobility Data Specification

MDS definiert zum einen wie Daten der Fahrräder offen bereitgestellt werden müssen, zum anderen werden Städte ermächtigt digital Verbotszonen einzurichten und Auswertungen von historischen Daten zu erhalten. [Hier](https://radforschung.org/log/rollersharing-was-staedte-lernen-koennen/) wird die Spezifikation und deren Nutzen ausführlich erläutert. Zusammengefasst: "Mit der Übernahme des Vorgehens und der Mobility Data Specification aus Los Angeles, erhalten Städte Echtzeit-Einblick auf die ¢[Fahrrad- und] Scootersituation und können verhältnismäßig regulierend eingreifen – eine Reaktion auf Feedback und nötige Infrastukturverbesserungen sind aber auch dringend notwendig. Das bringt uns in der Mobilitätswende wieder ein Stückchen nach vorn."

Einige Fahrradanbieter stellen bereits Datenschnittstellen bereit (APIs), sodass die Standorte der Fahrräder öffentlich verfügbar sind. Für Berlin haben wir uns in einem aktuellen Projekt angeschaut, wie die Datenlage der Fahrradanbieter aussieht. Wir wollen herausfinden, welche Informationen man über die Daten bereits erhalten kann und welchen Nutzen die Mobility Data Specification für Berlin bringen würde.

## Die Kandidaten
Wir haben die sechs Fahrradanbieter, die aktuell in Berlin Fahrräder bereitstellen angeschaut: Nextbike (Deezer), DB Bike (Lidlbike), Donkey Bike, Mobike, Lime Bike und Uber (Jump).

Einzig für Nextbike und DB Bike gibt es offiziell eine API die bereitgestellt wird und dokumentiert ist. Für die anderen Anbieter gibt es eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike) über die es möglich ist die Daten zu erhalten.

Grundsätzlich lässt sich sagen: Jeder Anbieter stellt die Fahrraddaten anders bereit. Das heißt im Umkehrschluss, dass man sich für jeden Anbieter einzeln die API anschauen muss und abwandeln, um sie in eine gemeinsame Darstellung oder Datenbank zu verarbeiten. Allein das bedeutet erstmal ein zeitlicher Mehraufwand.

Jede API birgt dann wieder eigene Probleme und Schwierigkeiten. Hier im Detail:
### Der Musterschüler: Nextbike

{% include macro-image-section-markdown-small.html src="../images/nextbike.jpg" caption="Nextbike Fahrrad" %}

Nextbike (in Berlin Deezer) setzt den Standard GBFS (General Bike Feed Specification) um, der Teil der MDS Spezifikation ist. Diese Spezifikation ist zum einen bereits gut [dokumentiert](https://github.com/NABSA/gbfs/blob/master/gbfs.md) und zum anderen sehr einfach zu benutzen. Ohne zusätzlichen Schlüssel (API Key) können mittels einer Abfrage alle Fahrradstandorte in Berlin abgefragt werden. Die Umsetzung dieser API lief am unkompliziertesten und fehlerfrei.

### Mit API Schlüssel und Paginierung: DB Bike

{% include macro-image-section-markdown-small.html src="../images/lidlbike.jpg" caption="Lidlbike Fahrrad" %}

Für die DB Fahrräder (in Berlin Lidlbike) wird ein API Key benötigt. Dieser kann sehr einfach angefragt werden und stellt grundsätzlich kein Problem dar. Jedoch werden die Daten mit Paginierung zurück gegeben, sodass pro Seite maximal 50 Fahrräder angezeigt werden. Bei ca. 2000 Fahrrädern sind somit 40 Anfragen notwendig. Dies braucht zum einen mehr Zeit, zum anderen überschreitet man damit die maximale Anfrageanzahl von 30 Anfragen pro Minute, wenn man die Standorte aller Fahrräder auf einmal erhalten möchte.
Bei unserem Test sind dabei häufiger Fehlermeldungen unterschiedlicher Art aufgetreten.
Positiv lässt sich die sehr gute Dokumentation anmerken.

### Begrenzter Radius: Mobike

{% include macro-image-section-markdown-small.html src="../images/mobike.jpg" caption="Mobike Fahrräder" %}

Für Mobike konnten wir keine offizielle Dokumentation finden. Ein Nutzer hat eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Mobike.md) bereitgestellt, auf deren Basis wir gearbeitet haben:
Die Schnittstelle von Mobike liefert nur Fahrräder in einem Radius von 500 Metern. Somit haben wir ein Netz von 240 Radiuszentren berechnet, die den Berliner Ring abdecken. Entsprechend sind 240 Abfragen notwendig, um alle Fahrräder zu erhalten. Dies dauert mit ein bis zwei Minuten nicht nur vergleichsweise lang, sondern führt auch immer wieder dazu, dass Fehlermeldungen zurück gegeben werden.

### Komplizierte Validierung und unklare Daten: Lime Bike

{% include macro-image-section-markdown-small.html src="../images/limebike.jpg" caption="Limebike Fahrrad" %}

Für Limebike konnten wir ebenfalls nur eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md). Der Zugang zur API erfolgt über einen komplizierten Login Prozess, bei dem im ersten Schritt ein Code angefordert werden muss, der per SMS zugeschickt wird. Mit diesem Code kann dann im nächsten Schritt einen Token angefordert werden. Zusätzlich zum Token wird ein Websession Cookie benötigt, mit dem man schließlich die Daten erhält. 
Jedoch ist unklar, für welches Gebiet die Daten zurückgegeben werden. Man kann zwar mit zwei Koordinaten eine Bounding Box definieren, jedoch werden auch Fahrräder außerhalb dieser Bounding Box zurückgegeben. Zusätzlich kann eine User Latitude und User Longitude angegeben werden, doch auch hier ist unklar, inwiefern sich dies auf die zurückgegeben Daten auswirkt. Pro Anfrage erhält man maximal Informationen zu 50 Fahrrädern.

### Keine Daten: Donkey Republic Bike

% include macro-image-section-markdown-small.html src="../images/donkey.jpg" caption="Donkey Republic Fahrrad" %}

Für Donkey Republic Bike konnten wir keine API oder andere offenen Daten finden.

#### GBFS - aber wo? Jump

% include macro-image-section-markdown-small.html src="../images/jump.jpg" caption="Jump Fahrrad" %}

Jump stellt seine Daten über den GBFS Standard zur Verfügung. Leider waren die Links zu den API URLs nur für ein paar amerikanische Städte auffindbar. Für Berlin konnten wir diese nicht ausfindig machen - auch eine Anfrage über die Support E-Mail half leider nicht weiter.

## Fazit
Die aktuelle Lage der Datenschnittstellen ist durchwachsen. Nur zwei Anbieter stellen die Daten offiziell öffentlich bereit. Für die anderen Anbieter ist es ein mühsamer Prozess die Daten zu erhalten, möglicherweise sogar nicht gewünscht von den Anbietern. Selbst bei DB Bike, wo eine gute Dokumentation vorliegt müssen Workarounds gefunden werden, wenn man Informationen zu allen Fahrrädern erhalten möchte.
Wie in den zahlreichen Artikeln zu MDS bereits erläutert wurde (beispielsweise von [Radforschung](https://radforschung.org/log/mds-fuer-kommunen-erklaert/), [Zukunft Mobilität](https://www.zukunft-mobilitaet.net/169402/analyse/rollersharing-regulierung-kommunen-international-mobility-data-specification/) oder [Remix](https://blog.remix.com/mds-gbfs-and-how-cities-can-ask-for-data-from-micromobility-providers-7957ca639f16), bietet die einheitliche Bereitstellung der Daten zu Leihfahrrädern und -scootern diverse Vorteile. Hier noch einmal auf einen Blick zusammengefasst: 

- Open Data Bereitstellung der Echtzeitdaten
  - Es können Apps bereitgestellt werden, die alle Anbieter auf einmal anzeigen
  - Echtzeitrückmeldung der vollständigen Mobilitätssituation werden ermöglicht

- Bereitstellung von historische Daten für die Verwaltung
  - Analyse der Daten für bessere Verkehrsplanung und -Steuerung

- Aktives Einwirken in die Verkehrssteuerung durch digitale Parkverbotszonen

- Für Anbieter ist der Vorteil, dass keine eigene Dokumentation geschrieben und gepflegt werden muss

Die bisherige Bereitstellung der Daten bietet nicht annähernd die Analyse und Gestaltungsmöglichkeiten für die Berliner Verwaltung, die durch die MDS gewährleistet wäre. Wie von der Initiative [Radforschung](https://radforschung.org/log/) festgestellt wird, gibt es aktuell keine rechtliche Grundlage mit der Kommunen das Einhalten einer solchen Spezifikation fordern werden kann. Jedoch weisen sie darauf hin, dass das freiwillige Angebot von aktuell auf den Markt strömenden E-Scooter Anbietern wahrgenommen werden sollte, die Daten in entsprechendem Format bereitzustellen. Das ist besonders relevant für Berlin, da nach [dieser Analyse](https://radforschung.org/log/roller-in-die-staedte/) damit zu rechnen ist, dass besonders hier von einigen Anbietern demnächst die E-Scooter auf den Straßen zu finden sein werden.