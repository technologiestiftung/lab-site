---
layout: project
description: "The data on rides with bicycles from bike sharing providers were collected and evaluated for a period of three and a half months in order to draw conclusions about mobility behaviour."
lang: en
title: "Bike flows in Berlin"
subtitle: "What information does Bike-Sharing data provide?"
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

_In the last few months we have been working more intensively with the [Bike and Scooter Sharing Offers of Berlin](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/) in the Lab. On the one hand because these offers play an increasingly important role for the mobility turnaround, on the other hand because interesting insights into the mobility behaviour of the urban population can be gained from the data of the service providers. Our data analyst [Alexandra Kapp](https://twitter.com/lxndrkp) has evaluated a few hundred thousand trips and shows the first results of the current project here._

More than 10,000 rental bikes are available on Berlin's streets through various providers. For which routes are the bikes used? How high is their load factor? At what times are they mainly used? All these are relevant questions for the city.

Over the last three and a half months we have collected and evaluated data on three different providers (Nextbike, Lidlbike and Mobike). Of these three providers, around 8,000 bikes are available daily (median Nextbike uses around 1,095 bikes daily, Lidlbike 2,813 and Mobike 3,533).

The following table shows how many bicycles were available daily from the individual providers - in median and maximum numbers. The total number of bicycles used during the study period is also given.

<div class = 'project-text'>
<table class = 'table'> <tr> <th></th> <th>Total</th><th>Nextbike</th> <th>Lidlbike</th> <th>Mobike</th></tr>
<tr> <td>Median (available daily)</td> <td>7,450</td><td>1,095</td> <td>2,813</td> <td>3,533</td> </tr>
<tr> <td>Max. (daily available)</td> <td>8,078</td><td>1,409</td> <td>3,048</td> <td>3,966</td></tr>
<tr> <td>Unique bikes over the entire period</td> <td>15,375</td><td>2,396</td> <td>3,633</td> <td>9.346</td></tr>
</table>
</div>
Mobike's data was removed for further route analysis because it was too unreliable. The further analyses are based on data from Lidlbike and Nextbike (approx. 4,000 bikes available daily).

On a daily basis, the average distance travelled with bicycles from both providers is 8,181 km (median: 8,760 km). With an average of 2,830 rides of 2.9 km each (median: 2.4 km) per day. In the median a trip lasts 30 min (on average 1h 36 min, which speaks for some runaways with very long borrowing times).

## Improved mobility or solely a toy for tourists?
During the week most trips start between 8 am and 10 am in the morning and around 6 pm in the afternoon. On weekends, most trips are spread over lunchtime.

<div id= "word_count_linechart" alt="Line chart with number of written requests by year"></div>
{% include macro-subline-markdown.html caption="Total number of trips by day and time." %}
<p></p>

If one compares these results with the [analysis of Civity](http://scooters.civity.de/) on e-scooters, there are clear differences in usage behaviour:
E-scooters do not correspond to the typical rush hour patterns: on weekends there are more journeys than during the week and during the week there are no morning and evening peaks. These patterns, on the other hand, can be seen in rental bicycles.

## 30% of available bicycles are used daily
In one day 30% of the bikes are also moved in the median. Each bicycle rides on average 1.8 times a day.

## 15% of rides start / end at subway stops
Rental bicycles should also serve as a means of transport for the "last mile", i.e. for the last few metres between public transport and the point of departure or arrival. It is therefore interesting to see how often bicycles are rented at underground and suburban train stops.
Approximately 15% of our registered rides start in the vicinity (100 m radius) of a stop. Especially many trips start at the main station, Potsdamer Platz and Bahnhof Zoo.

The following map shows from which stops and how often bicycles are rented.

<div class="map" id= "mapvbb" alt=""></div>
{% include macro-subline-markdown.html caption="Number of trips starting at the appropriate stop." %}
<p></p>

## Most trips are to and from Alexanderplatz
The offer of all suppliers is limited to the ring. Most trips start in Mitte and Friedrichshain-Kreuzberg. Alexanderplatz and Oranienburger Straße are particularly popular starting points.

<div class= "map" id= "map" alt=""></div>
{% include macro-subline-markdown.html caption="Number of trips starting in corresponding planning space." %}
<p></p>

As can be seen from the data, residents outside the ring are currently hardly benefiting from Berlin's bicycle rental offers. However, the "problem of the last mile" is mainly a real problem outside the ring. Places with many rental bicycles, such as certain underground or suburban stations, also indicate where additional bicycle parking spaces are urgently needed.

# Data sources
The data interfaces of Mobike, Lidlbike and Nextbike were queried every four minutes during the period from April 1 to July 11 ([details for API query here](https://lab.technologiestiftung-berlin.de/projects/bike-sharing/de/)) and the locations of the bicycles were saved. Based on the location data for available data, start and end points of individual trips were derived. With the help of [OSRM](http://project-osrm.org/) a routing for all rides was created. The data set was cleansed to the best of our knowledge to remove outliers and implausible data. This includes journeys under 200 m, start and end points outside of Berlin and journeys faster than 30 km/h. The data was then used to determine the speed of the vehicle. This results in almost 0.6 million trips. The data from Mobike were removed for these route analyses, as these data were very error-prone and not plausible. This resulted in 300,000 rides by Lidlbike and Nextbike for the three months on the basis of which the analyses were prepared.
For more details see the Jupyter Notebooks [here](https://github.com/technologiestiftung/bike-sharing/blob/master/README.md).
