var map_chart, bee_chart, tool_tip, table_ranking, brushed_tool_tip, map_chart_berlin, map_chart_berlin_legend, bee_chart_berlin, berlinStudents, berlinStudies, berlinAge,
rankedByAge, rankedByStudents, rankedByStudies, filterDefault, filterSwitch = 'students', order = 'ascending', unis_berlin, typeGlobal, zoomTimer = 3;

if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
    if(document)
    document.body.className += ' safari';
 }

const rangeMin = 1,
rangeMax = 600,
initScale = {scale:50000, x:-312.30765033408386, y:3576.511912314453},
filterKey = "count_students",
domain = [24,68429],
scale = d3.scaleLinear()
    .domain([domain[0], domain[1]])
    .range([rangeMin, rangeMax]);

var dataGlobal;
const tau = 2 * Math.PI;

projGer = d3.geoMercator()
    .scale(1 / tau)
    .translate([0, 0]);

projBerlin = d3.geoMercator()
    .scale(1 / tau)
    .translate([0, 0]);

const colors = ['F67060', 'F39072', 'E5CB98', 'D0CEA5', 'B0BAAA', '6892B1', '8FA6AE'];
const invertedColors = ['F67060', '8FA6AE', '6892B1', 'B0BAAA', 'D0CEA5', 'E5CB98', 'F39072'];
var colorScale = d3.scaleQuantize()
    .domain([domain[0], domain[1]])
    .range(colors)

var colorScaleInverted = d3.scaleQuantize()
    .domain([domain[0], domain[1]])
    .range(invertedColors)

var calcArea = function(value) {
    var radius = Math.sqrt((value/ Math.PI))
    return radius;
} 


update = (selection, type) => {

    if (type == 'GER') {
        const filtered = dataGlobal.filter( uni => { 
            return uni['count_students'] < selection[0] && uni['count_students'] > selection[1]
        })

        bee_chart.update(selection);
        map_chart.update(selection);
        
        brushed_tool_tip.update(filtered);

    } else if (type == 'BER') {
        const filtered = unis_berlin.filter( uni => { 
            return uni['count_students'] < selection[0] && uni['count_students'] > selection[1]
        })

        bee_chart_berlin.update(selection);
        map_chart_berlin.update(selection);

        brushed_tool_tip_berlin.update(filtered);
    }





}

updateTooltip = (data, type) => {
    if (type == 'bee') {
        tool_tip.update(data.datum);
        tool_tip_berlin.update(data.datum);
    } else if (type == 'map') {
        tool_tip.update(data);
        tool_tip_berlin.update(data);
    }
}

filterData = (key, data, order = 'descending') => {
    var sorted;

    if (order == 'ascending') {
        sorted = data.sort((x,y) => {
            if (x[key] > y[key]) {
                return 1;
            } else if (x[key] < y[key]) {
                return -1
            } else if (x[key] == y[key]) {
                if (x.name > y.name) {
                    return 1;
                } else if (x.name < y.name) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            };
        });
    } else if (order == 'descending') {
        sorted = data.sort((x,y) => {
            if (x[key] > y[key]) {
                return -1;
            } else if (x[key] < y[key]) {
                return 1
            } else if (x[key] == y[key]) {
                if (x.name > y.name) {
                    return -1;
                } else if (x.name < y.name) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            };
        });
    }
    
    var temp = [];
    for (var index = 0; index < 10; index++) {
        const element = sorted[index];
        temp.push(element);
    }
    return temp;
};

rankedData = (key, data, order = 'descending') => {
    var sorted;

    if (order == 'ascending') {
        sorted = data.sort((x,y) => {
            if (x[key] > y[key]) {
                return 1;
            } else if (x[key] < y[key]) {
                return -1
            } else if (x[key] == y[key]) {
                if (x.name > y.name) {
                    return 1;
                } else if (x[key] < y[key]) {
                    return -1;
                }
            }
        });
    } else if (order == 'descending') {
        sorted = data.sort((x,y) => {
            if (x[key] > y[key]) {
                return -1;
            } else if (x[key] < y[key]) {
                return 1
            } else if (x[key] == y[key]) {
                if (x.name > y.name) {
                    return -1;
                } else if (x[key] < y[key]) {
                    return 1;
                }
            }
        });
    }
    
    var translate = {
        'count_students': 'rStudents',
        'count_studies': 'rStudies',
        'year': 'rAge'
    }

    var temp = [];
    for (var index = 0; index < data.length; index++) {
        const element = sorted[index];
        element[translate[key]] = index + 1;
        temp.push(element);
    }
    return temp;
};

// rankedData = (key, data, order = 'descending') => {
//     var sorted;
//     if (order == 'ascending') {
//         sorted = data.sort((x,y) => {
//             return d3.ascending(x[key], y[key]);
//         });
//     } else if (order == 'descending') {
//         sorted = data.sort((x,y) => {
//             return d3.descending(x[key], y[key]);
//         });
//     }

