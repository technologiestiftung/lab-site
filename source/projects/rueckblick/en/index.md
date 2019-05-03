---
layout: project
description: Best of Lab 
lang: en
title: A Year in Review 
subtitle: Highlights from the Ideation & Prototyping Lab
type: publication
colorMode: bright
thumbnail: /projects/rueckblick/images/thumbnail.jpg
socialMediaImage: /projects/rueckblick/images/lab-logo-hero.png
heroImage: /projects/rueckblick/images/lab-logo-hero.png
visible: true
featured: false
authors:
  - benjamin-seibel
start: 2019-04-30
end: 2019-04-30
status: finished
date: 2019-04-30

---

_“If you desire to see, learn how to act.”_ (Heinz von Foerster)

We founded the Ideation & Prototyping Lab at the beginning of 2018 upon realizing that while the digital transformation of cities is being constantly discussed, it is all too rarely actually being put into practice. Since its inception, the Lab has pursued three main goals: building up technical expertise for project implementations, offering pratical support to public bodies with their digitalization efforts, and executing our own digital projects in cooperation with diverse members of Berlin's society. This once-small experiment has now grown into a full-fledged civic tech team made up of nine employees and a broad network of freelancers. To mark the occasion of our website relaunch, here are some of the highlights of our work thus far, as well as a preview of what's coming up this year. 

Putting open data to work
------------------------

