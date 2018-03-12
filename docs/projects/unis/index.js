// TODO:
// research year for 3 unis and fill dataset
// uncomment webfonts in style css


let map_chart, bee_chart, tool_tip, table_ranking;

const rangeMin = 1,
rangeMax = 150,
filterKey = "count_students",
domain = [24,68429],
scale = d3.scaleLinear()
    .domain([24, 68429])
    .range([rangeMin, rangeMax]);

let dataGlobal;

const colors = ['F67060', 'F39072', 'E5CB98', 'D0CEA5', 'B0BAAA', '6892B1', '8FA6AE'];
let colorScale = d3.scaleQuantize()
    .domain([domain[0], domain[1]])
    .range(colors)

const mapChart = function (_data, _geojson, _filterFunction, _filterKey, _container) {
    let module = {},
    data = _data,
    geojson = _geojson,
    container = _container,
    arr = [],
    filterKey = _filterKey,
    extent,
    width = 500,
    height = 500,
    rangeMin = 1,
    rangeMax = 150,
    scale,
    lines,
    svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr("stroke", "#D3D3D3")
        .attr("stroke-width", "1px")
        .attr("fill", "none"),
    proj = d3.geoMercator()
        .scale(2000)
        .center([11.42, 50.91])
        .translate([width / 2, height / 2]),
    path = d3.geoPath()
        .projection(proj)
    svg.append("path").attr('d', path(topojson.mesh(geojson)))

    module.init = () => {
        data.forEach( item => {
            arr.push(item.count_students);
        })

        extent = d3.extent(arr);
        // console.log(extent)
        scale = d3.scaleLinear()
            .domain([24, 68429])
            .range([rangeMin, rangeMax]);
        
        lines = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'line__wrapper')
            .append('line')
            .attr('class', 'line__wrapper--line')
            .attr('style', (d) => {
                return `stroke: #${colorScale(d[filterKey])}; stroke-width: 2`
            })
            .attr("x1", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[0]
                } else { return "1px" }
            })
            .attr("y1", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[1]
                }
            })
            .attr("x2", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[0]
                }
            })
            .attr("y2", d => { 
                if(d[filterKey]) {
                    const  lnglat = proj([d.lng, d.lat]);
                    return lnglat[1] - scale(d[filterKey]);
                } else {
                    return "1px"
                }
            })
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
    }
    module.scale = () => {
        scale = d3.scaleLinear()
            .domain([24, 68429])
            .range([rangeMin, rangeMax]);
        return scale;
    }
    module.update = (selection) => {
        const lines = d3.selectAll('.line__wrapper--line');

        lines.classed("selected--lines", function(d) {
            const condition = selection[1] <= d[filterKey] && d[filterKey] <= selection[0];
            const current = d3.select(this)
            const y2 = current.attr('y2');
            return condition; 
        });

        lines.classed("unselected--lines", function(d) {
            const condition = d[filterKey] < selection[1] || d[filterKey] > selection[0];
            const current = d3.select(this)
            const y1 = this.getAttribute('y1')
            
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

const beeChart = (_data, _filterFunction, _filterKey, _container) => {
    let module = {},
    width = 500,
    height = 500,
    margin = { top: 40, right: 40, bottom: 40, left: 40 },
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
    arr = []

    svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
    
    g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const brushed = () => {
        if(!d3.event.selection) return;
        const selection = d3.event.selection.map(y.invert, y);
        brush_extent = selection;
        update(selection);
    }

    const customYAxis = (g) => {
            g.call(d3.axisLeft(y)
                .ticks(5, ".0s")
                .tickSize(-width)
            );

            g.select(".domain").remove();
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
                .attr('cx', function(bee) { return bee.x + 20; })
                .attr('cy', function(bee) { return bee.y; })
                .attr('r', 2)
                .attr('style', d => { return `fill: #${colorScale(d.datum[filterKey])}` })
                .on('mouseover', d => { updateTooltip(d); })
    }

    module.update = (selection) => {
        const dots = d3.selectAll('.dot');
        dots.classed('selected--cells', (d) => {
            return selection[1] <= d.datum[filterKey] && d.datum[filterKey] <= selection[0]; 
        })
    }
    return module;
}

const tooltip = (_data, _container) => {
    let module = {},
    container = _container,
    block__name, block__type, block__status
    data = _data[2] // send real data as the input

    const props = [
        {'name': 'Name'},
        {'sponsor': 'Träger'},
        {'county': 'Bundesland'},
        {'year': 'Gründung'},
        {'count_studies': 'Anzahl Studiengänge'},
        {'count_students': 'Anzahl Studenten'}
    ];
    
    module.init = () => {
        const wrapper = container.append('div')
            .attr('class', 'tooltip__wrapper')

            props.forEach(prop => {
                block__name = wrapper.append('div')
                    .attr('class', `block__${Object.keys(prop)[0]}`)

                block__type = block__name
                    .append('span')
                    .attr('class', `block__${Object.keys(prop)[0]}--type`)
                    .text(`${Object.values(prop)[0]}: `)

                block__status = block__name
                    .append('span')
                    .attr('class', `block__${Object.keys(prop)[0]}--status`)
                    .text(data[Object.keys(prop)[0]])
            })
    }
        module.update = (data) => {
            props.forEach (prop => {
                const selection = d3.select(`.block__${Object.keys(prop)[0]}--status`);
                selection.text(data.datum[Object.keys(prop)[0]])
            })
        }
        return module;
    }

const table = () => {
    let module = {},
    table,
    thead,
    tbody,
    filtered,
    trows,
    col1,
    col2,
    col3

    module.init = () => {
        filtered = filterData('count_students', dataGlobal);
        const wrapper = d3.select('#table-wrapper');
        table = wrapper.append('table');
        thead = table.append('thead');
        tbody = table.append('tbody');
    }

    module.update = (filterCurrent, filteredData) => {
        trows = tbody.selectAll('tr')
            .data(filteredData)
            .enter()
            .append('tr')
        
        col1 = trows
            .append('td')
            .text((d,i) => {
                return i + 1;
            })
        
        col2 = trows
            .append('td')
            .text((d,i) => {
                return d.name;
            })
        
            col3 = trows
            .append('td')
            .text((d,i) => {
                return d[filterCurrent];
            })

    }

    module.update2 = (filterCurrent, filteredData) => {
        trows = tbody.selectAll('tr')
            .data(filteredData)
            .append('tr')
        
        col1 = trows
            .append('td')
            .text((d,i) => {
                return i + 1;
            })
        
        col2 = trows
            .append('td')
            .text((d,i) => {
                return d.name;
            })
        
            col3 = trows
            .append('td')
            .text((d,i) => {
                return d[filterCurrent];
            })

    }
    return module;
}

d3.queue()
    .defer(d3.json, "./data/unis.json")
    .defer(d3.json, "./data/germany.json")
    .await( (error, unis, counties) => {
        let brush_extent;
        dataGlobal = unis;
        const filterDefault = filterData('count_students', dataGlobal);
        // let cross_unis = crossfilter(unis);
        
        // count = cross_unis.dimension(function(d) { return d[filter]; });
        // count.filter( (d) => {
        //     if(d > 1) { return true; } 
        //     else { return false; }
            
        // });
                
        map_chart = mapChart(unis, counties, '', filterKey, d3.select('#mapChart'));
        map_chart.init();

        bee_chart = beeChart(unis, '', filterKey, d3.select('#beeChart'))
        bee_chart.init();

        tool_tip = tooltip(unis, d3.select('#tooltip'));
        tool_tip.init();

        table_ranking = table();
        table_ranking.init();
        table_ranking.update('count_students', filterDefault);
    })


update = (selection) => {
    bee_chart.update(selection);
    map_chart.update(selection);
}

updateTooltip = (data) => {
    tool_tip.update(data);
}

filterData = (key, data) => {
    const sorted = data.sort((x,y) => {
        return d3.ascending(x[key], y[key]);
    });
    let temp = [];
    for (let index = 0; index < 10; index++) {
        const element = sorted[index];
        temp.push(element);
    }
    return temp;
};

const btnOldest = document.getElementById('filter--oldest');
const btnSmallest = document.getElementById('filter--smallest');
const btnDiverse = document.getElementById('filter--diverse');

btnOldest.addEventListener('click', () => {
    const filteredByAge = filterData('year', dataGlobal)
    table_ranking.update2('year', filteredByAge);
})