//     var translate = {
//         'count_students': 'rStudents',
//         'count_studies': 'rStudies',
//         'year': 'rAge'
//     }

//     var temp = [];
//     for (var index = 0; index < data.length; index++) {
//         const element = sorted[index];
//         element[translate[key]] = index + 1;
//         temp.push(element);
//     }
//     return temp;
// };

getBerlinUnis = (data) => {
    var temp = [];
    data.forEach((uni, index) => {
        if (uni.county == "Berlin") {
            temp.push(uni);
        }
    })
    return temp;
}


const mapChart = function (_data, _geojson, _filterFunction, _filterKey, _container, _proj, _type) {
    var module = {},
    proj = _proj,
    data = _data,
    type = _type,
    geojson = _geojson,
    container = _container,
    filterKey = _filterKey,
    arr = [],
    extent,
    width = 500,
    height = 500,
    rangeMin = 1,
    rangeMax = 4000,
    scale,
    circles,
    mapZoom,
    svg,
    map_group,
    map_vector,
    tile,
    tiles,
    overlay,
    image,
    raster,
    center,
    vector_group,
    contour_vector,
    map_paths

    overlay = container.append('div')
        .attr('class', 'overlay-boarding-map')
        .attr('width', 200)
        .attr('height', 200)

    pointer = overlay.append('img')
        .attr('src', '../images/zoom.png')
        .attr('width', 54)
        .attr('height', 54)

    hint = overlay.append('span')
        .attr('class', 'hint')

    hint.text("Verändere den Bildausschnitt durch scrollen");

    if (type == 'BER') {
        center = proj([13.42, 52.51]);
    } else if (type == 'GER') {
        center = proj([10.32, 50.91]);
    }

    mapZoom = d3.zoom()
        .on("zoom", d => {
            freeZoom();
            zoomTimer -= 1;


            if (zoomTimer <= 0) {
                d3.selectAll('.overlay-boarding-map')
                    .attr('style', 'display: none')

                d3.selectAll('.overlay-boarding-bee')
                    .attr('style', 'display: none') 

                d3.selectAll('.sub-wrapper')
                    .attr('style', 'display: flex')
            }

        })
        .scaleExtent([6 << 11, 6 << 20])

    svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr("stroke", "#D3D3D3")
        .attr('class', d => {             
            return (type == 'GER') ? 'map-unis-germany' : 'map-unis-berlin';
        })
        .attr("stroke-width", "1px")
        .attr("fill", "#FFF")

    tile = d3.tile()
        .size([width, height]);
        
    path = d3.geoPath()
        .projection(proj)
        
    map_group = svg
        .append('g')

    map_group
        .append('rect')
        .attr('width', 2000)
        .attr('height', 2000)
        .attr('transform', 'translate(-1000,-1000)')

    raster = map_group.append("g");

    map_vector = map_group.append('g')
        .attr('class', 'svg-wrapper')

    map_paths = map_vector.append('g')
        .selectAll('path')
        .data(topojson.feature(geojson, geojson.objects['germany-merged']).features)
        .enter()
        .append('path')
        .attr('class', 'contour')
        .style('stroke', 'rgb(150,150,150)')
        .style('fill', 'none')
        .attr('d', path)

    function stringify(scale, translate) {
        var k = scale / 256, r = scale % 1 ? Number : Math.round;
        return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
    }

    function freeZoom() {

        var scaleObj = {scale: d3.event.transform.k, x: d3.event.transform.x, y: d3.event.transform.y}
        var showMap = (type == 'BER') ? (scaleObj.scale > 350000) : (scaleObj.scale > 60000);
        var toStr = `translate(${scaleObj.x},${scaleObj.y}) scale(${scaleObj.scale})`
        
        var svgMapGer = document.getElementsByClassName('map-unis-germany');
        var svgMapBer = document.getElementsByClassName('map-unis-berlin');

        if (scaleObj.scale > 50000 && type == 'GER') {
            // console.log(svgMap);
            svgMapGer[0].childNodes[0].childNodes[2].childNodes[0].classList.add('hide')
        } else if (scaleObj.scale < 40000 && type == 'GER') {
            svgMapGer[0].childNodes[0].childNodes[2].childNodes[0].classList.remove('hide')
        } 

        if (scaleObj.scale > 350000 && type == 'BER') {
            svgMapBer[0].childNodes[0].childNodes[2].childNodes[0].classList.add('hide')
        } else if (scaleObj.scale < 200000 && type == 'BER') {
            svgMapBer[0].childNodes[0].childNodes[2].childNodes[0].classList.remove('hide')
        } 

        proj
            .scale(scaleObj.scale / tau)
            .translate([scaleObj.x, scaleObj.y]);
        

        path = d3.geoPath()
            .projection(proj)

        tiles = tile
            .scale(scaleObj.scale)
            .translate([scaleObj.x, scaleObj.y])
            ();
      
        image = raster
            .attr("transform", stringify(tiles.scale, tiles.translate))
            .selectAll("image")
            .data(tiles, function(d) { 
                return d; 
            });
      
        image.exit().remove();

        if (type == 'BER') {
            const circles = d3.selectAll('circle__wrapper--circle-ber');
        } else if (type == 'GER') {
            const circles = d3.selectAll('circle__wrapper--circle-ger');
        }

        circles
            .attr("cx", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[0]
                } else { return "1px" }
            })
            .attr("cy", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[1]
                }
            })
            .attr('r', d => {
                return calcArea(scale(d.count_students) * 1.5);
            })
        
        map_paths.attr('d', path)

        if (showMap) {
        image.enter().append("image")   //tile.openstreetmap.org/
            .attr("xlink:href", function(d) { 
                return "http://" + "abc"[d[1] % 3] + ".tile.stamen.com/toner/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
                // http://a.tile.stamen.com/toner/${z}/${x}/${y}.png
                // return "http://" + "abc"[d[1] % 3] + ".tiles.wmflabs.org/bw-mapnik/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
                // return "http://" + "maps.wikimedia.org/osm-intl/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
            .attr("x", function(d) { return d[0] * 256; })
            .attr("y", function(d) { return d[1] * 256; })
            .attr("width", 256)
            .attr("height", 256)
            .style('opacity', .5)
        }
    }

    d3.select("#reset").on("click", () => {
        map_group.transition().duration(500).call(mapZoom.transform, d3.zoomIdentity);
    });

    module.init = () => {
        data.forEach( item => {
            arr.push(item.count_students);
        })

        extent = d3.extent(arr);
        scale = d3.scaleLinear()
            .domain([24, 68429])
            .range([rangeMin, rangeMax]);
        
        data.sort((a,b)=>b.count_students-a.count_students);

        circles = map_vector.selectAll('g.circle_wrapper')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'circle__wrapper')
            .append('circle')
            .attr("stroke-width", "0px")
            .attr("title", d => d.name)
            .attr('id', d => {
                return `map_${d.id_hochschule}` })
            .attr('class', d => {
                var classCircle = '';
                if (type == 'BER') {
                    classCircle = 'circle__wrapper--circle-ber'
                } if (type == 'GER') {
                    classCircle = 'circle__wrapper--circle-ger'
                }
            })
            .attr('style', (d) => {
                return `fill: #${colorScale(d[filterKey])}; opacity: .4;`
            })
            .attr('r', (d) => {
                return `${calcArea(scale(d.count_students))}`
            })
            .attr("cx", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[0]
                } else { return "1px" }
            })
            .attr("cy", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[1]
                }
            })
            .on('mouseover', function(d) {
                var t_id = d3.select(this).attr('id');

                if (type == 'BER') {
                    const circles = d3.selectAll('circle__wrapper--circle-ber');
                } else if (type == 'GER') {
                    const circles = d3.selectAll('circle__wrapper--circle-ger');
                }

                d3.selectAll('.sub-wrapper')
                    .attr('style', 'display: flex')

                circles
                    .transition()
                    .duration(100)
                    .style('opacity', function(d) {
                        if(`map_${d.id_hochschule}` == t_id){
                            return 0.8
                        }
                        return 0.2
                    })

                updateTooltip(d, 'map');

                bee_chart.refresh(d3.select(this).attr('id'), 'mouseover');
            })
            .on('mouseout', function(d) {
                var t_id = d3.select(this).attr('id');
                circles
                    .transition()
                    .duration(100)
                    .style('opacity', function(d) {
                        if(`map_${d.id_hochschule}` == t_id){
                            return 0.8
                        }
                        return 0.4
                    })
                bee_chart.refresh(d3.select(this).attr('id'), 'mouseout');
            })
    
            if (type == 'GER') {
                svg.call(mapZoom)
                    .call(mapZoom.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(13000)
                        .translate(-center[0], -center[1])); 
            } else if (type == 'BER') {
                svg.call(mapZoom)
                    .call(mapZoom.transform, d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(260000)
                        .translate(-center[0], -center[1]));
            }
    }
    module.scale = () => {
        scale = d3.scaleLinear()
            .domain([24, 68429])
            .range([rangeMin, rangeMax]);
        return scale;
    }

    module.initActive = () => {
        var t_id = 'map_33';

        if (type == 'BER') {
            const circles = d3.selectAll('circle__wrapper--circle-ber');
        } else if (type == 'GER') {
            const circles = d3.selectAll('circle__wrapper--circle-ger');
        }

        d3.selectAll('.sub-wrapper')
            .attr('style', 'display: flex')

        circles
            .transition()
            .duration(100)
            .style('opacity', function(d) {
                if(`map_${d.id_hochschule}` == t_id){
                    return 0.8
                }
                return 0.2
            })

        updateTooltip(d, 'map');

        bee_chart.refresh(d3.select(this).attr('id'), 'mouseover');
    }

    module.refresh = (id, event) => {
        id = parseInt(id.slice(4,7));
        const selection = d3.selectAll(`circle[id="map_${id}"]`);

        if (type == 'BER') {
            const circles = d3.selectAll('circle__wrapper--circle-ber');
        } else if (type == 'GER') {
            const circles = d3.selectAll('circle__wrapper--circle-ger');
        }

        event == 'mouseover'
        ?
        circles
            .transition()
            .duration(100)
            .attr('style', function(d) {
                return `fill: #${colorScale(d[filterKey])}; opacity: .1;`
            })
        :
        circles
            .transition()
            .duration(100)
            .attr('style', function(d) {
                return `fill: #${colorScale(d[filterKey])}; opacity: .2;`
            })


        event == 'mouseover' 
        ?  
        selection
            .transition()
            .duration(100)
            .attr('style', function(d) {
                return `fill: #${colorScale(d[filterKey])}; opacity: 1;`;
            }) 
        : 
        selection
            .transition()
            .duration(100)
            .attr('style', function(d) {
                return `fill: #${colorScale(d[filterKey])}; opacity: .1;`;
            }) 
    }

    module.update = (selection) => {
        if (type == 'BER') {
            const circles = d3.selectAll('circle__wrapper--circle-ber');
        } else if (type == 'GER') {
            const circles = d3.selectAll('circle__wrapper--circle-ger');
        }  

        circles.classed("selected--circles", function(d) {
            const condition = selection[1] <= d[filterKey] && d[filterKey] <= selection[0];
            const current = d3.select(this)
            current.attr('style', (d) => {
                return `fill: #${colorScale(d[filterKey])};`
            });
            return condition; 
        });

        circles.classed("unselected--circles", function(d) {
            const condition = d[filterKey] < selection[1] || d[filterKey] > selection[0];
            const current = d3.select(this)
            const y1 = this.getAttribute('y1')

            current.attr('style', (d) => {
                return `fill: #${colorScale(d[filterKey])};`
            });
            
            if (condition) { 
                current.transition().attr('y2', d => { return y1 - 2; });
            } else if (!condition) {
                current.transition().attr('y2', d => { return y1 - scale(d[filterKey]); });
            }
            return condition;
        });
    }
    return module;
}