From the very beginning, open data and open infrastructures have been a huge part of our work. Technical openness is a prerequisite for true transparency as well as for a digital transformation from which all members of society can benefit. Moreover, openness lays the groundwork for agile cooperations and the rapid development of new solutions for old problems. So what can you create when these conditions are in place? Our dev team – Lead Data Scientist [Sebastian Meier](https://twitter.com/seb_meier) and Interface Designer [Fabian Dinklage](https://twitter.com/fdnklg) – has a few examples from the past year to show.

One of our first Lab projects, [Kita-Suche](https://www.kita-suche.berlin) ("Daycare Finder"), showed how data from a government body can be used to create a simple, effective, user-friendly interface – without the need to first spend a lot of money or invest years into the project. The website went online in February 2018 and remains popular with Berliners, who use its map interface, various filter functions, and built-in routing algorithms to find the best daycares for their families. 

{% include macro-image-section-markdown.html src="../images/kita.png" caption="Making finding a daycare (somewhat) easier" %}

At the start of the official swimming season in June last year, we pubslihed our second major application, a [web app that informs visitors about the water quality at public outdoor swimming spots in Berlin](https://www.badestellen-berlin.de). This project was developed in cooperation with the State Office for Health and Social Affairs (LaGeSo), the Berlin Water Supply Company (BWB), and the Berlin Center of Competence for Water (KWB) as part of the research project "Flusshygiene". In addition to the frontend website, this project led to the creation of a new data pipeline which ensures that the most current water quality readings from the LaGeSo are automatically updated on the website (as well as in the [Berlin Open Data Portal](https://daten.berlin.de/datensaetze/liste-der-badestellen)). The application also makes use of a scientific prediction model developed by the KWB. 

With more than 30,000 monthly visitors, this project was our most successful to date, and it even got us some [international attention ](https://apolitical.co/solution_article/berlin-steers-bathers-away-from-dirty-lakes-with-daily-pollution-updates/). The Federal Ministry for Education and Research liked the project so much that the project consortium received additional funding to roll out the application nationwide. One of our newest additions, [Fabian Morón Zirfas](https://twitter.com/fmoronzirfas), is currently working on a redevelopment of the backend to prepare the original prototype for deployments across Germany.

{% include macro-image-section-markdown.html src="../images/bade2.jpg" caption="Current data on water quality" %}

Open government data doesn't just provide a foundation for new citizen services. It also presents significant potential for further analyses from which multiple actors – including the government itself – can benefit. We developed one example of this in fall of 2018 with a [tool for analyzing grants awarded by the Berlin government](http://zuwendungsdatenbank.lab.technologiestiftung-berlin.de/#vis). The tool allows users to use various filters and criteria to analyze more than 73,000 individual grants awarded in the last 10 years. The data stems from an open dataset published by Berlin's Senate Department for Finances. This application doesn't just lead to more transparency around how government money is being awarded – it can also hope individual boroughs (Bezirke) and government departments assess their funding strategies and identify possible trends or gaps in how grants are being awarded. 

{% include macro-image-section-markdown.html src="../images/foerder.png" caption="Analyzing government grants" %}

ODIS - Pratical open data support for the government
---------------------------------------------------------------

Building an urban open data ecosystem and developing the corresponding applications is not a purely technical endeavor. A huge part of our day-to-day work is working with Berlin's government itself to rethink existing structures and processes and thereby lay the groundwork for more digital innovation in government. The Berlin Senate Department for Economics, Energy, and Public Enterprises (Senatsverwaltung für Wirtschaft, Energie, und Betriebe) recognized the value of this work and supported the creation of the [Open Data Info-Point](https://www.odis-berlin.de) (Open Data Informationsstelle – or simply, ODIS), which is a digital service team that offers government departments assistance with implementing open data strategies. 

{% include macro-image-section-markdown.html src="../images/odis.jpg" caption="Open Data in the making" %}

Since May of 2018, ODIS has offered hands-on support to the Berlin government as they work to expand their data infrastructure and ensure more data is made available via the city's official [Open Data Portal](https://daten.berlin.de). Our team, made up of [Tori Dykes](https://twitter.com/toridykes) and [Alexandra Kapp](https://twitter.com/lxndrkp), is in constant contact with members of Berlin's government, using their expertise – with a healthy dose of patience – to inform, support and consult government employees on open data through meetings, workshops and networking events. In addition to its strategic work, ODIS is also frequently focusing on open data through a thematic perspective, such as via "Data Dives" on topics like [bike traffic](https://lab.technologiestiftung-berlin.de/projects/datadive-cycling/en/) and [accessibility in the city](https://lab.technologiestiftung-berlin.de/projects/datadive-accessibility/de/) or through [visualization projects](https://lab.technologiestiftung-berlin.de/projects/bikerides/en/). This year we're focusing in particular on improving the flow of geospatial data between Berlin's different boroughts and and the central government. 

{% include macro-image-section-markdown.html src="../images/bikerides.jpg" caption="Bike count data visualized" %}

Making digitalization accessible
----------------------------------------

Tinkering, testing, and letting practical experience guide the way: whenever our schedules permitted, we were always findinding opportunities to put the "Prototyping" in our name into practice. This started with experiments with [LoRaWAN](https://lab.technologiestiftung-berlin.de/projects/loranodes/en/) and the [Internet of Things](https://www.technologiestiftung-berlin.de/en/blog/we-eat-our-own-soup/) and continued with the development of new [open data tools](https://lab.technologiestiftung-berlin.de/projects/csv-string-optimization/en/) and [interfaces](https://lab.technologiestiftung-berlin.de/projects/magic-mirror/en/) as well as workshops on topics like [speech recognition](https://retunefestival.de/2018/events/technologiestiftung/) or [creativity and machine learning](https://twitter.com/bnjmnsbl/status/1064545686325219329). You'd be hard pressed to find a week where there *wasn't* a new project added to our [GitHub page](https://github.com/technologiestiftung/). Apropos GitHub: the source codes for all Ideation & Prototype Lab projects are of course open source, and we're always happy to see others re-use and adapt them.

A few other brief highlights:

[„With the eyes of a machine“](https://lab.technologiestiftung-berlin.de/projects/ki-ai-intro/en/), our contribution to the debate around artificial intelligence and facial recognition, was well-received at Berlin's "Long Night of the Sciences", where our stand was met by long lines of people curious to test out facial recognition software for themselves.

{% include macro-image-section-markdown.html src="../images/ki-box.jpg" caption="Computer vision made simple" %} 

At the [„CityVis“](https://cityvis.io/exhibition.php) exhibition, we presented dozens of striking international examples of how data visualization can be used to explore and contextualize urban settings. We also premiered our own [augmented reality app](https://medium.com/@stephangensch/building-an-ar-dataviz-prototype-10d7c9e6d261) at the exhibition, which projects data about Berlin onto a physical city model. The app can still be used when visiting the city model in the offices of the Senate Department for Environment, Transportation and Climate Protection. 

{% include macro-image-section-markdown.html src="../images/AR-CityVis.jpg" caption="New layers atop an old city model" %} 

Also still accessible – and still well-used: our humble [geospatial data portal](https://data.technologiestiftung-berlin.de/en), where we make some of Berlin's most useful geospatial datasets available to download in common, easy-to-use formats.

{% include macro-image-section-markdown.html src="../images/portal.jpg" caption="Open data for all" %} 

Oh, and we can neither confirm nor deny the rumors that there might have been an Arduino-controlled cocktail robot sighted on our rooftop terrace during last summer's [Tech Open Air Festival](https://toa.berlin/)...

If all of this sounds like a lot of work, you're right: it was! And it was only possible thanks to the exceptional team we have assembled here – a team for which I am extremely thankful. It has been and continues to be a joy to work together with so many gifted, creative, diverse and curious people. And of course, we have to thank our coworkers here at the Technologiestiftung who play a major role in helping us execute our projects, our executive board for making our lab experiment into a reality, and of course our funders, specifically the Berlin [Senate Department for Economics, Energy, and Public Enterprises](https://www.berlin.de/sen/web/). 

We of course have a host of new projects we're currently working on, and there's one in particular we'd like to highlight for the end of this piece: We thrilled that this summer we'll be opening a CityLAB in cooperation with the Berlin Senate Chancellery and several partner organizations. The CityLAB will be an experimental lab for the city of the future and will bring together elements of a digital workshop, co-working space and an event space into a single location where participation and innovation are jointly pursued. In order to make this space a reality, we've recently welcomed three additional peple to our team: Nadine Riede (Events), Sara Reichert (Workshop Director) und Malgorzata Magdon (Administration). Nearly four years after we first sketched out an idea of what such a lab could look like for Berlin, we're over the moon that the CityLAB is mere weeks away from opening, and we can't wait to see how the project develops. Here's to a grand new adventure!


