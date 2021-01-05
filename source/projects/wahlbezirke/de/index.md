---
layout: project
description: Ein digitales Tool der ODIS vereinfacht das notwendige Zuschneiden neuer Wahlbezirke für Verwaltungsbeschäftigte
lang: de
title: Digitaler Prototyp für die Optimierung von Wahlbezirken
subtitle: Ein digitales Tool der ODIS vereinfacht das notwendige Zuschneiden neuer Wahlbezirke für Verwaltungsbeschäftigte aufgrund von Bevölkerungsveränderungen
type: prototype
colorMode: bright
featuredImage: /projects/wahlbezirke/images/featured.jpg
thumbnail: /projects/wahlbezirke/images/thumbnail.png
heroImage: /projects/wahlbezirke/images/hero.png
socialMediaImage: /projects/wahlbezirke/social_media.jpg
visible: true
featured: false
authors:
  - evelyne-brie
start: 2020-02-01
end: 2020-12-18
status: finished
date: 2021-01-11

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/odis-wahlbezirke"

---

## Zielsetzung und Motivation

Das Ziel dieses Projekts ist die Entwicklung eines Open-Source-Prototypen, der den Verwaltungsmitarbeiter\*innen hilft, die Grenzen von Wahlbezirken zwischen den Wahljahren anzupassen. Das Ergebnis ist ein benutzerfreundliches Werkzeug, das algorithmisch optimierte Wahlbezirkskarten für Berlin generiert und evaluiert. Die intuitive Benutzeroberfläche ermöglicht es außerdem, unkompliziert manuelle Modifikationen an den automatisiert generierten Wahlbezirkskarten vorzunehmen. 

Die Motivation für die Entwicklung dieses Werkzeugs liegt in den demographischen Veränderungen, die in Berlin regelmäßig von Jahr zu Jahr zu beobachten sind. Verschiebungen in der Bevölkerung führen zwangsläufig dazu, dass einige Wahlbezirke stärker besiedelt sind als andere. Nach der Berliner Landeswahlordnung soll jeder Wahlbezirk jedoch maximal 2500 Bundesbürger\*innen umfassen. Um auf stattgefundene Bevölkerungsverschiebungen zu reagieren und so der Verordnung nachzukommen, müssen die Grenzen der Wahlbezirke deshalb regelmäßig neu festgelegt werden. Für die zuständigen bezirklichen Verwaltungsmitarbeiter\*innen, kann diese Neufestlegung eine mühsame und zeitaufwendige Aufgabe sein, da es an digitalen Werkzeugen mangelt, die notwendig wären um Teile des Prozesses zu automatisieren. Stattdessen werden die neuen Grenzen in der Regel von Hand gezogen, entweder unter Verwendung eines geografischen Informationssystems oder aber auch mit Stift und Papier. 

