---
layout: project
description: LoRaWan, Technology & Digital Transformation
lang: de
title: LoRaWhat?! Let's talk about – LoRaWan!
subtitle: Knapp 40 Jahre nach der Geburtsstunde des Internet, schafft das LoRaWan ganz neue Möglichkeiten der Datenübertragung
type: publication
colorMode: bright
thumbnail: /projects/lorawan/images/thumbnail.png
heroImage: /projects/lorawan/images/hero.png
socialMediaImage: /projects/lorawan/images/featuredImage.jpg
visible: true
featured: false
authors:
  - julia-zimmermann
start: 2019-09-24
end: 2019-09-26
status: finished
date: 2019-09-26

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/workshops"

redirect_from:
  - /projects/LORAWAN/index.html

---

*Wer sein Fahrrad oder gar seinen Hund tracken möchte, der landet bei der Suche nach einem passendem **GPS-Tracker** schnell bei preisintensiven SIM-Karten-Trackern auf Abonnement-Basis. Mit Hilfe der letzten zwei Workshops der offenen Werkstatt im [CityLAB Berlin](https://www.citylab-berlin.org/) wollten wir demonstrieren, dass GPS-Tracking nicht teuer sein muss. Denn es gibt ein viel reichweitenstärkeres und ressourcenschonenderes Netz, welches man zum Tracken nutzen kann: das **LoRaWan**.*


## LoRaWan in der Theorie

Das **Long Range Wide Area Network** ist ein im Jahr 2007 von Nicolas Sornin entwickeltes Standard-Netzwerkübertragungsprotokoll, welches zur Klasse der **Low Power Wide Area Networks** gehört. Demnach ist das LoRaWan darauf ausgelegt Datenpakete über große Distanzen (200 m bis 20 km), mit einem nur sehr geringen Energieverbrauch im sog. ISM-Band (Industrial, Scientific und Medical Frequenzbereich) bei 868 MHz Frequenzband in Europa und 915 MHz in Nordamerika zu übertragen. Wegen seiner Eigenschaften hat sich der Einsatz von LoRaWan zur Kommunikation zwischen verschiedensten **Sensoren und IoT-Anwendungen in der Industrie-Branche** bereits bewährt. So werden zum Beispiel Messwerte von Wetterstationen, Wassertanks, Lkw-Reifen, Mülltonnen aber oder auch Feinstaubmessgeräten durch Sensoren erfasst und über mit Hilfe der LoRaWan-Technologie in andere Netzwerke, wie das Internet, übertragen. Dabei ist die LoRaWan-Architektur recht simpel:

{% include macro-image-section-markdown-small.html src="../images/lora_architecture.png" caption="LoRaWan Architecture"%}

<!-- <img src="../images/lora_architecture.png" style="margin:4%; width:90%" alt="LoRaWan Architecture"> -->

Das Device, auch End-Node genannt sendet über LoRaWan-Protokoll die gemessen Daten an ein LoRaWan-Gateway. Das Gateway wiederum sendet die Daten an einen Network-Server, an welchem wiederum die eigene, persönliche Applikation, wie bspw. ein Analytics-Tool, eine Karte oder eine Datenbank angebunden ist und vom Nutzer ausgelesen und gesteuert werden können. 

## Einsatzfelder in der Praxis

Wer sich jetzt fragt, warum wir dann überhaupt noch für Mobilfunknetz & Internet bezahlen, wenn es doch anscheinend ein kostenloses Netz gibt, den müssen wir leider enttäuschen. Denn die **Datenübertragungsrate des LoRaWan reicht von 292 Bit/s bis maximal 50 kBit/s** und eignet sich dadurch vorrangig für den Einsatz verschiedenster IoT-Anwendungen und -Sensoren. Darüber hinaus weißt LoRa eine hohe Kapazität auf: bis zu **eine Million Knoten pro Anwendung** sind denkbar.

{% include macro-image-section-markdown-small.html src="../images/lorawan-use-cases.jpg" caption="LoRaWan Use Cases"%}

<!-- <img src="../images/lorawan-use-cases.jpg" style="margin-left:6%; margin-right:4%; float:right; width:70%" alt="LoRaWan Use Cases"> -->

Die Rede ist hier von Geräten, die mit wenig Energieverbrauch, möglichst kleine Datenpaket (Stichwort: Schmalband) in geregelten Abständen – meist in Abstand von wenigen Minuten, **nicht in Echtzeit** – über große Distanzen versenden. Es können bzw. dürfen keine datenintensive Pakete, wie bspw. Fotos oder Videos in zu kleinen Zeitabständen übertragen werden, da durch die Bundesnetzagentur geregelt ist, wie viel **Airtime** das LoRaWan auf der 868-MHz-Frequenz belegen darf: **maximal 1 %**. Dennoch sind die Einsatzfelder für LoRaWan vielseitig.  

## LoRaWan mit dem CityLAB erleben

Die letzten zwei Workshops der offenen Werkstatt im [CityLAB Berlin](https://www.citylab-berlin.org/) widmeten sich dem Thema **GPS Tracking mit LoRaWan**. Dabei wurden die Teilnehmer\*innen mit entsprechender Hard- und Software durch unsere [Bauanleitung auf GitHub](https://github.com/technologiestiftung/werkstatt) geführt und mit Hilfe von LoRa-Nodes, aber auch kleineren Bauteilen wie der [Dragino LoRaBee](https://www.dragino.com/products/lora/item/109-lora-bee.html), Daten über das LoRa-Netz übertragen. 

Im letzten Workshop haben wir einen optimierten Tracker gebaut. Entgegen zu den LoRa-Nodes, wurden die individuell Bauteile zusammengestellt, sodass wir am Ende eine sehr robuste Variante (gelötet) mit sehr kleinem Packmaß gebaut haben.


### Ein kleiner Vorgeschmack
{% include macro-image-section-markdown-small.html src="../images/Nano_Xbee_Image.jpg" caption="GPS-LoRa-Tracker, wie er bei der Offenen Werkstatt gebaut wurde"%}

<!-- <img src="../images/Nano_Xbee_Image.jpg" style="margin-left:6%; margin-right:4%; float:right; width:60%" alt="GPS-LoRa-Tracker CityLAB"> -->

Für diesen LoRa-GPS-Tracker benötigt man die folgenden Hardware-Komponenten:
* 9V Batterien + Ladegerät
* Battericlip 
* GPS-Modul mit Antenne
* Arduino Nano V3 (Clone)
* Dragino LoRa Bee 868 (Europäische Frequenz)
  
Zusammengerechnet kommen wir pro Tracker auf **Kosten von nur 30€** und liegen damit weit unter dem Preis der gängigen GPS-Tracker, die i. d. R. bei 50€ anfangen.  

Sobald alle Bauteile fest miteinander verlötet sind, ist der Hardware-Teil abgeschlossen. Softwareseitig gilt es nun, den Tracker im **[The Things Network (TTN)](https://thethingsnetwork.org)** zu registrieren und dadurch eine entsprechende Device Adress, sowie einen Network-Session- und einen App-Key zuzuordnen. Diese drei Schlüsselattribute benötigen wir schließlich für den Programmcode (unter Arduino auch *Sketch* genannt), der auf den Arduino Nano V3 Mikrocontroller gespielt wird. Eine **ausführliche Anleitung zur Registrierung der Endnode in der TTN Konsole** inkl. Screenshots von der Benutzeroberfläche findet man auf [adafruit.com](https://learn.adafruit.com/the-things-network-for-feather?view=all).  

Sobald das Device einmal registriert ist, können die nötigen **drei Variablen, die im Sketch ergänzt werden müssen**, in der TTN-Konsole ausgelesen werden. Den Sketch aka. Programmcode findet ihr [hier auf GitHub](https://github.com/technologiestiftung/werkstatt/tree/master/codes_sketches) – Name: *GPSTracker_LoRa_Nano_V2.ino*

Folgende Zeilen müssen im Code angepasst werden:

```js
//*** Werte bekommt Ihr aus der TTN-Console, Format msb! ***
static u1_t NWKSKEY[16] = {
    0xB2, 0x5F, 0x35, 0x64, 0xB4, 0x89, 0xB8, 0x09, 0x08, 0x12, 0x7D, 0xAC, 0x0F, 0xC6, 0xF1, 0x5C
    }; 
    
static u1_t APPSKEY[16] = {
    0xB2, 0x5B, 0x16, 0x81, 0x53, 0x70, 0x49, 0xBF, 0x24, 0xBD, 0x55, 0xB2, 0xB5, 0xF6, 0xCB, 0x46
    }; 

// ACHTUNG: DEVICE ADRESSE MIT PRÄFIX 0x
// *** Wert bekomt Ihr aus der TTN-Console,Format hex-Style! ***
static const u4_t DEVADDR = 0X26011BF4
```

Ebenso sollte vor Upload des Sketches das Pinmapping der Dragino LoRa Bee überprüft werden. Gemäß unserem Schaltplan ergibt sich folgendes Pinmapping:

```js
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {2, 6, 7},
    };
```
Das Pinmapping muss nur dann angepasst werden, wenn ihr von unserem Schaltplan abweicht. Der Schaltplan, wie auch die aufürhliche Anleitung ist auf GitHub im Markdown ["How To GPS Tacker (optimized)"](https://github.com/technologiestiftung/werkstatt/blob/master/HowTo_GPSTracker_optimized.md) zu finden.

**Last but not least** muss der Sketch nun noch auf den Arduino Nano übertragen werden. Dazu am besten vorher einmal auf **Verify** (Haken oben links in der IDE) klicken und den Code kompilieren. Wenn keine Fehlermeldung erscheint, dann kann der Sketch direkt mit klick auf **Upload** auf das Board geladen werden. Fertig!


Wer zu Hause selber etwas experimentieren und beispielsweise eine Wetterstation auf der heimischen Terrasse einrichten möchte, der kann sich **eine Lora-Node + Zubehör kostenlos via [Hacking Box](https://www.technologiestiftung-berlin.de/hackingbox/) ausleihen.** Ansonsten haben wir für Anregungen, Diskussionen, Rückfragen, Hinweise und Tipps rund um das Thema GPS-Tracking mit LoRaWan immer ein offenes Ohr!