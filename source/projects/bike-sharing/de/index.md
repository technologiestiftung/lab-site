---
layout: project
description: "In einem aktuellen Projekt wurden die Datenschnittstellen (APIs) der Bike Sharing Anbieter getestet, um Vorteile für die Stadt Berlin von offenen Bike Sharing Daten und einheitlichen Standards zu ermitteln."
lang: de
title: Wie gut sind die offenen Daten von Bike Sharing Anbietern in Berlin?
subtitle: Der Vorteil offener Mobilitätsdaten und einheitlicher Standards für die Stadt
type: publication
colorMode: bright
featuredImage: 
thumbnail: /projects/bike-sharing/images/thumbnail.jpg
heroImage: /projects/bike-sharing/images/hero.jpg
socialMediaImage: /icons/social_media.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-05-15
end: 2019-05-15
status: ongoing
date: 2019-05-15

materialsIncluded:

  - name: Source Code
    link: "https://github.com/technologiestiftung/bike-sharing"



---

Ein\*e durchschnittliche Berliner\*in stand im Jahr 2018 **im Schnitt 154 Stunden im Stau** ([INRIX Stau-Studie](http://inrix.com/scorecard/)). Damit ist Berlin die **Stau-Hauptstadt Deutschlands**. Es braucht daher keine Debatte mehr, ob neue Verkehrskonzepte benötigt werden, sondern wie diese aussehen sollten.  

Ein wichtiger Aspekt urbaner Mobilität ist die **Fahrradinfrastruktur**. Die Stadt verabschiedete im Juli 2018, als ersten Schritt in die richtige Richtung, das [Mobilitätsgesetz](https://www.berlin.de/senuvk/verkehr/mobilitaetsgesetz/), das den Weg für umfangreiche Maßnahmen zu einer besseren Fahrradinfrastruktur bereitet. Unter anderem durch Umgestaltung von wichtigen Knotenpunkten und der Einrichtung sicherer Radverkehrsanlagen an allen Hauptstraßen soll die Anzahl der Schwerverletzten und Verkehrstoten auf ein Minimum reduziert werden (Vision Zero) und der PKW-Verkehr bis 2050 klimaneutral gestaltet sein. 

## Leihfahrräder und E-Scooter in Berlin

Neben privaten Fahrrädern spielen **Leihräder** eine immer wichtigere Rolle auf Berlins Straßen. Inzwischen bieten sechs Anbieter solche Räder in Berlin an, Uber ist mit der Marke _Jump_ der neueste Wettbewerber. **Die Vorteile** liegen auf der Hand: Ohne eigenes Fahrrad kann schnell und einfach eines geliehen werden. Dadurch wird das eigene Auto auch einmal stehen gelassen, lästige Wartung und das Diebstahl-Risiko entfällt. Zusätzlich können multimodale Modelle besser umgesetzt werden: das Leihfahrrad kann für die Fahrt zur nächsten S-Bahn Haltestelle genutzt werden, ohne dass man sich um die weitere Mitnahme des Fahrrads oder das spätere "abholen" kümmern muss, wie bei einem eigenen.

Doch die Leihfahrräder werden nicht nur positiv aufgenommen, sondern sind auch **Anlass für Beschwerden**, da Gehwege und Plätze blockiert werden.

Ähnlich wird es sich auch mit den E-Tretrollern (oder E-Scooter) gestalten, welche nach dem Bundesratsbeschluss von Ende Mai **ab dem 15. Juni auf deutsche Straßen genutzt werden dürfen**. Auch wird befürchtet, dass unkontrolliert abgestellte E-Scooter die Gehwege zupflastern werden.

Für Leihfahrräder wie für E-Scooter gelten die Auflagen, dass sie nicht im Weg stehen dürfen - beispielsweise vor U-Bahn Eingängen oder Fahrstühlen und defekte Fahrzeuge müssen innerhalb 24 Stunden entfernt werden. Die Ordnungsämter der Bezirke sind für die Kontrollen zuständig (siehe dazu [diesen](https://www.gruenderszene.de/automotive-mobility/mobilitaet-jelbi-scooter) und [diesen](https://www.morgenpost.de/berlin/article213750331/Die-Invasion-der-Leihfahrraeder.html) Artikel).

**Doch wie sieht diese Kontrolle aus?** Die mühsame manuelle Arbeit von Ordnungsamtmitarbeiter\*innen ließe sich einfach **automatisieren**, indem die Standortdaten der Fahrzeuge dem Ordnungsamt in Echtzeit und digital zur Verfügung gestellt werden würden. In anderen Städten wird dieses Potenzial genutzt, beispielsweise Los Angeles (USA), die mit der Mobility Data Specification (MDS) verpflichtende Standards für Anbieter vorgeben:

## MDS: Mobility Data Specification

MDS definiert zum einen wie **Daten der Fahrräder offen bereitgestellt** werden müssen, zum anderen werden Städte ermächtigt **Parkverbotszonen digital einzurichten** und Auswertungen von **historischen Daten** zu erhalten. Somit ist dies zusätzlich zur Open Data Thematik eine Möglichkeit der smarten Stadtplanung und -verwaltung. 

[Hier](https://github.com/CityOfLosAngeles/mobility-data-specification) ist die Dokumentation und [hier](https://radforschung.org/log/rollersharing-was-staedte-lernen-koennen/) wird die Spezifikation und deren Nutzen ausführlich erläutert.

In Berlin gibt es bisher keine entsprechenden Vorgaben zur Bereitstellung der Daten. Anbieter können ihre Fahrzeuge ohne Genehmigung auf öffentlichen Straßen bereitstellen.

## Bestehende Datenschnittstellen

Einige Fahrradanbieter stellen bereits Datenschnittstellen bereit (APIs), sodass die Standorte der Fahrräder öffentlich verfügbar sind. Für Berlin haben wir uns in einem **aktuellen Projekt angeschaut, wie die Datenlage der Fahrradanbieter** aussieht. Wir wollen herausfinden, welche Informationen man über die Daten bereits erhalten kann und welchen Nutzen die Mobility Data Specification für Berlin bringen würde.

## Die Anbieter
{% include macro-image-section-markdown-small.html src="../images/all_bikes.png" caption="Ausschnitt aus Berlin mit allen Nextbike (blau), Lidlbike (grün) und Mobike (orange) Positionen." %}

Wir haben die sechs Fahrradanbieter, die aktuell in Berlin Fahrräder bereitstellen angeschaut: Nextbike (Deezer), DB Bike (Lidlbike), Donkey Bike, Mobike, Lime Bike und Uber (Jump).

Einzig für Nextbike und DB Bike gibt es offiziell eine API die bereitgestellt wird und dokumentiert ist. Für die anderen Anbieter gibt es eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike) über die es möglich ist die Daten zu erhalten.

Grundsätzlich lässt sich sagen: Jeder Anbieter stellt die Fahrraddaten anders bereit. Das heißt im Umkehrschluss, dass man sich für jeden Anbieter einzeln die API anschauen und abwandeln muss, um sie in einer gesamten Darstellung oder Analyse zu verarbeiten. Allein das bedeutet erstmal ein zeitlicher Mehraufwand.

Jede API birgt dann wieder eigene Probleme und Schwierigkeiten. Hier im Detail ([Der Code des Projekts findet sich hier](https://github.com/technologiestiftung/bike-sharing)):
### Kategorie 1: Der Musterschüler mit GBFS Standard

Nextbike (in Berlin Deezer) setzt den Standard GBFS (General Bike Feed Specification) um. Diese Spezifikation ist bereits gut [dokumentiert](https://github.com/NABSA/gbfs/blob/master/gbfs.md), sehr einfach zu benutzen und zusätzlich Teil der MDS Spezifikation. Ohne zusätzlichen Schlüssel (API Key) können mittels einer Abfrage alle Fahrrad- und Stationsstandorte in Berlin abgefragt werden. Die Abfrage dieser API lief am unkompliziertesten und fehlerfrei.

### Kategorie 2: Offene Daten nach eigenem Datenschema

Für die DB Fahrräder (in Berlin Lidlbike) wird ein API Key benötigt, der sehr einfach über das [DB API-Portal](https://developer.deutschebahn.com/store/site/pages/home.jag) zu erhalten ist. 
Probleme treten dann auf, wenn man die Daten für ganz Berlin abfragen möchte: die Daten werden mit Paginierung zurück gegeben, sodass pro Seite maximal 50 Fahrräder angezeigt werden. Bei ca. 2000 Fahrrädern sind somit 40 Anfragen notwendig. Damit wird die maximale Anfrageanzahl von 30 Anfragen pro Minute überschritten. Bei unserem Test sind bei der Abfrage häufiger Fehlermeldungen unterschiedlicher Art aufgetreten.
Positiv lässt sich die sehr gute Dokumentation anmerken.

### Kategorie 3: Keine offiziellen offenen Daten

Für Mobike konnten wir keine offizielle Dokumentation finden. Ein Nutzer hat eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Mobike.md) bereitgestellt, auf deren Basis wir gearbeitet haben:
Die Schnittstelle von Mobike liefert nur Fahrräder in einem Radius von 500 Metern. Somit haben wir ein Netz von 240 Radiuszentren berechnet, die den Berliner Ring abdecken. Entsprechend sind 240 Abfragen notwendig, um alle Fahrräder zu erhalten. Dies dauert mit ein bis zwei Minuten nicht nur vergleichsweise lang, sondern führt auch immer wieder dazu, dass Fehlermeldungen zurück gegeben werden.

Für Limebike konnten wir ebenfalls nur eine [inoffizielle Dokumentation](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md) auffinden. Der Zugang zur API erfolgt über einen komplizierten Login Prozess, bei dem im ersten Schritt ein Code angefordert werden muss, der per SMS zugeschickt wird. Mit diesem Code kann dann im nächsten Schritt einen Token angefordert werden. Zusätzlich zum Token wird ein Websession Cookie benötigt, mit dem man schließlich die Daten erhält. 
Das Gebiet, für die man die Daten erhält ist nicht vollständig ersichtlich, das es nicht 100% mit dem gesetzten Parameter der Bounding Box oder der User Latitude / Longitude übereinstimmt. Pro Anfrage erhält man maximal Informationen zu 50 Fahrrädern.

Für Donkey Republic Bike konnten wir keine API oder andere offenen Daten finden.

Jump stellt seine Daten über den GBFS Standard zur Verfügung. Leider waren die Links zu den API URLs nur für einige wenige amerikanische Städte auffindbar. Für Berlin konnten wir diese nicht ausfindig machen - auch eine Anfrage an den Support half leider nicht weiter.

## Fazit
**Die aktuelle Lage der Datenschnittstellen ist durchwachsen**. Nur zwei Anbieter stellen die Daten offiziell öffentlich bereit. Für die anderen Anbieter ist es ein mühsamer Prozess die Daten zu erhalten, möglicherweise sogar nicht gewünscht von den Anbietern. Selbst bei DB Bike, wo eine gute Dokumentation vorliegt müssen Workarounds gefunden werden, wenn man Informationen zu allen Fahrrädern erhalten möchte.
Wie in den zahlreichen Artikeln zu MDS bereits erläutert wurde (beispielsweise von [Radforschung](https://radforschung.org/log/mds-fuer-kommunen-erklaert/), [Zukunft Mobilität](https://www.zukunft-mobilitaet.net/169402/analyse/rollersharing-regulierung-kommunen-international-mobility-data-specification/) oder [Remix](https://blog.remix.com/mds-gbfs-and-how-cities-can-ask-for-data-from-micromobility-providers-7957ca639f16)), bietet d**ie einheitliche Bereitstellung der Daten zu Leihfahrrädern und -scootern diverse Vorteile**. Hier noch einmal auf einen Blick zusammengefasst: 

**Open Data Bereitstellung der Echtzeitdaten:**
Es können Apps bereitgestellt werden, die alle Anbieter auf einmal anzeigen und eine Echtzeitrückmeldung der vollständigen Mobilitätssituation wird ermöglicht.

**Bereitstellung von historische Daten für die Verwaltung:**
Analyse der Daten für bessere Verkehrsplanung und -Steuerung.

**Aktive Verkehrssteuerung:** Die Verwaltung kann kurzfristig digitale Parkverbotszonen errichten, in denen eine Rückgabe von Leihfahrzeugen nicht möglich ist.

**Kein Dokumentationsaufwand für Anbieter:** Für die existierende Spezifikation muss keine eigene Dokumentation erstellt, gepflegt und bereitgestellt werden.

Die bisherige Bereitstellung der Daten bietet nicht annähernd die Analyse und Gestaltungsmöglichkeiten für die Berliner Verwaltung, die durch eine Spezifikation wie MDS gewährleistet wäre. Wie von der Initiative [Radforschung](https://radforschung.org/log/) festgestellt wurde, gibt es aktuell keine rechtliche Grundlage mit der Kommunen das Einhalten einer solchen Spezifikation fordern können. Jedoch weisen sie darauf hin, d**ass das freiwillige Angebot von aktuell auf den Markt strömenden E-Scooter Anbietern wahrgenommen werden sollte, die Daten in entsprechendem Format bereitzustellen**. Das ist besonders relevant für Berlin, da nach [dieser Analyse](https://radforschung.org/log/roller-in-die-staedte/) damit zu rechnen ist, dass besonders hier von einigen Anbietern demnächst die E-Scooter auf den Straßen zu finden sein werden.

Die Umsetzung der Spezifikation bedeutet für die Stadt erstmal **keinen direkten Mehraufwand**, da die Bereitstellung der Daten über die Anbieter erfolgen muss. Die Verwendung der bereitgestellten Daten kann über **existierende Open Source Projekte** wie beispielsweise [Remix](https://www.remix.com/new-mobility) leicht umgesetzt werden. 

Was mit den gewonnen offenen Daten möglich ist, [zeigt beispielsweise die Stadt Austin in Texas, USA](https://medium.com/civiqueso/explore-dockless-data-with-austin-transportation-4a308aa5c18).

Da Fahrrad- und E-Scooter-Anbieter von der kostenfreien Nutzung des öffentlichen Straßenraumes profitieren ist es nur fair, wenn sie ihre Daten wiederum der Stadt zur Verfügung stellen und eine effizientere Planung und Verwaltung des Stadtraums ermöglichen.
Auch die Anbieter profitieren von solchen Regelungen, beispielsweise wie Nextbike, die in [Kooperation mit der Stadt Berlin Fahrrad-Stationen an geeigneten Standorten anbringen](https://www.berliner-zeitung.de/berlin/verkehr/mietfahrraeder-in-berlin-mehr-als-350-nextbike-stationen-warten-noch-auf-genehmigung-32534102).
