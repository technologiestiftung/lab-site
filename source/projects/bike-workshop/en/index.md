---
layout: project
description: "In a workshop with stakeholders, we explored the topic of data-sharing agreements between shared mobility providers and the city of Berlin."
lang: en
title: "Shared mobility, shared data?"
subtitle: "In a workshop with stakeholders, we explored the topic of data-sharing agreements between shared mobility providers and the city of Berlin."
type: workshop
colorMode: bright
thumbnail: /projects/bike-workshop/images/thumbnail.png
heroImage: /projects/bike-workshop/images/hero.png
socialMediaImage: /projects/bike-workshop/social_media.png
visible: true
featured: false
authors:
  - victoria-dykes
start: 2019-09-23
end: 2019-09-23
status: ongoing
date: 2019-09-23
assets:
  js:
  css:
    - ../styles/index.css
materialsIncluded:
  - name: Workshop Slides (German)
    link: "https://github.com/technologiestiftung/lab-site/blob/master/source/projects/bike-workshop/Slides/mds_workshop.pdf"

---
*We are continuing our work on exploring the data around shared mobility in Berlin and how the city might benefit from insights generated by this data. Previously, <a href="https://lab.technologiestiftung-berlin.de/projects/bike-sharing/en/" target="blank">we have assessed</a> the availability and quality of public-facing APIs from bike-share operators active in the city, and <a href="https://lab.technologiestiftung-berlin.de/projects/bike-analysis/en/" target="blank">we analyzed data gathered from those APIs</a> to see what insights we could generate into the usage of bike-sharing in Berlin.* 

Seemingly every day, there is an article in one of Berlin’s newspapers about the glut of shared mobility offerings – these days, especially e-scooters – available in the city and the challenges (as well as opportunities) that they present. From discussions about safety to allocation of sidewalk space to the impact bike and scooter sharing have on transportation flows in the city, shared mobility is a dominant topic for citizens and politicians alike. 

After observing the conversations around shared mobility in the city and the government’s struggles to respond in a timely fashion to challenges, we posed ourselves the question: **How can we transform the conversation around shared mobility in Berlin from one that is largely reactive to existing situations into a conversation that proactively seeks to design a shared mobility system that works better for everyone?**

To help move conversations toward this proactive approach, we convened a group of 25 stakeholders for a workshop held in Berlin’s CityLAB at the beginning of September. Below, you will find an overview of what was discussed at this workshop, what the biggest insights form the workshop were, and what our next steps are for advancing this topic. 

## About the Workshop

The workshop participants represented a variety of organizations, including Berlin’s government (both the central government and the borough governments), multiple shared mobility providers, elected representatives, and civil society organizations.

The workshop was organized around the central question of how the city of Berlin could benefit from data sharing agreements between the city administration and the providers of shared mobility services (i.e., the companies behind bike- and scooter-sharing in the city). Under such an agreement, the city relays important information – such as precise geospatial data on no-park zones in the city) to shared mobility providers in a digital form that can be seamlessly and uniformly integrated into providers’ systems. By the same token, shared mobility providers can share valuable data with the city on how their services are being used (such as the total number and precise locations of all vehicles, or data on the trips their users take) that cities can in turn integrate into their planning activities. 

Our workshop focused specifically on the benefits the **<a href="https://github.com/CityOfLosAngeles/mobility-data-specification" target="blank">Mobility Data Specification (MDS)</a>** could have for Berlin. This is a data standard originating out of Los Angeles that clarifies what data should be exchanged between cities and providers and how that data should be structured. The standard has been widely implemented across the U.S. and has become the gold standard for preparing bike- and scooter-sharing data. We previously wrote about MDS and its possible benefits for a city like Berlin <a href="https://lab.technologiestiftung-berlin.de/projects/bike-sharing/en/" target="blank">here</a>.

Critically, Berlin lacks the same clear legal basis for regulating shared mobility providers that U.S. cities enjoy. In the U.S., cities can deny providers a permit to operate within their boundaries unless providers first sign a data sharing agreement. In Germany, however, prevailing legal interpretations say cities do not have the ability to control which providers are active in a city; they only have the ability to place some limits on their activities in the interest of maintaining public order (for example, forbidding more than 5 vehicles from being placed in a single location, or establishing no-park zones). Because of this, our conversations in the workshop focused on the possibility of voluntary data sharing agreements between the government and providers.