const beeChart = (_data, _filterFunction, _filterKey, _container, _type) => {
    var module = {},
    width = 500,
    type = _type,
    height = 430,
    margin = { top: 20, right: 40, bottom: 40, left: 25 },
    innerHeight = height - margin.top - margin.bottom,
    innerWidth = width - margin.left - margin.right,
    container = _container,
    filterKey = _filterKey,
    data = _data,
    swarm,
    svg,
    brush = d3.brushY(),
    gBrush,
    g,
    y,
    arr = [],
    overlay,
    hint,
    pointer

    overlay = container.append('div')
        .attr('class', 'overlay-boarding-bee')
        .attr('width', 200)
        .attr('height', 200)
    
    pointer = overlay.append('img')
        .attr('src', '../images/pointer.png')
        .attr('width', 54)
        .attr('height', 54)
    
    hint = overlay.append('span')
        .attr('class', 'hint')
    
    hint.text("Markiere einen Bereich, \n um mehrere Universitäten \n auszuwählen");

    svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'bee')
    
    g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const brushed = () => {
        if(!d3.event.selection) return;
        const selection = d3.event.selection.map(y.invert, y);

        const brush = d3.selectAll('rect').filter(':nth-child(2)');
        brush.attr('fill-opacity', '.075');

        d3.selectAll('.overlay-boarding-bee')
            .attr('style', 'display: none')        

        d3.selectAll('.overlay-boarding-map')
            .attr('style', 'display: none')
        
        d3.selectAll('.sub-wrapper')
            .attr('style', 'display: flex')

        brush_extent = selection;
        update(selection, type);
    }

    const customYAxis = (g) => {
            g.call(d3.axisLeft(y)
                .ticks(5, ".0s")
                .tickSize(-width)
            );
            g.select(".domain").remove();

            g.selectAll('line')
                .style('stroke', '#D8D8D8')


            g.selectAll('text').style('font-family', 'ClanOT-Medium');
    }
    
    gBrush = g.append('g').attr('class', 'brush')
        .call(brush);

    brush.on('brush', brushed);

    module.init = () => {
        data.forEach(uni => {
            arr.push(uni[filterKey]);
        })

        extent = d3.extent(arr);
        
        y = d3.scaleLinear()
            .domain([extent[1], extent[0]])
            .range([0, innerHeight])
            
        swarm = d3.beeswarm()
            .data(data)
            .distributeOn((d) => { 
                return y(d[filterKey]);
            })
            .radius(3)
            .orientation('vertical')
            .side('positive')
            .arrange()
            
        g.append('g')
            .attr('class', 'axis axis--y')
            .attr("transform", "translate(0," + 0 + ")")
            .call(customYAxis)
                
        cell = g.append('g')
            .attr("class", "cells");

        cell.selectAll('circle')
            .data(swarm)
            .enter()
              .append('circle')
                .attr('class', 'dot')
                .attr('id', d => {
                    var idName = type == 'GER' ? `bee_${d.datum.id_hochschule}-ger` : `bee_${d.datum.id_hochschule}-ber`;
                    return idName })
                .attr('cx', function(bee) { return bee.x + 20; })
                .attr('cy', function(bee) { return bee.y; })
                .attr('r', 2)
                .attr('style', d => { return `fill: #${colorScale(d.datum[filterKey])}` })
                .on('mouseover', function(d) { 
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', `6px`)

                    updateTooltip(d, 'bee');
                    map_chart.refresh(d3.select(this).attr('id'), 'mouseover');
                })
                .on('mouseout', function(d)  {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', `2px`)
                    map_chart.refresh(d3.select(this).attr('id'), 'mouseout');
                })
    }

    module.refresh = (id, event) => {
        id = parseInt(id.slice(4,7));
        const selection = type == 'GER' ? d3.selectAll(`circle[id="bee_${id}-ger"]`) : d3.selectAll(`circle[id="bee_${id}-ber"]`);
        radius = event == 'mouseover' ?  selection.transition().duration(100).attr('r', '6px') : selection.transition().duration(100).attr('r', '2px');
    }

    module.update = (selection) => {
        const dots = d3.selectAll('.dot');

        dots.classed('selected--cells', (d) => {
            return selection[1] <= d.datum[filterKey] && d.datum[filterKey] <= selection[0]; 
        })

        dots.attr('r', d => {
            var condition = selection[1] <= d.datum[filterKey] && d.datum[filterKey] <= selection[0];
            if (condition) { return 3 } else { return 2 }
        })

        const circles = cell.selectAll('circle');
    }
    return module;
}

