---
# this is the YAML frontmatter
# Quick guide https://learnxinyminutes.com/docs/yaml/
# see the specs for yaml here->
# https://yaml.org/spec/1.2/spec.html
# REQUIRED: layout currently only projexct is possible
# DEFAULT: project
layout: project
# REQUIRED: write a short description of this project
description: 'this is my awesome project'
# REQUIRED: the language of the text
# DEFAULT: de
lang: de

# REQUIRED: the title for your project
title: Beispiel Markdown Projekt

# REQUIRED: the subtitle for your project
subtitle: Auf deutsch

# REQUIRED:# possible values "publication", "workshop", "dataset", "prototype"
type: publication

# REQUIRED:dark or bright -- if you have a dark image use dark if you have a bright image…
# sets the color for the content on the text
colorMode: bright

# REQUIRED:if it is a featured project
# all paths should be absolut to the root of the source folder
featuredImage: /projects/example-md-project/images/feature.png

# REQUIRED: thumbnail path needs to be absolute at the moment. Also the image needs to be a quadrat 128 × 128
thumbnail: /projects/example-md-project/images/thumbnail.png

# REQUIRED: heo image path needs to be absolute at the moment. Also the image needs to be a aize …
heroImage: /assets/images/placeholder.png #full page url

# if the post should be visible in the feed. You still can access it
# DEFAULT?
visible: false # if false the project will not be listed

# if it should be on the frontpage
featured: true

# all the authors that where involved.
# at least one isd needed
authors:
  - benjamin-seibel
  - victoria-dykes
  - fabian-dinklage
  - fabian-moron-zirfas
  - sebastian-meier
  - alexandra-kapp

# If you have an external URL
# add it here
externalUrl: http://example.com

# REQUIRED: the date of your project
start: 2018-05-09

# if it is for at timeperiod add the end value
end: 2018-05-24

# REQUIRED: ongoing or finished
# DEFAULT: finished
status: ongoing

# REQUIRED: The date when it was published
date: 2019-02-01
###############

# if you have additional JS or CSS add them here
# they will be added to the header
# remove if you have none
# the URLS should be relativ the to project
# can also be absolute
assets:
  js:
    - "../js/index.js"
  css:
    - "../css/index.css"

    # all tje materials that shoudl be included
# as a listing on the project page##########################
materialsIncluded:
  - name: "images"
    link: "#"
  - name: "video"
    link: "#"
  - name: "press text"
    link: "#"
  - name: "Source Code"
    link: "#"

# if the post had a counterpart on the old site add these tags
# for redirecting it
redirect_from:
  - /projects/123456789/
  - /old-site-path/my-amazing-post/
# the header needs to close with these three lines! below
---

Weit <b>hinten</b>, hinter den Wortbergen, fern der Länder **Vokalien** und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien.<br> Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben.


**foo**

<script> console.log('hello markdown')</script>