The workshop covered the following points:
* An **introduction to MDS** (provided by Maxmilian Richt, employee of the city of Ulm and a contributor to the blog <a href="https://radforschung.org/" target="blank">Radforschung</a>, which has published extensively about MDS in German
* An **overview of tools** that can help governments understand and analyze mobility data from shared mobility operators (like Remix or Populus)
* A review of which cities or organizations in Germany are **already working on establishing data sharing agreements** with mobility providers  
* A **recap of what conversations have been held with shared mobility providers** regarding data sharing led a representative from Spiekermann GmbH; the representative had previously worked on this topic through the now-defunct InnoZ and has continued this work with Spiekermann, a consulting firm with a focus on mobility issues
* An **analysis of stakeholder interests** with respect to data sharing agreements between cities and providers
* An **overview of which data MDS actually specifies** should be shared between governments and providers

## What we learned

**1.	Shared mobility providers in Berlin are open to the idea of voluntary data-sharing agreements.**

Naturally, there are caveats to this. For example, according to representatives from one of the bike-share companies in Berlin, they do not actually save trip data (due to data privacy concerns) and thus would not be able to share this data with the city. Additionally, setting up MDS-compliant APIs for the city to use would be a non-trivial amount of work, since most shared mobility providers are not currently using MDS internally. But the prevailing sentiment among providers is that they are open to and interested in talking with city officials about possible cooperations, as they themselves perceive they could also benefit from such arrangements (such as in getting to actively contribute to the design of policies and regulations, rather than sitting back and waiting to be regulated). Additionally, with MDS in place, providers would benefit from a single set of rules and regulations (such as in the case of no-park zones) that are provided in a standardized fashion, ensuring all providers implement these in the same way. 

**2.	Berlin’s boroughs in particular see significant potential in implementing MDS and engaging in a data exchange.**

Two of Berlin’s boroughs were represented at the workshop, and they saw significant potential in the insights that could be generated from shared mobility data, specifically for the city planning offices located in the boroughs. They also saw the value in boroughs using digital tools to draw no-parking zones that could then be exported as GeoJSON files which providers can then directly integrate into their systems. This process would remove the room for error (as well as tedium) that exists under the current process, whereby city planners hand-draw the zones and pass them on to providers, who are then left to digitize these zones. This introduces human error or possible differences in interpretation that can lead to slightly different versions of the same no-park zone appearing in different provider apps. 

**3.	However, city officials are also concerned they may lack the capacity and expertise to handle mobility data themselves.**

It’s a sentiment we’ve heard multiple times from government officials when talking about the potential of mobility data: they agree that the possible insights from this data would be extremely valuable, but they are less sure that the government itself would be in a position to generate these insights. The argument is that the government lacks both sufficient personnel to undertake such tasks – seemingly all of Berlin’s offices are chronically understaffed – as well as that the employees the government does have lack the technical skills to meaningfully handle and analyze mobility data. It’s clear that a successful push for implementing MDS in Berlin needs to be accompanied by the introduction of software tools that would make possible for government employees to understand and analyze this data even if they themselves lack the ability to work with the raw data. 

**4.	The central government in Berlin – specifically, the Senate Department for Environment, Traffic, and Climate Protection (SenUVK) – likely needs to lead on this topic, but it’s unclear where exactly the responsibility rests.**

At the workshop, participants from the city administration generally agreed that the SenUVK – the branch of the central government responsible for mobility-related topics – should lead discussions about what a data-sharing agreement between the city and providers should look like and what kind of data standards should be put in place (one can easily imagine how chaotic the situation in Berlin would become if instead each of the 12 boroughs were responsible for managing their own data-sharing activities). What’s less clear is who specifically – i.e., which department – should lead these activities. The usage of real-time mobility data is a novel concept for the city administration, and as such the administration lacks personnel with the necessary skills and expertise to analyze this data. 

## Where do we go from here?

In general, we’ll continue working on tools that show the value of open data, specifically in a mobility context. Since data skills (or the lack thereof) are a chief concern among government officials, we’ll also look for ways to build up these capacities among government employees, such as by finding a borough with whom we can work on a pilot project to digitally create no-park zones (i.e., as GeoJSON files) and transmit these files to shared mobility providers. And finally, we will work on drafting our own suggestion for a data-sharing agreement between the city administration and mobility providers to serve as a basis for further discussions. 