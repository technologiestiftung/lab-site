---
layout: project
description: Rückblick
lang: de
title: Rückblick - Highlights aus unserem ersten Jahr
subtitle: Ein Blick zurück und einer nach vorn
type: publication
colorMode: bright
thumbnail: /projects/od-for-cities/images/thumbnail.jpg
heroImage: ""
socialMediaImage: /projects/od-for-cities/social_media.jpg
visible: true
featured: false
authors:
  - benjamin-seibel
start: 2019-04-23
end: 2019-04-23
status: finished
date: 2019-04-23


---


_“Willst Du erkennen, lerne zu handeln”_ (Heinz von Foerster)

Als wir Anfang 2018 bei der Technologiestiftung Berlin das Ideation & Prototyping Lab gründeten, geschah das aus dem Eindruck, dass der digitale Wandel von Städten zwar viel analysiert, aber nur wenig gestaltet wird. Mit dem Lab haben wir seitdem konsequent das Ziel verfolgt, eigene technische Umsetzungskompetenz aufzubauen, praxisnahe Unterstützung für öffentliche Institutionen anzubieten und eigene Digitalprojekte für die und mit der Stadtgesellschaft umzusetzen. Aus dem kleinen Experiment ist inzwischen ein veritables Civic Tech-Team mit acht festangestellten Personen und einem breiten Netz aus Freelancer*innen geworden. Anlässlich unseres Website-Relaunchs folgt ein Rückblick auf einige Highlights unserer bisherigen Arbeit – und ein Ausblick, auf das, was wir als nächstes vorhaben.

Öffentliche Daten nutzen
------------------------

Wichtiger Bestandteil unserer Arbeit war von Beginn an die Arbeit an und mit offenen Daten und Infrastrukturen. Technische Offenheit ist nicht nur Voraussetzung für Transparenz und eine breite Teilhabe an der Digitalisierung, sondern schafft auch die Bedingungen für agile Kooperation und die niedrigschwellige Entwicklung neuer Lösungen für die Stadtgesellschaft. Um das zu demonstrieren, haben unsere Devevloper um Lead Data Scientist Sebastian Meier in den letzten Monaten verschiedene datengetriebene Web-Anwendungen entwickelt.  

