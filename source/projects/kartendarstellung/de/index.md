---
layout: project
description: Maputnik hingegen ist ein visueller Karten-Editor der unter einer Open Source
  License, kostenlos und online verwendet werden kann. Hier kann man ganz
  einfach einen individuellen Kartenstil, zum Beispiel passend für eine
  Corporate Identity (CI) gestalten.
lang: de
title: Kartendarstellung
subtitle: Maputnik
type: publication
colorMode: dark
featuredImage: /projects/kartendarstellung/images/featured.jpg
thumbnail: /projects/kartendarstellung/images/thumbnail.jpg
heroImage: /projects/kartendarstellung/images/hero.jpg
visible: false
featured: false
authors:
  - sebastian-meier
  - jolanta-paliszewska
start: 2019-02-02
end: 2019-02-18
status: finished
date: 2019-02-18
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


---

Die standard Kartendarstellung von OpenStreetMap ist für viele Projekte aus ästhetischer Perspektive nicht besonders ansprechend. Optisch entspricht diese einer "traditionellen" Landkarte. Es gibt verschiedene Kartenservices wie z.B. Mapbox, die es den Nutzer*innen erlauben ihre Karte visuell und inhaltlich anzupassen. Diese sind jedoch keine Open Source Lösungen. Darüber hinaus sind bei Mapbox in der kostenlosen Version die "Map Views" auf bis zu 50.000 begrenzt.

Maputnik hingegen ist ein visueller Karten-Editor der unter einer Open Source License, kostenlos und online verwendet werden kann. Hier kann man ganz einfach einen individuellen Kartenstil, zum Beispiel passend für eine Corporate Identity (CI) gestalten.

Maputnik ist ein Editor zum Definieren von Vektorkachel-Stilen. Dieser basiert auf der Mapbox GL JS Styling-Sprache und kann mit Geodaten von OpenStreetMap genutzt werden. Die spezifische Konfiguration einzelner Layer ist einfach möglich. Außerdem gibt es viele verschiedene Möglichkeiten zum Erfassen von Wegen und Gebäuden, z.B. aus Luftbildern, um dann beispielsweise Points of Interest zu erstellen. Die "finale" Karte lässt sich im JSON-Format exportieren. Die Kartenstile sind in der Mapbox-GL-Stilspezifikation dargestellt und können erneut mit Maputnik bearbeitet werden. Kartenstile zum Einstieg sind unter anderem bei [Openmaptiles](http://openmaptiles.org/) zu finden und können dann mit Maputnik online bearbeitet werden.

Wichtig ist, dass man mit Maputnik zwar eine Open Source Lösung hat um Kartenstile zu entwerfen, man aber trotzdem auf räumliche Daten angewiesen ist. Mit OpenMapTiles kann man sich, basierend auf OpenStreetMap aber eigene Vector Tiles generieren und diese auf dem eigenen Server hosten.


Hier kannst du deine Karte online designieren:
Design your maps online bei [Maputnik](https://maputnik.github.io/editor/)

# Corporate Design von #Technologiestiftung
![](/CI.png)



Ich habe Maputnik genutzt um eine Karte angepasst an das Corporate Design der Technologiestiftung Berlin zu gestalten.

- Straßen
- Autobahnen
- Parks
- Gebäude
- Wasserstraßen
- Grenzen
- ...

Sobald die eigene Karte fertig gestaltet ist, kannst du deinen Style speichern. Dafür musst du auf die Schaltfläche "Export"  klicken, um eine "style.json" zu exportieren. Du erstellst eine HTML-Seite und fügst den Mapbox GL JS-Viewer hinzu.


	<!DOCTYPE html>
		<html>
		<head>
	    <meta charset='utf-8' />
	    <title>Maputnik style</title>
	    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
	    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js'></script>
	    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
	</head>
	<body>
	    <div id='map'></div>
	    <script>
	        var map = new mapboxgl.Map({
	            container: 'map',
	            style: 'style.json',
	            center: [8.5456, 47.3739],
	            zoom: 11
	        });
	    </script>
	</body>




Die Datei ist hier zum Download verfügbar.
-> GitHUB ???

interaktive Karte auf der Blog + Point (TSB)
-> GitHUB ???




