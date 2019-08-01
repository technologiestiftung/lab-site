class Map {
    constructor(config) {
        this.div = config.div;
        this.file = config.file;
        this.value = config.value;
        this.hovertext = config.hovertext;
        this.geometry = config.geometry;
        this.margin = {top: 20, right: 20, bottom: 20, left: 50},
        this.width = config.width;
        this.height = config.height;
        this.config = config;
        
        this.init = this.init.bind(this);
    }
    
    init () {
        //add map
        var map = L.map(this.div, { zoomControl:false }).setView([52.51,13.39],12);

        //add background tile
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 13,
        minZoom: 12,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoibHhuZHJrcCIsImEiOiJjanRoZDBlaGgwdGh4NDNydWhwbHo4ZXdsIn0.iCdQLK7JUYDX-JuNwzZnsw'
        }).addTo(map);
        
        var value = this.value;
        var hovertext = this.hovertext;
        var geometry = this.geometry;
        var max = d3.max(this.file.features, function(d) {return d.properties[value];});
        var colorScale = d3.scaleLinear()
        .domain([0, max])
        .range(['#D8D8D8', '#e60032']);
            
            //add Sbahn-Ring
            L.geoJSON(ring, 
                {
                    style:ringstyle
                }).addTo(map);
        
            // add data file
            let variables;

            if (geometry == 'point') {
                variables = {
                    pointToLayer: function (feature, latlng) {

                        return L.circleMarker(latlng, style(feature));
                        },
                    onEachFeature: onEachFeature
                }
            } else {
                variables = {
                    onEachFeature: onEachFeature,
                    style: style
                }
            }
            L.geoJSON(this.file,variables).addTo(map); 
            
            function onEachFeature(feature, layer) {
                var popupContent = hovertext + feature.properties[value];

                if (feature.properties && feature.properties.popupContent) {
                    popupContent += feature.properties.popupContent;
                }
                
                layer.bindTooltip(popupContent);
                layer.on('mouseover', function (e) {
                    this.openTooltip();
                });
                
            }
            
            function style(feature) {
                return {
                    radius: 5,
                    fillColor: colorScale(feature.properties[value]),
                    weight: 0.5,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7,
                };
                
            }



    
            function ringstyle() {
                return {
                    fillOpacity: 0,
                    weight: 0.5,
                    opacity: 1,
                    color: 'grey',
                };
                
            }
        }
    }