Um diesen Prozess für Mitarbeiter\*innen der Stadtverwaltung zukünftig zu vereinfachen, hat die Open Data Informationsstelle ([ODIS](https://odis-berlin.de)) der Technologiestiftung Berlin ein Werkzeug entwickelt, das einzelne Straßenblöcke automatisiert neuen Wahlkreisen zuordnet.

- **[Hier geht's zur interaktiven Webversion des Prototyps.](https://wahlbezirke.odis-berlin.de/)**

Im folgenden Text beschreiben wir näher, welches Vorgehen wir bei der Entwicklung des Tools verfolgt haben (mit Screenshots aus dem Web-Prototyp).

## Entwicklung des Tools

Unser Prototyp wurde bisher mit Daten aus dem Bezirk Tempelhof-Schöneberg getestet, der **123 Wahlbezirke und 1032 bewohnte Straßenblöcke** umfasst. Achtzehn dieser Wahlbezirke überschreiten den Schwellenwert von 2500 Einwohner\*innen. Im Bezirk Tempelhof-Schöneberg beträgt die durchschnittliche Anzahl auf Wahlbezirksebene 2269 Einwohner\*innen.

Die Festlegung neuer Grenzen der Wahlbezirke erfordert die automatische Neuzuordnung einiger Blöcke aus „überfüllten“ Wahlbezirken zu benachbarten Wahlbezirken. Die technische Herausforderung liegt hier darin, dass die Neuzuordnung der Blöcke nicht zufällig erfolgen kann, sondern zu einer möglichst optimalen Wahlkarte führen muss, die eine bestimmte Bevölkerungsschwelle sowie vernünftige Anforderungen an die räumlichen Bedingungen berücksichtigt (z. B. sollte ein Wahlbezirk kompakt und nicht langgezogen sein, so dass Menschen, die am Rand des Bezirks leben, keine weiten Strecke zurücklegen müssen, um ihr zugewiesenes Wahllokal zu erreichen). 

Die Benutzung des Tools und der entsprechende Test für Tempelhof-Schöneberg, lässt sich in 5 Teilschritte untergliedern:

**1)** Zunächst wurden **Daten aus verschiedenen Quellen bereinigt und zusammengeführt**, um dem Algorithmus alle Informationen zur Verfügung zu stellen, die er für die Durchführung der Simulationen benötigt. Der resultierende Datensatz enthält demografische Daten zu den einzelnen Straßenblöcken, die geografischen Informationen der Blöcke, sowie die Nummern der letzten zugehörigen Wahlbezirke zu den Blöcken. Die zugrundliegenden Daten sind als Open Data frei verfügbar, mit Ausnahme der Bevölkerungsdaten für einzelne Stadtblöcke, die aufgrund von Datenschutzbedenken nicht frei veröffentlicht werden können. Anhand der Daten erkennt das Tool, welche Wahlbezirke überbevölkert sind und demzufolge verändert werden müssen.

{% include macro-image-section-markdown.html src="../images/Population-desktop@2x.png" caption="Die Wahlbezirke in Tempelhof-Schöneberg zum Zeitpunkt der letzten Wahl. Wahlbezirke mit mehr als 2.500 Einwohner*innen gelten als 'überbevölkert'." %}

**2)** Im nächsten Schritt wurde der **Algorithmus entwickelt**, der Blöcke in überbevölkerten Wahlbezirken einem angrenzenden Bezirk zuordnet. Die Hauptidee hierbei ist, alternative Wahlbezirkszuordnungen für relevante Blöcke zu identifizieren, wo immer dies möglich ist. Die Methode besteht darin, Blöcke aus überbevölkerten Bezirken in benachbarte Wahlbezirke zu verlagern, die selbst nicht überbevölkert sind. Die folgende Darstellung zeigt die Euklidischen Distanzen (die kürzesten linearen Verbindungen) zwischen jedem Block und seinen Nachbarblöcken, unabhängig von der Wahlbezirkszugehörigkeit. Insgesamt generiert der Algorithmus 10.000 verschiedene Simulationen, durch die Verschiebung von Blöcken in benachbarte Bezirke unter Verwendung der Euklidischen Distanzrn.

{% include macro-image-section-markdown.html src="../images/Network-desktop@2x.png" caption="Der Algorithmus identifiziert alle benachbarten Blöcke jedes einzelnen Straßenblocks. Auf dieser Grundlage kann unsere Anwendung gezielt alternative Wahlbezirke vorschlagen, wenn ein Straßenblock in einem überbevölkerten Wahlbezirk liegt." %}

**3)** Als Nächstes wurden **die neu generierten Wahlkarten der 10.000 Simulationen bewertet**, um die 38 besten Ergebnisse auszuwählen. Dafür wurden folgende Kriterien herangezogen:

  -	Anzahl der neu zugewiesenen Blöcke: Die Anzahl der Blöcke, die ihre Wahlbezirkszugehörigkeit im Vergleich zur ursprünglichen Karte geändert haben.
  -	Anzahl der betroffenen Wahlbezirke: Die Anzahl der Wahlbezirke, in denen ein oder mehrere Blöcke im Vergleich zur Originalkarte entfernt oder hinzugefügt wurden.
  -	Anzahl der überbevölkerten Bezirke: Die Anzahl der Bezirke mit mehr als 2.500 Einwohner\*innen (d.h. Bezirke, die auch nach der algorithmischen Optimierung noch über dem Schwellenwert liegen).
  -	Mittelwert, Median und Minimum Convex Hull Score: Ein Kompaktheitsmaß, das das Verhältnis der Fläche eines Wahlbezirks zur Fläche des minimalen konvexen Polygons, das die Geometrie des Wahlbezirks umschließen kann, umfasst.
  -	Standardabweichung Bevölkerungsgröße: Ein Maß für die Variation der Bevölkerungsgröße über alle Wahlbezirke hinweg.

