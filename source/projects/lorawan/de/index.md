---
layout: project
description: LoRaWan, Technology & Digital Transformation
lang: de
title: LoRaWhat?! Let's talk about – LoRaWan!
subtitle: 40 Jahre nach der Geburtsstunde des Internet, versetzt das LoRaWan die Tech-Szene in helle Aufregeung
type: publication
colorMode: bright
thumbnail: /projects/lorawan/images/featuredImage.png
heroImage: /projects/lorawan/images/hero.png
socialMediaImage: /projects/lorawan/images/social_media.jpg
visible: true
featured: false
authors:
  - julia-zimmermann
start: 2019-09-24
end: 2019-09-27
status: ongoing
date: 2019-09-24

materialsIncluded:
  - name: "GitHub"
    link: "https://github.com/technologiestiftung/workshops"

redirect_from:
  - /projects/LORAWAN/index.html



---

*Wer sein Fahrrad, Hund oder gar sein Kind tracken möchte, der landet bei der Suche nach einem passendem **GPS-Tracker** schnell bei preisintensiven SIM-Karten-Trackern auf Abonnement-Basis. Mit Hilfe der letzten zwei Workshops der offenen Werkstatt im [CityLAB Berlin](https://www.citylab-berlin.org/) wollten wir demonstrieren, dass GPS-Tracking nicht teuer sein muss. Denn es gibt eine viel reichweitenstärkeres und ressourcenschonenderes Netz, welches man zum Tracken nutzen kann: das **LoRaWan**.*


## LoRaWAN – Wie Internet, nur anders

Das **Long Range Wide Area Network** ist ein im Jahr 2007 von Nicolas Sornin entwickeltes Netzwerkübertragungsprotokoll, welches zur Klasse der **Low Power Wide Area Networks** gehört. Demnach ist das LoRaWan darauf ausgelegt Datenpakete über große Distanzen (200 m bis 20 km), mit einem nur sehr geringen Energieverbrauch im kostenlosen 868-MHz-Frequenzband zu kommunizieren. Wegen seiner Eigenschaften hat sich der Einsatz von LoRaWan zur Kommunikation zwischen verschiedensten Sensoren und IoT-Anwendungen in der Industrie-Branche bereits bewährt. So werden zum Beispiel Messwerte von Wetterstationen, Wassertanks, LKW-Reifen, Mülltonnenaber oder auch Feinstaubmessgeräten durch Sensoren erfasst und über mit Hilfe der LoRaWan-Technologie in andere Netzwerke, wie das Internet, übertragen. Dabei ist die LoRaWan-Architektur recht simpel:

{% include macro-image-section-markdown.html src="../images/lora_architecture.png" caption="LoRaWan Architecture" %}


Wer sich jetzt fragt, warum wir dann überhaupt für noch für Internet bezahlen, wenn es doch anscheinend ein kostenloses Netzt gibt, den müssen wir leider enttäuschen. Denn die **Datenübertragungsrate des LoRaWan reicht von 292 Bit/s bis maximal 50 kBit/s** und eignet sich Dadurch vorrangig für den Einsatz verschiedenster IoT-Anwendungen und -Geräte.

 Die letzten zwei Workshops der offenen Werkstatt im [CityLAB Berlin](https://www.citylab-berlin.org/) widmeten sich dem Thema **GPS Tracking mit LoRaWan**. Dabei wurden die Teilnehmer\*innen mit entsprechender Hard- und Software durch unsere [Bauanleitung auf GitHub](https://github.com/technologiestiftung/workshops/blob/master/HowTo_GPSTracker.md) geführt und mit Hilfe von Lora-Nodes aus unserer [Hacking Box](https://www.technologiestiftung-berlin.de/hackingbox/), aber auch kleineren Bauteilen wie der [Dragino LoRaBee](https://www.dragino.com/products/lora/item/109-lora-bee.html), Daten über das LoRa-Netz übertragen.

Dieser Beitrag soll etwas Licht ins Dunkle bringen und klären: was  dieses LoRaWan überhaupt ist, was hat es mit TTN auf sich hat und wo Beides (bereits) Anwendung findet.*


Die Nodes bestehen aus einem Arduino Mega 2560 und einem [LoRa-Shield](http://wiki.dragino.com/index.php?title=Lora_Shield) von Dragino (teils mit, teils ohne GPS). Wir haben sie bei [The Things Network (TTN)](https://thethingsnetwork.org) registriert, mit Device-Adressen versorgt und für jedes der zwanzig Geräte ein eigenes .ino-File angelegt. Damit lassen sie sich nach einem Workshop schnell wieder in ihren Ursprungszustand zurückversetzen. Standardmäßig versenden die Nodes jetzt nach dem Einschalten eine kurze Nachricht mit einer individuellen Kennung. So sieht man 1.) dass sie ordnungsgemäß funktionieren und hat 2.) gleich ein Template, um weitere Anwendungen zu entwickeln.

Die Dragino-Shields vertragen sich übrigens nicht mit der offiziellen TTN-Arduino-Library. Macht aber nichts, da mit [Arduino-LMIC](https://github.com/matthijskooijman/arduino-lmic) eine prima Alternative existiert. Auf GitHub findet sich ein passendes [Hello World-Programm](https://github.com/SensorsIot/LoRa/blob/master/Nodes/Dragino/HelloWorld/HelloWorld.ino). Hier trägt man seine TTN-Keys ein, spielt das .ino auf den Arduino und schon sind wir auf Sendung:

{% include macro-image-section-markdown.html src="../images/HelloByte3.jpg" caption="What, what?" %}

Um die angekommenen Bytes wieder in lesbaren Text zu verwandeln, müssen wir in der TTN-Konsole eine Decoder-Function anlegen:

```js
function Decoder(bytes, port) {
    var decoded = {};
    decoded.message = String.fromCharCode.apply(null, bytes);
    return decoded;
}
```

Wer sich über die Syntax wundert: Anders als der Arduino spricht die TTN-Konsole Javascript, wenn auch in etwas rudimentärer Form. Aber für unsere Zwecke reichts:

{% include macro-image-section-markdown.html src="../images/HelloWorld3.jpg" caption="Now we're talkin" %}

Zwei kleine Änderungen haben wir dann doch noch vorgenommen:

1.) Text versenden sollte man über LoRa eigentlich [gar nicht](https://www.thethingsnetwork.org/docs/devices/bytes.html#how-to-send-text) – die Übertragungskapazitäten sind limitiert und Text ist hier einfach nicht effizient: Ein einzelner Unicode-Buchstabe braucht bereits stolze 3 Byte. Wenn 20 Geräte gleichzeitig ein „Hello World“ senden, könnten die LoRa-Götter böse werden. Zumindest aber verstopfen wir unnötig den Luftraum. Da wir lediglich für jedes Gerät eine individuelle Kennung senden möchten, sollten wir mit einem Byte pro Gerät locker auskommen (zur Erinnerung: 1 Byte = 8 Bit = 256 mögliche Werte).

2.) Dem Kollegen Christian Hammel, der unser LoRa-Gateway betreibt, ist aufgefallen, dass die HelloWorld.ino standardmäßig mit einem [Spreading Factor](https://docs.exploratory.engineering/lora/dr_sf/) von 12 sendet, was die Airtime unnötig in die Höhe treibt. Auch hier gilt zunächst: weniger ist mehr. Mit dem niedrigsten Spreading Faktor 7 reduzieren wir die genutzte Airtime von 1155ms auf nur noch 46ms. Nicht dass die Bundesnetzagentur noch einen Funkwagen vorbeischickt :) .

Wir passen also den Arduino-Code ein wenig an: Die Message-Variable ändern wir so, dass nur noch ein Byte mit einer Kennzahl (hier: 42) versendet wird. Der Spreading Faktor wird nach unten geschraubt und zuletzt der Sende-Befehl angepasst.

```js
//static uint8_t message[] = "Hello World";
byte message[] = {42};

//LMIC_setDrTxpow(DR_SF12,14);
LMIC_setDrTxpow(DR_SF7,14);

//LMIC_setTxData2(1, message, sizeof(message)-1, 0);
LMIC_setTxData2(1, message, 1, 0);
```

Unser einsames kleines Byte übersetzen wir erneut via Decoder-Funktion zurück in die ursprüngliche versendete ID. Voilà – schlanker geht’s nicht mehr:

{% include macro-image-section-markdown.html src="../images/thin2.jpg" caption="Kein Byte wird verschenkt" %}

Unser angepasstes .ino liegt auf GitHub. Wenn ihr Lust habt, die LoRa-Nodes für Bildungszwecke auszuleihen, geht es [hier](https://www.technologiestiftung-berlin.de/hackingbox/) entlang zur Hacking Box.
