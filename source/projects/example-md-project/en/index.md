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
lang: en

# REQUIRED: the title for your project
title: Example HTML Project

# REQUIRED: the subtitle for your project
subtitle: in english

# REQUIRED:# possible values "publication", "workshop", "dataset", "prototype"
type: workshop

# REQUIRED:dark or bright -- if you have a dark image use dark if you have a bright image…
# sets the color for the content on the text
colorMode: bright

# REQUIRED:if it is a featured project
# all paths should be absolut to the root of the source folder
featuredImage: /projects/example-html-project/images/feature.png

# REQUIRED: thumbnail path needs to be absolute at the moment. Also the image needs to be a quadrat 128 × 128
thumbnail: /projects/example-html-project/images/thumbnail.png

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
start: 2018-05-23

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

One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.


```js
addEvents() {
        const { prevButton, nextButton } = this.slider.getInfo();
        prevButton.onclick = () => this.updateIndexCounter();
        nextButton.onclick = () => this.updateIndexCounter();
    }
    createIndexCounter() {
        const {
            controlsContainer,
            slideCount,
            displayIndex
        } = this.slider.getInfo();

        this.divCounter = document.createElement('div');
        this.divCounter.innerHTML = `${displayIndex}/${slideCount}`;
        this.divCounter.setAttribute('class', 'tns-controls-counter');

        controlsContainer.appendChild(this.divCounter);
    }
```
