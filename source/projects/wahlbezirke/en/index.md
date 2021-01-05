---
layout: project
description: A new ODIS prototype helps city employees draw new electoral district boundaries more easily and efficiently.
lang: en
title: "Optimizing electoral districts with digital prototypes"
subtitle: With this new ODIS prototype, city employees can more easily draw new electoral district boundaries based on population changes between elections.
type: prototype
colorMode: bright
featuredImage: /projects/wahlbezirke/images/featured.jpg
thumbnail: /projects/wahlbezirke/images/thumbnail.png
heroImage: /projects/wahlbezirke/images/hero.png
socialMediaImage: /projects/wahlbezirke/social_media.jpg
visible: true
featured: false
authors:
  - evelyne-brie
start: 2020-02-01
end: 2020-12-18
status: finished
date: 2021-01-11

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/odis-wahlbezirke"

---

## Objective and Motivation

The objective of this project is the development of a software helps city employees adjust the boundaries of electoral districts (*Wahlbezirke*) between election years. Our final product is a user-friendly tool that automatically generates and evaluates optimized districting maps for Berlin’s boroughs (*Bezirke*). The intuitive interface allows users to make their own modifications to algorithmically generated electoral maps. 

The practical motivation for the development of this tool lies in demographic changes regularly experienced in Berlin from year to year. Shifting populations inevitably cause some electoral districts to become more populated than others. But according to Berlin’s electoral regulations (*Landeswahlordnung*), each voting district should encompass a maximum of 2,500 German citizens. Thus, the borders of these electoral districts have to be periodically redrawn as a response to these population shifts. For many city employees tasked with undertaking these redraws, this is an arduous task due to a lack of digital tools that could help automate parts of this process (for example, through highlighting which districts exceed the 2,500 threshold and by how much). Instead, many end up redrawing borders by hand, either by using a geographic information system, or even using pen and paper. 

To address this need, the Open Data Informationsstelle ([ODIS](https://odis-berlin.de)) at the Technologiestiftung Berlin has developed an open source prototype that can assist city employees in redrawing electoral district boundaries based on reassigning individual street blocks to new districts.

- **[You can access the prototype here (available only in German)](https://wahlbezirke.odis-berlin.de/)**

## Development of the Tool

At this stage, our prototype has only been tested using data from the borough of Tempelhof-Schöneberg, which encompasses **123 voting districts and 1032 inhabited city blocks**. Eighteen of these voting districts exceed the population threshold of 2,500. In this borough, the average voting district-level density is 2,269 inhabitants.

Redrawing the borders of these voting districts necessitates the automatic reassignment of some of their blocks to adjacent voting districts which are not themselves overpopulated. Here, the technical challenge lies in the fact that the reassignment of blocks cannot be random, but rather should lead to an optimally designed electoral map respecting a specific population threshold as well as reasonable compactness requirements (for example, a voting district should not be excessively long, meaning that people living at one end of it might have to travel a long distance to reach their assigned polling site). 

We proceeded in 5 steps to fulfill this agenda:

**1)** First, we **merged data from various sources** to allow our algorithm to have all the information it needed to run the simulations. The merged dataset resulting from our data cleaning process contains demographic data by bloc, geographic information by bloc as well as each bloc's voting district number. Most of this data is available as open data, but population data for individual city blocks is not (due to data protection concerns). Using this data, our prototype identifies which districts are overpopulated and therefore need to be modified.

{% include macro-image-section-markdown.html src="../images/Population-desktop@2x.png" caption="The electoral districts in Tempelhof-Schöneberg as of the last election. Districts with more than 2,500 inhabitants are viewed as 'overpopulated' and thus in need of adjustment." %}


**2)** Second, we **created an algorithm** that assigned blocks in overpopulated districts to adjcent districts. The main idea here was to identify alternative voting district classifications for relevant blocs wherever possible. The method consists of relocating blocks from overpopulated districts to adjacent districts that are not themselves overpopulated. Below is a depiction of the Euclidian distance (simply put, the shortest linear segment between two points) between each block and its neighboring blocks, regardless of district attribution. In total, the algorithm generates 10,000 simulations of modifications using the shifting of blocks to neighboring districts using Euclidian distance.

{% include macro-image-section-markdown.html src="../images/Network-desktop@2x.png" caption="The algorithm is able to identify the neighboring blocks for an individual street block; this information is used to suggest alternative electoral districts to which a given street block can be reassigned (i.e., in the case of an overpopulated district)." %}


**3)** Third, we **evaluated the simulated electoral maps** of the 10,000 simulations to pick the 38 best simulations according to the following criteria: 

- Number of Modified Blocks: the number of blocks that shifted their district affiliation as part of the simulation when compared to the original map.
- Number of Affected Districts: the number of districts in which one or more blocks were removed or added as part of the simulation when compared to the original map.
- Number of Overpopulated Districts: the number of districts with more than 2,500 inhabitants (i.e., districts that are still above the threshold after the algorithmic optimization).
- Average, Median and Minimum Convex Hull Score: a compactness measure encompassing the ratio of the area of a district to the area of the minimum convex polygon that can enclose the district's geometry.
-  Standard Deviation Population Size: a measure of the variation in population size across all districts.

The best simulated maps were selected using either (1) their overall performance on all criteria (i.e. all simulations that scored among the top 25% of all simuations across all criteria, which amounted to 28 simulations), and (2) their performance on one specific criteria (i.e. each simulation or set of simulations with the absolute best performance on a single indicator, for a total of 10 simulations).

**4)** Fourth, we **created a graphical display** of the scoring of these best simulations in order for users to understand which simulations performed particularly well on specific criteria. Using a multi-dimensional graph, users can visualize the overall performance of specific simulations and are allowed to manually attribute different weights to each criterion. Using this information, they can select which simulation best fits their needs as a template for the following step.

{% include macro-image-section-markdown.html src="../images/Auswahl-desktop@2x.png" caption="Our prototype allows users to visualize and compare the 30 'best' simulations generated by our algorithm." %}


**5)** Finally, we **created an interactive map** allowing for block-level modifications to the simulated optimized version generated by our algorithm. Indeed, we wanted our tool to both provide helpful automated assistance and to allow for user discretion in deciding its final output. By clicking on a map representing the simulation of their choice, users are intuitively able to shift the attribution of blocks to different neighboring districts, and are thereby informed of the overall population change resulting from this modification (i.e., based on the shifted block, users can immediately see what the new population of all affected districts is). (This interactive map can be accessed via the [online prototype](http://wahlbezirke.odis-berlin.de/) under the "Editor" tab.)

## Future Steps

One major goal for future development of this prototype is the integration of an import and export function within the prototype. As of now, all analyses have been conducted directly within our own computational system at the Technologiestiftung rather than within the tool itself, which currently solely displays the various outputs of our algorithm as well as the graphical display and the interactive map. 

Long-term, the prototype would ideally support the import of a Shapefile or GeoJSON, which would encompass the shapes of the existing voting districts and the population of the city blocks within the districts, as well as the export of a the optimized block distribution as a Shapefile or GeoJSON.


{% include macro-image-section-markdown.html src="../images/map1.png" caption="A map of showing the geographic distribution of recipients of the various kinds of basic income support in Berlin" %}

