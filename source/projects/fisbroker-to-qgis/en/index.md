---
layout: project
description: A guide on how to use QGIS to download geospatial data for Berlin.
lang: en
title: "HOW TO: Downloads from the geospatial data portal FIS-Broker"
subtitle: Download and process data with QGIS
type: publication
colorMode: bright
featuredImage: /projects/fisbroker-to-qgis/images/featured.jpg
thumbnail: /projects/fisbroker-to-qgis/images/thumbnail.jpg
heroImage: /projects/fisbroker-to-qgis/images/hero.jpg
socialMediaImage: /projects/fisbroker-to-qgis/social_media.jpg
visible: true
featured: false
authors:
  - alexandra-kapp
start: 2019-01-20
end: 2019-01-31
status: finished
date: 2019-01-31

redirect_from:
  - /projects/fisbroker-to-qgis/index_en.html
---

_The [FIS-Broker](https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/) is a real treasure trove for open geodata from Berlin. It is not easy to use though, especially not for beginners. At [ODIS](http://odis-berlin.de), we get regular requests from people who wonder how to access all these beautiful datasets. In the following post, our geodata expert [Alexandra Kapp](https://www.twitter.com/lxndrkp) offers a quick guide on how to download Berlin's geospatial data for your own purposes. Have fun exploring!_

The [FIS-Broker](https://www.stadtentwicklung.berlin.de/geoinformation/fis-broker/) is Berlin's geospatial data portal. All publicly available, spatially-oriented datasets are published here, e.g. bicycle lanes, school locations or living and green spaces. The data is visualized with maps and corresponding information is provided as a table. However, often there is the need to further process the data (for example, to filter it to only specific regions or data of interest), or maybe you want to combine the spatial data with other types of data. Unfortunately, it isn't possible simply click a button and obtain a GeoJson or CSV file via the FIS-Broker (something many would-be users of the data look for and are confused when they can't find it). Instead, the FIS-Broker provides a URL for a WFS server. The following article provides instructions on how to download the data via the WFS server URL, allowing users to convert the data into more familiar data formats for further use.

Data download with QGIS
-----------------------

There are various possibilities to download data from a WMS/WFS server. Programmers can use [this Python Package from the OK Labs Berlin](https://github.com/codeforberlin/wfs-downloader) or [this R Code](https://github.com/patperu/fisbroker_data). For non-coders we recommend using the open source software [QGIS](https://www.qgis.org/en/site), which can be downloaded [here](https://www.qgis.org/en/site/forusers/download.html) free of charge. Subsequently, the data can be used for creating custom maps in QGIS, or it can be exported as GeoJson, shapefile, GML or CSV.  
  
**Step by step instructions:**  
  

In QGIS, select _"Layer > Add Layer"_ and click on _"Add WFS-Layer"_ or select the icon in the left menu bar.

{% include macro-image-section-markdown-small.html src="../images/new_wfs_layer.png" caption="add new WFS-Layer" %}

A new window with the existing sever connections will open. Create a new server connection.

{% include macro-image-section-markdown-small.html src="../images/neue_verbindung.png" caption="Add new server connection" %}

A new window will open that asks for the server URL. Search within the FIS-Broker for the desired dataset. In this example, we're using a dataset of school locations. In the right-hand menu bar of the FIS-Broker, below the heading _"Datenbereitstellung"_, click on _"zum Downloaddienst (WFS)"_. It is important to select the WFS Link because the WMS Link only leads to a raster graphic without vector data or additional attributes.


{% include macro-image-section-markdown-small.html src="../images/schulen.png" caption="Dataset in the FIS-Broker" %}

Clicking this link opens a new window with the information about the WFS server. We need the URL located at _"Rechneradresse"_.

{% include macro-image-section-markdown-small.html src="../images/get_link.png" caption="Download details in the FIS-Broker" %}

Copy the _"Rechneradresse"_ into the URL field of the previously opened window _"Connection Details"_ in QGIS. The name can be chosen arbitrarily, and the other fields can remain empty. Then, confirm with _"OK"_.

{% include macro-image-section-markdown-small.html src="../images/server_benennen.png" caption="Insert connection details" %}

Click on _"Connect"_ to connect to the server. The name of the dataset should appear in the table below. Add the data with a button click on _"Add"_.

{% include macro-image-section-markdown-small.html src="../images/verbinden.png" caption="Connect to server"%}

In case the dataset is not shown, _"refresh"_ the browser panel by clicking on the arrow symbol.

{% include macro-image-section-markdown-small.html src="../images/aktualisieren.png" caption="Refresh browser panel"%}

The layer of the dataset should now be visible in the browser panel within the _"WFS"_ tab.

{% include macro-image-section-markdown-small.html src="../images/aktualisiert.png" caption="Refreshed browser panel"%}

With a double click or drag and drop of the dataset into the Layer Panel the data should appear in the map view. In this example we can now see all schools in Berlin. QGIS offers various options to edit or enhance the appearance of your map. For example, a map can be laid underneath the existing map, the visualization of the data points can be edited, or another layer can be added (e.g., the district borders). For a more detailed guide on what you can do with QGIS, Sebastian Meier (member of the Ideation & Prototyping Lab team) created [an elaborate QGIS introductory guide](https://drive.google.com/file/d/1EB9rbJBm41Gv8rQ1N7wHTpDcx6Bq5X7W/view) (available only in German) that can be downloaded for free.  
  
The attributes of the data can be viewed directly in QGIS by right clicking on the Layer and selecting _"Open Attribute Table"_.

{% include macro-image-section-markdown-small.html src="../images/go_to_table.png" caption="Open attribute table"%}
  
{% include macro-image-section-markdown-small.html src="../images/attributtabelle.png" caption="Viewing an attribute table"%}

With a right click on the layer and selecting "Save as ...", the data can be saved in various other formats (shapefile, GeoJson, GML, CSV, etc.).

{% include macro-image-section-markdown-small.html src="../images/go_to_save.png" caption="Save layer as ..."%}

{% include macro-image-section-markdown-small.html src="../images/save.png" caption="Save in desired format"%}