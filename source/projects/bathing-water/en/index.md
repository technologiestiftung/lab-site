---
layout: project
description: Together with Kompetenzzentrum Wasser (KWB), Berliner Wasserbetrieben (BWB)
  and LaGeSo we have create a modern data-driven application, which informs
  Berlin's citizen on the current water quality for all outdoor swimming
  locations in Berlin.
lang: en
title: Berlin's swimming lakes & rivers
subtitle: Up-to-date water quality information through shared data
type: prototype
colorMode: bright
featuredImage: /projects/bathing-water/images/featured-badewasser.jpg
thumbnail: /projects/bathing-water/images/thumbnail.jpg
heroImage: /projects/bathing-water/images/hero.jpg
visible: true
featured: true
authors:
  - sebastian-meier
externalUrl: https://badegewaesser-berlin.de/
start: 2018-01-01
end: 2018-06-01
status: finished
date: 2018-07-04
redirect_from:
  - /projects/bathing-water/index_en.html

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/badestellen"

---

This week we launched our new app <a href="https://badegewaesser-berlin.de/">Badestellen Berlin</a>. This was a joint effort of <a href="http://www.kompetenz-wasser.de/de/">Kompetenzzentrum Wasser</a>, <a href="http://www.bwb.de/content/language1/html/index.php">Berliner Wasserbetriebe</a> and the <a href="https://www.berlin.de/lageso/">LaGeSo</a>. The new application allows citizens to get up to date information on bathing water quality. Besides water quality information the site provides additional info on each site, for example, accessibility features or availability of toilets and parking lots. A link to a routing service and the local public transport service allow you to conveniently plan your next trip.

{% include macro-image-section-markdown.html src="../images/overview.jpg" caption="The new app Badestellen Berlin" %}

The new app is based on the research project <a href="http://www.kompetenz-wasser.de/de/project/flusshygiene/">Flusshygiene</a>. The research project started in 2015. Since then the team has been modelling the influence of extreme weather events on the local bathing waters. Now, the resulting model allows us to predict the water quality in events of heavy rain. The LaGeSo, who is responsible for measuring the water quality, is delivering new results every two weeks. Thanks to the new model, we can provide daily updates on the quality of local lakes and rivers that are used for swimming. This was specifically optimised for the locations <a href="http://www.badegewaesser-berlin.de/?id=344351&ani=true">kleine Badewiese</a> and <a href="http://www.badegewaesser-berlin.de/?id=344359&ani=true">Grunewaldturm</a>, because they suffer the most from such events. Most of the other locations, especially the lakes, are almost unaffected by such events.

{% include macro-image-section-markdown.html src="../images/prediction-lakes.jpg" caption="Kleine Badewiese and Grunewaldturm" %}

From a technological perspective, the project is quite unique in Berlin. The application runs on data from a variety of sources. Some of the data is available as open data, like the water quality measurements by LaGeSo, some data is closed data, for example, the data on critical infrastructures from the Berliner Wasserbetriebe. Finally, all data is being aggregated and combined by the web application and delivered as an easy to use app to all citizens. Beyond the web app, the resulting enriched datasets are also redirected to the LaGeSo, who is using the data to update their website  and provide the data through the open data portal.

{% include macro-image-section-markdown.html src="../images/data-pipeline-en.jpg" caption="Data Pipeline" %}

<i>We are already working on new features. During the next few months, we are planning on providing historic measurement data as raw exports as well as visualizations on the website. In addition, we are working on a feedback form, allowing citizens to send us information on any pollutions they find, thereby, creating a responsive feedback channel between citizens and the city.<br /><br />In this spirit, we wish you a refreshing summer and hope you can enjoy Berlin's numerous lakes and rivers.</i>

{% include macro-image-section-markdown.html src="../images/jump.gif" caption="Summer Time via yesyesmuchfun.tumblr.com" %}
