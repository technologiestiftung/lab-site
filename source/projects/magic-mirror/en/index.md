---
layout: project
description: Mirror, Mirror
lang: en
title: "Mirror, Mirror"
subtitle: Prototyping a new interface for data visualization
type: publication
colorMode: bright
thumbnail: /projects/magic-mirror/images/thumbnail.jpg
heroImage: /projects/magic-mirror/images/MagicMirror1.jpg
socialMediaImage: /projects/magic-mirror/social_media.jpg
visible: true
featured: false
authors:
  - benjamin-seibel
start: 2018-03-10
end: 2018-03-10
status: finished
date: 2018-03-10
materialsIncluded:
  - name: Source Code
    link: "https://github.com/technologiestiftung/mm-mockup"

redirect_from:
  - /projects/MagicMirror/index_en.html
---

_Who hasn't thought about open data while brushing their teeth? At the lab, we often wonder how public data can be made more accessible. One way to achieve this is through interfaces that bring data out of your computer screen and into your everyday life – for example, into your bathroom mirror._

{% include macro-image-section-markdown.html src="../images/MagicMirror1.jpg" caption="Doesn't he look nice?" %}

The idea behind this "Magic Mirror" is to put a display behind a semi-transparent mirror. The mirror lets in just enough light to hide the display itself, while the information on the display seems to appear within the mirror itself – as if by magic. We had a leftover screen at the foundation and decided to do some upcycling. Here's the recipe:

Ingredients
-----------

*   picture frame with a plastic or glass front
*   semi-transparent mirror foil
*   an old LCD screen with a wreckable case
*   Raspberry Pi (we used a Model 3; older versions should work just fine)
*   HDMI cable
*   a bit of styrofoam, black cardboard and black spraypaint
*   An [easel](https://www.amazon.de/dp/B009ZCA27U/ref=asc_df_B009ZCA27U51779609/?tag=googshopde-21&creative=22410&creativeASIN=B009ZCA27U&linkCode=df0&hvadid=256579404646&hvpos=1o4&hvnetw=g&hvrand=9624166486250892299&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061131&hvtargid=pla-619129793032&th=1&psc=1) like you would use for a canvas

{% include macro-image-section-markdown.html src="../images/MagicMirror2.jpg" caption="Our workbench (3D printer was not used)" %}



Hardware
--------

Hardware-wise, the biggest challenge was putting the foil on the picture frame without creating bubbles. I'm notoriously bad at stuff like this and was quite nervous ("We only have one attempt, guys!"), but Louise and Seb managed to do it masterfully. Meanwhile, I freed the display from its case with a screwdriver using a delicate mixture of precise techniques and brute force, meaning it was the perfect task for me.

{% include macro-image-section-markdown.html src="../images/IMG8511.jpg" caption="Louise and Sebastian – professionals at work." %}

We spraypainted the styrofoam black and built a passe-partout to fit the display nicely behind in the picture frame. The final construction ended up quite heavy, so we decided against hanging the mirror on the wall and put it on the easel instead. Having it on an easel also makes it quite easy to move the mirror around.

Software
--------

Software-wise we did take a look at the modular [Magic Mirror-Framework](https://magicmirror.builders/) for the Raspberry Pi. This framework is a nice, open source project from the Netherlands that offers many different modules and even some open data widgets from Berlin, like [this one](https://github.com/deg0nz/MMM-PublicTransportBerlin) for the public transport timetables. The installation is also fairly easy to complete. Unfortunately, the framework turned out to be a bit slow for animations – the second hand of our digital clock, for example, was moving quite erratically.

{% include macro-image-section-markdown.html src="../images/MagicMirror3.jpg" caption="Our Magic Mirror runs straight from Github Pages" %}

In the end, we decided to go the easy way by just building a regular website and letting it run in the Raspi browser's fullscreen mode. It performs better, and you are able to use all the usual array web tools out there to make your data look nice. This made it particularly easy to include a map on Berlin's air quality, live news or a twitter feed, for example.

{% include macro-image-section-markdown.html src="../images/MagicMirror4.jpg" caption="Our final Magic Mirror" %}

Given that it wasn't too much of an effort to build, we're quite happy with the result. The mirror is a real eyecatcher at events and manages to draw attention outside the data viz community as well as within it. For us, it's a nice playground to experiment with different visuals. We'd like to try some things with facial recognition and machine learning soon – there is probably significant potential to execute more complex applications. Maybe even in the bathroom. And for those of you who've had your interest piqued and would like to construct your own Magic Mirror: happy building!
