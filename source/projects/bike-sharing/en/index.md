---
layout: project
description: "In a recent project, the data interfaces (APIs) of the bike sharing providers were tested to determine benefits for the city of Berlin from open bike sharing data and consistent standards."
lang: en
title: Bike Sharing Provider in Berlin
subtitle: Data provision in the test and the benefits of uniform standards
type: publication
colorMode: bright
featuredImage:
thumbnail: /projects/bike-sharing/images/thumbnail.jpg
heroImage: /projects/bike-sharing/images/hero.jpg
socialMediaImage: /icons/social_media.jpg
visible: false
featured: false
authors:
  - alexandra-kapp
start: 2019-05-15
end: 2019-05-15
status: ongoing
date: 2019-05-15

materialsIncluded:

  - name: Source Code
    link: "https://github.com/technologiestiftung/bike-sharing"



---

In Berlin you are on average 154 hours in a traffic jam. Berlin leads the list as traffic jam capital. It is no longer necessary to debate whether new transport concepts are needed, but what they should look like. Last year, the Mobility Law was passed, paving the way for major measures to improve cycling infrastructure. In addition to private bicycles, more and more rental bikes are taking up space on Berlin's streets. For a few months, Uber has been the latest supplier with the _Jump_ brand. The rental bikes are not only received positively, but are also cause for complaints, as sidewalks and squares are blocked.

Now, after the Federal Council's decision of late May, e-scooters will also be allowed on German roads after a heated debate between advocates and opponents on 15 June. It is feared that uncontrolled parked e-scooters will pave the sidewalks.