const brushedTooltip = (_data, _container, _type) => {
    var module = {},
    container = _container,
    data = _data,
    type = _type,
    wrapper,
    headline,
    avgAge,
    container1,
    container2,
    container3,
    sumStudents,
    sumStudentsWrapper,
    avgUniAge,
    avgStudies,
    avgStudiesWrapper,
    subWrapper,
    studentsSubline,
    studiesSubline,
    ageSubline

    module.init = () => {
        wrapper = container;

        headline = wrapper
            .append('div')
            .attr('class', 'tt-headline')
            .text('')

        subWrapper = wrapper
            .append('div')
            .attr('class', 'sub-wrapper')

        container1 = subWrapper 
            .append('div')
            .attr('class', 'tt-wrapper')
        
        container1
            .append('div')
            .attr('class', 'tt-subheadline')
            .text('ø Alter')
            
        avgAge = container1
            .append('div')
            .attr('class', 'tt-value')
            .text(`Bereich auswählen`)
            
        container2 = subWrapper 
            .append('div')
            .attr('class', 'tt-wrapper')
            
        container2
            .append('div')
            .text('Studierende')
            .attr('class', 'tt-subheadline')

        container3 = subWrapper 
            .append('div')
            .attr('class', 'tt-wrapper')
        
        sumStudentsWrapper = container2
            .append('div')
            .attr('class', 'tt-value')
            .text(`Bereich auswählen`)
        
        ageSubline = container1
            .append('div')
            .attr('class', 'tt-subline')
            .text(`für mehr Informationen`)
            
        studentsSubline = container2
            .append('div')
            .attr('class', 'tt-subline')
            .text(`${0}% von 2.74 Mio. Studierenden.`)
            
        container3
            .append('div')
            .attr('class', 'tt-subheadline')
            .text('ø Studiengänge')
            
        avgStudiesWrapper = container3
            .append('div')
            .attr('class', 'tt-value')
            .text(`Bereich auswählen`)
        
        studiesSubline = container3
            .append('div')
            .attr('class', 'tt-subline')
            .text(`von 2–350 Studiengängen.`)
    };

    module.update = (selection) => {
        var countUnis;
        if (type == 'BER') {
            countUnis = unis_berlin.length;
        } else if (type == 'GER') {
            countUnis = dataGlobal.length;
        }
        
        sumStudents = 0;
        avgUniAge = 0;
        avgStudies = 0;

        selection.forEach( uni => {
            sumStudents += uni.count_students;
            avgUniAge += (2018 - uni.year);
            avgStudies += uni.count_studies;
        });

        avgStudies = (avgStudies / selection.length);
        avgUniAge = (avgUniAge / selection.length);

        sumStudentsPercent = round(sumStudents / 2670000) * 100;

        ageSubline
            .text("der markierten Hochschulen.")
        

        studentsSubline
            .text(`${sumStudentsPercent}% von 2.74 Mio. Studierende.`)

        headline
            .text(`${round(selection.length)} von ${countUnis} Hochschulen ausgewählt.`);
        
        avgAge
            .text(d => {
                let age = round(avgUniAge).toString().replace('.',',');
                if (age == 'NaN') { return 'keine Auswahl'; }
                return `${round(avgUniAge).toString().replace('.',',')} Jahre`
            })
        
        sumStudentsWrapper
            .text(d => {
                let students = numberFormat(sumStudents);
                if (students == '0') { return 'keine Auswahl'; }
                // asldkjalskjdlkasdjlkas
                return `${students}`
            })

        avgStudiesWrapper
            .text(d => {
                let studies = round(avgStudies).toString().replace('.',',');
                if (studies == 'NaN') { return 'keine Auswahl'; }
                return `${round(avgStudies).toString().replace('.',',')} Jahre`
            })

        
    }
    return module;
}

