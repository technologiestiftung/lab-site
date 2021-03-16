---
layout: project
description: Analysis of the most frequently used tags for Berlins Open Data.
lang: en
title: "The Urban Open Data Network"
subtitle: A cluster analysis shows on which topics the most data from Berlins Open Data Portal is available and how different issues are interrelated
type: dataset
colorMode: bright
featuredImage: /projects/tag-analysis/images/featured.jpg
thumbnail: /projects/tag-analysis/images/thumbnail.png
heroImage: /projects/tag-analysis/images/hero.png
socialMediaImage: /projects/tag-analysis/images/social_media.jpg
visible: true
featured: false
authors:
  - evelyne-brie
start: 2021-02-01
end: 2021-03-01
status: finished
date: 2021-03-16

materialsIncluded:
  - name: "GitHub"
    link: ""

---

## Context and Objectives

Open, freely-available data sets are collected centrally for the state of Berlin via a platform, the [Open Data Portal Berlin](https://daten.berlin.de). If you are looking for open data, this website is the first place to go. To ensure that specific data sets can be easily found by users in the abundance of the portal, each data set is described by keywords, the so-called tags. These tags are used to quickly identify the content of each dataset and allow users to find other datasets on similar topics. For instance, the dataset on eMobility electric stations is described by tags like *Elektro-Ladesäulen*, *Mobilität* and *Emobility*, each of which are associated with other data. On average, each dataset is described by 11.7 tags. Our objective was to determine which tags occurred most often with which other tags in order to outline a thematical network for all datasets available on the Berlin Open Data Portal. This allows to understand which tags are common across themes, and which themes are typically closest to each other in terms of content. 

Our goal was to determine which tags occur most frequently with which other tags in order to outline a thematic network for all datasets available on the Berlin Open Data Portal. This allows us to understand which tags co-occur across topics and which topics are typically closest in content. The data used for this analysis are the description tags from all 2,643 datasets available on the Berlin Open Data Portal at the time (March 15 2021).


## Getting Data and Extracting Tags

The data register, which is responsible for the input and storage of all data records in the Berlin Open Data Portal, is based on the widely used software CKAN (Comprehensive Knowledge Archive Network). CKAN offers a so-called API, i.e. an interface for programming applications. This makes it possible, for example, to perform a search or analysis on the contents of the portal that goes beyond the possibilities of the web interface. You can also read more about CKAN in the context of the data portal [here](https://berlinonline.github.io/open-data-handbuch/#ckan-api-1).

We used the CKAN API to access the data about tags. Using the R package ckanr, we made a request query to access the metadata for all datasets of the Open Data Portal. The output of this query is a JSON object---which can be presented as a table---with each row containing information on a different dataset from the Open Data Portal. One of the columns within this table contains a list of all tags associated with a given dataset, which is precisely the information we needed to complete this project. 

We separated these tags and proceeded to clean them in order to avoid duplicates. More precisely, we uniformized tags which were written in sometimes slightly different formats across datasets, using singular or plural forms of a same noun, including or excluding accents, and with or without capital letters. Additionally, we removed stop words like *der* or *ein*, which are superfluous to our analysis and distract from the content of the tags. Once these changes were made, we removed the tag *Berlin*, which was the most used tag of all datasets---without providing any relevant information. 


## Analyzing the tags

We analyzed the tags by creating bigrams off all cooccurring tags-i.e. which tags are used with which other tags in the same dataset, and how often. This resulted in 22,783 tag bigrams whose occurrence distribution is displayed below. 

{% include macro-image-section-markdown.html src="../images/bigramm.png"%}

From these 22,783 tags, we conducted an analysis on a subset of the 342 most co-occuring tags (i.e. most frequent bigramms), for 138 tags in total. In this subset, the median tag occurrence is 13.5 (in contrast with 2 for the whole dataset), which means that most tag associations occur in 13-14 different datasets (as is the case for *Kinder* and *Migrationshintergrund*), but the most cooccurring bigrams were present in up to 183 datasets (like for *Geodaten* and *Karten*). 

Our next step was to conduct an automatic clustering analysis of all tags based on these bigrams. Using a Louvain community detection model, we measured which bigrams cooccured most often with which other bigrams, creating a network of bigrams separated across different themes. Using the most frequently used tags, this cluster analysis identified 13 different themes containing multiple bigrams which were manually given a label. Indeed, community detection is helpful to indicate which bigrams occur with which other bigrams, but the software itself isn't able to understand the underlying concept uniting terms like *Preise* and *Werte*. We therefore attributed labels using our understanding of the most common conceptual denominator behind these groups of tags. 

## Visualization 

Using the information from our data analysis, we used the visNetwork function in R to establish a network visualization of our dataset tags. This visualization includes a search option for tags and categories. Nodes, each of which represents a different tag, are weighted to represent its number of total occurrences across all datasets---the bigger the node, the most frequently it appears on the Berlin Open Data Portal. Edges, which are the lines uniting nodes, illustrate how often tags occur in the same dataset using our initial bigram analysis. The graph is also interactive: when clicking on one of the nodes or edges, the associated tag(s) and their category and occurrence appear. 

- **[Try it yourself here!](https://odis-berlin.de/ressourcen/tag-analyse.html)**

## Insights

From the graph, we can derive some interesting correlations to the frequency and use of tags. The graph is visually divided into 2 large culsters that are only linked by a few tags. One is the area around the red *Geodata* and *Karten* nodes. It seems that at least most of the tags contained here belong to data sets that are actual geodata, i.e. data that have a spatial reference and can be further processed with a geoinformation system, for example. The second large cluster is found around the blue *GSI* and yellow *Regionalvergleich* nodes. Data from this subject areas of health and social affairs, as well as care and demography, are therefore frequently not available as georeferenced data sets. One reason for this is certainly that many of the data do not have a spatial reference or the spatial reference takes place via the specification of LORs (Lebensweltlich orientierte Räume, a spatial unit, see also our post here [hier](https://lab.technologiestiftung-berlin.de/projects/spatial-units/en/)), as the *LOR* node suggests, which represents a kind of link between the two large clusters.

Also interesting are the connections of this "center nodes". We see for example that the largest node is *Geodaten*, meaning this is the most frequently used tag in the data portal. When we select the *Geodaten* node, we can see what other terms are frequently used in connection with *Geodaten*. Some connections are not particularly surprising (e.g., *Karten*), but other connections give us an impression of what kinds of geospatial data are being published (for example, many of the connected nodes have something to do with geology/geological data).

{% include macro-image-section-markdown.html src="../images/graph1.png"%}

There are some emerged categories in our calculation that contain very few tags. An example of this is the category *Verletzungen* which consists only of the 2 tags *Vergiftung* and *Verletzungen*. The fact that a category was created at all for these tags tells us that there is a larger number of records for these topics in the portal (since only the most frequently occurring tags were included in the graph). Obviously, however, these are mainly data sets that contain information on both topics in combination and not individual data sets.

In summary, our tag analysis provides an interesting insight into the diversity, frequency, and coherence of the topics covered by the datasets in the Berlin Dataportal. Tags remain an important tool for describing data and making it more discoverable. Of course, the graph cannot show all the connections, as only the most frequent tags and connections have been included.
