---
layout: project
description: Daten vermitteln ein Gefühlt von Korrektheit. Dabei gibt es auch viele Gründe
  diese kritisch zu hinterfragen. Wir geben ein paar Beispiele.
lang: de
title: Vertrauen in Zahlen
subtitle: Daten und Statistiken müssen hinterfragt werden.
type: publication
colorMode: bright
featuredImage: /projects/trust-in-numbers/images/featured.jpg
thumbnail: /projects/trust-in-numbers/images/thumbnail.jpg
heroImage: /projects/trust-in-numbers/images/social_media.jpg
socialMediaImage: /projects/trust-in-numbers/images/social_media.jpg
visible: true
featured: false
authors:
  - sebastian-meier
start: 2018-03-01
end: 2018-03-15
status: finished
date: 2018-03-15
redirect_from:
  - /projects/trust-in-numbers/index.html

---

## Auch Statistiken sollten hinterfragt werden.

Menschen der westlichen Welt haben ein Vertrauen in Statistiken (quantitative Daten) aufgebaut (siehe z.B. T.M. Porter, 1996). Sie vermitteln uns das Gefühl von Korrektheit, wenn nicht sogar wissenschaftlicher Evidenz. Das dies durchaus problematisch zu sehen ist, zeigt ein kurzer Blick in die Diskussion um den Klimawandel. Klimawandel-Leugner sind dafür bekannt Datensätze so auszuwählen, dass diese Ihr Argument unterstützen. Hierbei werden z.B. bestimmte Zeitausschnitte gewählt die nicht repräsentativ sind für den gesamten Beobachtungszeitraum (siehe z.B. Schneider et al. 2014). Dies wird auch häufig als "Cherry picking" (Kirschen pflücken) bezeichnet. Noch gefährlich wird es wenn solche Daten dann in Graphen visuell aufbereitet werden. Weil diese sehr schnell wahrgenommen werden und ebenfalls ein zusätzliches Gefühl der Korrektheit vermitteln ("aura of truth": Monmonier, 1991 oder "communicative objectivity": Halpern, 2014). Darüber hinaus können auch diese weiterhin zum Nachteil der Leser*innen manipuliert werden um ein entsprechendes Argument zu unterstützen, siehe Abb. 1 (Pandey et al. 2015).

{% include macro-image-section-markdown.html src="../images/deception.jpg" caption="Abb. 1. Ein paar reale Beispiele für den Einsatz von Visualisierungsmethoden die den Betrachter möglicherweise täuschen (Pandey et al. 2015)." %}

Ein Beispiel für dieses Problem zeigte sich in den letzten Tagen. Die Website <a href="https://www.testberichte.de/tb/artikel-186169.html">Testberichte.de</a> hat am 14.03.2018 eine Studie veröffentlicht in der ein Ranking der Breitbandgeschwindigkeiten von 110 deutschen Städten vorgenommen wurde. Die Darreichung der Studie als Ranking macht diese besonders attraktiv für die Presse (<a href="https://www.focus.de/digital/internet/deutschlandweite-studie-internet-ranking-zeigt-eine-deutsche-kleinstadt-surft-allen-metropolen-davon_id_8604046.html">Focus</a>, <a href="https://www.bild.de/digital/internet/wlan/hieristdasinternetamlangsamsten-55068850.bild.html">Bild</a>, <a href="http://www.t-online.de/digital/id_83393184/diese-staedte-haben-das-schnellste-internet.html">T-Online</a>, <a href="https://www.tagesspiegel.de/wirtschaft/internet-berliner-surfen-besonders-langsam/21071356.html">Der Tagesspiegel</a>, <a href="https://www.morgenpost.de/berlin/article213717285/Schnelles-Internet-Bayerische-Provinz-haengt-Berlin-ab.html">Berliner Morgenpost 1.</a> und <a href="https://www.morgenpost.de/berlin/article213725393/Surfen-im-Schneckentempo.html">2.</a>, <a href="https://www.berliner-zeitung.de/berlin/breitband-ranking-so-langsam-ist-das-internet-in-berlin-29868546">Berliner Zeitung</a>). Als Ursprung der Daten wird das Portal <a href="https://breitbandmessung.de">Breitbandmessung.de</a> aufgeführt, welches von der <a href="https://www.bundesnetzagentur.de">Bundesnetzagentur</a> in Auftrag gegeben wurde. Der Auftraggeber der Quelle wird dabei gerne von der Presse aufgeführt, da er zusätzliches Vertrauen in die Studie schafft, obwohl er nichts mit der eigentlichen Studie zu tun hat.

## Warum sind die Daten zum Ranking von Testberichte.de unzureichend?

Breitbandmessung.de ist ein offenes Portal welches Bürger*innen erlaubt Ihre persönliche Internetgeschwindigkeit zu messen. Hierzu werden den Nutzer*innen eine Reihe an Fragen gestellt, um z.B. die räumliche Verortung vorzunehmen. Dies bedeutet, dass die Seite keine Systematik in der Auswahl der Testfälle verfolgt, sondern auf die freiwilligen Nutzer*innen angewiesen ist. Im Testzeitraum 2016/17 haben 437.192 stationäre Breitbandanschlüsse und 245.143 mobile Anschlüsse den Test durchgeführt. In der vorangegangenen Periode waren es nur stationär 106.159 und mobil 53.651. Die Größe der Stichprobe ist gar nicht so schlecht. Das Problem liegt darin, dass wir nichts über die zeitliche oder räumliche Verteilung der Daten wissen. Gerade in kleinen Städten besteht die Möglichkeit, das die Angabe der Geschwindigkeit auf einer sehr kleinen Stichprobe von Nutzer*innen generiert wurde und dem entsprechend nicht aussagekräftig ist. Die Gewinner*in des Rankings ist die Stadt Coburg. Für Coburg existieren nicht einmal ausreichend Datenpunkte um die gesamte Stadtfläche abzudecken (siehe Abb. 2).

