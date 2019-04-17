---
layout: project
description: Spieglein, Spieglein
lang: de
title: Spieglein, Spieglein
subtitle: Wir bauen einen Magic Mirror
type: publication
colorMode: bright
thumbnail: /projects/magic-mirror/images/thumbnail.jpg
heroImage: /projects/magic-mirror/images/MagicMirror1.jpg
socialMediaImage: /projects/magic-mirror/social_media.jpg
visible: true
featured: false
authors:
  - benjamin-seibel
start: 2018-03-10
end: 2018-03-10
status: finished
date: 2018-03-10
materialsIncluded:
  - name: Source Code
    link: "https://github.com/technologiestiftung/mm-mockup"

redirect_from:
  - /projects/MagicMirror/index.html
---


_Wer hat nicht schonmal beim Zähneputzen über offene Daten nachgedacht? Die Frage, wie öffentliche Daten leichter zugänglich und verständlich gemacht werden können, beschäftigt uns im Lab in verschiedenen Dimensionen. Ein Ansatz sind neue Interfaces, welche die Daten vom Computerbildschirm in den Lebensalltag hinein befördern – zum Beispiel auf den heimischen Badezimmerspiegel._


{% include macro-image-section-markdown.html src="../images/MagicMirror1.jpg" caption="Ist er nicht hübsch geworden?" %}

Das Prinzip eines sogenannten “Magic Mirror“ basiert auf einem Display, das hinter einem halbtransparenten Spiegel angebracht wird. Der Spiegel lässt gerade genug Licht durch, damit das Display selbst unsichtbar wird, während dort angezeigte Informationen auf geradezu zauberhafte Weise im Spiegel erscheinen. Da wir in der Stfitung noch einen ausgemusterten Bildschirm übrig hatten, beschlossen wir im Sinne nachhaltigen Upcyclings selbst so ein Ding zu bauen. Hier ist das Rezept dafür:

Zutaten
-------

*   Bilderrahmen mit Plastik- oder Plexiglasscheibe
*   Halbtransparente Spiegelfolie aus dem Baumarkt
*   Alter LCD-Flachbildschirm, bei dem man das Gehäuse schrotten kann
*   Raspberry Pi (wir haben ein Model 3 benutzt, geht auch mit älteren)
*   HDMI-Kabel
*   Bisschen Styropor, schwarze Pappe und schwarze Sprühfarbe
*   Zum Aufstellen: [Staffelei](https://www.amazon.de/dp/B009ZCA27U/ref=asc_df_B009ZCA27U51779609/?tag=googshopde-21&creative=22410&creativeASIN=B009ZCA27U&linkCode=df0&hvadid=256579404646&hvpos=1o4&hvnetw=g&hvrand=9624166486250892299&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061131&hvtargid=pla-619129793032&th=1&psc=1), wie man sie für Leinwände benutzt

{% include macro-image-section-markdown.html src="../images/MagicMirror2.jpg" caption="Unser Werkstatttisch (3D-Drucker kam nicht zum Einsatz)" %}

Hardware
--------

Hardwareseitig war die größte Herausforderung, die Spiegelfolie blasenfrei auf die Scheibe des Rahmens aufzuziehen. Ich bin in sowas eher schlecht und war entsprechend nervös (“Wir haben nur einen Versuch, Leute!“), Louise und Sebastian haben es schließlich mit Bravour gemeistert. Dafür durfte ich dem Bildschirm mit einem Schraubenzieher zu Leibe rücken und vom lästigen Gehäuse befreien. Hier braucht ihr die richtige Mischung aus Fingerspitzengefühl und roher Gewalt, also genau meine Qualität.


{% include macro-image-section-markdown.html src="../images/IMG8511.jpg" caption="Louise und Sebastian – echte Profis." %}


Aus Pappe und schwarz angesprühtem Styropor haben wir anschließend ein Passepartout gefertigt, um das Display stabil in den Rahmen einzupassen. Die fertige Konstruktion war recht schwer und in unserem Fall nach hinten offen – eine Wandaufhängung schied damit aus, obwohl sie mit etwas Zusatzaufwand auch möglich gewesen wäre. Stattdessen steht der Spiegel jetzt auf einer Staffelei, was den Vorteil hat, dass wir ihn relativ unkompliziert transportieren können.

Software
--------

Softwareseitig haben wir uns zuerst das modulare [Magic Mirror-System](https://magicmirror.builders/) für den Raspi angeschaut. Ein hübsches Open Source-Projekt aus den Niederlanden, das eine ganze Menge Module anbietet, darunter tatsächlich auch ein paar spannende Open Data-Widgets aus Berlin, etwa zu [aktuellen ÖPNV-Abfahrtszeiten.](https://github.com/deg0nz/MMM-PublicTransportBerlin) Auch die Installation war sehr einfach. Leider ließ die Performance am Ende zu wünschen übrig – unser animiertes Logo stotterte und auch der Sekundenzeiger der Digitaluhr bewegte sich eher erratisch.

{% include macro-image-section-markdown.html src="../images/MagicMirror3.jpg" caption="Unsere Magic Mirror-Seite läuft direkt von Github Pages" %}

Letztlich entscheiden wir uns für den bequemeren Weg, einfach eine ganz normale Webseite zu bauen und sie im Raspi-Browser im Vollbild laufen zu lassen. Deutlich performanter, man spart den überflüssigen Ballast eines Frameworks und kann alle gewohnten Web-Tools zur Datenvisualisierung nutzen. So konnten wir auch problemlos zum Beispiel eine Karte mit Feinstaubwerten, aktuelle Nachrichten oder einen Twitter-Feed auf dem Spiegel anzeigen.

{% include macro-image-section-markdown.html src="../images/MagicMirror4.jpg" caption="Der fertige Zauberspiegel" %}

Dafür, dass der Aufwand wirklich überschaubar war, sind wir mit dem Resultat sehr zufrieden. Auf Events ist der Spiegel ein echter Eyecatcher, der auch Menschen erreicht, die sich bislang nicht für Datenvisualisierung interessiert haben. Und für uns ist der Magic Mirror eine prima Plattform für weitere Experimente. In Verbindung mit Gesichtserkennung und Machine Learning etwa dürfte es noch eine Menge Potential auch für komplexere Anwendungen geben. Vielleicht ja sogar fürs Badezimmer. Viel Spaß beim Nachbauen!


