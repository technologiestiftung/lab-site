---
layout: project
description: "Data on bike rides with bike-sharing providers was collected and evaluated for a period of 3.5 in order to draw conclusions about mobility behaviour."
lang: en
title: "Bike-share flows in Berlin"
subtitle: "What kinds of information and insights can we glean from bike-sharing data?"
type: publication
colorMode: bright
thumbnail: /projects/bike-analysis/images/thumbnail.png
heroImage: /projects/bike-analysis/images/hero.png
socialMediaImage: /assets/images/social_media.png
visible: true
featured: false
authors:
  - alexandra-kapp
start: 2019-04-01
end: 2019-08-08
status: ongoing
date: 2019-08-08
assets:
  js:
    - 'https://d3js.org/d3.v4.min.js'
    - ../js/index_en.js
    - ../js/linechart.js
    - ../data/start_counts.geojson
    - ../data/ring.geojson
    - ../data/start_at_subway.geojson
    - ../js/map.js
  css:
    - ../styles/index.css
    - https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
materialsIncluded:
  - name: Source Code
    link: "#"

---
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
crossorigin=""></script>

_In the last few months, the Ideation & Prototyping Lab has been working intensively on the subject of [bike- and scooter- sharing in Berlin](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/). We're focusing on these topics more because of the increasing importance of shared mobility operators in the transition toward more sustainable transport options, as well as because of the valuable insights into mobility behavior that can be gained by analyzing data from shared mobility providers. Our data analyst [Alexandra Kapp](https://twitter.com/lxndrkp) has evaluated hundreds of thousands of bikeshare trips in Berlin; the first results of this analysis are reported here._

There are more than 10,000 rental bikes on Berlin's streets that have been made available through various providers. These thousands of bikes – and the large quantities of data they generate – have the potential to answer a variety of useful questions for the city: For which routes are the bikes used? How often are the bikes being used? What time of day are most journeys?

Over the last 3.5 months, we have collected and evaluated data from three different bike-share providers in Berlin (Nextbike, Lidlbike and Mobike). These three providers have around 8,000 bikes available daily (for Nextbike, the median value is around 1,095 bikes daily, for Lidlbike 2,813, and for Mobike 3,533).

The following table shows the median and maximum values for how many bicycles were available daily from the individual providers, as well as the total number of bicycles deployed during the period of analysis.

<div class = 'project-text'>
<table class = 'table'> <tr> <th></th> <th>Total</th><th>Nextbike</th> <th>Lidlbike</th> <th>Mobike</th></tr>
<tr> <td>Median (available daily)</td> <td>7,450</td><td>1,095</td> <td>2,813</td> <td>3,533</td> </tr>
<tr> <td>Max. (daily available)</td> <td>8,078</td><td>1,409</td> <td>3,048</td> <td>3,966</td></tr>
<tr> <td>Unique bikes over the entire period</td> <td>15,375</td><td>2,396</td> <td>3,633</td> <td>9.346</td></tr>
</table>
</div>
After reviewing the data, we decided to exclude Mobike's data from any further analyses due to its unreliability. All additional analyses in this post are based on data from Lidlbike and Nextbike (correspondong to the roughly roughly 4,000 bikes available daily through these two providers).

The average daily distance travelled with all bicycles from both providers is 8,181 km (median: 8,760 km) with an average of 2,830 rides of 2.9 km each (median: 2.4 km) per day. The median trip length is 30 min, but the average length is 1 hour and 36 min, which indicates there are some outliers in the datasets representing unusually long rental periods. 

## Bike-sharing: Improved mobility or merely a source of amusement for tourists?
During the week, most trips start between 8 a.m. and 10 a.m. in the morning and around 6 p.m. in the evening. On weekends, most trips occur around lunchtime.

<div id= "word_count_linechart" alt="Line chart with number of written requests by year"></div>
{% include macro-subline-markdown.html caption="Total number of trips by day and time." %}
<p></p>

If you compare these results with [Civity's analysis](http://scooters.civity.de/) on e-scooters, one notable clear divergence between shared e-scooters and bike-shares emerges: E-scooter usage does not correspond to the typical rush hour patterns – there are more e-scooter journeys on weekends than during the week, and during the week there are no morning and evening peaks. But based on the graph above, we can see that bike-shares do indeed conform to these rush hour use patterns. <b>This makes it clear that the user groups for bike-sharing and e-scooter-sharing do not necessarily overlap, and thus that these two developments may need to be separately handled when it comes to analysis and even regulation.</b>

## 30% of available bicycles are used daily
On any given day, around 30% of the available bikes are actually moved from one location to another (median value). Each bike is ridden 1.8 times a day, on average.

## 15% of rides start or end at subway stops
A common justification for the need for an expansive bike-share network is that these vehicles can serve as transport for the "last mile" – i.e., that the bikes can cover the remaining distance between a public transit stop and a person's actual starting point or destination. To this end, it's illuminating to see how often bicycles are rented at underground and suburban train stops.
Approximately 15% of our registered rides start in the vicinity (100 m radius) of a stop. A particularly high number of trips start at the Hauptbahnhof (Central Station), Potsdamer Platz and Bahnhof Zoo.

The following map shows how often bikes are rented in the vicinity of a given tram, S- or U-Bahn station.

<div class="map" id= "mapvbb" alt=""></div>
{% include macro-subline-markdown.html caption="Number of trips starting at the appropriate stop." %}
<p></p>

## Highest number of trips are to and from Alexanderplatz
Currently, bike-share offerings are generally limited to within the Berlin S-Bahn ring. Within this ring, the largest number of trips start in Mitte and Friedrichshain-Kreuzberg. The areas around Alexanderplatz and Oranienburger Straße are particularly popular starting points.

<div class= "map" id= "map" alt=""></div>
{% include macro-subline-markdown.html caption="Number of trips starting in corresponding planning space." %}
<p></p>

As can be seen from the data, residents outside the ring hardly benefit at all from Berlin's current bike-share offerings. Yet when we talk about the problem of the "last mile", it is precisely these residents outside the ring who suffer from this problem (e.g., extended distances between people's homes and the next reliable public transit stop) most acutely. <b>The data shows us that if this is truly a problem the Berlin government and/or the bike-sharing operators want to address, then there needs to be significant work done to expand offerings beyond the ring.</b>

The data can also be useful when it comes to planning space for bike racks and other parking options: Areas that see higher concentrations of rental bicycles, such as certain underground or S-Bahn stations, can also be good indicators of where there is a pressing need for additional spaces to park or secure bikes. 

# Data sources
To gather this data, we queried the APIs from Mobike, Lidlbike and Nextbike every four minutes for the location of bicycles during the period of April 1 to July 11 ([more information on the APIs is available here](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/)). We derived start and end points for the trips based on the location data contained in the database and calculated probable routes using [OSRM](http://project-osrm.org/). The dataset was cleaned to remove outliers and implausible data. This includes journeys under 200 meters, journeys with start and end points outside of Berlin, and journeys faster than 30 km/h. This resulted in a dataset of almost 0.6 million trips. The data from Mobike was excluded from the analyses here, as these data were very error-prone and, in many cases, simply implausible. This resulted in a dataset containing 300,000 rides using Lidlbike and Nextbike over a three-month period. For more details on how the data was prepared, see the Jupyter Notebooks [here](https://github.com/technologiestiftung/bike-sharing/blob/master/README.md).