{% include macro-image-section-markdown.html src="../images/coburg.jpg" caption="Abb. 2. Datenqualität für die Stadt Coburg. Quelle: breitbandmessung.de, 15.03.2018" %}

Des Weiteren sollte in Betracht gezogen werden, wodurch die Nutzer*innen motiviert werden die Seite aufzusuchen (z.B. weil man das Gefühl hat, dass das eigene Internet langsam ist). Außerdem führt die Seite Breitbandmessung.de diverse Gründe auf warum die Ergebnisse verfälscht werden können, von der Nutzung schlecht konfigurierter Wifi-Knoten, über parallel laufende Up- und Downloads bis hin zu alten Leitungen im Haus oder einem schlechten Vertrag beim Anbieter. Die Seite Breitbandmessung.de stellt diese Probleme auch sehr transparent und verständlich dar: <i>"Bei der vorliegenden Stichprobe handelt es sich nicht um eine Zufallsstichprobe, sondern es konnten alle Kunden teilnehmen, die Kenntnis von der Breitbandmessung erlangt haben und gleichzeitig motiviert waren, die Messung bei sich durchzuführen." "Die berechneten und dargestellten Werte können möglicherweise von den tatsächlichen Werten in der Grundgesamtheit abweichen."</i> Auch die Aussagekraft wird mehrfach kontextualisiert: <i>"Dies liegt insbesondere an kleinen bis sehr kleinen Stichproben für die jeweils dargestellte Region."</i> Und Erkenntnisse über den Stand des Breitbandausbaus in Deutschland zu machen negiert die <a href="https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2017/27032017_Breitbandmessung.html">Bundesnetzagentur</a> völlig: <i>"<strong>Messungen lassen keine Rückschlüsse auf Breitbandversorgung zu</strong>: Die Ergebnisse der Breitbandmessung hängen davon ab, welchen Tarif der Nutzer mit dem Anbieter vereinbart hat. Insofern können auf der Grundlage der Breitbandmessung keine Aussagen zur Versorgungssituation oder Verfügbarkeit von breitbandigen Internetzugangsdiensten getroffen werden."</i>

Die Seite Breitbandmessung und die Netzagentur ist, wie uns telefonisch bestätigt wurde, nicht an der Studie beteiligt. Breitbandmessung selber veröffentlich nur Jahresberichte und selbst darin geht man nicht auf einzelne Städte ein, weil die Daten dies eben nicht abbilden können. Bessere Daten zur (theoretischen Breitbandgeschwindigkeit) gibt es im deutschen <a href="https://www.bmvi.de/DE/Themen/Digitales/Breitbandausbau/Breitbandatlas-Karte/start.html">Breitbandatlas</a> des Bundesministeriums für Verkehr und digitale Infrastruktur (BMVI), welche systematisch vom TÜV Rheinland erhoben wurde. 

## Es steht also gar nicht so schlecht um Deutschlands Breitbandausbau?

Ja und Nein. Wie auch der Breitbandatlas zeigt, gibt es noch viele Städte und Bereiche in Deutschland die beim Breitbandausbau Nachholbedarf haben. Wir haben diesbezüglich die aktuellsten Daten für das Land Berlin untersucht und aufgezeigt, dass es beispielsweise im Bezirk Pankow im Bereich 50 Mbit/s  um die 47.000 Einwohner*innen (hochgerechnet) gibt die keinen Zugang zu solchen Geschwindigkeiten haben. Mehr zu unserer statistischen Auswertung erfahren Sie <a href="http://lab.technologiestiftung-berlin.de/projects/breitband-2017/index.html">hier</a>.

## Woran erkenne ich, ob ich einer Statistik vertrauen kann?

Dies ist eine schwer zu beantwortende Frage. Denn für eine umfassende Antwort ist Recherche und statistisches Grundwissen erforderlich. Häufig ist es aber schon ausreichend sich zu Fragen wo die Daten herkommen. Im oben angeführten Fall stammen die Daten von einem kommerziellen Portal, welches sein Geld damit verdient Testberichte anderer Publikationen, wie z.B. der Stiftung Warentest, zu verkaufen. Alle auf dem Portal veröffentlichten Informationen dienen dazu mehr Nutzer*innen auf die Seite zu holen und sogenannte "Conversions" (Transaktionen) zu generieren. Dem entsprechend sollte man sich Fragen ob man dieser Quelle wirklich vertrauen sollte. Im Idealfall recherchieren Journalisten die Daten die Sie für Ihre Artikel nutzen bevor die Leser*innen dies selber tun müssen. Valide Datenquellen sind beispielsweise das statistische Bundesamt oder die statistischen Landesämter.

## Literaturangaben

<ul>
    <li>Halpern, O. (2014). Beautiful data. Duke University Press.</li>
    <li>Monmonier, M. (1991). How to Lie with Maps. Chicago & London: University of Chicago Press.</li>
    <li>Pandey, A.V.; Rall, K.; Satterthwaite, M.L.; Nov, O.; Bertini, E. (2015) How Deceptive are Deceptive Visualizations?: An Empirical Analysis of Common Distortion Techniques. Proceedings of the ACM Conference on Human Factors in Computing Systems 2015</li>
    <li>Porter, T.M. (1996) Trust in Numbers, Princeton University Press</li>
    <li>Schneider, B.; Nocke T.; Feulner, G. (2014) Twist and Shout: Images and Graphs in Skeptical Climate Media. In Image Politics of Climate Change: Visualizations, Imaginations, Documentations. Transcript Verlag</li>
</ul>