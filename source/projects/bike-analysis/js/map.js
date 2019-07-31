var map = L.map('map', { zoomControl:false }).setView([52.53,13.38],11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 13,
    minZoom: 10,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoibHhuZHJrcCIsImEiOiJjanRoZDBlaGgwdGh4NDNydWhwbHo4ZXdsIn0.iCdQLK7JUYDX-JuNwzZnsw'
}).addTo(map);

var geojson = L.geoJSON(counts,
    {
        onEachFeature: onEachFeature,
        style: style
    }).addTo(map);

    function onEachFeature(feature, layer) {
        var popupContent = "Anzahl Fahrten: " + feature.properties.counts;
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent);

    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties),
            weight: 0.5,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    function getColor(props) {
            d = props.counts
        return d > 10000 ? '#28ef16' :
        d > 9000  ? '#aaef16' :
        d > 7000  ? '#efe416' :
        d > 5000  ? '#efc716' :
        d > 3000  ?  '#ef8b17' :
        d > 500  ? '#e06416' :
        d > 50  ? '#ef263d' :
        '#D8D8D8' ;
    }
    