Ein erstes Beispiel, wie aus einer Datenbasis der öffentlichen Verwaltung mit vergleichsweise wenig Aufwand ein nutzerfreundliches Angebot erstellen lässt, lieferte unsere interaktive [Kita-Suche](https://www.kita-suche.berlin), die bereits im Februar 2018 online ging und sich bis heute großer Beliebtheit erfreut. Mit einem Karten-Interface, diversen Filterfunktionen und einem Routing-Algorithmus bietet die Anwendung Unterstützung für Eltern bei der nicht immer leichten Suche nach einem Kitaplatz in Berlin.
{% include macro-image-section-markdown.html src="../images/kita.png" caption="Kita suchen leicht gemacht" %}

Pünktlich zum Start der Badesaison ging dann im Juni unsere zweite größere Web-Anwendung live: Im Rahmen des Forschungsprojekts “Flusshygiene” entstand gemeinsam mit dem Landesamt für Gesundheit und Soziales (LaGeSo), den Berliner Wasserbetrieben (BWB) und dem Kompetenzzentrum Wasser (KWB) eine [App zur Wasserqualität der öffentlichen Badestellen in Berlin](https://www.badestellen-berlin.de). Neben einem zeitgemäßen Frontend wurde auch hinter den Kulissen einiges an Arbeit geleistet – eine neu aufgesetzte Datenpipeline sorgt dafür, dass die Daten tagesaktuell und automatisiert vom LaGeSo in die Anwendung (und gleichzeitig ins [Berliner Open Data-Portal](https://daten.berlin.de) eingespeist werden, zudem wurde ein wissenschaftliches Vorhersagemodell des KWB in die Anwendung integriert.

Mit mehr als 30.000 monatlichen Besuchern wurde die Anwendung über den Sommer zu unserem bislang erfolgreichsten Projekt, das sogar [international für Aufsehen sorgte](https://apolitical.co/solution_article/berlin-steers-bathers-away-from-dirty-lakes-with-daily-pollution-updates/). Das gefiel offenbar auch dem Bundesministerium für Bildung und Forschung so gut, dass dem Projektkonsortium einen Aufstockungsantrag bewilligt wurde, um die Anwendung bundesweit auszurollen. Unser Entwickler Fabian Morón Zirfas arbeitet gegenwärtig an einem kompletten Refactoring, um den ursprünglich von Sebastian Meier entwickelten Prototypen in die Fläche zu bringen.

{% include macro-image-section-markdown.html src="../images/bade.jpg" caption="Aktuelle Daten zur Badewasserqualität" %}

Offene Verwaltungsdaten können aber nicht nur zur Grundlage neuer Bürgerservices werden, sondern bergen auch großes Potenzial für weiterführende Analysen, von denen nicht zuletzt die Verwaltung selbst enorm profitieren kann. Beispielhaft zeigten wir das im Herbst mit [einem Tool zur Analyse der öffentlichen Zuwendungen](https://lab.technologiestiftung-berlin.de/projects/zuwendungsdatenbank/index.html#vis) aus dem Berliner Landeshaushalt. 
Mehr als 73.000 Einzelförderungen aus den letzten zehn Jahren, die vom Land über eine offene Datenbank bereitgestellt werden, lassen sich hier nach unterschiedlichen Kriterien filtern und auswerten. Das sorgt nicht nur für mehr Transparenz bei der Vergabe öffentlicher Gelder, sondern kann auch einzelnen Bezirken und Hauptverwaltungen dabei helfen, bestehende Förderstrategien zu evaluieren und Trends oder Lücken zu identifizieren. 

{% include macro-image-section-markdown.html src="../images/foerder.png" caption="Öffentliche Zuwendungen analysiert" %}

ODIS - Praxisnaher Open Data-Support für Behörden
---------------------------------------------------------------

Der Aufbau eines urbanen Open Data-Ökosystems und die Entwicklung entsprechender Anwendungen sind kein rein technisches Projekt. Vielmehr besteht ein Großteil unserer täglichen Arbeit darin, gemeinsam mit öffentlichen Verwaltungen bestehende Strukturen und Prozesse neu zu denken und so zu gestalten, dass Grundlagen für digitale Innovation geschaffen werden. Unterstützt von der Berliner Senatsverwaltung für Wirtschaft, Energie und Betriebe haben wir zu diesem Zweck die [“Open Data Informationsstelle” (ODIS)](https://www.odis-berlin.de) ins Leben gerufen – ein digitales Service Team, das Behörden bei der Umsetzung von Open Data-Strategien unterstützt. 

Seit Mai 2018 bietet ODIS den Berliner Verwaltungen Hands-on-Unterstützung beim Aufbau von Dateninfrastrukturen und der Bereitstellung von Daten über das offizielle [Open Data-Portal](https://daten.berlin.de) des Landes. Mit unermüdlichem Engagement arbeiten sich unsere Expertinnen Tori Dykes und Alexandra Kapp seitdem durch die Bezirks- und Hauptverwaltungen, organisieren Workshops und Netzwerkveranstaltungen, unterstützen, beraten und informieren mit Geduld und Sachverstand. Neben der allgemeinen strategischen Arbeit setzt ODIS auch immer wieder thematische Schwerpunkte, etwa mit “Data Dives” zu Themen wie Radverkehr [Link ]oder Barrierefreiheit [Link] und dazugehörigen Visualisierungsprojekten [Link Radverkehr]. 

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}

Digitalisierung praktisch werden lassen
----------------------------------------

Tüfteln, testen, sich von der Praxis leiten lassen: Wann immer es die Zeit erlaubte, haben wir die Gelegenheit genutzt, Neues auszuprobieren und dem “Protoyping” im Namen gerecht zu werden. Angefangen bei Experimenten rund um LoRaWAN und das Internet of Things, über die Entwicklung neuer Open Data-Tools und Interfaces, bis hin zu Programmier-Workshops zu Themen wie Spracherkennung oder Künstlicher Kreativität verging kaum eine Woche ohne ein neues Projekt auf unserem GitHub. A propos: Alle Quellcodes des Ideation & Prototyping Lab sind Open Source und wir freuen uns, wenn sie von anderen weitergedacht und entwickelt werden.

Ein paar weitere Highlights in aller Kürze: Unser Beitrag „Mit den Augen der Maschine“ zur Debatte um Künstliche Intelligenz und Gesichtserkennung sorgte bei der Langen Nacht der Wissenschaften für lange Schlangen am Stand der Technologiestiftung. Bei der Ausstellung „CityVis“ präsentierten wir nicht nur herausragende internationale Beiträge zu urbanen Datenvisualisierungen in den Räumen der Senatsverwaltung für Umwelt, Verkehr und Klimaschutz, sondern auch eine eigene Augmented Reality-App, die Berliner Daten auf einem physischen Stadtmodell visualisiert und die nun dauerhaft vor Ort am Köllnischen Park zu sehen ist. Und nicht zuletzt betreiben wir seit letztem Jahr unser eigenes kleines Geodatenportal, auf dem wir ausgewählte offene Datensätze nutzerfreundlich aufbereitet zum Download anbieten. Ach, und die Gerüchte um einen arduinogetriebenen Cocktailroboter, der letzten Sommer auf unserer Dachterrasse gesichtet wurde, möchten wir an dieser Stelle weder bestätigen noch dementieren.

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}
