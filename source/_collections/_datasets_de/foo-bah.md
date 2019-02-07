---
name: Das super Dataset
downloads:
  - url: "/assets/images/placeholder.png"
    title: "platzhalter"
  - url: "/assets/images/placeholder.png"
    title: "noch ein platzhalter"

---

<ul>
{%- for dl in page.downloads -%}
  <li>{{dl.url}} + {{dl.title}}</li>
{%- endfor -%}
</ul>