const tooltip = (_data, _container) => {
    var module = {},
    container = _container,
    subWrapper,
    headline,
    container1,
    container2,
    container3,
    age,
    ageSubheadline,
    studiesSubheadline,
    sutdentsSubheadline,
    ageSubline,
    students,
    studentsSubline,
    studies,
    studiesSubline,

    data = _data[2] // send real data as the input
    
    module.init = () => {
        headline = container
            .append('div')
            .attr('class', 'tt-headline')
            .text('')

        subWrapper = container
            .append('div')
            .attr('class', 'sub-wrapper')
        
        container1 = subWrapper
            .append('div')
            .attr('class', 'tt-wrapper')
        
        container2 = subWrapper
            .append('div')
            .attr('class', 'tt-wrapper')
        
        container3 = subWrapper
            .append('div')
            .attr('class', 'tt-wrapper')

        
        ageSubheadline = container1
            .append('div')
            .attr('class', 'tt-subheadline')
            .text('Gründung')

        age = container1
            .append('div')
            .attr('class', 'tt-value')
            .text('Hochschule auswählen')
        
        ageSubline = container1
            .append('div')
            .attr('class', 'tt-subline')
            .text('für mehr Informationen')

        studentsSubheadline = container2
            .append('div')
            .attr('class', 'tt-subheadline')
            .text('Studierende')

        students = container2
            .append('div')
            .attr('class', 'tt-value')
            .text('Hochschule auswählen')
        
        studentsSubline = container2
            .append('div')
            .attr('class', 'tt-subline')
            .text('für mehr Informationen')

        studiesSubheadline = container3
            .append('div')
            .attr('class', 'tt-subheadline')
            .text('Studiengänge')

        studies = container3
            .append('div')
            .attr('class', 'tt-value')
            .text('Hochschule auswählen')
        
        studiesSubline = container3
            .append('div')
            .attr('class', 'tt-subline')
            .text(`#${12} von 374`)
    }
    module.update = (data) => {
        headline.text(data.name);
        age.text(data.year);
        students.text((numberFormat(data.count_students))).toString().replace('.',',');
        studies.text(data.count_studies.toString().replace('.',','));
        ageSubline.text(`#${data.rAge} von 374`)
        studentsSubline.text(`#${data.rStudents} von 374`)
        studiesSubline.text(`#${data.rStudies} von 374`)

        const ttHeadline = document.getElementsByClassName('tt-headline');

        for (var index = 0; index < ttHeadline.length; index++) {
            const element = ttHeadline[index];
            element.innerHTML = element.innerHTML.substring(0,75);
        }
    }
    return module;
}

