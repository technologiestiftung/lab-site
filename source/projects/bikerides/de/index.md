---
layout: project
lang: de

title: Der Rhythmus der Straße
subtitle: Berlins Radverkehr visualisiert.
# project needs the following frontmatter values:
type: prototype # could also be "workshop", "dataset", "prototype"
#
colorMode: bright # or "dark" adds an additional class
featuredImage: /projects/bikerides/images/featured.jpg
# thumbnail path needs to be absolute at the moment
thumbnail: /projects/bikerides/images/thumbnail.jpg
heroImage: /projects/bikerides/images/hero.jpg #full page url
visible: true # if false the project will not be listed
# somehow needs to be the name in url of the author page
featured: true
authors:
  - fabian-dinklage

start: 2019-07-15
end: 2019-09-11
status: finished
date: 2019-09-11

assets:
  js:
    - "../js/d3.min.js"
    - "../js/crossfilter.min.js"
    - "../js/main.js"
    - "../js/radar_chart.js"

  css:
    - "../css/custom_select.css"
    - "../css/radar-chart.css"
    - "../css/radar.css"
    - "../css/root.css"
    - "../css/tooltip.css"

materialsIncluded:
  - name: "images"
    link: "#"
  - name: "video"
    link: "#"
  - name: "press text"
    link: "#"
  - name: "Source Code"
    link: "#"

---

Seit 2015 erfasst die Berliner Senatsverwaltung den Radverkehr in der Stadt durch automatisierte [Zählstellen](https://www.stadtentwicklung.berlin.de/aktuell/pressebox/archiv_volltext.shtml?arch_1609/nachricht6200.html). Pünktlich zu unserem [Radverkehrs-Meetup](https://www.technologiestiftung-berlin.de/de/veranstaltungen/beitrag/radverkehr-40/Fahrrad-Meetup) haben wir die Daten der insgesamt 26 Zählstellen aggregiert und aufbereitet (die Rohdaten finden sich [hier](https://data.technologiestiftung-berlin.de/dataset/radverkehrsmengen)).

Unsere Visualisierung zeigt jährliche, wöchentliche und tägliche Fahrmuster. Das Netz-Diagramm einer Radzählstelle fasst jeweils 8760 Einträge zusammen (ein Eintrag pro Stunde für ein ganzes Jahr). Die Daten von jeder Station lassen sich in drei unterschiedlichen Detailstufen abbilden. Jede Darstellung zeigt nach Wahl Median- oder Maximalwerte. Durch das Hovern über einzelne Monate/Tage/Stunden werden absolute Werte zum jeweiligen Zeitpunkt angezeigt.

<div class="special-section polar-chart-wrapper">
