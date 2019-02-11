---
layout: project
lang: en
title: Example Markdown Project
featured: true
visible: true
featuredImage: /projects/example-md-project/images/feature.png
type: dataset
subtitle: in english duuude!
date: 2018-10-10
redirect_from:
  - /projects/123456789/
  - /path-to-old-site/
---

One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.


```scss
section {
    margin: $spacing-page-m $spacing-page-m $spacing-xl $spacing-page-m;


    @media only screen and (max-width: $screen-m) {
        margin: $spacing-xxl $spacing-page-xs $spacing-xl $spacing-page-xs;
    }

    &:last-of-type {
        margin: $spacing-page-l $spacing-page-m 0 $spacing-page-m;

        @media only screen and (max-width: $screen-m) {
            margin: $spacing-page-l $spacing-page-xs 0 $spacing-page-xs;
        }
    }
}
```