const legend = (_container) => {
    var module = {},
    container = _container,
    wrapper,
    barCount = 7

    module.init = () => {
        for (var i = 0; i < barCount; i++) {
            const range = (i + 1) * 10000;
            wrapper = container
                .append('div')
                .attr('class', 'bar-wrapper')
            wrapper
                .append('div')
                .attr('class', 'bar')
                .attr('style', `background: #${colorScaleInverted(range)}`)
            wrapper
                .append('span')
                .attr('class', 'bar-metadata')
                .text(`${(7-i)}0.000`)
        }
    }
    return module;
}

const table = () => {
    var module = {},
    tableWrapper,
    tableItems,
    tableItemsBerlin,
    thead,
    tbody,
    filtered,
    tableItemCounty,
    tableItemSubline,
    tableItemHeadline,
    tableItemStudents,
    tableItemStudies,
    tableItemYear,
    tableItemType,
    col1,
    col2,
    col3,
    tdIndex

    module.init = () => {
        tableWrapper = d3.select('#table-wrapper');
        tableItems = tableWrapper.append('div').attr('class', 'table-items');
        tableItemsBerlin = tableWrapper.append('div').attr('class', 'table-items-berlin');
    }

    module.remove = () => {
        d3.selectAll('.table-item').remove();
    }

    module.updateBerlin = (filterCurrent, filteredData) => {

        tableItem = tableItemsBerlin.selectAll('div')
            .data(filteredData)
            .enter()
            .append('div')
            .attr('class', 'table-item')
            .on('click', function() {
                d3.select(this).classed("active", d3.select(this).classed("active") ? false : true);
            })

            tdIndex = tableItem
            .append('div')
            .attr('class', 'td-index')
            .text((d,i) => {
                var temp = '';
                switch (filterCurrent) {
                    case 'count_students':
                        temp = d.rStudents;
                        break;
                    case 'count_studies':
                        temp = d.rStudies;
                        break;
                    case 'year':
                        temp = d.rAge;
                        break;
                }
                return temp;
            })
        
        tableContent = tableItem
            .append('div')
            .attr('class', 'td-content')
        
        tableItemValue = tableItem
            .append('div')
            .attr('class', 'td-value')
            .text((d,i) => {
                return d[filterCurrent];
            })
        
        tableItemHeadline = tableContent
            .append('div')
            .attr('class', 'td-headline')
            .text( d => { return d.name; })
        
        tableItemSubline = tableContent
            .append('div')
            .attr('class', 'td-subline')
        
        col1 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col1')

        col2 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col2')

        col3 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col3')
        
        tableItemCounty = col1
            .append('div')
            .attr('class', 'td-county')
            .text( d => { return d.county; })
                    
        tableItemStudies = col2
            .append('div')
            .attr('class', 'td-studies')
            .text( d => { return `${d.count_studies} Studiengänge`; })
                    
        tableItemYear = col1
            .append('div')
            .attr('class', 'td-year')
            .text( d => { return `${d.year} gegründet`; })
                    
        tableItemStudents = col2
            .append('div')
            .attr('class', 'td-students')
            .text( d => { return `${d.count_students} Studierende`; })
                    
        tableItemType = col3
            .append('div')
            .attr('class', 'td-sponsor')
            .text( d => { return d.sponsor; })
    }
        
        

    module.update = (filterCurrent, filteredData) => {

        tableItem = tableItems.selectAll('div')
            .data(filteredData)
            .enter()
            .append('div')
            .attr('class', 'table-item')
            .on('click', function(d) {
                d3.select(this).classed("active", d3.select(this).classed("active") ? false : true);
            })
    
        tdIndex = tableItem
            .append('div')
            .attr('class', 'td-index')
            .text((d,i) => {
                return i + 1;
            })
        
        tableContent = tableItem
            .append('div')
            .attr('class', 'td-content')
        
        tableItemValue = tableItem
            .append('div')
            .attr('class', 'td-value')
            .text((d,i) => {
                return d[filterCurrent];
            })
        
        tableItemHeadline = tableContent
            .append('div')
            .attr('class', 'td-headline')
            .text( d => { return d.name; })
        
        tableItemSubline = tableContent
            .append('div')
            .attr('class', 'td-subline')
        
        col1 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col1')

        col2 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col2')

        col3 = tableItemSubline
            .append('div')
            .attr('class', 'table-col col3')
        
        tableItemCounty = col1
            .append('div')
            .attr('class', 'td-county')
            .text( d => { return d.county; })
                    
        tableItemStudies = col2
            .append('div')
            .attr('class', 'td-studies')
            .text( d => { return `${d.count_studies} Studiengänge`; })
                    
        tableItemYear = col1
            .append('div')
            .attr('class', 'td-year')
            .text( d => { return `${d.year} gegründet`; })
                    
        tableItemStudents = col2
            .append('div')
            .attr('class', 'td-students')
            .text( d => { return `${d.count_students} Studierende`; })
                    
        tableItemType = col3
            .append('div')
            .attr('class', 'td-sponsor')
            .text( d => { return d.sponsor; })
    }
    return module;
}

