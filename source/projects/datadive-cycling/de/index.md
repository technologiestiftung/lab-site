---
layout: project
description: Eine Analyse der Verfügbarkeit von Daten für den Radverkehr
lang: de
title: "Data Dive: Radverkehrsdaten in Berlin"
subtitle: Welchen Daten gibt es?
type: dataset
colorMode: bright
featuredImage: /projects/datadive-cycling/images/featured.jpg
thumbnail: /projects/datadive-cycling/images/thumbnail.jpg
heroImage: /projects/datadive-cycling/images/hero.jpg
visible: true
featured: false
authors:
  - victoria-dykes
start: 2018-09-02
end: 2018-09-17
status: finished
date: 2018-09-17
redirect_from:
  - /projects/datadive_cycling/index.html

---


Vorstellung: Data-Dives
-----------------------

_Dieser Beitrag ist der erste von (hoffentlich) vielen "Data Dives", die wir im Rahmen des Projekts [Open Data Informationsstelle](http://odis-berlin.de/) durchführen. Ein Data Dive ist eine ausführliche Analyse eines Themas aus datenzentrierter Perspektive, wobei wir uns auf Themen konzentrieren wollen, die von großem öffentlichen Interesse sind. Im Wesentlichen verfolgen wir dabei zwei Fragen: Erstens, welche Daten sind erforderlich oder nützlich, um ein umfassendes Verständnis für dieses Thema zu entwickeln? Zweitens, wie steht es um deren Verfügbarkeit – sind die Daten offen zugänglich, sind sie maschinenlesbar, existieren sie überhaupt? So wollen wir einerseits vorhandene Ressourcen leichter auffindbar machen, andererseits zeigen, wo es einen Bedarf nach mehr und besseren Datenquellen gibt._

Eintauchen in Radverkehrsdaten
------------------------------

Radverkehr ist ein Thema, das viele Berliner\*innen bewegt, zumal der Bedarf nach besserer Radinfrastruktur offenkundig ist. Im Juni hat das Berliner Abgeordnetenhaus ein Mobilitätsgesetz verabschiedet, in dem auch der Ausbau der städtischen Radinfrakstruktur eine wichtige Rolle spielt.

In den nachfolgenden Abschnitten versuchen wir, die jeweils wesentlichen Datensätze zu benennen und wo immer möglich auch zu verlinken. Viele der Datensätze stammen aus dem [FIS-Broker](https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/), dem zentralen Geodatenportal des Landes Berlin. Theoretisch sind die meisten Datensätze des FIS-Brokers frei zugänglich. In der Praxis ist die Plattform leider nicht sehr benutzerfreundlich, was vor allem unerfahrene Anwender\*innen vor Probleme stellt. Um eine leichtere Weiterverwendung zu ermöglichen, haben wir die wichtigsten Datensätze in gängige Formate (GeoJSON, KML, etc.) konvertiert und bieten sie über unsere [Daten-Seite](https://data.technologiestiftung-berlin.de) zum Download an. Wir arbeiten übrigens gerade an einem Werkzeug, um diese Konvertierung zukünftig zu automatisieren – dazu bald mehr.

Falls ihr Fehler entdeckt, Verbesserungs- oder Ergänzungsvorschläge habt oder weitere relevante Datenquellen zum Thema kennt, meldet euch gerne unter [dykes@technologestiftung-berlin.de](mailto:dykes@technologiestiftung-berlin.de)

Radinfrastrukturdaten
---------------------

{% include macro-image-section-markdown.html src="../images/radverkehrsanlagen.png" caption="Existierende Radwege in Berlin" %}

### Radwege – existierend

<u>Status: Offene Daten verfügbar</u>  
Geodaten zu bestehenden Radwegen sind im FIS-Broker vorhanden. Die aktuelle Karte wurde zuletzt im April 2017 aktualisiert; Zum Aktualisierungszyklus sind keine Informationen vorhanden. Die Karte verzeichnet Radwege, Radfahrstreifen, Schutzstreifen und Bussonderfahrstreifen.

* [Radverkehrsanlagen (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=wmsk_radverkehrsanlagen@senstadt&bbox=383204,5818380,393456,5824453)
* [Geodaten zu Radverkehrsanlagen (Lab-Datenportal)](https://data.technologiestiftung-berlin.de/dataset/radverkehrsanlagen)

### Radwege – geplant

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Eine umfassende Übersicht über geplante Bauvorhaben im Bereich der Radinfrastruktur existiert bislang leider nicht. Eine weitreichende Initiative für die Verbesserung von Radinfrastruktur quer durch die Stadt wurde in 2011 angekündigt, und [eine Karte der Maßnahmen](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showMap&mapId=k_radausbau@senstadt) ist im FIS-Broker zu finden. Es gibt aber kaum Informationen dazu, ob diese Maßnahmen wie geplant umgesetzt wurden. [Einer Webseite der Senatsverwaltung für Umwelt, Verkehr und Klima](https://www.berlin.de/senuvk/verkehr/politik_planung/rad/strategie/de/m_strassen.shtml) lässt sich zum Beispiel entnehmen, dass das Fahrradrouten-Hauptnetz "bis 2017 in gut befahrbarer Qualität fertig gestellt und ausgeschildert werden" soll – was konkret passiert ist, bleibt jedoch unklar.

Die meisten Baumaßnahmen werden von den einzelnen Bezirksämtern koordiniert und durchgeführt. Um einen umfassenden Überblick zu erhalten, muss man sich entsprechend an die jeweiligen Bezirke wenden. Jedoch veröffentlicht bislang kein Bezirk maschinenlesbare Daten zur Radwegeplanung. Stattdessen muss man sich durch zahlreiche PDFs oder Webseiten arbeiten, um (hoffentlich) die gewünschten Informationen zu finden. Einige Bezirke, wie [Charlottenburg-Wilmersdorf](https://www.berlin.de/ba-charlottenburg-wilmersdorf/verwaltung/aemter/ordnungsamt/strassenverkehr-parken/artikel.576690.php#IIIb), [Friedrichshain-Kreuzberg](https://www.berlin.de/ba-friedrichshain-kreuzberg/aktuelles/pressemitteilungen/2018/pressemitteilung.670050.php) und [Neukölln](https://www.berlin.de/ba-neukoelln/aktuelles/pressemitteilungen/2017/pressemitteilung.571489.php) haben entweder PDF-Berichte oder Webseiten, auf denen geplante Radinfrastrukturmaßnahmen veröffentlicht werden. Es bleibt aber oft unklar, ob diese Projekte wie geplant realisiert werden, oder ob es vielleicht zu Verzögerungen kommt. Viele der Seiten oder Berichte wurden seit Jahren nicht aktualisiert. Kurzum: die Sammlung von Informationen zu geplanten Baumaßnahmen ist ein mühevoller Prozess, und der einzige Weg, den Status einzelner Maßnahmen nachzuvollziehen ist oft, die Bezirke direkt zu fragen.

Eine weitere Informationsquelle zu geplanten Radinfrastrukturmaßnahmen ist die Zuteilung von Haushaltsmitteln von der Hauptverwaltung an die Bezirke. Auch dadurch bekommt man jedoch keinen wirklichen Überblick über geplante Projekte – nur weil eine Maßnahme im Haushalt steht, heißt das nicht, dass sie auch umgesetzt wird. Zudem sind die Informationen über geplante Maßnahmen sehr überschaubar (man weiß, um welche Straße es geht, aber nicht, was genau geplant wird). Trotzdem bieten Landes- und Bezirkshaushalte einen weiteren interessanten Einstiegspunkt. Auch einige schriftliche Anfragen aus dem Abgeordnetenhaus erlauben diesbezüglich Einblicke. [Eine Antwort von März 2018](https://kleineanfragen.de/berlin/18/13947-umsetzung-des-massnahmenpakets-zur-verbesserung-der-radinfrastruktur) beinhaltet zum Beispiel Tabellen für finanzierte Maßnahmen in 2017 und 2018.

Das Daten-Team des Tagesspiegel hat vor einigen Monaten damit begonnen, Informationen zu allen existierenden und geplanten Radwegen in Berlin zu sammeln. Die Ergebnisse wurden in Form einer [interaktiven Karte](http://digitalpresent.tagesspiegel.de/hier-plant-berlin-neue-radwege) veröffentlicht. Aber auch der Tagesspiegel weist darauf hin, dass die schlechte Informationslage zu vielen Lücken und Ungenauigkeiten in der Karte führt.

Zuletzt hat das Projekt [FixMyBerlin](https://fixmyberlin.de/) eine Online-Plattform entwickelt, die zeigt, wo in der Stadt neue Radwege oder Maßnahmen für existierende Wege [geplant sind.](https://fixmyberlin.de/planungen) Die Daten kommen aus den Bezirksämtern selbst, also wenn ihre eigene Daten nich vollständig sind, reflektieren einige Eingaben auf der Plattform das auch (z.B., Projekte wo die Fertigstellung der Pläne derzeitig unbekannt ist). Aber insgesamt ist FixMyBerlin eine sehr nützliche Ressource, um Baumaßnahmen nachzuvollziehen. Ihre Daten sind [durch eine API](https://fixmyberlin.de/api) abrufbar.

*   [Baumaßnahmen zur Verbesserung der Radverkehrsinfrastruktur 2012 (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showMap&mapId=k_radausbau@senstadt)
*   [Schriftliche Anfrage zur Umsetzung des Maßnahmenpakets zur Verbesserung der Radinfrastruktur](https://kleineanfragen.de/berlin/18/13947-umsetzung-des-massnahmenpakets-zur-verbesserung-der-radinfrastruktur)

CSV-Dateien aus der oben gennanten schriftlichen Anfrage mit geplanten Maßnahmen zur Verbesserung der Radinfrastruktur, aufgeteilt nach Kapitel und Titel:

*   [Kapitel 0730, Titel 52108 (2017)  
    7 KB, extrahiert 08/2018](https://raw.githubusercontent.com/technologiestiftung/lab-site/master/docs/projects/datadive_cycling/Data/PlannedRoutes_2017_Titel52108.csv)
*   [Kapitel 0730, Titel 52108 (2018-19)  
    6 KB, extrahiert 08/2018](https://raw.githubusercontent.com/technologiestiftung/lab-site/master/docs/projects/datadive_cycling/Data/PlannedRoutes_201819_Titel52108.csv)
*   [Kapitel 0730, Titel 72016 (2017)  
    3 KB, extrahiert 08/2018](https://raw.githubusercontent.com/technologiestiftung/lab-site/master/docs/projects/datadive_cycling/Data/PlannedRoutes_2017_Titel72016.csv)
*   [Kapitel 0730, Titel 72016 (2018-19)  
    3 KB, extrahiert 08/2018](https://raw.githubusercontent.com/technologiestiftung/lab-site/master/docs/projects/datadive_cycling/Data/PlannedRoutes_20181920_Titel72016.csv)

### Radschnellwege

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Radschnellwege sind eine besondere Art von Radinfrastruktur: Sie bieten Fahrradfahrern einen effizienten, zumeist von Autos und Fußgängern separierten Streckenverlauf. Die Senatsverwaltung für Umwelt, Klima und Verkehr hat dieses Jahr Pläne für mehrere neue Radschnellwege in Berlin angekündigt. Diese Pläne wurden aber bisher nur als PDF-Karten und Textbeschreibungen veröffentlicht.

  

*   [Radschnellverbindungen im Berliner Stadtgebiet (Webseite)](https://www.berlin.de/senuvk/verkehr/politik_planung/rad/schnellverbindungen/)

Allgemeine Daten zur Straßeninfrastruktur
-----------------------------------------

{% include macro-image-section-markdown.html src="../images/trafficinfo.png" caption="Aktuelle Verkehrsmeldungen in Berlin von der VIZ" %}

### Berlins Straßennetz

<u>Status: Offene Daten verfügbar</u>  
Natürlich sind auch allgemeine Daten zum Berliner Straßennetz für Radfahrende relevant. Hierzu existieren im FIS-Broker zwei Datensätze: Einer zum übergeordneten Straßennetz, der nur die Hauptstraßen in Berlin umfasst. Und ein zweiter zum Detailnetz, der sämtliche Straßen sowie Tunnel und Brücken beinhaltet.

*   [Übergeordnetes Straßennetz (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showMap&mapId=verkehr_strnetz@senstadt)
*   [Detailnetz Berlin (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_vms_detailnetz_wms_spatial@senstadt)
*  [Geodaten zum Straßennetz (Lab-Datenportal)](https://data.technologiestiftung-berlin.de/dataset/detailnetz_strassenabschnitte)

### Straßenbau

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Baumaßnahmen haben großen Einfluss auf Mobilität in der Stadt, egal ob man mit Rad, Auto oder den öffentlichen Verkehrsmitteln unterwegs ist. Informationen über Straßenbaumaßnahmen in Berlin sind zur Zeit nicht als offene Daten verfügbar. Die Verkehrsinformationszentrale Berlin verwaltet eine Webseite mit einer Verkehrslagekarte, welche die aktuelle Verkehrslage zeigt (inklusive Baumaßnahmen). Aber auch hier werden keine Rohdaten geliefert, sondern nur eine Karte und eine HTML-Liste aller Meldungen. Weiterhin werden nur Informationen für Hauptstraßen angezeigt; für Informationen über lokaliserte Sperrungen, muss man sich wieder an die jeweiligen Beizrke wenden. Wie bei den geplanten Radinfrastrukturprojekten sind auch hier die online zu findenden Informationen oft nicht aktuell.

*   [Verkehrslagekarte (Webseite)](https://viz.berlin.de/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=traffic&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=traffic_default)
*   [Verkehrsmeldungen (Webseite)](https://viz.berlin.de/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=traffic&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=traffic_construction)

### Straßen- und Wegeschäden

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Auch Straßen- und Wegeschäden führen zu Herausforderungen für Rad- und Autofahrer. Informationen zu beschädigten Radwegen können für die Routenplanung hilfreich sein. Auf dem zentralen Portal "Ordnungsamt Online" können Bürger\*innen Straßenschäden (und viele weitere Anliegen) melden. Obwohl die Meldungen selbst [öffentlich sind](https://ordnungsamt.berlin.de/frontend/dynamic/#!meldungAktuell), werden sie nicht auf einer Karte dargestellt. Auch eine Exportfunktion sucht man vergeblich. Deshalb ist es eher schwierig, über dieses Portal einen Überblick über die Straßen- und Wegequalität in Berlin zu erhalten.

Viele Bezirke haben eigene Feedback-Systeme für die Meldung von Straßenschäden. Die meisten veröffentlichen die empfangenen Meldungen jedoch nicht, so dass Fahrradfahrer nur geringe Möglichkeiten haben, sich über beschädigte Wege zu informieren. [Eine Antwort auf einer schriftlichen Anfrage von Juli 2018](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/S18-15676.pdf) erklärt, wie die Bezirke Radwegeschäden beheben und welche Pläne es gibt, diese Wege zu sanieren.

*   [Aktuelle Ordnungsamt Meldungen (Webseite)](https://ordnungsamt.berlin.de/frontend/dynamic/#!meldungAktuell)

### Standort von Lichtsignalanlagen

<u>Status: Offene Daten verfügbar</u>  
"Lichtsignalanlagen" ist Verwaltungsdeutsch für Ampeln. Fahrradfahrer, die eine effiziente Route bevorzugen, wollen eventuell Straßen mit vielen Ampeln vermeiden. Im FIS-Broker findet sich eine Karte mit den Standorten von Ampeln in der Stadt.

*   [Lichtsignalanlagen (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=lsa@senstadt&bbox=384259,5817306,395263,5823841)
*   [Geodaten zu Lichtsignalanlagen (Lab-Datenportal)](https://data.technologiestiftung-berlin.de/dataset/lichtsignalanlagen)

### Standorte und Anzahl von Fahrradabstellplätzen

<u>Status: Keine bekannte Datenquellen verfügbar</u>  
Wer sein Rad zum Beispiel an einem Bahnhof sicher parken möchte, wird sich über Informationen zu entsprechenden Stellplätzen freuen. Leider scheinen diese Daten bislang nicht systematisch gesammelt und gespeichert zu werden. Eine Antwort auf eine schriftliche Anfrage erklärt, dass die Hauptverwaltung keine Informationen über Fahrradabstellplätze besitzt. Möglicherweise existieren auf Bezirksebene Daten dazu, aber wir konnten bislang keine Quelle in Erfahrung bringen.

Open Street Maps beinhaltet Markierungen für Fahrradabstellplätze. Über die Richtigkeit der Angaben lässt sich zwar nichts sagen, aber immerhin existiert damit eine alternative, nicht-offizielle Quelle für diese Informationen.

  

*   [Schriftliche Anfrage zu Fahrradabstellanlagen (PDF)](https://kleineanfragen.de/berlin/18/15500-bike-and-ride)

Nutzung von Radinfrastruktur
----------------------------


{% include macro-image-section-markdown.html src="../images/autovolume.png" caption="Eine Karte der Verkehrsbelastung von Straßen in Berlin" %}

### Fahrradunfälle

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Daten darüber, wo, wann und wie häufig es in Berlin zu Fahrradunfällen kommt, werden bislang nicht in maschinenlesbarer Form veröffentlicht. Die Berliner Polizei publiziert lediglich einen jährlichen PDF-Bericht zu Verkehrsunfällen mit Radbeteiligung. Die darin enthaltenen Daten sind zwar tabellarisch strukturiert, sie lassen sich also theoretisch extrahieren (siehe nächster Absatz), geben aber keine genaue Beschreibung des Unfallorts – maximal wird eine Straßenkreuzung benannt.

Für Code-affine Menschen gibt es dank Stephan Wehrmeyer ein Parsing-Tool für diese PDF-Berichte, das [auf GitHub verfügbar ist](https://github.com/stefanw/verkehrsunfallstatistik). Das mag keine perfekte Lösung sein, da die Genauigkeit der Daten wie gesagt zu Wünschen übrig lässt, ist aber trotzdem ein hilfreicher Schritt in Richtung weiterverwertbarer Daten. Stefan hat auch Visualisierungen für die Daten von [2017](https://stefanwehrmeyer.carto.com/viz/4fc39e13-8dbb-4d3f-a181-b2918861b6de/public_map), [2016](https://stefanwehrmeyer.carto.com/viz/5eae5a82-366a-11e7-a26a-0e233c30368f/public_map) and [2015](https://stefanwehrmeyer.carto.com/viz/06889e1a-21b4-11e6-a734-0ea31932ec1d/public_map) erstellt, aber da die Daten ungenau sind, haben die Visualisierungen die gleiche Schwäche.

**Aktualisierung Dezember 2018:**  
Eine weitere Informationsquelle ist [diese Karte und Tabelle](https://www.berlin.de/senuvk/verkehr/lenkung/unfallkommission/download/UK_HSTBerlin.pdf) von bekannten Unfallhäufungsstellen in der Stadt. Dieses Dokument wurde von der [Unfallkommission](https://www.berlin.de/senuvk/verkehr/lenkung/unfallkommission/) der SenUVK veröffentlicht. Die Informationen sind zwar strukturiert aber trotzdem nicht besonders detailliert (es gibt zum Beispiel keine Koordinaten oder andere Georeferenzierung für die erwähnten Standorten). Weiterhin fassen die Daten alle Arten von Autounfällen um, nicht nur die Fälle, wo ein Fahrrad mitinvolviert wurde.

*   [Jährliche Berichte – Verkehrsunfälle mit Radfahrern (PDFs)](https://www.berlin.de/polizei/aufgaben/verkehrssicherheit/verkehrsunfallstatistik/#radfahrer)

### Radverkehrszählungen

<u>Status: Offene Daten verfügbar</u>  
Mit 26 Messstationen an 17 Standorten zählt die Verkehrslenkung Berlin das Radverkehrsaufkommen an ausgewählten Orten. Die Daten können über eine Web-Karte betrachtet oder als Excel-Datei heruntergeladen werden (beide sind [hier](https://www.berlin.de/senuvk/verkehr/lenkung/vlb/de/radzaehlungen.shtml) zu finden). Die Excel-Datei enthält stündliche Messwerte ab 2012, wobei zwischen 2012 und 2014 nur eine Messstation in Betrieb war. Für spezifische Fragen zu den Erhebungen gibt es eine [FAQ-Seite.](https://www.berlin.de/senuvk/verkehr/lenkung/vlb/de/radzaehlungen_faq.shtml) Zusätzlich zu diesem Datensatz veröffentlicht die Senatsverwaltung für Umwelt, Verkehr und Klimaschutz einen jährlichen Bericht zu Fahrradverkehr-Pegelzählungen. Diese Berichte enthalten historische Daten seit 1982, aber nur als PDF. Die Berichte findet man [hier](https://www.berlin.de/senuvk/verkehr/lenkung/vlb/de/erhebungen.shtml) (rechte Spalte, Download, "Fahrradverkehr-Pegelzählungen").

Das Lab hat vor Kurzem [unsere eigene Analyse](https://lab.technologiestiftung-berlin.de/projects/bikerides/index.html) von den Zählstellendaten veröffentlicht. Unsere Visualisierung ermöglicht sogar eigene Analysen durchzuführen, z.B. um zu sehen wie der stündliche Verkehr am Wochenenden sich von dem Verkehr am Wochentagen unterscheidet.

Eine weitere Methode, um Rückschlüsse auf Fahrradfahrer in der Stadt zu erhalten, sind Daten über den Verkauf von Fahrrad-Fahrausweisen für die öffentlichen Verkehrsmittel. [Eine Antwort auf einer schriftlichen Anfrage in 2013](https://kleineanfragen.de/berlin/17/12050-verknuepfung-der-verkehrstraeger-oepnv-und-fahrrad) hat die Zahlen für 2008 bis 2012 zu Tage gefördert. Aktuellere Zahlen haben wir bislang nicht gefunden.

*   [Karte zu Fahrrad-Zählungen (Webseite)](https://www.berlin.de/senuvk/verkehr/lenkung/vlb/de/karte.shtml)
*   [Tabelle zu Fahrrad-Zählungen, 2012-2017 (Excel-Datei)](https://www.berlin.de/senuvk/verkehr/lenkung/vlb/download/radzaehlung/Gesamtdatei_Stundenwerte_2014_2017.xlsx)

### Autoverkehr

<u>Status: Offene Daten verfügbar</u>  
Das Autoverkehrsaufkommen einer Straße hat auch Auswirkungen auf die Sicherheit des Radverkehrs – viele Fahrradfahrer nutzen lieber wenig befahrene Straßen, wenn sie denn eine Wahl haben. Im FIS-Broker findet sich eine Karte mit Verkehrsmengen von Kraftfahrzeugen auf Berliner Straßen. Die aktuellste Karte wurde 2017 veröffentlicht, die Daten stammen aber eigentlich aus 2014. [Ein Bericht](https://www.stadtentwicklung.berlin.de/umwelt/umweltatlas/id701.htm) von der Senatsverwaltung für Umwelt, Verkehr und Klimaschutz erklärt, wie die Daten erhoben und aufbereitet werden.

*   [Verkehrsmengen 2014 (FIS-Broker-Karte)](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=wmsk_07_01verkmeng2014@senstadt&bbox=388207,5818680,395085,5822381)
*   [Geodaten zu Verkehrsmengen (Lab-Datenportal)](https://data.technologiestiftung-berlin.de/dataset/verkehrsmengen)

Sonstiges
---------

### Fahrraddiebstahl

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u> 
Fahrraddiebstahl ist ein berlinweites Problem, aber doch gibt es signifikante Unterschiede innerhalb des Stadtgebiets. Daten zu Fahrraddiebstählen sind, wie die Kriminalitätsstatistik insgesamt, nicht als offene Daten verfügbar. In einer Antwort auf eine schriftliche Anfrage von 2018 wurden Zahlen zu sogenannten "Hotspots" (die 5 Orte mit den meisten angezeigten Diebstahlfällen) tabellarisch in einem PDF für 2015 bis 2017 veröffentlicht. Die Daten sind nach Bezirk und Planungsraum aufgeteilt. Eine ähnliche Anfrage von 2015 hat Zahlen für 2010 bis 2015 offenbart, aber jeweils nur auf Bezirksebene aufgeschlüsselt.

**Aktualisierung Dezember 2018:**  
Die Berliner Polizei haben maschinenlesbare Daten für Fahrraddiebstahl für 2012 – 2017 bereitgestellt. Diese Daten wurden im Rahmen des neuen [Kriminalitätsatlas](https://www.kriminalitaetsatlas.berlin.de/) veröffentlicht und beinhalten Statistiken für die Anzahl von Fällen sowie die Häufigkeitszahl. Beide Statistiken sind pro Bezirk und Bezirksregion verfügbar. Die Excel-Datei kann [hier](https://daten.berlin.de/datensaetze/kriminalit%C3%A4tsatlas-berlin) direkt heruntergeladen werden.

*   [2018 Schriftliche Anfrage zu Fahrraddiebstahl in Berlin (PDF)](https://kleineanfragen.de/berlin/18/13845-fahrraddiebstahl-in-berlin)
*   [2015 Schriftliche Anfrage zu Fahrraddiebstahl in Berlin (PDF)](https://kleineanfragen.de/berlin/17/17068-reduzierung-und-umstellung-der-fahrrad-codierungen-durch-die-berliner-polizei-ist-das-sinnvoll)

CSV-Datei, extrahiert aus der Anfrage von 2018:

*   [Fahrraddiebstahl Hotspots nach Planungsraum (2015-2017)  
    3 KB, extrahiert 08/2018](https://raw.githubusercontent.com/technologiestiftung/lab-site/master/docs/projects/datadive_cycling/Data/Theft1517planungsraumHOTSPOTS.csv)

### Bikesharing

<u>Status: Begrenzte, nicht-offene Daten verfügbar</u>  
Im letzten Jahr ist die Anzahl von Leihfahrrädern in Berlin explodiert. Zahlreiche Bikesharing-Unternehmen sind in Berlin aktiv. Genaue Zahlen zu Anbietern oder Leihrädern sind jedoch schwieriger zu finden. [Eine Antwort auf eine schriftliche Anfrage im Februar 2018](https://kleineanfragen.de/berlin/18/13328-leihfahrraeder-in-berlin) enthält lediglich Zahlen zu einem Anbieter (Deezer Nextbike); für 6 andere bekannte Firmen, gibt es nur grobe Schätzungen. [Auch eine Antwort auf eine zweite Anfrage von Juni 2018](https://kleineanfragen.de/berlin/18/15312-leihfahrraeder-in-berlin-iienquiry) blieb genauere Zahlen schuldig.