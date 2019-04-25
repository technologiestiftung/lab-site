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

Als wir Anfang 2018 bei der Technologiestiftung Berlin das Ideation & Prototyping Lab ins Leben riefen, geschah das aus dem Eindruck, dass der digitale Wandel von Städten zwar viel analysiert, aber tatsächlich nur wenig gestaltet wird. Mit dem Lab haben wir seitdem konsequent das Ziel verfolgt, eigene technische Umsetzungskompetenz aufzubauen, praxisnahe Unterstützung für öffentliche und gemeinnützige Institutionen anzubieten und eigene Projekte umzusetzen, um die Digitalisierung Berlins im Sinne der Stadtgesellschaft zu gestalten. Aus dem kleinen Experiment ist inzwischen ein veritables Civic Tech-Team mit acht festangestellten Personen und einem breiten Netz aus Freelancer*innen geworden. Anlässlich unseres Website-Relaunchs folgt ein Rückblick auf einige Highlights unserer bisherigen Arbeit – und ein Ausblick, auf das, was wir als nächstes vorhaben.

Öffentliche Daten nutzen
------------------------

Wichtiger Bestandteil unserer Arbeit war von Beginn an die Arbeit an und mit offenen Daten und Infrastrukturen. Technische Offenheit ist nicht nur Voraussetzung für Transparenz und eine breite Teilhabe an der Digitalisierung, sondern schafft auch die Bedingungen für agile Kooperation und die niedrigschwellige Entwicklung neuer Lösungen für die Stadtgesellschaft. Um das zu demonstrieren, haben unsere Devevloper um Lead Data Scientist Sebastian Meier in den letzten Monaten verschiedene datengetriebene Web-Anwendungen entwickelt.  

Ein erstes Beispiel, wie aus einer Datenbasis der öffentlichen Verwaltung mit vergleichsweise wenig Aufwand ein nutzerfreundliches Angebot erstellen lässt, lieferte unsere interaktive [Kita-Suche](https://www.kita-suche.berlin), die bereits im Februar 2018 online ging und sich bis heute großer Beliebtheit erfreut. Mit einem Karten-Interface, diversen Filterfunktionen und einem Routing-Algorithmus bietet die Anwendung Unterstützung für Eltern bei der nicht immer leichten Suche nach einem Kitaplatz in Berlin.

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}

