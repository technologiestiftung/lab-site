---
layout: project
description: Zusammen mit dem Kompetenzzentrum Wasser (KWB), den Berliner Wasserbetrieben
  (BWB) und dem LaGeSo haben wir eine moderne datengestützte Anwendungen
  geschaffen, welche die Berliner Bürger*innen über die aktuelle
  Gewässerqualität der Berliner Badestellen informiert.
lang: de
title: Badestellen Berlin
subtitle: Aktuelle Berliner Gewässerqualität durch Shared Data
type: prototype
colorMode: bright
featuredImage: /projects/bathing-water/images/featured-badewasser.jpg
thumbnail: /projects/bathing-water/images/thumbnail.jpg
heroImage: /projects/bathing-water/images/hero.jpg
socialMediaImage: /projects/bathing-water/images/social_media.jpg
visible: true
featured: true
authors:
  - sebastian-meier
externalUrl: https://badegewaesser-berlin.de/
start: 2018-01-01
end: 2018-06-01
status: finished
date: 2018-07-04
redirect_from:
  - /projects/bathing-water/index.html

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/badestellen"

---

In dieser Woche haben wir die neue Anwendung <a href="https://badegewaesser-berlin.de/">Badestellen Berlin</a> zusammen mit dem <a href="http://www.kompetenz-wasser.de/de/">Kompetenzzentrum Wasser</a>, den <a href="http://www.bwb.de/content/language1/html/index.php">Berliner Wasserbetrieben</a> und dem <a href="https://www.berlin.de/lageso/">LaGeSo</a> vorgestellt. Mit dieser Anwendung haben die Berliner Bürger*innen die Möglichkeit sich tagesaktuell über die Badegewässerqualität der Berliner Badestellen zu informieren. Neben den Messwerten gibt es Informationen rund um die Badestellen, von Barrierefreiheit bis Würstchenbude. Auch eine Weiterleitung zur BVG und Routing Services ist integriert, sodass dem nächsten Badeausflug nichts mehr im Wege steht.

{% include macro-image-section-markdown.html src="../images/overview.jpg" caption="Übersicht der Anwendung Badestellen Berlin" %}

Hervorgegangen ist das Projekt aus dem Forschungsprojekt <a href="http://www.kompetenz-wasser.de/de/project/flusshygiene/">Flusshygiene</a>. In dem seit 2015 laufenden Projekt haben Wissenschaftler*innen die von Starkregen beeinflussten Badestellen modelliert. So können nun Vorhersagen über die Gewässerqualität bei solchen Ereignissen gemacht werden. Das LaGeSo, welches für das Beproben der Badestellen zuständig ist, produziert alle zwei Wochen aktuelle Werte. Durch die neue Modellierungsmethode können wir aber tagesaktuelle Werte zur Verfügung stellen. Das Modell betrifft spezifisch die <a href="http://www.badegewaesser-berlin.de/?id=344351&ani=true">kleine Badewiese</a> und den <a href="http://www.badegewaesser-berlin.de/?id=344359&ani=true">Grunewaldturm</a>, denn dort sind die Einflüsse bei Starkregenereignissen am stärksten. Die meisten anderen Badestellen, speziell Seen, bleiben davon unbeeinflusst.

{% include macro-image-section-markdown.html src="../images/prediction-lakes.jpg" caption="Badestelle kleine Badewiese und Grunewaldturm" %}

Aus technischer Sicht ist dieses Projekt in der Berliner Datenlandschaft einzigartig. Die der Webanwendung zugrunde liegenden Daten werden von verschiedenen Anbietern geliefert. Zum Teil sind dies offene Daten, beispielsweise die aktuellen Messwerte des LaGeSos und zum anderen aber auch sicherheitsrelevante Daten der Berliner Wasserbetriebe. Alle Daten werden schlussendlich miteinander verschnitten und in Form der Webanwendung den Berliner Bürger*innen zur Verfügung gestellt. Darüber hinaus werden die veredelten Daten auch an das Lageso zurückgeleitet, welches diese neuen Daten dann nutzt um die eigene Website zu aktualisieren und ihre offenen Daten zu bereichern.

{% include macro-image-section-markdown.html src="../images/data-pipeline-en.jpg" caption="Datenverarbeitung" %}

<i>Schon jetzt arbeiten wir an neuen Funktionalitäten. So wollen wir in den nächsten Monaten die historischen Daten als Rohdaten und Visualisierungen in die Seite integrieren. Außerdem soll es eine Funktion geben, welche es Bürger*innen erlaubt Verschmutzungen direkt an die Stadt zu melden.<br /><br />In diesem Sinne wünschen wir allen Berliner*innen einen erholsamen Sommer und viel Spaß an den Berliner Badestellen.</i>

{% include macro-image-section-markdown.html src="../images/jump.gif" caption="Summer Time via yesyesmuchfun.tumblr.com" %}