[According to this article applies](https://www.gruenderszene.de/automotive-mobility/mobilitaet-jelbi-scooter): *"The scooters must not be in the way (especially at the entrances of subways and elevators) , more than four in one place are not allowed (otherwise it is considered as a special use of public roads) and defective vehicles must be removed within 24 hours, reports the administration. For inspections are (primarily) the regulatory offices of the districts responsible.*

But what does this control look like? The tedious manual work of public officials could be easily automated by providing the location data of the vehicles to the Public Order Office in real time and digitally. Other cities are making better use of this potential, for example Los Angeles (USA), which sets mandatory standards for providers with the Mobility Data Specification (MDS):

## MDS: Mobility Data Specification

On the one hand, MDS defines how **data of the bicycles must be provided** openly, on the other hand, cities are authorized **to set up digital prohibition zones** and to obtain evaluations of **historical data**. Thus, this is in addition to the open data topic a way of smart city planning and management.

[Here](https://github.com/CityOfLosAngeles/mobility-data-specification) is the documentation and [here](https://radforschung.org/log/rollersharing-was-staedte-lernen-koennen/) is the specification and its benefits are explained in detail.

In Berlin, there are currently no corresponding specifications for the provision of data. Vendors can deploy their vehicles on public roads without authorization.

## Existing data interfaces

Some bicycle providers already provide data interfaces (APIs) so the locations of the bicycles are publicly available. For Berlin, we looked at a **current project, as the data of the bicycle provider looks**. We want to find out what information can already be obtained about the data and what benefits the Mobility Data Specification would bring for Berlin.

## The providers
We looked at the six bike providers currently providing bikes in Berlin: Nextbike (Deezer), DB Bike (Lidlbike), Donkey Bike, Mobike, Lime Bike and Uber (Jump).

Only for Nextbike and DB Bike there is officially an API that is provided and documented. For the other providers, there is an [unofficial documentation](https://github.com/ubahnverleih/WoBike) about which it is possible to obtain the data.

Basically it can be said: Each provider provides the bike data differently. Conversely, this means that you have to look at the API individually for each vendor and modify it to process it in an entire presentation or analysis. That alone means a time-consuming additional effort.

Every API has its own problems and difficulties. Here in detail ([source code can be found here](https://github.com/technologiestiftung/bike-sharing)):

### Category 1: The model student with GBFS standard

Nextbike (in Berlin Deezer) implements the standard GBFS (General Bike Feed Specification). This [specification is already well documented](https://github.com/NABSA/gbfs/blob/master/gbfs.md), very easy to use and also part of the MDS specification. Without an additional key (API Key), all bicycle and station locations in Berlin can be queried by means of a query. The query of this API was the easiest and error-free.

### Category 2: Open Data according to own data schema

For the DB Bicycles (in Berlin Lidlbike) an API Key is needed, which can be easily obtained via the [DB API-Portal](https://developer.deutschebahn.com/store/site/pages/home.jag) ,
Problems occur when you want to query the data for the whole of Berlin: the data is given back with pagination, so that per page a maximum of 50 bicycles are displayed. With approx. 2000 bicycles 40 inquiries are necessary. This will exceed the maximum number of inquiries of 30 requests per minute. During our test, error messages of various kinds occurred more frequently during the query.
Positive is the very good documentation.

### Category 3: No official open data

For Mobike we could not find any official documentation. One user provided [unofficial documentation](https://github.com/ubahnverleih/WoBike/blob/master/Mobike.md) on which we worked:
The Mobike interface only delivers bicycles within a radius of 500 meters. Thus, we calculated a network of 240 radius centers covering the Berlin Ring. Accordingly, 240 queries are necessary to get all the bikes. This takes not only a relatively long time with one to two minutes, but also leads repeatedly to error messages being returned.

For Limebike we could also find only one [unofficial documentation](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md). Access to the API takes place via a complicated login process, in which the first step is to request a code that is sent via SMS. This code can then be used to request a token in the next step. In addition to the token, a web session cookie is needed to finally get the data.
The area for which the data is obtained is not completely clear that it does not match 100% with the set parameter of the bounding box or the user latitude / longitude. Per request, you will receive maximum information about 50 bicycles.

For Donkey Republic Bike we could not find any API or other open data.

Jump provides its data via the GBFS standard. Unfortunately, the links to the API URLs were only found for a few American cities. For Berlin we could not find these - even a request to the support did not help unfortunately.

## Conclusion
The current situation of the data interfaces is mixed. Only two providers officially provide the data publicly. For the other providers, it is a tedious process to get the data, possibly even unwanted by the providers. Even at DB Bike, where there is good documentation, workarounds must be found if you want to get information about all the bikes.
As already explained in the numerous articles on MDS (for example, from [Radforschung](https://radforschung.org/log/mds-fuer-kommunen-erklaert/), [Zukunft Mobilität](https: //www.zukunft- mobilitaet.net/169402/analyse/rollersharing-regulierung-kommunen-international-mobility-data-specification/) or [Remix](https://blog.remix.com/mds-gbfs-and-how-cities-can- ask-for-data-from-micromobility-providers-7957ca639f16)), the unified provision of data on rental bicycles and scooters offers several advantages. Here again summarized at a glance:

**Open Data provision of real-time data:**
Apps can be deployed to show all providers at once, providing real-time feedback on the full mobility situation.

**Provision of historical data for administration:**
Analysis of data for better traffic planning and control.

**Active Traffic Control:** The Administration may, at short notice, establish Digital No Parking Zones in which the return of rental vehicles is not possible.

**No documentation effort for suppliers:** For the existing specification no own documentation has to be created, maintained and provided.

The previous provision of the data does not provide nearly the analysis and design options for the Berlin administration, which would be guaranteed by a specification such as MDS. As stated by the [Radforschung](https://radforschung.org/log/) initiative, there is currently no legal basis for municipalities to require compliance with such a specification. However, they point out that the voluntary offer of e-scooters currently entering the market should be perceived as providing the data in the appropriate format. This is particularly relevant for Berlin, since according to [this analysis](https://radforschung.org/log/roller-in-die-staedte/) is to be expected that especially from some providers soon the e-scooter on to be found on the streets.

The implementation of the specification means for the city first, no additional overhead, since the provision of data on the provider must be made. The use of the provided data can be easily implemented through existing open source projects such as [Remix](https://www.remix.com/new-mobility).

What is possible with the obtained open data [shows for example the city of Austin in Texas, USA](https://medium.com/civiqueso/explore-dockless-data-with-out-transportation-4a308aa5c18).

Since bicycle and e-scooter providers benefit from the free use of public road space, it is only fair if they make their data available to the city and enable more efficient planning and management of the urban space.
The providers also benefit from such regulations, such as Nextbike, which [in cooperation with the city of Berlin affix bicycle stations at suitable locations](https://www.berliner-zeitung.de/berlin/verkehr/mietfahrraeder-in-berlin-mehr-als-350-nextbike-stationen-warten-noch-auf-genehmigung-32534102).