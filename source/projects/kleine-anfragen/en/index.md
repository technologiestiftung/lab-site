---
layout: project
description: "Members of Parliament can request information from the Berlin Government with parliamentary requests ('schriftliche Anfragen'). We analyzed these requests, to identify relevant topics and find potential data sets for Open Data."
lang: en
title: "Analyzing Parliamentary Requests"
subtitle: "Which data are Berlin's politicians interested in?"
type: publication
colorMode: bright
featuredImage: /projects/kleine-anfragen/images/featured.jpg
thumbnail: /projects/kleine-anfragen/images/thumbnail.jpg
heroImage: /projects/kleine-anfragen/images/hero.jpg
socialMediaImage: /projects/kleine-anfragen/social_media.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-02-01
end: 2019-04-29
status: finished
date: 2019-04-29
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

Which public administration data are relevant for citizens, politics and the economy? For the implementation of Open Government Data, answering this question is of central importance. Given their oft-scarce resources, administrations are often forced to prioritize data publishing. As part of our project [ODIS](http://odis-berlin.de/), we support administrations in the selection and processing of open datasets. As a result of this work, we frequently find ourselves reflecting on the possible "added value" that open data can provide for a government. We previously published [here](https://lab.technologiestiftung-berlin.de/projects/od-for-cities/index.html) some examples of how cities can benefit from Open Data. To further enhance our understanding of the demand for open data, we have now tried an additional approach: **the analysis of _parliamentary inquiries_ from the Berlin House of Representatives (Berliner Abgeordnetenhaus).**

What are parliamentary inquiries _(schriftliche Anfragen)_?
-------------------------
  
Parliamentary requests are an instrument of parliamentary scrutiny. They offer MPs a way to request information from the government on various aspects of the government's activities (for example, information on specific policy initiatives or on government spending). The government must deliver a response within five weeks of receiving the request. The answers are freely accessible as individual PDFs thorugh the online [parliament documentation system](http://pardok.parlament-berlin.de/starweb/AHAB/). The platform [kleineAnfragen](https://kleineanfragen.de/) of the [Open Knowledge Foundation](https://okfn.de/) collects all of these answers and their corresponding metadata and offers a machine-readable download of the responses. This collection opens up a huge amount of information about:

1. Topics that are of interest to politics and the public
2. Data that can potentially be provided as open data

The number of requests is increasing annually (only in 2016 – an election year – did the number decline). In 2018 alone, more than 3,000 inquiries were made to the Berlin administration. This can be information on specific events, e.g. [an inquiry regarding a Women's March on 18.2.2018](https://kleineanfragen.de/berlin/18/13668-frauenmarsch-17-february-2018), or general datasets, e.g. [the class sizes of Berlin schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf).

<div id= "word_count_linechart" alt = "Line chart showing the amount of requests per year."></div>

{% include macro-subline-markdown.html caption="Number of requests per year" %}


According to one [American study](http://sunlightfoundation.com/wp-content/uploads/2018/10/alena-white-paper-PDF.pdf), the amount of public information requests governments receive can be significantly reduced by proactively providing open data. Thus, open data represents not only a gain in transparency for citizens and parliamentarians, but also a reduction in the workload of administrative staff entrusted with answering parliamentary requests.

In the following data analysis, we examine the parliamentary requests from the Berlin House of Representatives to find out which topics are particularly in demand and the potential that these requests represent for open data. 

Method
-------

More than 15,000 inquiries are listed on the [kleineAnfragen website](https://kleineanfragen.de/) for Berlin in the period from November 2011 to January 2019. For each request there is a title, an applicant party, an answering administration and the full text of the request with the corresponding answers. Using the frequency of individual words in the request titles, we have identified the topics that are most frequently addressed in these inquiries.

Filler words (e.g. die _(the)_, und _(and)_, als _(when)_) and words specific to Berlin (e.g. Senat _(Senate)_, Berlin, Bezirk _(district)_) that are not relevant for the analysis have been removed ([here is a list of all of the "stopwords" used in this analysis](https://github.com/technologiestiftung/kleine-anfragen/blob/master/data/stopwords_de.txt)). The remaining words were reduced to their word stem (for example, Kinder _(children)_ to 'kind'). After this data cleaning, it became possible to evaluate word frequency. To better understand the terms in context, they are presented below in a network visualization (words are displayed in the original German). The point size represents the frequency of a term, while the lines represent the connections between the terms. The more frequently two terms occur together in a title, the thicker the connecting line. When you click on a word, five example queries using this word in their title are listed below the graphic. To achieve a more filtered view, use the slider "minimum word count" to set the minimum number of times a word must appear in order to be displayed in the graphic.

<div id = 'network' alt="Network graph of words contained in parliamentary query titles."></div>
<div id ='example-wrapper'>
  <p id="example1"></p>
  <p id="example2"></p>
  <p id="example3"></p>
  <p id="example4"></p>
  <p id="example5"></p>
</div>
{% include macro-subline-markdown.html caption="Network graph of words contained in parliamentary query titles" %}


The most popular Topics
-----------------------

Two major domestic political themes – **education (school)** and **domestic security** – are reflected in the two most common terms: _Schule (school) (653 inquiries)_ and _Polizei (police) (456 inquiries)_. Current political and media topics in Berlin are also reflected in the inquiries: **Wohnungen _(apartments)_, öffentlicher Nahverkehr _(public transport)_, die Flughäfen _(airports)_ (BER, Tempelhof und Tegel) und Flüchtlinge _(refugees)_** are also among the most-inquired topics.
  
### Education and childcare

The majority of all inquiries are made around the topic of education and school. Words used here are, for example, "Schule" _(school)_ (653 queries), "Universität" _(university)_ (129), "Bildung" _(education)_ (80), "Lehrkraft" _(teacher)_ (48) and "Willkommensklassen" _(Welcome classes)_ (38), as well as "Kinder" _(Children)_ (213), "Kita"/"Kitaplatz" _(daycare)_ (175) and "Jugend" _(youth)_ (104).

What data is already available on this topic? Berlin offers [detailed information on locations and offers of schools](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/) via a search form. These data were used by the ["Jede Schule"](https://jedeschule.de/) project, which developed a website that made these data easier to navigate and understand. The Senate Department for Education, Youth and Family also provides statistics on the [number of pupils by type of school and region](https://www.bildungsstatistik.berlin.de/visualisierung/Schueler/schueler.aspx) as well as nice visualizations of the [movements of students between residential districts and school districts](https://www.bildungsstatistik.berlin.de/visualisierung/circle/index.html).

However, there is still some potential for further open data releases. For example, the SPD has made [134 requests for the "Sonderungsverbot"](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16220.pdf) of private schools. Other queries containing interesting records include:

* [WLAN at public schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16769.pdf)
* [PC equipment at schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12015.pdf)
* [Electricity and heating costs of schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12621.pdf)
* [School class visits to historical memorial sites](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16995.pdf)
* [Green schools](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16718.pdf)
* [Demand for educators](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15296.pdf)
* [Energy consumption and emissions from higher education institutions](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16891.pdf)
* [School class sizes](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/KlAnfr/ka17-12182.pdf)
* [Child poverty](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14006.pdf)
* [Day care for children](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-11778.pdf)
* [Entry of non-traditional educators into the educational system](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-17293.pdf) - this inquiry was used for a visualization [in this project by Thomas Tursics](http://www.tursics.de/story/quereinsteigende/), for example

### Police and crime

"Polizei" _(Police)_ is the second-most common term in the query titles. The topic is in demand across all parties. For example, the SPD has requested [detailed  operating figures on each police department](https://kleineanfragen.de/search?q=controlling+ist+gut+kontrolle+ist+besser). The CDU has various requests for [budgeted positions vs. actual fulfillment of these positions](https://kleineanfragen.de/search?q=Planstellen+tats%C3%A4chliche+Besch%C3%A4ftigte+polizei), and the FDP has submitted multiple inquiries on [occupational safety and general health promotion within the police force](https://kleineanfragen.de/search?q=arbeitsschutz+gesundheitsf%C3%B6rderung+polizei). Other common terms are "fire brigade" (166), "organized crime" (74), "rocker crime" (53), and "prison" (32). For the attack on Breitscheidplatz on 19 December 2016, 94 requests were made. Last year, the [Crime Atlas](https://daten.berlin.de/anwendungen/kriminalit%C3%A4tsatlas-app) has already provided an important crime-related dataset as open data _[(you can read our blog post on the Crime Atlas here)](https://lab.technologiestiftung-berlin.de/projects/crime-atlas/index.html)_. Further potential open datasets based on parliamentary inquiries include:

* [Reaction time of the Berlin police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16549.pdf)
* [Property belonging to the police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16035.pdf)
* [Police contact with citizens](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15133.pdf)
* [Overtime within the police force](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16645.pdf)
* [Motor vehicles belonging to the police](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14939.pdf)

### Apartments and real estate

On the topic of "Wohnen" _(to reside)_ there were more requests in 2018 than in any year before. The term "wohn" exists "only" 161 time, but it is hidden in 731 titles in different terms, e.g. z.B. "wohnungslos" _(homeless)_, "Wohnungsbaugesellschaften" _(housing society)_, "Wohnraum" _(living space)_, "Wohnungsnot" _(housing shortage)_. Other terms on the subject are "Immobilien" _(real estate)_ (70),  "Neubau" _(new construction")_ (41) or "Unterbringung" _(housing)_ (95). Possible interesting datasets from the inquiries are:

* [Right of first refusal usages](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13411.pdf)
* [Student housing in Berlin](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15944.pdf)
* [Construction activities by the Senate Department for Urban Development and Housing](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-15848.pdf)
* [Housing stock of housing associations](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12569.pdf)
* [Accessible apartments](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf)

### Public transportation (BVG)

For public transport, there are information requests for "BVG" (149), "S-Bahn" (87), "Bahnhof" _(train station)_ (79) and "U-Bahnhof" _(subway station)_ (49). Through the regular publishing of the [VBB timetable](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos) as open data, the VBB ensures that one critical public transportation dataset is available online. But other important datasets, like [statistics on delays](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10525.pdf) within the BVG network, still have to be explicitly requested via an inquiry every year. Other possible open data candidates:

* [BVG depots](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-16673.pdf)
* [Crime in the U-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14924.pdf)
* [Motor vehicles belonging to the BVG](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-14924.pdf)
* [Passenger Numbers for the BVG and S-Bahn](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-16796.pdf)

### Airports

There are regular information requests for Berlin's airports: "BER" (215), "Tegel" (99) and "Tempelhof" (66).
Potentially relevant data sets are, for example, the [size of the building located at the Tempelhof airfield](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-13860.pdf) or the [capacity of the BER airport in comparison to Schönefeld](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17627.pdf).


### Refugees

On the subject of "Flüchtlinge" _(refugees)_ (229) there were more than 70 inquiries in 2015. In 2018 there were only 15. The State Office for Refugee Affairs now offers informative **figures and visualizations**, e.g. on [accommodations for refugees](https://www.berlin.de/laf/wohnen/allgemeine-informationen/ueberblick-fluechtlingsunterkuenfte/artikel.629241.php) and on [refugee arrivals](https://www.berlin.de/laf/ arrive / current-arrival pay / artikel.625503.php).


The most-inquired government bodies 
-----------------------------------

The senate departments for Transport & Environment, Home Affairs & Sports, Education & Youth, and Social Affairs received the most inquiries. _(Note: Senate departments marked with (WP17) have since been restructured or renamed in the current legislative term)._ 

<div id = 'barchart-wp17' alt="Stacked bar chart showing the percentage of requests each Senate Department received for election period 17."> </div>

{% include macro-subline-markdown.html caption="Inquiries sent to Senate Departments (Legislative Term 17)" %}

<div id = 'barchart-wp18' alt= 'Stacked bar chart showing the percentage of requests each Senate Department received for election period 18.'> </div>

{% include macro-subline-markdown.html caption="Inquiries sent to Senate Departments (Legislative Term 18)" %}

The **Senate Department for Domestic Affairs & Sports** received the most requests in both terms. These were mainly requests related to the police, fire department, crime, the protection of the constitution and public swimming facilities.

The **Senate Department for Environment, Transport and Climate Protection (WP18)** received the second-most requests in election period 18. Inquiries mainly concern public transport, green spaces, bridges, renovations of buildings and airports. The **Senate Department for Urban Development and Environment (WP17)** received the most requests in the previous parliamentary term. In addition to overlapping topics such as rail, airport and accessibility, inquiries were made regarding state-owned housing associations, the "State Opera scandal", and apartments.

The **Senate Department for Education, Youth and Family** (or previously Education, Youth and Science) received the third-most requests. Topics included schools, children, youth, day-care centers, and underage refugees.


Which party makes the most inquiries?
-----------------------------------

Opposition parties post the most inquires in both legislative terms, but a significant proportion is coming from the ruling parties as well. Thus, during the legislative period 17, 2400 inquiries were made by Die Grünen and Die Piraten, but the CDU and SPD also each made over 1000 inquiries.
In the current legislature, most requests come from the strongest opposition party, the CDU (over 1700). However, the ruling parties SPD, Die Grünen and Die Linke also already each made almost 1000 requests. The obvious assumption that fewer inquiries are made to Senate Departments by party members of the same party can not be confirmed in this way. Although there is a tendency, especially in the legislative term 17, many requests are made to Senate Departments under the leadership of the same party (Exact numbers are available [here](https://github.com/technologiestiftung/kleine-anfragen/blob/master/ notebooks/analysis.ipynb) in the analysis).

Implications for an open data strategy
-----------------------

A considerable number of the parliamentary inquiries submitted to government bodies in Berlin are answered by administrations using data as support for their answers. About one third of the more than 15,000 answers contain tables, which is usually an indication that a corresponding database (or at least dataset) exists somewhere. In addition, answers often provide aggregate numbers and statistics that suggest interesting underlying raw data: For example, [this request](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-10513.pdf) mentions that there are regular school-based statistical surveys showing that roughly 18.2% of kids in Berlin schools can't swim. These statistical surveys could be broken down by districts, schools or grade levels to form a relevant dataset.
  
Although the answers to parliamentary requests are generally published via the [parliamentary documentation system](http://pardok.parlament-berlin.de/), to date these answers (including the taables of data that are often included) are only available as PDFs – a format known to make reuse of its contents difficult. A **accompanying publication of raw data in machine-readable, open data-compliant formats (like CSV files)** could significantly increase the reusability of these answers. In principle, it would also be conceivable to publish such data **directly via the [Berlin Open Data Portal](http://daten.berlin.de)**. Even more helpful would be creation of more **open interfaces to the administration** through which MPs (as well as citizens) can query databases directly to obtain the data they are interested in and thereby avoid the detour of a parliamentary inquiry. This would not least be a considerable relief for the administrative staff themselves.


Limitations of the analysis
---------------------------

When interpreting these results, it should be remembered that not all queries refer to data sets. Thus, it is not possible to derive relevance for open data from the frequencies of the terms in all cases. It is also important to remember that data does not need to be requested if it is already readily available. Consequently, the frequency with which a topic is requested does not correspond one-to-one with the relevance of that topic (phrased differently: this analysis does not give us a list of the most important topics for politicians in Berlin, it only gives us a list of the topics that they most frequently request information on, i.e., topics for which there is not currently enough publicly available information).

The analysis of the titles gives a rough overview of the topics, but is not a completely accurate evaluation: MPs have full creative freedom to choose a title of their liking, and there are no guidelines or rules for how the titles should be structured. Thus, not all included topics of the requests are apparent from the title. An analysis of the full texts would be a much more complex undertaking, but it would potentially allow for a more detailed and nuanced analysis of the inquiries and their content. Finally, the following limitations of the actual text analysis should be considered: synonyms are not factored into the analysis, the analysis package used ([NLTK Snowball Stemmer](https://www.nltk.org/_modules/nltk/stem/snowball.html)) was not always able to separate compound words properly (e.g. "Kitaausbau" is not separated into "Kita" and "Ausbau" and thus not assigned to the term "Kita"), and the analysis was not able to account for cases where a word might have two meanings (e.g. the German word "Behinderung" _(disability)_ can refer to obstruction of traffic or physical disability).