d3.queue()
    .defer(d3.json, "../data/unis.json")
    .defer(d3.json, "../data/merged.topojson")
    .defer(d3.json, "../data/berlin.topojson")
    .await( (error, unis, germany, berlin) => {
        var brush_extent;
        dataGlobal = unis;
        rankedByAge = rankedData('year', dataGlobal);
        rankedByStudents = rankedData('count_students', dataGlobal, 'descending');
        rankedByStudies = rankedData('count_studies', dataGlobal, 'descending');
        filterDefault = rankedData('count_students', dataGlobal, 'descending').slice(0,9);

        berlinStudents = getBerlinUnis(rankedByStudents).slice(0,9);
        berlinStudies = getBerlinUnis(rankedByStudies).slice(0,9);
        berlinAge = getBerlinUnis(rankedByAge).slice(0,9);

        dataGlobal = rankedByStudies;
        
        // var cross_unis = crossfilter(unis);
        
        // count = cross_unis.dimension(function(d) { return d[filter]; });
        // count.filter( (d) => {
        //     if(d > 1) { return true; } 
        //     else { return false; }
            
        // });
        unis_berlin = unis.filter(uni => uni.county == 'Berlin');

        var countPrivat = 0;
        var countPublic = 0;
        var countkirchlich = 0;

        var privat = unis_berlin.filter(uni => uni.sponsor == 'privat, staatlich anerkannt');
        var public = unis_berlin.filter(uni => uni.sponsor == 'öffentlich-rechtlich');
        var kirchlich = unis_berlin.filter(uni => uni.sponsor == 'kirchlich, staatlich anerkannt');
        privat.forEach(uni => { countPrivat += uni.count_students })
        public.forEach(uni => { countPublic += uni.count_students })
        kirchlich.forEach(uni => { countkirchlich += uni.count_students })
                
        map_chart = mapChart(unis, germany, '', filterKey, d3.select('#map_Chart'), projGer, 'GER');
        map_chart.init();
        map_chart_legend = legend(d3.select('#legend-bars'));
        map_chart_legend.init();
        bee_chart = beeChart(unis, '', filterKey, d3.select('#bee_Chart'), 'GER');
        bee_chart.init();
        tool_tip = tooltip(unis, d3.select('#_tooltip'));
        tool_tip.init();
        brushed_tool_tip = brushedTooltip(unis, d3.select('#brushed-tooltip'), 'GER');
        brushed_tool_tip.init();

        map_chart_berlin = mapChart(unis_berlin, germany, '', filterKey, d3.select('#mapChartBerlin'), projBerlin, 'BER');
        map_chart_berlin.init();
        map_chart_berlin_legend = legend(d3.select('#legend-berlin-bars'));
        map_chart_berlin_legend.init();
        bee_chart_berlin = beeChart(unis_berlin, '', filterKey, d3.select('#beeChartBerlin'), 'BER');
        bee_chart_berlin.init();
        tool_tip_berlin = tooltip(unis_berlin, d3.select('#tooltip-berlin'));
        tool_tip_berlin.init();
        brushed_tool_tip_berlin = brushedTooltip(unis_berlin, d3.select('#brushed-tooltip-berlin'), 'BER');
        brushed_tool_tip_berlin.init();

        table_ranking = table();
        table_ranking.init();
        table_ranking.update('count_students', filterDefault);
        table_ranking.updateBerlin('count_students', berlinStudents);
    })

