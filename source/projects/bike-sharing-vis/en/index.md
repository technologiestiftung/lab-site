---
layout: project
description: "Eine interaktive Visualisierung der Nutzung von Leihradanbietern in Berlin"
lang: en
title: "Shared mobility flows"
subtitle: "Eine interaktive Visualisierung der Nutzung von Leihradanbietern in Berlin"
type: prototype
colorMode: dark
thumbnail: /projects/bike-sharing-vis/images/thumbnail.png
heroImage: /projects/bike-sharing-vis/images/hero.png
socialMediaImage: /projects/bike-sharing-vis/images/social_media.png
visible: false
featured: false
externalUrl: https://bikesharing.citylab-berlin.org/
authors:
  - fabian-dinklage
start: 2019-04-01
end: 2019-04-01
status: finished
date: 2019-11-05
assets:
  js:
  css:
    - ../styles/index.css
materialsIncluded:
  - name: Github Repo
    link: "https://github.com/technologiestiftung/bikesharing-vis"

---


Das Angebot der Leihradanbieter hat sich in Berlin in den letzten 2 Jahren stark vergrößert. Es stehen insgesamt 7 Verleihsysteme zur Auswahl, um spontane Radtouren im Innenstadtbereich Berlins zu ermöglichen. Wir speichern die aktuellen Radpositionen der Anbieter LIDL-Bike und NextBike in einer Datenbank ab und erstellen einmal pro Tag eine bereinigte Version der Daten für die Visualisierung zur Verfügung.

Der Prototyp dient als beispielhafte Anwendung, um Mobilitätsdaten zu erfahrbar zu machen und potenzielle Nutzungsszenarien aufzuzeigen. Welche Nutzungsgruppen nutzen das Angebot vorwiegend zu welchen Zeiten? In der Auswertung ist abzulesen in welchen Bezirken das Angebot am meisten genutzt wird. 

Das besondere an der Anwendung ist die Bereitstellung der Daten. So werden alle 5 Minuten die Radpositionen der Anbieter erfragt und in einer Datenbank abgelegt. Der rohe Datensatz wird einmal pro Tag bereinigt und der Visualisierung zur Verfügung gestellt. Mithilfe eines eigens eingerichteten Routing Services werden zwischen den Start- & Endpunkten jeder Radbewegung eine mögliche Route berechnet. Weitere Informationen zur Einrichtung des Routing Services als Docker Container [hier](https://hub.docker.com/r/osrm/osrm-backend/). 

{% include macro-image-section-markdown.html src="../images/pipeline.jpg" caption="Datenverarbeitung"%}

Die Anwendung ermöglicht ein direktes Explorieren des Mobilitätsflusses und vergleichen der unterschiedlichen Bezirke. Wie sehr wird zum Beispiel das Angebot pro Bezirk genutzt? Außerdem sind Szenarien anwählbar, die das Thema Shared Mobility in einen räumlichen Bezug mit Berlin zu bringen.

{% include macro-image-section-markdown.html src="../images/scenarios.jpg" caption="Szenarien Berlins"%}


Die Anwendung kann [hier](https://bikesharing.citylab-berlin.org) auprobiert werden.