Pünktlich zum Start der Badesaison ging dann im Juni unsere zweite größere Web-Anwendung live: Im Rahmen des Forschungsprojekts “Flusshygiene” entstand gemeinsam mit dem Landesamt für Gesundheit und Soziales (LaGeSo), den Berliner Wasserbetrieben (BWB) und dem Kompetenzzentrum Wasser (KWB) eine [App zur Wasserqualität der öffentlichen Badestellen in Berlin](https://www.badestellen-berlin.de). Neben einem zeitgemäßen Frontend wurde auch hinter den Kulissen einiges an Arbeit geleistet – eine neu aufgesetzte Datenpipeline sorgt dafür, dass die Daten tagesaktuell und automatisiert vom LaGeSo in die Anwendung (und gleichzeitig ins [Berliner Open Data-Portal](https://daten.berlin.de) eingespeist werden, zudem wurde ein wissenschaftliches Vorhersagemodell des KWB in die Anwendung integriert.

Mit mehr als 30.000 monatlichen Besuchern wurde die Anwendung über den Sommer zu unserem bislang erfolgreichsten Projekt, das sogar [international für Aufsehen sorgte](https://apolitical.co/solution_article/berlin-steers-bathers-away-from-dirty-lakes-with-daily-pollution-updates/). Das gefiel offenbar auch dem Bundesministerium für Bildung und Forschung so gut, dass dem Projektkonsortium einen Aufstockungsantrag bewilligt wurde, um die Anwendung bundesweit auszurollen. Unser Entwickler Fabian Morón Zirfas arbeitet gegenwärtig an einem kompletten Refactoring, um den ursprünglich von Sebastian Meier entwickelten Prototypen in die Fläche zu bringen.

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}

Offene Verwaltungsdaten können aber nicht nur zur Grundlage neuer Bürgerservices werden, sondern bergen auch großes Potenzial für weiterführende Analysen, von denen nicht zuletzt die Verwaltung selbst enorm profitieren kann. Beispielhaft zeigten wir das im Herbst mit [einem Tool zur Analyse der öffentlichen Zuwendungen](https://lab.technologiestiftung-berlin.de/projects/zuwendungsdatenbank/index.html#vis) aus dem Berliner Landeshaushalt. 
Mehr als 73.000 Einzelförderungen aus den letzten zehn Jahren, die vom Land über eine offene Datenbank bereitgestellt werden, lassen sich hier nach unterschiedlichen Kriterien filtern und auswerten. Das sorgt nicht nur für mehr Transparenz bei der Vergabe öffentlicher Gelder, sondern kann auch einzelnen Bezirken und Hauptverwaltungen dabei helfen, bestehende Förderstrategien zu evaluieren und Trends oder Lücken zu identifizieren. 

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}

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







_Vor einer Woche landete der Geschäftsführer des Deutschen Städte- und Gemeindebunds mit der Äußerung in den Schlagzeilen, [deutsche Kommunen sollten ihre Daten verkaufen](https://www.swr.de/swraktuell/idee-des-staedte-und-gemeindebundes-daten-verkaufen-fuer-die-buerger/-/id=396/did=21471578/nid=396/1nforlg/index.html), statt sie „umsonst“ abzugeben. Die nachfolgenden Diskussionen machten deutlich, dass trotz der wachsenden Präsenz der Open-Data-Bewegung noch lange nicht jeder vom Mehrwert offener Daten überzeugt ist. Als Reaktion darauf stellt dieser Blogbeitrag einige Beispiele vor, wie Städte von der Öffnung ihrer Daten profitieren können._

Verwaltungen in aller Welt öffnen ihre Daten: Viele Städte und Kommunen besitzen inzwischen eigene Open Data-Portale, auf denen ausgewählte Daten mit der Öffentlichkeit geteilt werden. Die Beweggründe dafür sind nicht immer klar. Ist es einfach nur der Handlungsdruck, in Sachen Digitalisierung mit den Nachbarstädten mitzuhalten? Oder entstehen aus der Öffnung von Daten reale Mehrwerte für Verwaltungen und Bürger\*innen?

Die Antwort lautet: Ja, Städte können von Open Data profitieren. Wenn sie das Thema ernst nehmen, kann eine Open Data-Strategie spürbare Verbesserungen für Städte und ihre Bürger\*innen bewirken. Hier sind einige Beispiele, die das Potenzial von Open Data für Städte deutlich machen:

Um gesellschaftliche Probleme zu identifizieren und möglicherweise zu lösen
---------------------------------------------------------------------------



Offene Daten können ortsspezifische Probleme aufzeigen, die eine gezielte Intervention erfordern. Die Veröffentlichung von Daten über Auto- oder Fahrradunfälle kann etwa Bürger\*innen oder Organisationen befähigen, gefährliche Kreuzungen zu identifizieren. Zwei Beispiele sind die [CrashMap](http://www.crashmap.co.uk/) aus Großbritannien (eine Karte von Verkehrsunfällen basierend auf Verwaltungsdaten) und das Projekt [Bikecolli](http://bikecolli.info/) aus Tucson, Arizona. Beide Seiten zeigen eindrucksvoll, welche Analysen und Visualisierungen aus Verwaltungsdaten möglich sind.

Die Veröffentlichung von unfallbezogenen Daten ist wichtig, weil schon das Wissen, dass ein Ort für Rad- oder Autofahrer besonders gefährlich ist, das Unfallrisiko senken kann: Eventuell fahren Menschen vorsichtiger an Kreuzungen, die für zahlreiche Unfälle bekannt sind. Unfalldaten könnten auch von Bürger\*innen als Argument genutzt werden, um geeignete Sicherheitsmaßnahmen an bestimmten Orten einzufordern (Geschwindigkeitsbegrenzungen für Autos oder eine Umgestaltung von gefährlichen Kreuzungen). Für ähnliche Analysen gut geeignet sind auch Daten über Straftaten in der Stadt und Daten über von Bürger\*innen gemeldeten Anliegen (letzteres wird im nächsten Abschnitt näher betrachtet). Theoretisch können Städte solche Analyse natürlich auch ohne die Einbeziehung von Bürger\*innen durchführen. Praktisch aber steigt mit der Veröffentlichung der Daten die Wahrscheinlichkeit, dass auch tatsächlich Maßnahmen ergriffen und ein zufriedenstellendes Ergebnis erreicht wird.

{% include macro-image-section-markdown.html src="../images/crashmap.png" caption="Crashmap zeigt Verkehrsunfälle in Großbritannien auf einer Karte" %}

Um Bürgerengagement zu fördern und mehr Vertrauen aufzubauen
------------------------------------------------------------



Die oben genannten Beispiele zeigen auch neue Möglichkeiten für Bürger\*innen, sich vor Ort zu engagieren: Mit der Veröffentlichung detaillierter Daten zu einem spezifischen Kiez oder Stadtteil können neue Perspektiven auf die eigene Stadt entstehen. Dabei muss es auch nicht immer nur um problemorientierte Daten gehen, wie bei Unfällen oder Kriminalität. Es kann auch [eine Karte sein, die zum Beispiel das Alter einzelner Gebäude visualisiert.](https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=showMap&mapId=k06_12baualter@senstadt) Mit solcher Information können Bürger\*innen ihre alltäglichen Umgebungen neu erfahren.

Die Kombination von Open Data und Anliegenmanagement, etwa durch den weit verbreiteten [Open311-Standard](http://www.open311.org/), bietet Bürger\*innen die Möglichkeit, Probleme an die Stadt zu melden und deren Bearbeitung nachzuvollziehen. Städte weltweit haben den Open311-Standard übernommen und bieten Portale an, wo nicht nur Mängel (etwa eine defekte Beleuchtung oder ein verschmutzter Park) an die Stadt übermittelt, sondern auch alle aktuelle Meldungen eingesehen werden können (meistens auf einer Karte geplottet). Oft gibt es auch die Möglichkeit, aktuelle und historische Meldungsdaten herunterzuladen. Beispiele von solchen Portalen sind [NYC311](https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9), [Mängelmelder Bonn](https://anliegen.bonn.de/), oder [Züri wie neu](https://www.zueriwieneu.ch/). Mit der Veröffentlichung dieser Meldungen sowie ihres Bearbeitungsstands als Open Data können Bürger\*innen sehen, wie effektiv die Stadt auf Anliegen reagiert und ob es besondere Orte gibt, wo die gleiche Probleme immer wieder passieren. Solche Transparenz schafft Vertrauen zwischen Bürger\*innen und der Stadtverwaltung, da sich jederzeit nachvollziehen lässt, ob Anliegen angekommen sind und die Stadt aktiv daran arbeitet.

{% include macro-image-section-markdown.html src="../images/zuerich.png" caption="Ein Meldeportal für Bürgeranliegen aus Zürich" %}

Bürgerengagement muss nicht auf Beschwerden beschränkt bleiben. Es gibt auch Möglichkeiten, wie Bürger\*innen selbst zur Generierung offener Daten beitragen können. Bei der Messung der Luftqualität in der Stadt etwa können Bürger\*innen und Verwaltungen zusammenarbeiten: Die Webseite [Luftdaten.info](https://luftdaten.info/) sammelt privat erhobene Messdaten über Schadstoffe in der Luft und macht diese Daten zentral verfügbar. Ein schönes Beispiel für die Verbindung von „Citizen Science“, Bürgerengagement und Stadtentwicklung.

Um die Wirtschaft zu stärken
----------------------------



Die Nutzung offener Daten durch die Privatwirtschaft hat darüber hinaus das Potenzial, das Wirtschaftswachstum vor Ort anzukurbeln. Städte profitieren hier nicht nur durch Steuereinnahmen und Arbeitsplätze, sondern auch durch die Entstehung neuer Anwendungen und Dienstleistungen, die sich positiv auf die Lebensqualität auswirken können. Die Nutzung offener Daten durch die Wirtschaft kann also durchaus eine Win-Win-Situation sein.

Erfahrungsgemäß erweisen sich offene Geo- und Mobilitätsdaten als besonders wertvoll, weil diese Daten häufig der Entwicklung innovativer Lösungen zur effizienteren und nachhaltigen Fortbewegung dienen. In Berlin nutzt etwa die [Bike Citizens GmbH](https://www.bikecitizens.net/de/) raumbezogene Daten, um Radfahrer\*innen optimierte Routingvorschläge anzubieten. Bike Citizens koppelt diese Daten mit usergenerierten Daten, um Städten datengetriebene Einblicke anzubieten, wie der Radverkehr in der Stadt aktuell aussieht und wie die passende Infrastruktur zukünftig verbessert werden könnte. Bike Citizens ist eines von rund zwanzig Unternehmen, die in unserem Bericht ["Open Data in der Praxis"](https://www.technologiestiftung-berlin.de/de/projects/projects/open-data-in-practice/)vorgestellt werden. Der Bericht evaluiert, wie Unternehmen aus Berlin Open Data in ihr Geschäftsmodell integrieren. Ähnliche Studien werden auch vom Open Data Institute in London durchgeführt – [ein Bericht von 2015](https://theodi.org/article/open-data-means-business/) hat 270 verschiedene Firmen identifiziert, die Open Data nutzen, erzeugen oder in diesem Bereich investieren.

{% include macro-image-section-markdown.html src="../images/bikecitizens.png" caption="Eine Analyse der Bike Citizens GmbH zu Wartezeiten an Kreuzungen in Wien" %}


Fazit
-----



Natürlich ist Open Data kein Allheilmittel. Das Aufsetzen eines Open Data-Portals und die Veröffentlichung von ein paar Vorzeigedatensätzen können noch keine unmittelbaren Gewinne garantieren. Aber Städte, die sich ernsthaft und sorgfältig mit dem Thema beschäftigen, werden mittelfristig echte Vorteile realisieren: Verbesserte Infrastruktur, neue Services und höhere Lebensqualität sowie eine Stärkung lokaler Initiativen und Unternehmen. Deshalb ist es eines der Kernziele unseres Ideation and Prototyping Labs, das Open Data-Ökosystem in Berlin zu unterstützen und die Potenziale offener Verwaltungsdaten weiter zu erkunden. Unsere Zusammenarbeit mit dem Land Berlin im Bereich Open Data werden wir zukünftig weiter ausbauen – mehr Neuigkeiten dazu gibt es demnächst hier.