round = (value) => {
    return Math.round(value * 100) / 100;
}

numberFormat = (num) => {
    var y = num.toString().split('.');
    if(num > 9999) {y[0] = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');}
    return y.join(',');
}

const btnOldest = document.getElementById('filter--oldest');
const btnDiverse = document.getElementById('filter--diverse');
const btnSmallest = document.getElementById('filter--countStudents');
const btnSortOrder = document.getElementById('filter--sortOrder');

btnSortOrder.addEventListener('click', () => {
    var filtered, filteredBerlin;
    order = (order == 'ascending') ? 'descending' : 'ascending';

    const translate = {
        'ascending': 'Sortierung: aufsteigend',
        'descending': 'Sortierung: absteigend'
    }

    btnSortOrder.innerHTML = translate[order];

    switch (filterSwitch) {
        case 'year':
            filtered = rankedData('year', dataGlobal, order);
            filteredBerlin = getBerlinUnis(filtered);
            break;
        case 'count_studies':
            filtered = rankedData('count_studies', dataGlobal, order);
            filteredBerlin = getBerlinUnis(filtered).slice(0,9);
            break;
        case 'count_students':
            filtered = rankedData('count_students', dataGlobal, order);
            filteredBerlin = getBerlinUnis(filtered).slice(0,9);
            break;
        }

    filtered = filtered.slice(0,9);
    filteredBerlin = filteredBerlin.slice(0,9);

    table_ranking.remove();
    table_ranking.update(filterSwitch, filtered);
    table_ranking.updateBerlin(filterSwitch, filteredBerlin);
});

btnOldest.addEventListener('click', () => {
    filterSwitch = 'year';
    const filteredByAge = filterData('year', dataGlobal, 'descending');
    table_ranking.remove();
    table_ranking.update('year', filteredByAge);
    table_ranking.updateBerlin('year', berlinAge);
    const buttons = d3.selectAll('button');
    buttons.classed('active', false);
    d3.select('#filter--oldest').classed("active", d3.select('#filter--oldest').classed("active") ? false : true);
});

btnSmallest.addEventListener('click', () => {
    filterSwitch = 'count_students';
    const filteredByStudents = filterData('count_students', dataGlobal, 'descending')
    table_ranking.remove();
    table_ranking.update('count_students', filteredByStudents);
    table_ranking.updateBerlin('count_students', berlinStudents);
    const buttons = d3.selectAll('button');
    buttons.classed('active', false);
    d3.select('#filter--countStudents').classed("active", d3.select('#filter--countStudents').classed("active") ? false : true);
});

btnDiverse.addEventListener('click', () => {
    filterSwitch = 'count_studies';
    const filteredByStudies = filterData('count_studies', dataGlobal, 'descending');
    table_ranking.remove();
    table_ranking.update('count_studies', filteredByStudies);
    table_ranking.updateBerlin('count_studies', berlinStudies);
    const buttons = d3.selectAll('button');
    buttons.classed('active', false);
    d3.select('#filter--diverse').classed("active", d3.select('#filter--diverse').classed("active") ? false : true);
});

setTimeout(() => {
    btnOldest.click();
    btnSortOrder.click();
}, 1000)