---
layout: project
description: "Members of Parliament can request information from the Berlin Government with parliamentary requests ('kleine Anfragen'). We analyzed these requests, to identify relevant topics and find potential data sets for Open Data."
lang: en
title: "Analyzing Parliamentary Requests"
subtitle: "Which Data is Berlin Politics interested in?"
type: publication
colorMode: bright
featuredImage: /projects/kleine-anfragen/images/featured.jpg
thumbnail: /projects/kleine-anfragen/images/thumbnail.jpg
heroImage: /projects/kleine-anfragen/images/hero.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-02-01
end: 2019-04-01
status: finished
date: 2019-04-01
assets:
  js:
    - ../js/index_en.js
    - ../js/line-chart.js
    - ../js/network.js
    - ../js/stackedbar-chart.js
    - 'https://d3js.org/d3.v4.min.js'
  css:
    - ../css/index.css
materialsIncluded:
  - name: Source Code
    link: "https://github.com/technologiestiftung/kleine-anfragen"

---

Which public administration data are relevant to citizens, politics and the economy? For the implementation of Open Government Data, answering this question is of central importance. Given the scarce resources, administrations are often forced to prioritize data publishing. As part of our project [ODIS] (http://odis-berlin.de/) we support administrations in the selection and processing of open datasets, so that the question of possible added values ​​also plays an important role for us. We have put together [here] (https://lab.technologiestiftung-berlin.de/projects/od-for-cities/index.html) some examples of how cities can benefit from Open Data. In order to better understand the demand for public data, we have now tried another approach: **The analysis of _parliamentary requests_ from the Berlin House of Representatives.**

What are Parliamentary Requests _(Kleine Anfragen)_?
-------------------------
  
Parliamentary requests are an instrument of parliamentary scrutiny. They offer MPs a way to request information from the government. Within five weeks, such a request must be answered. The answers are accessible thorugh the online [parliament documentation](http://pardok.parlament-berlin.de/starweb/AHAB/). The platform [kleineAnfragen](https://kleineanfragen.de/) of the [Open Knowledge Foundation] (https://okfn.de/) collects all answers and metadata and offers a machine-readable download. This opens up a huge amount of information about:

1. Topics that are of interest to politics and the public
2. Data that can potentially be provided as open data

The number of requests is increasing annually (only in election year 2016, the number was declining). In 2018 alone, over 3,000 inquiries were made to the Berlin administration. This can be specific information on specific events, e.g. [to the march on 18.2.2018](https://kleineanfragen.de/berlin/18/13668-frauenmarsch-17-february-2018), or general data sets, e.g. [the class sizes of Berlin schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf).

<div id= "word_count_linechart" alt = "Line chart showing the amount of requests per year."></div>
TODO: Format title
Number of requests per year

According to an [American study](http://sunlightfoundation.com/wp-content/uploads/2018/10/alena-white-paper-PDF.pdf), the amount of requests can be significantly reduced by providing open data. Thus, open data is not only a gain in transparency for citizens and parliamentarians, but also reduces the workload of administrative staff entrusted with answering parliamentary requests.

In a data analysis, we examined the parliamentary requests from the Berlin House of Representatives to find out which topics are particularly in demand and the potential for open data in the requests.

Method
-------

More than 15,000 inquiries are listed at [kleineAnfragen](https://kleineanfragen.de/) for Berlin in the period from November 2011 to January 2019. For each request there is a title, an applicant party, an answering administration and the full text of the request with appropriate answers. On the frequency of individual words in the request titles, we have identified topics for which many requests have been made.

General words (e.g. die _(the)_, und _(and)_, als _(when)_) and words specific to Berlin (e.g. Senat _(Senate)_, Berlin, Bezirk _(district)_) that are not relevant for the analysis have been removed ([here are all so-called stopwords](https://github.com/technologiestiftung/small-requests/blob/master/data/stopwords_en.txt) listed). The remaining words were reduced to their word stem (for example, Kinder _(children)_ to 'kind'). Subsequently, the word frequency could be evaluated. To better understand the terms in context, they are presented here in a network (words are displayed in German). The point size represents the frequency of a term and the lines the connections between the terms. The more frequently two terms occur together in a title, the thicker is the connecting line. By clicking on a word, five exemplary queries are listed. With the slider "minimum word count" you can set the minimum number of times a word must appear in order to be displayed in the graphic.

<div id = 'network' alt="Network graph of words contained in parliamentary query titles."></div>

The most Popular Topics
-----------------------

The major themes of national politics **education (school)** and **internal security** are reflected in the two most common terms: _Schule (school) (653 inquiries)_ and _Polizei (police) (456 inquiries)_. Current political and media topics in Berlin are also reflected in the inquiries: **Wohnungen _(apartments)_, öffentlicher Nahverkehr _(public transport)_, die Flughäfen _(airports)_ (BER, Tempelhof und Tegel) und Flüchtlinge _(refugees)_** are among the other largest topics.
  
### Education and Childcare

Most inquiries are made around the topic of education and school. Words used here are, for example, "Schule" _(school)_ (653 queries), "Universität" _(university)_ (129), "Bildung" _(education)_ (80), "Lehrkraft" _(teacher)_ (48) and "Willkommensklassen" _(Welcome classes)_ (38), as well as "Kinder" _(Children)_ (213), "Kita"/"Kitaplatz" _(daycare)_ (175) and "Jugend" _(youth)_ (104).

Which data is already available on this topic? Berlin offers [detailed information on locations and offers of schools](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/), which as part of the project ["Jede Schule"](https://jedeschule.de/) were prepared visually appealing. The Senate Department for Education, Youth and Family also provides statistics on the [number of pupils by type of school and region](https://www.bildungsstatistik.berlin.de/visualisierung/Schueler/schueler.aspx) as well as nice visualizations of the [Movements between residential district and school district](https://www.bildungsstatistik.berlin.de/visualisierung/circle/index.html).

However, there is still some potential for further open data releases. For example, the SPD has made [134 requests for the "Sonderungsverbot"](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16220.pdf) of private schools. Other queries containing interesting records include:

* [WLAN at public schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16769.pdf)
* [PC equipment at schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12015.pdf)
* [Electricity and heating costs of schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12621.pdf)
* [Memorial visit by school classes](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16995.pdf)
* [Green schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16718.pdf)
* [Demand for educators](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15296.pdf)
* [Energy consumption and emissions from higher education institutions](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16891.pdf)
* [School class sizes](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf)
* [Child Poverty](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14006.pdf)
* [Day care for children](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-11778.pdf)
* [Lateral Entry of teachers](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-17293.pdf) - this record was for example used for a visualization [in this project by Thomas Tursics](http://www.tursics.de/story/quereinsteigende/)

### Police and Crime

"Polizei" _(Police)_ is the second most common term in the query titles. The topic is in demand across all parties. For example, the SPD has requested [detailed  operating figures on each police department](https://kleineanfragen.de/search?q=controlling+ist+gut+kontrolle+ist+besser). The CDU has various requests for [establishment posts vs. actual employees](https://kleineanfragen.de/search?q=Planstellen+tats%C3%A4chliche+Besch%C3%A4ftigte+polizei) and the FDP to [occupational safety and health promotion of the police](https://kleineanfragen.de/search?q=arbeitsschutz+gesundheitsf%C3%B6rderung+polizei). Other common terms are "fire brigade" (166), "organized crime" (74), "rocker crime" (53), and "prison" (32). For the attack on Breitscheidplatz on 19 December 2016, 94 requests were made. Last year, the [Crime Atlas](https://daten.berlin.de/anwendungen/kriminalit%C3%A4tsatlas-app) has already provided an important dataset as Open Data _[(Here we have reported)](https://lab.technologiestiftung-berlin.de/projects/crime-atlas/index.html)_. Potential for further open data records on the subject of police are, for example, hidden behind these requests:

* [Reaction time of the Berlin police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16549.pdf)
* [Police Real Estate](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16035.pdf)
* [Police contact with citizens](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15133.pdf)
* [Overtime at the Berlin police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16645.pdf)
* [Motor vehicles of the police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14939.pdf)

### Living

On the topic of "Wohnen" _(living)_ there were more requests in 2018 than in any year before. The term "wohn" exists 'only' 161 but is hidden in 731 titles in different terms, e.g. z.B. "wohnungslos" _(homeless)_, "Wohnungsbaugesellschaften" _(housing society)_, "Wohnraum" _(living space)_, "Wohnungsnot" _(housing shortage)_. Other terms on the subject are "Immobilien" _(real estate)_ (70),  "Neubau" _(new construction")_ (41) or "Unterbringung" _(housing)_ (95). Possible interesting records in queries are for example:

* [Used purchase option for Milieuschutzgebiet](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13411.pdf)
* [Student Housing in Berlin](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15944.pdf)
* [Construction activities of the Senate Department for Urban Development and Housing](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15848.pdf)
* [Housing stock of housing companies](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12569.pdf)
* [Barrier-free apartments](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf)

### Public Transport (BVG)

For public transport, there are requests for "BVG" (149), "S-Bahn" (87), "Bahnhof" _(train station)_ (79) and "U-Bahnhof" _(subway station)_ (49). With the current [timetable data of the VBB](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos), an important dataset is available online. In addition, however, there are further potentials: for example, the [delays](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10525.pdf) are requested from the BVG on an annual basis. Other possibilities for Open Data:

* [BVG delays](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10525.pdf)
* [BVG depots](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16673.pdf)
* [Public transport-relevant offenses in the means of transport U-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14924.pdf)
* [motor vehicles of the BVG](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14924.pdf)
* [Determination of Passenger Numbers at BVG and S-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16796.pdf)

### Airports

There are regular requests on all airports "BER" (215), "Tegel" (99) and "Tempelhof" (66).
Potentially relevant data sets are, for example, the [airport and airfield areas Tempelhof](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13860.pdf) or the [capacity of BER in comparison to Schönefeld](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17627.pdf).


### Refugees

On the subject of "Flüchtlinge" _(refugees)_ (229) there were more than 70 inquiries in 2015. In 2018 there were only 15 left. The State Office for Refugee Affairs now offers informative **figures and visualizations**, e.g. on [Refugee Accommodation](https://www.berlin.de/laf/wohnen/allgemeine-informationen/ueberblick-fluechtlingsunterkuenfte/artikel.629241.php) and [arrivals](https://www.berlin.de/laf/ arrive / current-arrival pay / artikel.625503.php).


The most sought after Senate Administrations
-----------------------------------

The Senate administrations Transport & Environment, Home Affairs & Sports, Education & Youth and Social Affairs received the most inquiries. _(Note: Senate administrations with the addition (WP17) were restructured or renamed during electoral term 18)._

<div id = 'barchart-wp17' alt="Stacked bar chart showing the percentage of requests each Senate Department received for election period 17."> </div>

TODO: format title
Requests to Senate Administrations (Election Period 17)

<div id = 'barchart-wp18' alt= 'Stacked bar chart showing the percentage of requests each Senate Department received for election period 18.'> </div>
TODO: format title
Requests to Senate Administrations (legislature 18)

The **Senate Department for Home Affairs & Sports** received the most requests in both terms. These were mainly requests related to the police, fire brigade, crime, the protection of the Constitution and bathing companies.

The **Senate Department for Environment, Transport and Climate Protection (WP18)** received the second most requests in election period 18. Inquiries mainly concern public transport, green spaces, bridges, refurbishments and airports. The **Senate Department for Urban Development and Environment (WP17)** received the most requests in the previous parliamentary term. In addition to overlapping topics such as rail, airport and accessibility, inquiries were made to the state-owned housing association, the "State Opera scandal" and apartments.

The **Senate Department for Education, Youth and Family** (or previously Education, Youth and Science) received the third most requests. Topics included school, children, youth, day-care centers and underage refugees.


Potential for an Open Data Strategy
-----------------------

Not all, but a considerable part of the parliamentary requests are answered by administrations with data support. About one third of the more than 15,000 answers contain tables, which is usually an indication of a corresponding existing data basis. In addition, answers often provide aggregate numbers and statistics that indicate interesting underlying raw data: For example, [this request](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10513.pdf) mentions that there are regular school-based statistical surveys showing a non-swimmer rate of 18.2%. These statistical surveys could be broken down by districts, schools or grade levels into a relevant dataset.
  
Although the answers to parliamentary requests are generally published via the [parliamentary documentation system](http://pardok.parlament-berlin.de/), so far only in the less data-friendly PDF format. A **accompanying publication of raw data in machine-readable, Open Data-compliant formats (CSV)** could significantly increase the reusability. In principle, it would also be conceivable to publish such data **directly via the [Berlin Open Data Portal](http://daten.berlin.de)**. Perspectively, **open interfaces to the administration** could allow MPs (and citizens) to query databases directly and avoid the detour of a parliamentary inquiry. This would not least be a considerable relief for the administrative staff themselves.


Limitations of the Analysis
---------------------------

When interpreting these results, it should be remembered that not all queries refer to data sets. Thus, it is not possible to derive relevance for open data from the frequencies of the terms in all cases. It is also important to remember that data does not need to be requested if it is already available. Consequently, there is likewise no one-to-one transfer of conceptual frequencies to the relevance of topics.

The analysis of the titles gives a rough overview of the topics, but is not a completely accurate evaluation: the titles are freely selectable by the MEPs and do not follow a specific format. Thus, not all included topics of the requests are apparent from the title. An analysis of the full texts would be more complex, but more extensive would allow for more detailed information. In addition, this text analysis should be considered: synonyms are not considered, compound words are not always separated well by the used analysis package ([NLTK Snowball Stemmer] (https://www.nltk.org/_modules/nltk/stem/snowball.html)) (e.g. "Kitaausbau" is not separated into "Kita" and "Ausbau" and thus not assigned to the term "Kita") and double word meanings are ignored (e.g. the German word "Behinderung" _(disability)_ can refer to obstruction of traffic or physical disability).