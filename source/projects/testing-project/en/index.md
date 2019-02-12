---
layout: project
description: RSS Feed
lang: en
title: This is a test project
subtitle: This is a short description
type: publication
colorMode: dark
featuredImage: /projects/testing-project/images/featured.jpg
thumbnail: /projects/testing-project/images/thumbnail.jpg
heroImage: /projects/testing-project/images/hero.jpg
visible: true
featured: false
authors:
  - benjamin-seibel
  - fabian-dinklage
  - fabian-moron-zirfas
  - sebastian-meier
externalUrl: null
start: 2018-05-23
end: 2018-05-24
status: finished
date: 2019-02-12
assets:
  js:
    - ../js/index.js
  css:
    - ../css/index.css
materialsIncluded:
  - name: images
    link: "#"
  - name: video
    link: "#"
  - name: press text
    link: "#"
  - name: Source Code
    link: "#"
redirect_from:
  - /projects/123456789/
  - /old-site-path/my-amazing-post/
folderName: testing-project
fileType: md
de_title: Die ist ein Test Projekt
en_title: This is a test project
de_subtitle: Das ist eine kurze Zusatzbeschreibung
en_subtitle: This is a short description

---

orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.

{% include macro-image-section-markdown.html src="../images/test.jpg" caption="Dit is Berlin" %}

{%- capture mytext -%}
Dies ist ein <b>Typoblindtext</b>. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen.
{%- endcapture -%}

{%- include macro-blockqoute-section-markdown.html text=mytext info="Surname, First Name" -%}

Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.

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

Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.