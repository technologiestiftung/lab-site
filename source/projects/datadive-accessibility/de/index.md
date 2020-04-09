---
layout: project
description: Eine Analyse der Verfügbarkeit von Daten für Barrierefreiheit
lang: de
title: "Data Dive: Barrierefreiheit in Berlin"
subtitle: Welchen Daten gibt es?
type: dataset
colorMode: bright
featuredImage: /projects/datadive-accessibility/images/featured.jpg
thumbnail: /projects/datadive-accessibility/images/thumbnail.jpg
heroImage: /projects/datadive-accessibility/images/hero.jpg
socialMediaImage: /projects/datadive-accessibility/social_media.jpg
visible: true
featured: false
authors:
  - victoria-boeck
start: 2019-02-05
end: 2019-02-20
status: finished
date: 2019-02-20
redirect_from:
  - /projects/datadive_accessibility/index.html

---

_Ein Data Dive ist die ausführliche Analyse eines Themas aus datenzentrierter Perspektive, wobei wir uns auf Themen konzentrieren wollen, die von großem öffentlichen Interesse sind. Im Wesentlichen verfolgen wir dabei zwei Fragen: Erstens, welche Daten sind erforderlich oder nützlich, um ein umfassendes Verständnis für dieses Thema zu entwickeln? Zweitens, wie steht es um deren Verfügbarkeit – sind die Daten offen zugänglich, sind sie maschinenlesbar und letztlich: existieren sie überhaupt? So wollen wir einerseits vorhandene Ressourcen leichter auffindbar machen und andererseits zeigen, wo es einen Bedarf an mehr und besseren Datenquellen gibt. Unser erster Data Dive hat Art und Verfügbarkeit von Radverkehrsdaten analysiert und ist [hier](https://lab.technologiestiftung-berlin.de/projects/datadive_cycling/index.html) zu lesen._

Eintauchen in Daten für die Barrierefreiheit
--------------------------------------------

„Barrierefreiheit“ umschreibt die Möglichkeiten von Menschen mit Behinderungen, an allen Aspekten gesellschaftlichen Lebens teilhaben zu können. Wenn wir über Barrierefreiheit reden, müssen wir insbesondere an Aufgaben und Tätigkeiten denken, die für Menschen ohne Behinderung gar kein Thema sind, die aber für Menschen mit Behinderung schwer oder gar nicht durchzuführen sind ohne spezielle Anpassungen und Hilfen.

In den folgenden Abschnitten listen wir Datensätze auf, die für eine Analyse Barrierefreiheit und des Lebens mit einer Behinderung wesentlich sind. Diese Daten wären zum Beispiel für Apps nützlich, die das Alltagsleben für Menschen mit Behinderung erleichtern oder für eine Bewertung, inwiefern Services und Institutionen in Berlin den Bedürfnissen dieser Menschen entsprechen.

Falls ihr Fehler entdeckt, Verbesserungs- oder Ergänzungsvorschläge habt oder weitere relevante Datenquellen zum Thema kennt, meldet euch gerne unter [boeck@technologiestiftung-berlin.de](mailto:boeck@technologiestiftung-berlin.de).

_Einen besonderen Dank an Jolanta Paliszewska für ihre Unterstützung bei der Aufbereitung dieses Data Dive!_

  

Öffentlicher Nahverkehr
-----------------------

### Bahnhöfe mit Rolltreppen und Aufzügen

<u>Status: Offene Daten verfügbar</u>  
Die zuverlässigste Quelle um zu erfahren, welche Bahnhöfe über einen Aufzug oder eine Rolltreppe verfügen, ist [ein Datensatz](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) des VBB (Verkehrsverbund Berlin-Brandenburg). Dieser Datensatz ist eine Liste aller Bahnhofs-Eingänge des VBB-Netzes (deshalb sind auch Stationen in Brandenburg inkludiert). Die Spalte „Bauwerkselement Name“ beinhaltet auch Informationen zum Vorhandensein von Rolltreppen oder Aufzügen (z.B., für die S- und U-Bahnstation Hermannstraße, gibt es u.a. das Element „Bahnsteig S-Bahn (Rolltreppe von der Hermannstraße/Silbersteinstraße)“).

Die BVG hat für ihr Verkehrsnetz eine [Hauptseite](https://www.bvg.de/de/Willkommen/Barrierefreies-Reisen) zur Barrierefreiheit. Neben verschiedenen PDF-Flyern, bietet die Seite auch [einen Routing-Service](https://www.bvg.de/de/Service/Service-fuer-unterwegs/Mobilitaetshilfen) für barrierefreies und bedingt barrierefreies (d.h. mit Rolltreppen) Reisen an. Die BVG veröffentlicht aber keine offenen Daten zu Barrierefreiheit.

Für Informationen darüber, welche U-Bahnstationen bisher keinen Aufzug haben, aber wo bereits die Planung dafür besteht, gibt es [diese kleine Anfrage](https://kleineanfragen.de/berlin/18/15097-barrierefreiheit-auf-u-bahnhoefen) vom 1. Juni 2018.

Da die S-Bahn von der Deutsche Bahn AG betrieben wird, gibt es Informationen zu Aufzügen im S-Bahn-Netz in [diesem offenen Datensatz](https://data.deutschebahn.com/dataset/data-aufzug) der Deutschen Bahn. Sonst bietet die Webseite der S-Bahn Berlin eine [Bahnhofsübersicht](https://sbahn.berlin/fahren/bahnhofsuebersicht/), die auch Informationen über Barrierefreiheit in den Stationen liefert.

*   [Koordinaten](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) der Zugangsmöglichkeiten zu Stationen (CSV)
*   [Barrierefreies Reisen mit der BVG (Webseite)](https://www.bvg.de/de/Willkommen/Barrierefreies-Reisen)
*   [Aufzugsdaten der Deutsche Bahn (XLSX & CSV)](https://data.deutschebahn.com/dataset/data-aufzug)

### Betriebsstatus von Aufzügen und Rolltreppen

<u>Status: Begrenzte Verfügbarkeit offener Daten</u>  
Wie alle regelmäßigen Nutzer des öffentlichen Personennahverkehrs wissen, bedeutet das Vorhandensein eines Aufzugs oder einer Rolltreppe leider nicht, dass man diese tatsächlich auch nutzen kann – Betriebsstörungen wegen mechanischer Probleme oder geplanter Wartungen kommen ständig vor. Für Menschen mit eingeschränkter Beweglichkeit ist es aber wichtig, im Voraus zu wissen, ob sie ihre normale Route nehmen können oder ob sie aufgrund von Störungen eine neue Strecke finden müssen.

Die Webseite [BrokenLifts](http://brokenlifts.org/) ist eine sehr gute Ressource, um herauszufinden, welche Aufzüge im öffentlichen Berliner Verkehrsnetz zurzeit gestört sind. Leider hat die Seite keine öffentliche API und nicht alle ihre Datenquellen scheinen öffentlich zu sein.

Für S-Bahnstationen bietet die Detusche Bahn die ["Facilities Status" (FaSta) API](https://data.deutschebahn.com/dataset/fasta-station-facilities-status) an. Durch diese API ist es möglich, aktuelle Informationen zum Betriebstatus von Rolltreppen und Aufzügen innerhalb des Deutsche Bahn-Netztes abzurufen.

Für das U-Bahnnetz (sowie das S-Bahnnetz) gibt es auch einen [RSS-Feed](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos/rss-feed-aufzugsstoerungen) des VBB, der über Aufzugsstörungen für U- und S-Bahnstationen informiert. Der Feed liefert aber keine Informationen dazu, wann eine Störung zuerst gemeldet wurde und deshalb ist es schwierig zu sagen, wie aktuell die Informationen wirklich sind.

Für U-Bahnstationen, bietet die BVG [eine Webseite mit Aufzugsstörungen](https://www.bvg.de/de/Fahrinfo/Verkehrsmeldungen/Aufzugsstoerungen) an (ohne API). Für die S-Bahn gibt es auch [eine Webseite](https://sbahn.berlin/fahren/bahnhofsuebersicht/barrierefrei-unterwegs/aufzug-und-fahrtreppenstoerungen/?acc=acc2000-tab107), die die aktuelle Störungen zeigt.

*   [BrokenLifts (Webseite)](http://brokenlifts.org/)
*   [Deutsche Bahn FaSta API (API)](https://data.deutschebahn.com/dataset/fasta-station-facilities-status)
*   [VBB Aufzugsstörungen (RSS-Feed)](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos/rss-feed-aufzugsstoerungen)

### Genaue Standorte von Bahnhofs-Eingängen und Bus- und Tramhaltestellen

<u>Status: Offene Daten verfügbar</u>  
Für Menschen mit eingeschränkter Mobilität, die die kürzeste Route planen wollen, kann es wichtig sein zu wissen, wo genau eine Haltestelle oder der Eingang zu einer Station liegen (Informationen, die z.B. Google Maps nicht immer zeigt). Diese Daten sind [im Berliner Datenportal veröffentlicht](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) (der Datensatz wurde schon im Abschnitt über die Verfügbarkeit von Aufzügen erwähnt). Der Datensatz beinhaltet Koordinaten für alle Haltestellen und Stations-Eingänge im VBB-Netz. Hier ist auch aufgelistet, wo ein Eingang über eine Rampe oder einen Aufzug verfügt.

*   [Koordinaten](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) der Zugangsmöglichkeiten zu Stationen (CSV)

### Informationen über verlegte oder zurzeit nicht bediente Haltestellen und Eingänge

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Wie bei Rolltreppen und Aufzügen, reicht es nicht zu wissen, wo unter normalen Umständen eine Haltestelle oder ein Bahnhofs-Eingang verortet ist. Bauprojekte führen oft zu verlegten Haltestellen oder gesperrten Eingängen, und das kann die Barrierefreiheit eines Ortes negativ beeinflussen. Die Verkehrsinformationszentrale Berlin veröffentlicht eine [interaktive Karte](https://viz.berlin.de/web/guest/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_default) die Störungen im öffentlichen Verkehr anmerkt. Es gibt auch eine [HTML-Meldungsliste](https://viz.berlin.de/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_list). Es werden aber keine API oder rohe Daten zur Verfügung gestellt.

*   [Verkehrsmeldungen](https://viz.berlin.de/web/guest/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_default) für Bus und Bahn von der VIZ (Webseite)

### Blindenleitsysteme in S- und U-Bahnhöfen

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Blindenleitsysteme nutzen Elemente wie Rillen und Noppen, um sehbehinderten Menschen dabei zu helfen, den richtigen Weg zu finden. Viele Stationen in Berlin verfügen über ein Blindenleitsystem, aber es gibt keinen Datensatz dazu, genau welche Stationen so ein System haben. Die BVG scheint keine spezifischen Informationen dazu zu veröffentlichen, aber die [Bahnhofsübersicht-Seite der S-Bahn Berlin](https://sbahn.berlin/fahren/bahnhofsuebersicht/) notiert, welche Stationen ein Blindenleitsystem haben. Eine [kleine Anfrage vom Mai 2018](https://kleineanfragen.de/berlin/18/15096-barrierefreiheit-auf-s-bahnhoefen) bietet eine Liste von allen S-Bahnhöfen, die aktuell über kein Blindenleitsystem verfügen. Schwieriger zu finden sind Informationen über den Stand in U-Bahnhöfen. [Diese kleine Anfrage](https://kleineanfragen.de/berlin/17/12203-blindenleitsysteme-im-oeffentlichen-nahverkehr) vom Juni 2013 hat eine Tabelle mit Informationen über U-Bahnhöfe, aber die Daten sind so alt, dass sie wahrscheinlich nicht mehr gültig sind.

*   [Mai 2018 kleine Anfrage zu Barrierefreiheit in S-Bahnhöfen (PDF)](https://kleineanfragen.de/berlin/18/15096-barrierefreiheit-auf-s-bahnhoefen)
*   Juni 2013 [kleine Anfrage](https://kleineanfragen.de/berlin/17/12203-blindenleitsysteme-im-oeffentlichen-nahverkehr) zu Blindenleitsystemen im öffentlichen Nahverkehr (PDF)

Barrierefreiheit in öffentlichen Räumen
---------------------------------------

{% include macro-image-section-markdown-small.html src="../images/TS_icons.png" caption="Barrierefreiheit der Dienstgebäude im Bezirk Tempelhof-Schöneberg" %}

### Barrierefreiheit in Verwaltungsgebäuden

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Für Verwaltungsgebäude, in denen Dienstleistungen für Bürger\*innen angeboten werden (z.B. Bürgerämter, Finanzämter, usw.), veröffentlicht die Stadt verschiedene Informationen zu der Barrierefreiheit des Ortes, wie die Rollstuhlgerechtigkeit des Eingangs, die Verfügbarkeit eines Aufzuges und die Verfügbarkeit von rollstuhlgerechten Toiletten. Diese Informationen werden über die [Standorte-Seite](https://service.berlin.de/standorte/) des Service-Portals Berlins übermittelt (ein Beispiel ist [diese Seite](https://service.berlin.de/standort/122219/) für das Bürgeramt Hohenzollerndamm; die relevanten Piktogramme sind auf der rechten Seite). Es gibt aber nicht die Möglichkeit, Standorte nach Barrierefreiheit zu filtern und es gibt keine rohen Daten zu Standorten und ihrer Barrierefreiheit.

Einzelne Bezirke machen es leichter, sich eine Übersicht des barrierefreien Angebots in Verwaltungsgebäuden zu verschaffen. Tempelhof-Schöneberg zum Beispiel veröffentlicht eine [Webseite](https://www.berlin.de/ba-tempelhof-schoeneberg/ueber-den-bezirk/artikel.325220.php) mit einer Liste von bezirklichen Gebäuden und ihrer Barrierefreiheit. Auch wenn es immer noch keine offenen Daten sind, ist diese Seite mindestens überschaubarer und leichter zu nutzen.

*   [Standorte von Verwaltungsgebäuden (Webseite)](https://service.berlin.de/standort/122219/)

### Barrierefreiheit in Schulen

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Die Senatsverwaltung für Bildung, Jugend und Familie verwaltet ein [online-Verzeichnis](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/) aller Schulen in Berlin. Dort ist es zwar möglich, nach behindertengerechten Schulen zu suchen, aber der Begriff bleibt zunächst unklar und man weiß nicht genau, welche Behinderungen gemeint sind. Um das zu erfahren, muss man eigentlich die einzelnen Profile der Schulen lesen (und wenn man das macht, ist es klar, dass behindertengerechte Schulen überwiegend Schulen mit rollstuhlgerechten Gebäuden und Toiletten sind). Das Schulverzeichnis ist nicht aktuell als Open Data verfügbar.

Zur Frage, welche Schulen auch für seh- oder hörbehinderte Schüler\*innen geeignet sind, gibt es [diese kleine Anfrage](https://kleineanfragen.de/berlin/18/10436-nachfrage-zur-barrierefreiheit-an-berliner-schulen) vom Februar 2017. Die Anfrage beinhaltet eine Tabelle (ab Seite 15), die zeigt, welche Schulen besondere Unterstützung für sehbehinderte oder gehörlose Schüler\*innen anbieten. Es ist aber unklar, wie genau die Tabelle erfasst wurde und wie umfassend sie ist. Eine [Anfrage von 2014](https://kleineanfragen.de/berlin/17/13570-schulen-mit-sonderpaedagogischen-foerderschwerpunkten) bietet eine tabellarische Übersicht der Anzahl von Schüler\*innen mit einer Behinderung oder mit anderen besonderen Bedürfnissen (z.B., Schüler\*innen mit Autismus) an, die allgemeine öffentlichen Schulen besuchen (entstanden im Rahmen eines berlinweiten Förderprogramms für mehr Inklusion in Schulen). Die Daten sind wahrscheinlich zu alt für Analysen heute, bieten aber trotzdem einen Einblick, wie viele Schüler\*innen in Berlin barrierefreie Schulen brauchen.

*   [Berliner Schulverzeichnis (Webseite)](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/)
*   [Februar 2017 kleine Anfrage zu Barrierefreiheit in Schulen (PDF)](https://kleineanfragen.de/berlin/18/10436-nachfrage-zur-barrierefreiheit-an-berliner-schulen)

### Barrierefreiheit in Kultureinrichtungen

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Berlins Museumsportal bietet [eine Suchfunktion für Barrierefreiheit](https://www.museumsportal-berlin.de/en/museums/#filter_section=accessibility) an, die es leicht macht, Museen mit Angeboten für bestimmte Behinderungen (nicht nur Menschen mit beschränkter Mobilität) zu finden. Durch diese Seite ist es auch möglich, [Führungen für Menschen mit Behinderungen](https://www.museumsportal-berlin.de/en/guided-tours/#filter_section=accessibility) zu finden. Für beide Funktionen gibt es aber keine maschinenlesbaren Daten.

Für Theater gibt es eine [kleine Anfrage vom Januar 2019](https://kleineanfragen.de/berlin/18/17396-kultur-ohne-barrieren), die nach dem Angebot von Rollstuhlplätzen gefragt hat. In der Antwort wurde eine Tabelle mit verschiedenen Informationen dazu veröffentlicht, zum Beispiel wie viele Plätze für Rollstuhlfahrer\*innen jede Bühne hat und wie man die Plätze buchen kann.

*   [Barrierefreie Museen (Webseite)](https://www.museumsportal-berlin.de/en/museums/#filter_section=accessibility)
*   [Barrierefreie Museumführungen (Webseite)](https://www.museumsportal-berlin.de/en/guided-tours/#filter_section=accessibility)
*   [Januar 2019 kleine Anfrage zu Barrierefreiheit bei Theatern (PDF)](https://kleineanfragen.de/berlin/18/17396-kultur-ohne-barrieren)

### Behindertenparkplätze im öffentlichen Raum

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Auf ihrer [Webseite für Touristen, die Mobilitätseinschränkungen haben](https://www.visitberlin.de/de/berlin-fuer-rollstuhlfahrer-und-gehbehinderte), behauptet VisitBerlin, dass es ca. 1300 öffentliche Behindertenparkplätze in Berlin gibt. Um diese Plätze aber zu finden, verweist die Seite ihre Besucher an MyHandicap.de. Wenn man aber über diese Webseite [nach Parkplätzen in Berlin sucht](https://www.myhandicap.de/adressverzeichnis/barrierefreie-adressen-suchen/#startresult) bekommt man nur 766 Ergebnisse – also, ungefähr die Hälfte des Angebots in Berlin (und die Quelle der Daten bleibt unklar).

Eine Antwort auf [eine kleine Anfrage vom Dezember 2017](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12872.pdf) liefert Zahlen von Behindertenparkplätzen insgesamt, aber nur für 7 Bezirke – die anderen 5 Bezirke haben entweder keine Statistiken dazu oder einfach nicht auf die Anfrage reagiert.

*   [Öffentliche Behindertenparkplätze (Webseite)](https://www.myhandicap.de/adressverzeichnis/barrierefreie-adressen-suchen/#startresult)
*   [Dezember 2017 kleine Anfrage zu Behindertenparkplätzen (PDF)](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12872.pdf)

### Barrierefreie öffentliche Toiletten

<u>Status: Begrenzte Verfügbarkeit offener und nicht-offener Daten</u>  
Nur ein Bezirk, Lichtenberg, veröffentlicht als Open Data die [Standorte von öffentlichen Toiletten](https://daten.berlin.de/datensaetze/%C3%B6ffentliche-toiletten-im-bezirk-lichtenberg). Der Datensatz beinhaltet auch ein Feld dafür, ob der Standort auch barrierefrei ist. VisitBerlin verlinkt auch eine [PDF-Liste](https://www.visitberlin.de/system/files/document/wall_city_toileten.pdf) von Standorten barrierefreier Toiletten in Berlin. Leider wurde diese Liste zuletzt im Februar 2010 aktualisiert.

*   [Öffentliche Toiletten im Bezirk Lichtenberg (diverse Datenformate)](https://daten.berlin.de/datensaetze/%C3%B6ffentliche-toiletten-im-bezirk-lichtenberg)
*   [2010 Liste von barrierefreien Toiletten (PDF)](https://www.visitberlin.de/system/files/document/wall_city_toileten.pdf)

### Barrierefreie Spielplätze

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Wie viele andere Daten, sind die Daten für barrierefreie Spielplätze in Berlin nur über die verschiedenen Bezirksämter verfügbar. Eine [kleine Anfrage vom Juli 2018](https://kleineanfragen.de/berlin/18/15804-barrierefreie-spielplaetze-in-berlin) hat nach Informationen zu solchen Spielplätzen gefragt, aber die meisten Bezirke haben wenige bis gar keine nützlichen Informationen dazu geliefert (zum Beispiel: in seiner Antwort hat das Bezirksamt Mitte auf sein Spielplatzportal mit Informationen zu barrierefreien Spielplätzen hingewiesen. In diesem Portal gibt es aber keine Möglichkeit, nach barrierefreien Spielplätzen zu suchen).

*   [Juli 2018 kleine Anfrage zu barrierefreien Spielplätzen (PDF)](https://kleineanfragen.de/berlin/18/15804-barrierefreie-spielplaetze-in-berlin)

Demographische Statistiken
--------------------------

### Bevölkerungsstatistiken für Menschen mit Behinderungen

<u>Status: Offene Daten verfügbar</u>  
Das Amt für Statistik Berlin-Brandenburg veröffentlicht aggregierten Daten zu Menschen mit Behinderungen in Berlin. Es gibt zwei relevante Datensätze. Der erste ist [eine Zeitreihe](https://www.statistik-berlin-brandenburg.de/statistiken/langereihen.asp?Ptyp=450&Sageb=22007&creg=BBB&anzwer=10) (1993 – 2017) für die Anzahl schwerbehinderter Menschen, die in Berlin wohnen. Die Daten sind aufgeschlüsselt nach verschiedenen Kategorien, wie Art der Behinderung und Alter der Menschen. Diese Daten sind aber nicht nach Bezirken aufgegliedert. Der zweite Datensatz wird alle zwei Jahre veröffentlicht [als Teil eines statistischen Berichts](https://www.destatis.de/GPStatistik/receive/BBSerie_serie_00000721). Der Datensatz ist ziemlich detailliert und beinhaltet auch Statistiken für einzelne Bezirke. Die Daten sind aber erst ab 2007 in einem maschinenlesbaren Format verfügbar.

*   [Zeitreihendaten für schwerbehinderten Menschen in Berlin (XLSX)](https://www.statistik-berlin-brandenburg.de/statistiken/langereihen.asp?Ptyp=450&Sageb=22007&creg=BBB&anzwer=10)
*   [Statistischer Bericht über schwerbehinderte Menschen in Berlin (XLS)](https://www.destatis.de/GPStatistik/receive/BBSerie_serie_00000721)

Wohnungen
---------

### Statistische Daten zu barrierefreie Wohnungen

<u>Status: Begrenzte Verfügbarkeit nicht-offener Daten</u>  
Wir kennen kaum offene noch geschlossene Daten zur Versorgung barrierefreier Wohnungen in Berlin. Solche Informationen wären nützlich, um zu bewerten, ob z.B. das aktuelle Angebot die Bedarfe der Menschen mit Behinderungen in Berlin erfüllt , zum Beispiel, oder ob bestimmte Bezirke hinterherhinken. Das LaGeSo bietet [ein online-Portal](http://www.rb-wohnungen.de/) für die Suche nach barrierefreien Wohnungen an, aber diese Webseite liefert keine Informationen zu der Gesamtzahl solcher Wohnungen in Berlin. [Eine kleine Anfrage vom Dezember 2015](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf) zu barrierefreien Wohnungen in Berlin beinhaltet eine Tabelle über "altersgerechte" Wohnungen in Berlin. Altersgerechte Wohnungen sind enteweder rollstuhlgerecht oder barrierearm. Die Tabelle unterschiedet aber nicht zwischen den zwei Kategorien, das heißt, die Tabelle \*lässt\* unklar, wie viele Wohnungen existierien, die für Rollstuhlfahrer geeignet sind.

  

*   [Dezember 2015 kleine Anfrage zu barrierefreien Wohnungen (PDF)](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf)

Wieso sind Daten zu Barrierefreiheit so wichtig?
------------------------------------------------

Die Diskussion darüber, was eine Smart City ausmacht, fokussiert sich häufig auf die Frage, wie urbane Infrastrukturen und Services effizienter gestaltet werden können, um die Lebensqualität der Bürger\*innen zu erhöhen. Dabei wird oft vergessen, dass nicht alle Menschen die gleichen Bedürfnisse haben. Schlecht durchdachte Smart City-Initiativen laufen nicht nur Gefahr, die Teilhabe bestimmter Bevölkerungsgruppen zu erschweren (was für sich schon schlimm genug wäre), [sondern können diese Menschen sogar vor ganz neue Probleme in ihrem Alltag stellen.](https://www.technologyreview.com/s/612712/smart-cities-coule-be-lousy-if-you-have-a-disability/)

Eine Smart City kann nicht wirklich smart sein, wenn Teile der Bevölkerung an der Stadtgrenze steckenbleiben. Qualität hochwertige und gut verfügbare Daten zur Barrierefreiheit eröffnen allen Bewohner\*innen die Möglichkeit an der digitalen Stadt teilzuhaben.  

Weitere Ressourcen
------------------

{% include macro-image-section-markdown-small.html src="../images/wheelmap.png" caption="Die Webseite Wheelmap sammelt „crowdsourced“ Informationen zur Rollstuhlgerechtigkeit verschiedener Orte in Berlin" %}

Es gibt einige Webseiten, die selbst keine rohen Daten zur Verfügung stellen, die aber trotzdem nützliche Informationen zu Barrierefreiheit in Berlin bieten:  
  
**[Broken Lifts](http://brokenlifts.org/)**: Wie am Anfang dieses Posts erwähnt, ist BrokenLifts eine gute Ressource für den Betriebsstatus von Aufzügen in Bahnhöfen.  
  
**[WheelMap](https://wheelmap.org/search)**: Diese Seite sammelt „crowdsourced“ Informationen zur Rollstuhlgerechtigkeit verschiedener Orte in Berlin, wie Restaurants, Museen und Hotels. Ihre Daten sind auf OpenStreetMaps gespeichert und können dadurch heruntergeladen und weiterverwendet werden.  
  
**[Mobidat](https://www.mobidat.net)**: Dieses Portal sammelt auch crowdsourced Informationen für Orte in Berlin, fokussiert sich aber auf ein breiteres Publikum als bei WheelMap, denn die Webseite sammelt auch Informationen für gehörlose, sehbehinderte und anderweitig eingeschränkte Menschen.