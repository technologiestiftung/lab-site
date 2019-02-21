---
layout: project
description: An analysis of the availability of data for the topic of accessibility
lang: en
title: "Data Dive: Accessibility in Berlin"
subtitle: What data is available?
type: publication
colorMode: bright
featuredImage: /projects/datadive-accessibility/images/featured.jpg
thumbnail: /projects/datadive-accessibility/images/thumbnail.jpg
heroImage: /projects/datadive-accessibility/images/hero.jpg
visible: false
featured: false
authors:
  - victoria-dykes
start: 2019-02-20
end: 2019-02-20
status: finished
date: 2019-02-20  
redirect_from:
  - /projects/123456789/
  - /old-site-path/my-amazing-post/

---

_A data dive is an in-depth look at a topic that is of widespread interest in Berlin from a data-centered perspective. In these pieces, we want to assess two main questions: first, what types of data are useful or even essential to forming a comprehensive understanding of this topic? Second, what is the availability of this data – i.e., is this data currently available as open data, as non-machine readable or as closed data, or is it not even known whether the data exists somewhere? These data dives serve the simultaneous purpose of making existing data resources easier to find by listing them in a single location, while also highlighting areas where there is a clear need for more and better data. Our first data dive looked at the availability of bike-related data and can be read [here.](https://lab.technologiestiftung-berlin.de/projects/datadive_cycling/index.html)_

Diving into accessibility-related data
--------------------------------------

With the term accessibility (Barrierefreiheit in German), we are talking about the ability of persons with disabilities to access and participate in all areas of society. In many cases, discussing accessibility specifically means focusing on tasks and actions that non-disabled people would never think twice about, but which can be burdensome or even impossible for people with disabilities unless their needs are specifically considered and accommodated.

In the below sections, we list key datasets that would be useful for anyone who is interested in the topic of accessibility and having disabilities in Berlin. This data could be useful for people to build apps that help disabled people in their everyday lives, for example, or useful for assessing the extent to which services and institutions in Berlin are currently meeting the needs of individuals with disabilities.

If you notice information here that seems to be incorrect, or if you are aware of relevant data sources that we did not identify, please feel free to reach out to [dykes@technologestiftung-berlin.de](mailto:dykes@technologiestiftung-berlin.de) with corrections or suggested updates.

_A special thanks to Jolanta Paliszewska for her research assistance with this data dive!_

  

Public Transportation
---------------------

### Stations with elevators and escalators

<u>Status: Open data available</u>  
The most reliable single resource for which stations have elevators or escalators is a [dataset published by the VBB](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) (Verkehrsverbund Berlin-Brandenburg, a transport association run by both Berlin and Brandenburg public transport providers). This dataset is a list of all station entrances in the VBB network (so it also includes stations located in Brandenburg), and it includes a column (“Bauwerkselement Name”) that notes if an entrance features an elevator (Aufzug) or an Escalator (Rolltreppe).

  

The BVG, who is responsible for U-Bahn stations in Berlin (as well as bus and tram stops), has a [central page](https://www.bvg.de/de/Willkommen/Barrierefreies-Reisen) (only available in German) for gathering information on accessible travel with their modes of transportation. This site includes PDF flyers showing which stations are accessible, as well as a journey planner for planning routes exclusively with accessible stations. However, they themselves do not publish open data related to accessibility.

  

For information on which U-Bahn stations do not currently have an elevator installed but for which there are plans to do so, see [this parliamentary inquiry](https://kleineanfragen.de/berlin/18/15097-barrierefreiheit-auf-u-bahnhoefen) from June 1, 2018.

  

Since Berlin’s S-Bahn is operated by the Deutsche Bahn, information on which stations have elevators available is contained within [this dataset](https://data.deutschebahn.com/dataset/data-aufzug) from the Deutsche Bahn’s open data portal. The S-Bahn Berlin website also provides an overview of what kind of infrastructure exists at which stations.

  

*   [Coordinates for station entrances (and stop locations) (CSV)](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0)
*   [BVG Accessibility Homepage (Website)](https://www.bvg.de/de/Willkommen/Barrierefreies-Reisen)
*   [Elevators within the DB network (XLSX & CSV)](https://data.deutschebahn.com/dataset/data-aufzug)

### Operational status of elevators and escalators

<u>Status: Some open data available</u>

As any frequent user of public transportation knows, just because a station has an elevator or escalator installed doesn’t actually mean you can use them – outages due to mechanical problems or regular maintenance are common. And for individuals with limited mobility, it’s important to know ahead of time whether their usual route will work for them, or if they need to choose a new route due to outages.

  

The website [BrokenLifts](http://brokenlifts.org/) is a great resource for identifying where there are broken elevators in Berlin public transport stations. Unfortunately, the site does not have an API available, and it appears not all of their data sources are publicly available.

  

One open data resource is an [RSS-Feed](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos/rss-feed-aufzugsstoerungen) provided by the VBB, which reports broken elevators for both U-Bahn and S-Bahn stations in Berlin. It’s unclear, however, how often this data is updated and the feed does not provide information on when a given service disruption was first reported (thus it’s hard to determine how up-to-date the feed is).

  

For U-Bahn stations, the BVG has a [website](https://www.bvg.de/de/Fahrinfo/Verkehrsmeldungen/Aufzugsstoerungen) listing currently out-of-order elevators. They do not make this data available via a public API, however. The S-Bahn also shares this information on [their website](https://sbahn.berlin/fahren/bahnhofsuebersicht/barrierefrei-unterwegs/aufzug-und-fahrtreppenstoerungen/?acc=acc2000-tab107) (which also includes escalator outages), but again, no API is made available.

  

*   [BrokenLifts (Website)](http://brokenlifts.org/)
*   [VBB Elevator Disruptions (RSS Feed)](https://www.vbb.de/unsere-themen/vbbdigital/api-entwicklerinfos/rss-feed-aufzugsstoerungen)

### Precise locations of station entrances and bus and tram stops

<u>Status: Open data available</u>  
For individuals with limited mobility, particularly those who need to plan routes with the shortest routes and/or fewest number of steps, it can be important to know precisely where a given stop or station entrance is located (something Google Maps doesn’t always show us, for example). This data (already mentioned in the section on elevator locations) is [published in Berlin’s Data Portal](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0) by the VBB. The dataset includes coordinates for every stop and station entrance in the VBB network (which includes Berlin). It also indicates where a given entrance is via a ramp or an elevator.

  

*   [Coordinates for station entrances and stop locations (CSV)](https://daten.berlin.de/datensaetze/koordinaten-der-zugangsm%C3%B6glichkeiten-zu-stationen-0)

### Information on relocated or temporarily unavailable stops and station entrances

<u>Status: Limited non-open data available</u>  
As with elevators and escalators, it’s not necessarily enough to simply know where, under normal circumstances, you can access a given stop or station. Construction projects frequently lead to temporarily relocated stops or inaccessible station entrances, which can in turn change the accessibility of a given location. The Verkehrsinformationszentrale Berlin (Traffic Information Center Berlin) publishes [an interactive map](https://viz.berlin.de/web/guest/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_default) that shows where there are disruptions to the normal availability of stops and stations; there is also an [HTML list of alerts](https://viz.berlin.de/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_list) available. However, no API or raw data is made available.

  

*   [Service alerts for public transport (Website)](https://viz.berlin.de/web/guest/2?p_p_id=vizmap_WAR_vizmapportlet_INSTANCE_Ds4N&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_cmd=bus&_vizmap_WAR_vizmapportlet_INSTANCE_Ds4N_submenu=bus_default)

### Guidance systems for the visually impaired in S- and U-Bahn Stations

<u>Status: Limited non-open data available</u>  
Guidance systems for the visually impaired often involve tactile paths covered with ridges or bumps to help visually impaired persons find their way with a cane. Many public transportation stations in Berlin have a network of these paths in place, but there is no single data source for exactly what stations have such a system. The BVG does not appear to publish any information related to this for their stations, but the S-Bahn Berlin website does include information on guidance systems for the visually impaired on their [overview page](https://sbahn.berlin/fahren/bahnhofsuebersicht/) for all stations in Berlin. A [parliamentary enquiry](https://kleineanfragen.de/berlin/18/15096-barrierefreiheit-auf-s-bahnhoefen) from May 2018 provides a list of the S-Bahn stations that do not currently have a guidance system for the visually impaired. Harder to track down is an up-to-date list of which U-Bahn stations do not currently have such a guidance system – this [parliamentary enquiry](https://kleineanfragen.de/berlin/17/12203-blindenleitsysteme-im-oeffentlichen-nahverkehr) from June 2013 provides the clearest listing, but presumably some of these stations have been equipped with guidance systems in the last five years.

  

*   [May 2018 parliamentary enquiry on accessibility in S-Bahn stations (PDF)](https://kleineanfragen.de/berlin/18/15096-barrierefreiheit-auf-s-bahnhoefen)
*   [June 2013 parliamentary enquiry on accessibility in Berlin’s public transport network (PDF)](https://kleineanfragen.de/berlin/17/12203-blindenleitsysteme-im-oeffentlichen-nahverkehr)

Accessibility in Public Buildings and Spaces
--------------------------------------------

{% include macro-image-section-markdown.html src="../images/TS_icons.png" caption="Accessibility in government buildings within the Tempelhof-Schöneberg Bezirk" %}

### Accessibility in city government buildings

<u>Status: Limited non-data available</u>  
For buildings that citizens can expect to have to visit in order to access services (e.g., Bürgerämter, Finanzämter, etc.), the city’s web presence publishes [location information](https://service.berlin.de/standorte/), including whether a given building has a wheelchair-accessible entrance, contains an elevator, and/or a wheelchair-accessible bathroom. This information is simply published on each location’s individual page as pictograms (as seen for example on [this page](https://service.berlin.de/standort/122219/) for Bürgeramt Hohenzollerndamm). The information is not otherwise published in a machine readable format. Moreover, the way the information is displayed makes it hard to get an overview of which buildings are appropriately outfitted for people with disabilities – it’s not possible to first apply a filter to see all the buildings with a wheelchair accessible entrance, for example.

  

Some individual Bezirke make getting this overview somewhat easier. Tempelhof-Schöneberg, for example, has a [website](https://www.berlin.de/ba-tempelhof-schoeneberg/ueber-den-bezirk/artikel.325220.php) with a list of buildings belonging to the Bezirk and whether or not these buildings are accessible for individuals with disabilities. In this view, at least users do not have to first click on each location to see how accessible it is.

  

*   [Locations of Berlin government buildings (website)](https://service.berlin.de/standort/122219/)

### Accessibility in schools

<u>Status: Limited non-data available</u>  
The Senate Department for Education, Youth and Families maintains an [online directory](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/) of schools in Berlin (“Schulverzeichnis”). It is possible to search for schools that are disabled-accessible (“Behindertengerecht”). However, this term itself doesn’t make it clear exactly what disabilities are being accommodated and what accommodations are provided. To understand this, users have to read the individual profiles for each school (and there it is generally clear that accessible schools are those with wheelchair-accessible buildings and toilets). This directory is not currently available as open data.

For the accommodation of disabilities like blindness or hearing loss in schools, this [parliamentary inquiry](https://kleineanfragen.de/berlin/18/10436-nachfrage-zur-barrierefreiheit-an-berliner-schulen) from February 2017 offers some insight. It includes PDF tables showing whether schools have systems in place for blind students or students with hearing loss (however, the table listing whether schools have these systems available does not appear to be a complete list of all schools in a given Bezirk, so it’s unclear how exactly that table was built and how complete the data is). An [additional inquiry](https://kleineanfragen.de/berlin/17/13570-schulen-mit-sonderpaedagogischen-foerderschwerpunkten) from 2014 offers a tabular overview of the number of students with some sort of disability or special condition (like Autism) attending general public schools in the context of a Berlin-wide push to better integrate such students into the broader school system (rather than have them attend special schools targeted at students with disabilities). This data is presumably too old to be used for analyses today, though it does at least provide some insight into how many students in Berlin need accessible schools.

  

*   [Berlin School Directory (website)](https://www.berlin.de/sen/bildung/schule/berliner-schulen/schulverzeichnis/)
*   [February 2017 parliamentary inquiry on accessibility in schools (PDF)](https://kleineanfragen.de/berlin/18/10436-nachfrage-zur-barrierefreiheit-an-berliner-schulen)

### Accessibility in cultural institutions (museums, etc.)

<u>Status: Limited non-data available</u>  
Berlin’s Museumsportal includes a [search function](https://www.museumsportal-berlin.de/en/museums/#filter_section=accessibility) for accessibility that makes it easy to locate museums that are particularly well-suited for various disabilities (i.e., not just wheelchair users). This information does not seem to be available as a dataset however. Additionally, through this portal it is possible to find [guided tours](https://www.museumsportal-berlin.de/en/guided-tours/#filter_section=accessibility) that are specifically directed at wheelchair users, deaf people, blind people, as well as those with learning disabilities. Again, this information is not made available as machine-readable data.

  

For theaters, a [parliamentary enquiry](https://kleineanfragen.de/berlin/18/17396-kultur-ohne-barrieren) from January 2019 featured a table of the availability of wheelchair spots in various theaters across Berlin. The table includes information on how many spots are available per theater, as well as how the spots can be booked (i.e. online, via telephone, or via mail).

  

*   [Accessible museums (website)](https://www.museumsportal-berlin.de/en/museums/#filter_section=accessibility)
*   [Accessible museum tours (website)](https://www.museumsportal-berlin.de/en/guided-tours/#filter_section=accessibility)
*   [January 2019 parliamentary enquiry on accessibility in theaters (PDF)](https://kleineanfragen.de/berlin/18/17396-kultur-ohne-barrieren)

### Public accessible parking spots

<u>Status: Limited non-data available</u>  
On its [page for mobility-limited tourists](https://www.visitberlin.de/de/berlin-fuer-rollstuhlfahrer-und-gehbehinderte), VisitBerlin claims there are 1,300 public parking spaces reserved for people with disabilities. To locate these spaces, they direct visitors to the website MyHandicap.de. However, it appears [only 766 spaces](https://www.myhandicap.de/adressverzeichnis/barrierefreie-adressen-suchen/#startresult) are in their database (and it’s unclear where exactly this data originates).

  

An answer to a [parliamentary enquiry](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12872.pdf) from December 2017 reported the total number of public parking spots for disabled persons. However, there are only numbers available for 7 of the 12 Bezirke; the other 5 either do not maintain these statistics or did not react to the request for information.

  

*   [Public disabled parking spots (website)](https://www.myhandicap.de/adressverzeichnis/barrierefreie-adressen-suchen/#startresult)
*   [December 2017 parliamentary enquiry on accessible parking spots (PDF)](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/18/SchrAnfr/s18-12872.pdf)

### Public accessible toilets

<u>Status: Limited open and non-data available</u>  
Only one Bezirk, Lichtenberg, publishes [locations of public toilets](https://daten.berlin.de/datensaetze/%C3%B6ffentliche-toiletten-im-bezirk-lichtenberg) as open data. This dataset includes a field for whether the toilet in question is wheelchair-accessible. On their website for visitors with disabilities, VisitBerlin links to a [PDF list](https://www.visitberlin.de/system/files/document/wall_city_toileten.pdf) of locations of accessible toilets across the city. Unfortunately, this list was last updated in February 2010.

  

*   [Locations of public toilets in Lichtenberg (various data formats)](https://daten.berlin.de/datensaetze/%C3%B6ffentliche-toiletten-im-bezirk-lichtenberg)
*   [2010 list of locations of accessible toilets across Berlin (PDF)](https://www.visitberlin.de/system/files/document/wall_city_toileten.pdf)

### Accessible playgrounds

<u>Status: Limited non-data available</u>  
Like many types of data in Berlin, information on where there are accessible playgrounds for children with disabilities is spread out across the different Bezirke. A [parliamentary enquiry](https://kleineanfragen.de/berlin/18/15804-barrierefreie-spielplaetze-in-berlin) from July 2018 requested information on the availability of such playgrounds across Berlin. In most cases however, little to no useful information on accessibility is provided (for example, Mitte referred those interested in learning about accessible playgrounds are available to their “Playground Portal”, but this portal doesn’t actually allow users to filter for accessible playgrounds).

  

*   [July 2018 parliamentary inquiry on accessible playgrounds (PDF)](https://kleineanfragen.de/berlin/18/15804-barrierefreie-spielplaetze-in-berlin)

Demographic Statistics
----------------------

### Population of individuals with disabilities

<u>Status: Open data available</u>  
The Amt für Statistik Berlin-Brandenburg publishes aggregate data on the number of people living with disabilities in Berlin. This information is useful if you want to understand how large a given population is (for example, if you want to make sure the number of sign language interpreters in Berlin is keeping up with the population of deaf people). There are two main relevant datasets. One is a [timeseries dataset](https://www.statistik-berlin-brandenburg.de/statistiken/langereihen.asp?Ptyp=450&Sageb=22007&creg=BBB&anzwer=10) that lists the number of severely disabled (“Schwerbehinderte”) individuals living in Berlin from 1993 – 2017. This data is broken up by various categories, including the nature of the disability and age brackets. This data is not broken up by Bezirk. The second is a dataset that is published every two years as part of a [statistical report](https://www.destatis.de/GPStatistik/receive/BBSerie_serie_00000721) on people with disabilities in Berlin. This dataset is quite detailed and includes population numbers for individual Bezirke. However, this information is only available in a machine-readable form starting in 2007.

  

*   [Time series data for people with disabilities living in Berlin (XLSX)](https://www.statistik-berlin-brandenburg.de/statistiken/langereihen.asp?Ptyp=450&Sageb=22007&creg=BBB&anzwer=10)
*   [Statistical report on people with disabilities living in Berlin, multiple years (XLS and XLSX)](https://www.destatis.de/GPStatistik/receive/BBSerie_serie_00000721)

Housing
-------

### Statistical data on accessible living spaces

<u>Status: Limited non-open data available</u>  
There is almost no known open or closed data available for how many wheelchair-accessible apartments there are in the city. Such information would be useful for assessing whether or not the current offerings adequately meet the needs of Berliners with disabilities, or if specific Bezirke have far fewer options than others, for example. The LaGeSo has an [online portal](http://www.rb-wohnungen.de/) to help citizens find wheelchair-accessible apartments, but it doesn’t provide any oversight on the total number of such apartments in Berlin. There is a [parliamentary enquiry](http://pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf) from December 2015 about accessible apartments in Berlin, which includes a table of how many senior-friendly apartments there are in Berlin. Senior-friendly is defined as either wheelchair accessible or as having minimal barriers (and the statistics include both definitions mixed together), so it's hard to say how many apartments there are that are appropriate for full-time wheelchair users.

  

*   [December 2015 Parliamentary enquiry on accessibile apartments (PDF)](pardok.parlament-berlin.de/starweb/adis/citat/VT/17/SchrAnfr/s17-17623.pdf)

So why does accessibility data matter?
--------------------------------------

In Berlin – like in so many cities across the globe – government officials and citizens alike are increasingly engaging with the topic of what it means to be a smart city and what a city needs to do to earn that title. Often this includes a focus on how both services and infrastructure can be planned to be more efficient and thus improve quality of life for citizens. But we can’t ignore the fact that not all citizens have the same needs. Indeed, poorly thought out smart city initiatives may not just result in certain populations being excluded from new developments (which is bad enough) – [they can actually make everyday life worse](https://www.technologyreview.com/s/612712/smart-cities-coule-be-lousy-if-you-have-a-disability/) for these people.

  

A smart city can’t truly be smart if broad segments of its population are being stranded at the city limits. Greater availability and quality of the types of data mentioned here would play a significant role toward making sure all Berliners have a chance be participate in and benefit from the future Smart City Berlin.

  

Further Resources
-----------------

![A screenshot of a website Wheelmap, which shoes wheelchair accessible locations in Berlin](images/wheelmap.png)

The website Wheelmap gathers information on wheelchair-accessible locations across the city

There are a few websites worth highlighting that, although they don’t all make available raw data, nevertheless provide valuable information related to accessibility in Berlin:  
  
**[Broken Lifts](http://brokenlifts.org/)**: As mentioned at the beginning of this post, this website is an good resource for staying informed of whether the elevators in a given train station are currently working.  
  
**[WheelMap](https://wheelmap.org/search)**: This site gathers crowdsourced information on the wheelchair-accessibility of various locations across Berlin (e.g., restaurants, museums, hotels, etc.). All of their data is stored by OpenStreetMaps and thus can be downloaded for reuse.  
  
**[Mobidat](https://www.mobidat.net)**: This portal also crowdsources information on accessible locations in Berlin; in contrast to WheelMap, they don’t have a specific focus on wheelchair accessibility and instead gather information relevant for a variety of disabilities (deafness, blindness, learning disabilities, etc.).