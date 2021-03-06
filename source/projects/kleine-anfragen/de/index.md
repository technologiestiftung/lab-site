---
layout: project
description: "Mit schriftlichen Anfragen können Abgeordnete Informationen bei der Berliner Regierung anfragen. Wir haben diese Anfragen analysiert, um relevante Themen zu identifizieren und das darin verborgene Potenzial für Open Data zu ergründen."
lang: de
title: "Schriftliche Anfragen analysiert"
subtitle: "Für welche Daten interessiert sich die Berliner Politik?"
type: publication
colorMode: bright
featuredImage: /projects/kleine-anfragen/images/featured.jpg
thumbnail: /projects/kleine-anfragen/images/thumbnail.jpg
heroImage: /projects/kleine-anfragen/images/hero.jpg
socialMediaImage: /projects/kleine-anfragen/social_media.jpg
visible: true
featured: false
authors:
  - alexandra-kapp
start: 2019-02-01
end: 2019-05-06
status: finished
date: 2019-05-06
assets:
  js:
    - ../js/index.js
    - ../js/line-chart.js
    - ../js/stackedbar-chart.js
    - ../js/network.js
    - 'https://d3js.org/d3.v4.min.js'
  css:
    - ../css/index.css
materialsIncluded:
  - name: Source Code
    link: "https://github.com/technologiestiftung/kleine-anfragen"
---