Die besten generierten Karten wurden entweder anhand (1) ihrer Gesamtleistung aller Kriterien (d. h. wenn sie bei allen Kriterien zu den besten 25 % aller Simulationen gehörten, was 28 Simulationen betraf) oder (2) ihrer Leistung bei einem bestimmten Kriterium (d. h. nach der besten Leistung bei einem einzelnen Indikator, was 10 Simulationen betraf) ausgewählt.

**4)** Anschließend wurde **eine grafische Darstellung der Bewertungen der ausgewählten, besten Simulationen** erstellt, damit Benutzer\*innen des Tools verstehen können, welche Simulationen bei bestimmten Kriterien besonders gut abgeschnitten haben. Mithilfe eines mehrdimensionalen Graphen können die Benutzer die Gesamtleistung bestimmter Simulationen visualisieren und jedem Kriterium manuell unterschiedliche Gewichtungen zuweisen. Anhand dieser Informationen kann die zuständige Person die für sie passendste Simulation als Vorlage für den finalen Schritt auswählen. 

{% include macro-image-section-markdown.html src="../images/Auswahl-desktop@2x.png" caption="In unserer Anwendungen können die 30 besten Simulationen visualisiert und miteinander verglichen werden." %}


**5)** Im letzten Schritt haben wurde **eine interaktive Karte** erstellt, die Änderungen auf Blockebene an der simulierten optimierten Version ermöglicht, die vom Algorithmus erzeugt wurden. Wir wollten, dass unser Tool sowohl hilfreiche automatische Unterstützung bietet als auch dem Benutzer die Möglichkeit gibt, die endgültige Ausgabe selbst zu bestimmen. Durch Klicken auf eine Karte, die die Simulation ihrer Wahl repräsentiert, sind die Benutzer intuitiv in der Lage, die Zuordnung von Blöcken zu verschiedenen benachbarten Bezirken zu verschieben. Damit einhergehend werden sie über die gesamte Bevölkerungsänderung informiert, die sich aus dieser Modifikation ergibt. (Diese interaktive Karte ist im [Online-Prototyp](http://wahlbezirke.odis-berlin.de/) unter dem Reiter "Editor" verfügbar.)


## Zukünftige Schritte

Aktuell stellt ODIS einen webbasierten Prototypen zur Verfügung, der die oben beschriebenen Schritte verfolgt und einen interaktiven Editor anbietet. In diesem webbasierten Prototypen ist es aktuell nicht möglich, eigene Dateien hochzuladen (z.B. eine GeoJSON-Datei mit Einwohnerzahlen und den bestehenden Wahlbezirken) und darauf basierend eigene Simulationen zu generieren. Bisher kann nur mit Simulationen gearbeitet werden, die schon von unserem Algorithmus generiert und in die Web-Anwendung eingepflegt wurden. Wer seine eigenen Daten verarbeiten will, hat die Möglichkeit die Anwendung selbst zu hosten (Quellcode ist auf GitHub verfügbar). So können eigene Daten in die Anwendung eingeladen, Simulationen generiert und anschließend im Editor bearbeitet werden.

Für 2021 plant ODIS Kontakt mit allen bezirklichen Wahlämtern aufzunehmen, um eine mögliche Umsetzung des Tools für ganz Berlin zu evaluieren.
