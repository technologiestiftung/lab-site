---
layout: project
description: No byte will be wasted
lang: en
title: New LoRa nodes are go!
subtitle: Testing our fresh Arduino Mega/Dragino Devices
type: prototype
colorMode: bright
thumbnail: /projects/loranodes/images/thumbnail.jpg
heroImage: /projects/loranodes/images/hero.jpg
visible: true
featured: false
authors:
  - benjamin-seibel
start: 2018-01-06
end: 2018-01-10
status: finished
date: 2018-01-10

materialsIncluded:
  - name": "GitHub"
    link: "https://github.com/technologiestiftung/LoRa-HelloByte"

redirect_from:
  - /projects/LORANODES/index_en.html
---

Over the last days I finally found the time to play with LoRaWAN again. It has been a while since our [first steps](https://github.com/technologiestiftung/LoRaWAN) in the open internet of things. In the meantime we have contributed to Berlin's [LoRa infrastructure](https://www.technologiestiftung-berlin.de/de/blog/gewinnspiel-lorawan-gateways-gewinnerinnen-stehen-fest/) and hosted a few [community meetups](https://www.technologiestiftung-berlin.de/de/blog/anwendungen-netze-und-bildung/). But recently we added 20 LoRa nodes to our [Hacking Box](https://www.technologiestiftung-berlin.de/hackingbox/), and those needed to be set up and tested. Of course I volunteered!

{% include macro-image-section-markdown.html src="../images/Node.jpg" caption="Fresh nodes" %}

The nodes consist of an Arduino Mega 2560 and a [Dragino LoRa-Shield](http://wiki.dragino.com/index.php?title=Lora_Shield) (some even have a GPS tracker). We registered them with [The Things Network (TTN)](https://thethingsnetwork.org) and got our device adresses. We also created an individual .ino for each device to be able to easily reset them after a workshop. As a default, the nodes now transmit a short message with an ID. This way you can a) check if they are working correctly and b) have a template to built upon for more complex applications.

The Dragino shields don't work with the official TTN-Arduino-Library. That's not a problem though, as [Arduino-LMIC](https://github.com/matthijskooijman/arduino-lmic) is a great alternative. On GitHub you can find a simple [hello world program](https://github.com/SensorsIot/LoRa/blob/master/Nodes/Dragino/HelloWorld/HelloWorld.ino) for the library. Enter your keys, put the .ino on your Arduino and you are ON AIR:

{% include macro-image-section-markdown.html src="../images/HelloByte3.jpg" caption="What, what?" %}

To decode the bytes in human-readable text, you need to enter a decoder function in your TTN console:

```js
function Decoder(bytes, port) {
    var decoded = {};
    decoded.message = String.fromCharCode.apply(null, bytes);
    return decoded;
}
```

If you wonder about the syntax: Other than the Arduino, the TTN console talks JavaScript, albeit in a rather rudimentary form. But it gets the job done:

{% include macro-image-section-markdown.html src="../images/HelloWorld3.jpg" caption="Now we're talkin" %}

In the end, we made two small changes to the original .ino:

1.) You actually [should not send text](https://www.thethingsnetwork.org/docs/devices/bytes.html#how-to-send-text) via LoRa. Transmission rates are very limited and text is not very efficient: a simple Unicode character already takes up three bytes. If 20 devices send „Hello World“ at the same time, the LoRa gods might get angry. Either way, we are wasting precious airtime. As we only need a unique identifier for each device, we should be good with using only one byte (quick reminder: 1 Byte = 8 Bit = 256 possible values).

2.) Our colleague Christian Hammel, who runs our LoRa gateway, noticed that the original .ino sends with a [spreading factor](https://docs.exploratory.engineering/lora/dr_sf/) of 12, which is another unneccessary waste of airtime. Again, less is more. With the lowest spreading factor 7 we reduce airtime from 1155ms to only 46ms. Just making sure the authoritiesdon't send over a black van :).</p>

To sum up: We set the message variable to only send one byte with an ID, e.g. "42". We reduced the spreading factor. And we adapted the send function to incorporate our changes.

```js
//static uint8_t message[] = "Hello World";
byte message[] = {42};

//LMIC_setDrTxpow(DR_SF12,14);
LMIC_setDrTxpow(DR_SF7,14);

//LMIC_setTxData2(1, message, sizeof(message)-1, 0);
LMIC_setTxData2(1, message, 1, 0);
```

After transmission, our lonely little byte is decoded once again with the decoder function: There you go – it doesn't get any smaller than that:

{% include macro-image-section-markdown.html src="../images/thin2.jpg" caption="Kein Byte wird verschenkt" %}

Our new .ino can be found on [GitHub](https://github.com/technologiestiftung/LoRa-HelloByte). If you like to borrow our nodes for educational purposes, make sure to check out our [Hacking Boxes](https://www.technologiestiftung-berlin.de/hackingbox/).