Welche Daten der öffentlichen Verwaltung sind für Bürger*innen, Politik und Wirtschaft relevant? Für die Umsetzung von Open Government Data ist die Beantwortung dieser Frage von zentraler Bedeutung. Denn angesichts knapper Ressourcen sind Verwaltungen häufig gezwungen, bei der Datenveröffentlichung Prioritäten zu setzen. Im Rahmen unseres Projekts [ODIS](http://odis-berlin.de/) unterstützen wir Verwaltungen bei der Auswahl und Aufbereitung offener Datensätze, so dass die Frage nach möglichen Mehrwerten auch für uns eine wichtige Rolle spielt. Einige Beispiele, wie Städte von Open Data profitieren können, haben wir [hier](https://lab.technologiestiftung-berlin.de/projects/od-for-cities/index.html) zusammengestellt. Um die Nachfrage nach öffentlichen Daten besser zu verstehen, haben wir nun einen weiteren Ansatz ausprobiert: **Die Analyse von _schriftlichen Anfragen_ aus dem Berliner Abgeordnetenhaus.**

Was sind schriftliche Anfragen?
-------------------------

_Schriftliche Anfragen_ sind ein Instrument der **parlamentarischen Kontrolle**. Sie bieten Abgeordneten eine Möglichkeit, Informationen bei der Regierung anzufordern. Innerhalb von drei Wochen muss eine solche Anfrage beantwortet werden. Die Antworten werden in der [Parlamentsdokumentation](http://pardok.parlament-berlin.de/starweb/AHAB/) online bereitgestellt. Die Plattform [kleineAnfragen](https://kleineanfragen.de/) der [Open Knowledge Foundation](https://okfn.de/) stellt die gesammelten Antworten und Metadaten der Anfragen maschinenlesbar zum Download bereit. Damit eröffnet sich ein riesiger Fundus an Informationen zu:  

1. Themen, die für Politik und Bevölkerung von Interesse sind
2. Daten, die potenziell als Open Data bereitgestellt werden können

Die Anzahl Anfragen steigt jährlich (nur im Wahljahr 2016 war die Anzahl rückläufig). Allein im **Jahr 2018 wurden über 3.000 Anfragen** an die Berliner Verwaltung gestellt. Dabei kann es sich um spezifische Informationen zu konkreten Ereignissen handeln, z.B. [zum Frauenmarsch am 18.2.2018](https://kleineanfragen.de/berlin/18/13668-frauenmarsch-17-februar-2018), oder um allgemeine Datensätze, z.B. [die Klassengrößen an Berliner Schulen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf).  

<div id= "word_count_linechart" alt="Liniendiagramm mit Anzahlen an schriftlichen Anfragen nach Jahren"></div>

{% include macro-subline-markdown.html caption="Anzahl Anfragen nach Jahren" %}


Laut einer [amerikanischen Studie](http://sunlightfoundation.com/wp-content/uploads/2018/10/alena-white-paper-PDF.pdf) lässt sich die Menge an Anfragen durch die Bereitstellung offener Daten signifikant reduzieren. Somit ist Open Data nicht nur ein **Transparenzgewinn** für Bürger\*innen und Abgeordnete, sondern **verringert auch den Arbeitsaufwand** für Verwaltungsbeschäftigte, die mit der Beantwortung parlamentarischer Anfragen betraut sind.  

In einer Datenanalyse haben wir die schriftlichen Anfragen aus dem Berliner Abgeordnetenhaus untersucht, um herauszufinden, **welche Themen besonders stark nachgefragt werden** und welches **Potenzial für Open Data** in den Anfragen steckt.

Methode
-------

Über 15.000 Anfragen sind bei [Kleine Anfragen](https://kleineanfragen.de/) für Berlin im Zeitraum November 2011 bis Januar 2019 gelistet. Für jede Anfrage gibt es einen Titel, eine Antragsteller-Partei, eine antwortende Verwaltung und den Volltext der Anfrage mit entsprechenden Antworten. Über die Häufigkeit einzelner Worte in den Anfragetiteln haben wir Themen herausgearbeitet, zu denen viele Anfragen gestellt wurden.  

Allgemeine (z.B. die, und, als) und berlinspezifische Worte (z.B. Senat, Berlin, Bezirk), die für die Analyse nicht relevant sind, wurden entfernt ( [Hier sind alle sogenannten Stopwords](https://github.com/technologiestiftung/kleine-anfragen/blob/master/data/stopwords_de.txt) gelistet). Die verbliebenen Worte wurden auf ihren Wortstamm reduziert (z.B. Kinder zu kind). Anschließend ließ sich die Worthäufigkeit auswerten. Um die Begriffe besser im Kontext zu verstehen, werden sie hier in einem Netzwerk dargestellt. Die **Punktgröße stellt die Häufigkeit eines Begriffs dar und die Linien die Verbindungen zwischen den Begriffen**. Je häufiger zwei Begriffe gemeinsam in einem Titel vorkommen, desto dicker ist die Verbindungslinie. Durch Klick auf ein Wort werden fünf beispielhafte Anfragen gelistet. Mit dem Slider "minimum Wortanzahl" kann eingestellt werden, wie häufig ein Wort mindestens vorkommen muss, um in der Grafik angezeigt zu werden.

<div id='network' alt = "Netzwerkdarstellung von Worten in Titeln der schriftlichen Anfragen."></div>
<div id ='example-wrapper'>
  <p id="example1"></p>
  <p id="example2"></p>
  <p id="example3"></p>
  <p id="example4"></p>
  <p id="example5"></p>
</div>
{% include macro-subline-markdown.html caption="Netzwerkdarstellung von Worten in Titeln der schriftlichen Anfragen" %}

Die gefragtesten Themen
-----------------------

Die großen Themen der Landespolitik **Bildung (Schule)** und **innere Sicherheit** zeigen sich in den zwei mit Abstand häufigsten Begriffen: _Schule (653 Anfragen)_ und _Polizei (456 Anfragen)_. Aktuelle politische und mediale Themen in Berlin spiegeln sich ebenfalls in den Anfragen wider: **Wohnungen, öffentlicher Nahverkehr, die Flughäfen (BER, Tempelhof und Tegel) und Flüchtlinge** gehören zu den weiteren größten Themenkomplexen.  
  
### Bildung und Kinderbetreuung

Die meisten Anfragen werden rund um das Thema Bildung und Schule gestellt. Verwendete Begriffe sind hier beispielsweise "Schule" (653 Anfragen), "Hochschule" (129), "Bildung" (80), "Lehrkräfte" (48) und "Willkommensklassen" (38), sowie "Kinder" (213), "Kita" / "Kitaplätze" (175) und "Jugend" (104).  

Welche Daten sind zu diesem Thema bereits offen verfügbar? Berlin bietet [detaillierte Informationen zu Standorten und Angeboten von Schulen](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/), die im Rahmen des Projekts ["Jede Schule"](https://jedeschule.de/) visuell ansprechend aufbereitet wurden. Die Senatsverwaltung für Bildung, Jugend und Familie stellt zusätzlich Statistiken über die [Anzahl Schüler\*innen nach Schulart und Region](https://www.bildungsstatistik.berlin.de/visualisierung/Schueler/schueler.aspx) sowie schöne Visualisierungen der [Bewegungen zwischen Wohnbezirk und Schulbezirk](https://www.bildungsstatistik.berlin.de/visualisierung/circle/index.html) bereit.

Jedoch gibt es auch noch einiges an Potenzial für weitere Open Data-Veröffentlichungen. So hat die SPD beispielsweise [134 Anfragen zum "Sonderungsverbot"](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16220.pdf) privater Schulen gestellt. Weitere Anfragen, die interessante Datensätze enthalten sind beispielsweise:

* [WLAN an öffentlichen Schulen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16769.pdf)
* [PC Ausstattung an Schulen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12015.pdf)
* [Strom- und Heizkosten von Schulen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12621.pdf)
* [Gedenkstättenbesuch durch Schulklassen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16995.pdf)
* [Grün macht Schule](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16718.pdf)
* [Bedarf Erzieherpersonal](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15296.pdf)
* [Energieverbrauch und Emissionen von Hochschulen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16891.pdf)
* [Klassengrößen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf)
* [Kinderarmut](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14006.pdf)
* [Kindertagespflegestellen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-11778.pdf)
* [Lehrkraft-Quereinsteigende](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-17293.pdf) - dieser Datensatz wurde beispielsweise [in diesem Projekt von Thomas Tursics](http://www.tursics.de/story/quereinsteigende/) für eine Visualisierung verwendet 

### Polizei und Kriminalität

"Polizei" ist der zweithäufigste Begriff in den Anfragetiteln. Das Thema ist parteiübergreifend nachgefragt. So hat beispielsweise die SPD [detaillierte Zahlen zu jeder Direktion der Polizei](https://kleineanfragen.de/search?q=controlling+ist+gut+kontrolle+ist+besser) angefragt. Die CDU hat diverse Anfragen zu [Planstellen vs. tatsächlichen Beschäftigten](https://kleineanfragen.de/search?q=Planstellen+tats%C3%A4chliche+Besch%C3%A4ftigte+polizei) gestellt und die FDP zu [Arbeitsschutz und Gesundheitsförderung der Polizei](https://kleineanfragen.de/search?q=arbeitsschutz+gesundheitsf%C3%B6rderung+polizei). Weitere häufige Begriffe sind "Feuerwehr" (166), "organisierte Kriminalität" (74), "Rockerkriminalität" (53), und "Justizvollzug" (32). Zum Anschlag am Breitscheidplatz vom 19. Dezember 2016 wurden 94 Anfragen gestellt. Letztes Jahr wurde mit dem [Kriminalitätsatlas](https://daten.berlin.de/anwendungen/kriminalit%C3%A4tsatlas-app) bereits ein wichtiger Datensatz als Open Data bereitgestellt _[(Hier haben wir dazu berichtet)](https://lab.technologiestiftung-berlin.de/projects/crime-atlas/index.html)_. Potenzial für weitere Open Data-Datensätze zum Thema Polizei verbergen sich beispielsweise hinter diesen Anfragen:

* [Reaktionszeit der Berliner Polizei](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16549.pdf)
* [Polizei Immobilien](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16035.pdf)
* [Kontakt der Polizei mit Bürgern](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15133.pdf)
* [Überstunden bei der Berliner Polizei](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16645.pdf)
* [Kraftfahrzeuge der Polizei](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14939.pdf)

### Wohnen

Zum Thema "Wohnen" wurden 2018 so viele Anfragen gestellt, wie in keinem Jahr zuvor. Der Teilbegriff "wohn" kommt so zwar 'nur' 161 mal vor, steckt allerdings insgesamt in 731 Titeln, versteckt in verschiedenen Begriffen z.B. "wohnungslos", "Wohnungsbaugesellschaften", "Wohnraum", "Wohnungsnot", etc. Weitere Begriffe zu dem Thema sind "Immobilien" (70), "Neubau" (41) oder "Unterbringung" (95). Mögliche interessante Datensätze in Anfragen sind beispielsweise:

* [umgesetztes Vorkaufsrecht Milieuschutzgebiet](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13411.pdf)
* [Studentisches Wohnen in Berlin](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15944.pdf)
* [Bauaktivitäten der Senatsverwaltung für Stadtentwicklung und Wohnen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15848.pdf)
* [Wohnungsbestände von Wohnungsgesellschaften](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12569.pdf)
* [Barrierefreie Wohnungen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf)

### Öffentlicher Nahverkehr (BVG)

Zum öffentlichen Nahverkehr gibt es Anfragen in Bezug auf "BVG" (149), "S-Bahn" (87), "Bahnhof" (79) und "U-Bahnhof" (49). Mit den aktuellen [Fahrplandaten des VBB](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos) ist ein wichtiger Datensatz online verfügbar. Darüber hinaus gibt es allerdings weitere Potenziale: beispielsweise werden die [Verspätungen](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10525.pdf) der BVG jährlich angefragt. Weitere Möglichkeiten für Open Data:

* [Betriebshöfe BVG](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16673.pdf)
* [ÖPNV-relevante Straftaten im Verkehrsmittel U-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14924.pdf)
* [Kraftfahrzeuge der BVG](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13709.pdf)
* [Ermittlung der Fahrgastzahlen bei BVG und S-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16796.pdf)

### Flughäfen

Zu allen Flughäfen "BER" (215), "Tegel" (99) und "Tempelhof" (66) gibt es regelmäßige Anfragen.  
Potenziell relevante Datensätze sind hier beispielsweise die [Flughafen- und Flugfeldflächen Tempelhof](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13860.pdf) oder die [Kapazitäten vom BER im Vergleich zu Schönefeld](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17627.pdf).

### Flüchtlinge

Zum Thema "Flüchtlinge" (229) gab es im Jahr 2015 über 70 Anfragen. 2018 Waren es nur noch 15. Das Landesamt für Flüchtlingsangelegenheiten bieten inzwischen aufschlussreiche **Zahlen und Visualisierungen**, z.B. zu [Flüchtlingsunterkünften](https://www.berlin.de/laf/wohnen/allgemeine-informationen/ueberblick-fluechtlingsunterkuenfte/artikel.629241.php) und [Ankunftszahlen](https://www.berlin.de/laf/ankommen/aktuelle-ankunftszahlen/artikel.625503.php).

Die gefragtesten Senatsverwaltungen
-----------------------------------

Die Senatsverwaltungen der Bereiche Verkehr & Umwelt, Inneres & Sport, Bildung & Jugend und Soziales erhielten die meisten Anfragen. _(Anm. Senatsverwaltungen mit dem Zusatz (WP17) wurden in der Wahlperiode 18 umstrukturiert oder umbenannt.)_

<div id='barchart-wp17' alt="Balkendiagramm zur Aufteilung von schriftlichen Anfragen nach antwortender Senatsverwaltung für die Wahlperiode 17"></div>

{% include macro-subline-markdown.html caption="Anfragen an Senatsverwaltungen (Wahlperiode 17)" %}

<div id='barchart-wp18' alt="Balkendiagramm zur Aufteilung von schriftlichen Anfragen nach antwortender Senatsverwaltung für die Wahlperiode 18"></div>

{% include macro-subline-markdown.html caption="Anfragen an Senatsverwaltungen (Wahlperiode 18)" %}



Die **Senatsverwaltung für Inneres & Sport** hat in beiden Wahlperioden mit die meisten Anfragen erhalten. Dabei handelte es sich vor allem um Fragen mit Bezug zu Polizei, Feuerwehr, Kriminalität, Verfassungsschutz und Badebetrieben.

Die **Senatsverwaltung für Umwelt, Verkehr und Klimaschutz (WP18)** erhielt in Wahlperiode 18 die zweitmeisten Anfragen. Anfragen handeln hier hauptsächlich von öffentlichem Nahverkehr, Grün(anlagen), Brücken, Sanierungen und den Flughäfen. Die **Senatsverwaltung Stadtentwicklung und Umwelt (WP17)** hat in der vorherigen Wahlperiode die meisten Anfragen erhalten. Zusätzlich zu sich überschneidenden Themen wie Bahn, Flughafen und Barrierefreiheit wurden Anfragen zur landeseigenen Wohnungsbaugesellschaft, dem "Staatsopernskandal" und Wohnungen gestellt.

Die **Senatsverwaltung für Bildung, Jugend und Familie** (bzw. zuvor Bildung, Jugend und Wissenschaft) erhielt die drittmeisten Anfragen. Themen waren hier Schule, Kinder, Jugend, Kitas und minderjährige Flüchtlinge.

Welche Partei stellt am meisten Anfragen?
-----------------------------------

Die Oppositionsparteien stellen in beiden Wahlperioden die meisten Anfragen, jedoch kommt auch von den regierenden Parteien ein beträchtlicher Anteil. So wurden in der Wahlperiode 17 um die 2400 Anfragen von jeweils den Grünen und den Piraten gestellt, aber CDU und SPD stellten ebenfalls je über 1000 Anfragen.
In der aktuellen Wahlperiode kommen die meisten Anfragen von der stärksten Oppositionspartei, der CDU (über 1700). Die regierenden Parteien SPD, die Grünen und die Linke stellten jedoch ebenfalls bereits jeweils knapp 1000 Anfragen. Die naheliegende Vermutung, dass an Senatsverwaltungen weniger Anfragen von Parteimitgliedern der gleichen Partei gestellt werden, kann so nicht bestätigt werden. Es gibt zwar eine dahingehende Tendenz, besonders in Wahlperiode 17, jedoch werden auch viele Anfragen an Senatsverwaltungen unter Führung der gleichen Partei gestellt (genaue Zahlen gibt es [hier](https://github.com/technologiestiftung/kleine-anfragen/blob/master/notebooks/analysis.ipynb) in der Analyse).

Potenziale für eine Open Data-Strategie
-----------------------

Nicht alle, aber ein beträchtlicher Teil der schriftlichen Anfragen wird von Verwaltungen datengestützt beantwortet. Rund ein Drittel der über 15.000 Antworten enthält Tabellen, was in der Regel ein Hinweis auf eine entsprechend vorhandene Datengrundlage ist. Zusätzlich werden in den Antworten häufig aggregierte Zahlen und Statistiken herausgegeben, die auf interessante zugrundeliegende Rohdaten hinweisen: Beispielsweise wird in [dieser Anfrage](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10513.pdf) erwähnt, dass es regelmäßige statistische Erhebungen zum Schulschwimmen gibt, aus denen eine Nichtschwimmerquote von 18.2% hervorgeht. Diese statistischen Erhebungen könnten aufgeschlüsselt nach Bezirken, Schulen oder Klassenstufen ein relevanter Datensatz sein.
  
Zwar werden die Antworten auf schriftliche Anfragen grundsätzlich über das [parlamentarische Dokumentationssystem](http://pardok.parlament-berlin.de/) veröffentlicht, jedoch bislang nur im wenig datenfreundlichen PDF-Format. Eine **begleitende Veröffentlichung von Rohdaten in maschinenlesbaren, Open Data-konformen Formaten (CSV)** könnte die Weiterverwendbarkeit deutlich erhöhen. Grundsätzlich wäre es auch denkbar, solche Daten **direkt über das [Berliner Open Data Portal](http://daten.berlin.de) zu publizieren**. Perspektivisch könnten **offene Schnittstellen in die Verwaltung** es ermöglichen, dass Abgeordnete (und Bürger*innen) Datenbestände direkt abfragen und sich der Umweg einer parlamentarischen Anfrage erübrigt. Dies wäre nicht zuletzt auch für die Verwaltungsbeschäftigten selbst eine deutliche Entlastung.   

Einschränkungen der Analyse
---------------------------

Bei der Interpretation dieser Ergebnisse ist zu bedenken, dass sich nicht alle Anfragen auf Datensätze beziehen. Somit lässt sich aus den Häufigkeiten der Begriffe nicht in allen Fällen eine Relevanz für Open Data ableiten. Außerdem ist zu berücksichtigen, dass Daten nicht mehr angefragt werden müssen, wenn diese bereits verfügbar sind. Folglich lässt sich ebenfalls keine eins-zu-eins Übertragung von Begriffshäufigkeiten auf die Relevanz von Themen vornehmen.

Die Analyse über die Titel lässt eine grobe Übersicht der Themen zu, ist jedoch keine vollständig akkurate Auswertung: die Titel sind sind von den Abgeordneten frei wählbar und folgen keinem bestimmten Format. Somit sind nicht zwangsläufig alle enthaltenen Themen der Anfrage aus dem Titel ersichtlich. Eine Analyse der Volltexte wäre komplexer und umfangreicher würde aber gegebenenfalls detailliertere Informationen ermöglichen. Zusätzlich ist bei dieser Textanalyse zu bedenken: Synonyme werden nicht berücksichtigt, zusammengesetzte Worte werden durch das verwendete Analyse-Package ([NLTK Snowball Stemmer](https://www.nltk.org/_modules/nltk/stem/snowball.html)) nicht immer gut getrennt (bspw. wird Kitaausbau nicht in "Kita" und "Ausbau" getrennt und somit nicht dem Wort "Kita" zugeordnet) und doppelte Wortbedeutungen werden nicht beachtet (z.B. Behinderung kann sich auf Behinderung des Straßenverkehrs oder körperliche Behinderung beziehen).