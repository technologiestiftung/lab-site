Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function relative(share, total, decimal) {
    return Math.abs(((share / total) * 100).toFixed(decimal));
}

const numberFormat = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var Chart = (function(window, d3) {

    var ready = false, svg, chartWrapper, category, circle, values, legendWrapper, moneyMinMax, wrapperText, posY2, logValueScale, data, margin, sector, circleGroup, categories, labelsYear, marker, label, countMinMax, svgLegend, svgLegendCanvas, labelYear, xAxis, xScale, x, tooltip, swoopyArrow, swoopyText, hoverCircle, clientWidth, radiusLegend,
    posX1, posX2, posY1, PosY2,

    once = true,
    

    swoopyView = 'moneyAbsolute';
    var btns = ['btn_money_abs', 'btn_count_abs', 'btn_money_rel', 'btn_count_rel'];

    
    var categoryTitles = [];
    var idCircle = 1;
    var idCircle2 = 1;
    var countY = 0;
    var countYTemp = 0;
    var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];

    var margin = {
        top: 50,
        bottom: 17,
        left: 0,
        right: 10
    }

    var antns = {
        moneyRelative: [
            {
                pos: {
                    start: 22,
                    end: 63
                },
                content: [

                      
                    'In 2011, more than 25% of the',
                    "year's total funding was",
                    'spent on research.',
                ]
            }/*,
            {
                pos: {
                    start: 167,
                    end: 225
                },
                content: [
                    'Dies ist ein Dummytext',
                    'der über mehrere Zeilen',
                    'verläuft.'
                ]
            },*/
        ],
        moneyAbsolute: [
            {
                pos: {
                    start: 15,
                    end: 75
                },
                content:	 [
                    'More than 60% of all awards',
                    'go to the BVG and S-Bahn.'
                ]
            }/*,
            {
                pos: {
                    start: 167,
                    end: 225
                },
                content: [
                    'Die Zuwendungen im Bereich',
                    'Integration haben sich',
                    'im Vergleich zum Vorjahr',
                    'mehr als ver 17facht.'
                ]
            },*/
        ],
        countRelative: [
            {
                pos: {
                    start: 50,
                    end: 142
                },
                content: [
                    'Projects in the "Work" category',
                    'receive relatively more funding.',
                    'The number of funded projects is',
                    'sinking, but the value of the grants',
                    'is increasing.'
                ]
            },
        ],
        countAbsolute: [

            {
                pos: {
                    start: 297,
                    end: 185
                },
                content: [
                    "The first funding for animal",
                    "protection was granted in 2016."
                ]
            }
        ]
    }

    let cat_dict = {
        "Verkehr": "Traffic",
        "Forschung": "Research",
        "Wirtschaft": "Economy",
        "Kultur": "Culture",
        "Arbeit": "Work",
        "Jugend": "Youth",
        "Wissenschaft": "Science",
        "Soziales": "Social",
        "Gesundheit": "Health",
        "Sport": "Sport",
        "Stadtentwicklung": "Urban development",
        "Bildung": "Education",
        "Frauen": "Women",
        "Umwelt": "Environment",
        "Integration": "Integration",
        "Finanzen": "Finance",
        "Bauen, Wohnen": "Construction, Housing",
        "Denkmalschutz": "Preservation",
        "Gleichstellung": "Gender equality",
        "Kirchengem.": "Church",
        "Justiz": "Justice",
        "Antidiskriminierung": "Anti-discrimination",
        "Sicherheit, Ordnung": "Security, Order",
        "Verbraucherschutz": "Consumer protection",
        "Familie": "Family",
        "Europa": "Europe",
        "Pflege": "Care",
        "Bürger-Engagement": "Civic engagement",
        "Tierschutz": "Animal protection"
    }
    
    var config = {
        svg: {
            width: 1000,
            height: 1000,
            maxRad: 16000,
            minRad: 9
        },
        legend: {
            width: 700
        },
        data: {
            relative: true
        }
    }

    var legendTitle = {
        moneyAbsolute: 'Circular area: Volume of all grants in euros',
        moneyRelative: 'Circular area: Volume in % per year',
        countRelative: 'Circular area: Number in % per year',
        countAbsolute: 'Circular area: Number of grants per year.'
    }


    var legendPos = {
        moneyAbsolute: [
            { pos: 0.05, content: '125 Mio.', posY: 0 },
            { pos: 0.25, content: '0.5 Mrd.', posY: 0 },
            { pos: 0.5, content: '1.0 Mrd.', posY: 0 },
            { pos: 0.75, content: '1.5 Mrd.', posY: 0 },
            { pos: 1, content: '2 Mrd.', posY: 0 }
        ],
        moneyRelative: [
          { pos: 0.05, content: '5%', posY: 0  },
            { pos: 0.25, content: '25%', posY: 0  },
            { pos: 0.5, content: '50%', posY: 0  },
            { pos: 0.75, content: '75%', posY: 0  },
            { pos: 1, content: '100%', posY: 0  }
        ],
        countAbsolute: [
            { pos: 0.05, content: '300', posY: 0  },
            { pos: 0.25, content: '1200', posY: 0  },
            { pos: 0.5, content: '2400', posY: 0  },
            { pos: 0.75, content: '3600', posY: 0  },
            { pos: 1, content: '4900', posY: 0  }
        ],
        countRelative: [
            { pos: 0.05, content: '5%', posY: 0  },
            { pos: 0.25, content: '25%', posY: 0  },
            { pos: 0.5, content: '50%', posY: 0 },
            { pos: 0.75, content: '75%', posY: 0  },
            { pos: 1, content: '100%', posY: 0  }
        ],
    }

    var swoopy = swoopyArrow()
        .angle(Math.PI/4)
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; });

    d3.json('../data/politikbereich.json', init);
    
    
    function init(json) {
        data = json;
        tooltip = d3.select('#tooltip')

        var dataAllYears = [];

        data.forEach( category => {
            categoryTitles.push(category.target);

            category.years.forEach( year => {
                dataAllYears.push(year);
            })
        })
        var countAllYears = [];
        var moneyAllYears = [];

        dataAllYears.forEach( year => {
            moneyAllYears.push(year.money);
            countAllYears.push(year.count);
        } )

        chartWrapper = d3.select('#chart')
        legendWrapper = d3.select('#legend')

        countMinMax = d3.extent(countAllYears);

        moneyMinMax = d3.extent(moneyAllYears);
        countMinMax = d3.extent(data, d => { return d.count });

        x = d3.extent(years);

        xScale = d3.scaleLinear()
            .domain(x)
            .range([0, config.svg.width - margin.left - margin.right]);

        xAxis = d3.axisBottom(xScale).ticks(8).tickFormat(d3.format("d"));;

        renderLegend('moneyAbsolute');

        wrapperText = chartWrapper
            .append('div')
            .classed('labels', true)
            
        
        wrapperText.selectAll('sectorLabel')
            .data(data)
            .enter()
            .append('p')
            .classed('copy xs label', true)
            .attr('id', (d,i) => { 
                return `label-${i + 1}` })
            .attr('style', 'width: 150px')
            .text((d) => { 
                
                return cat_dict[d.target]; });
                    
        svg = chartWrapper
            .append('svg')
            .attr('id', 'svg-wrapper')
            .attr('width', config.svg.width)
            .attr('height', config.svg.height)
        
        svg.append('g').classed('x axis', true);

        svg.select('.x.axis')
            .append('g')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(xAxis)
            
        marker = svg
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-10 -10 20 20')
            .attr('refX', 0)
            .attr('refY', 0)
            .attr('markerWidth', 20)
            .attr('markerHeight', 20)
            .attr('stroke-width', 1)
            .attr('orient', 'auto')
        
        marker
            .append('polyline')
            .attr('stroke-linejoin', 'bevel')
            .attr('points', '-6.75,-6.75 0,0 -6.75,6.75')

        category = svg.selectAll('chartCategory')
            .data(data)
            .enter()
            .append('g')
            .classed('category', true)
        
        circleGroup = category.selectAll('circles')
            .data((d) => { return d.years })
            .enter()
            .append('g')
            .classed('circle', true)

        circle = circleGroup
            .append('circle')
            .attr('data-uid', (d,i) => {
                var uid = `${idCircle2}${i}`;
                if(i === 8) { idCircle2 += 1 };

                return uid;
            })
            .attr('id', (d,i) => { 
                if (i < 8) { 
                    return `${idCircle}`; 
                 } else if(i == 8) { 
                    idCircle += 1 
                    return `${idCircle - 1}`; 
                     };
                })
            .classed('value', true)
            .attr('data-year', (d,i) => {
                return i;
            })
            .attr('r', 1)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
    
        ready = true

        render();
    }

    function renderLegend(view) {

        d3.select('.legend-wrapper').remove();

        var total = config.svg.maxRad;

        var title = d3.select('#legend-title');							
        title.text(legendTitle[view]);

        if (clientWidth > 750) {
            svgLegend = legendWrapper
                .append('svg')
                .classed('legend-wrapper', true)
                .attr('height', 150)
                .attr('width', 700)
            
            var clipPath = svgLegend
                .append('defs')
                .append('clipPath')
                    .attr('id', 'cut-off-bottom')
                .append('rect')
                    .attr('width', 700)
                    .attr('height', 92)
                    .attr('x', 0)
                    .attr('y', 0)
            
            svgLegend
                .append('line')
                .attr('x1', 0)
                .attr('y1', 93)
                .attr('x2', 700)
                .attr('y2', 93)
                .attr('stroke', 'grey')
                .attr('stroke-width', 1)

            svgLegend.selectAll('circles')
                .data(legendPos[view])
                .enter()
                .append('circle')
                .attr('clip-path', 'url(#cut-off-bottom)')
                .attr('cx', (d,i) => {
                    return 100 * (i * 1.53) + 16
                })
                .attr('cy', 95)
                .attr('r', d => { 
                    var radius = Math.sqrt((d.pos * total/ Math.PI))
                    return radius;
                })
        
            svgLegend.selectAll('annotations')
                .data(legendPos[view])
                .enter()
                .append('text')
                .classed('annotation', true)
                .attr('x', (d,i) => { return  100 * (i * 1.53)})
                .attr('y', (d,i) => { return 120})
                .text(d => {return d.content})	

        };

        if (clientWidth < 750) {
            svgLegend = legendWrapper
                .append('svg')
                .classed('legend-wrapper', true)
                .attr('height', 120)
                .attr('width', config.legend.width)

            svgLegend.selectAll('circles')
                .data(legendPos[view])
                .enter()
                .append('circle')
                .attr('cx', 72)
                .attr('cy', 120)
                .attr('r', (d,i) => { 
                    var radius = Math.sqrt((d.pos * total/ Math.PI))
                    legendPos[view][i].posY = radius;
                    return radius; 
                })
            
            svgLegend.selectAll('lines')
                .data(legendPos[view])
                .enter()
                .append('line')
                .attr('x1', 72)
                .attr('y1', d => { return 121 - d.posY })
                .attr('x2', 172)
                .attr('y2', d => { return 121 - d.posY })
                .attr('stroke-width', 0.5)
                .attr('stroke','black')
                .classed('legend-line', true)
                
            svgLegend.selectAll('text')
                .data(legendPos[view])
                .enter()
                .append('text')
                .classed('annotation', true)
                .attr('x', 182)
                .attr('y', d => { return 125 - d.posY })
                .text(d => { return d.content })	
        }

    }

    function once(fn, context) { 
        var result;

        return function() { 
            if(fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }

            return result;
        };
    }


    function render() {

        var countY = 1;

        var chartSizes = document.getElementById('svg-wrapper').getBoundingClientRect();
        var chartWrapper = document.getElementById('chart').getBoundingClientRect();
        var labels = document.querySelector('.labels').getBoundingClientRect();
        var legendContainer = document.querySelector('#legend').getBoundingClientRect();
        var newWidth = chartWrapper.width - labels.width;

        config.svg.width = newWidth;
        config.legend.width = legendContainer.width
        
        updatePositions();
        renderLegend(swoopyView);
    }
    
    function resize(winWidth) {
        config.svg.width = winWidth;
        config.svg.height = 1200 - margin.top - margin.bottom;
        config.legend.width
    }

    function updatePositions() {
        var countY = 1;
        var countYTemp = 1;
        var newWidth = config.svg.width - margin.left - margin.right;

        svg
            .attr('width', config.svg.width)
            .attr('height', config.svg.height)
        
        circle
            .attr('cx', (d,i) => { 
                var posX = ((newWidth / (years.length - 1)) * i + 1);
                return posX;
            })
            .attr('cy', (d,i) => { 
                if (i === 8) { 
                    countYTemp = countY;
                    countY += 1
                    return (((config.svg.height - margin.top - margin.bottom) / 29) * countYTemp)
                    }
                    return (((config.svg.height - margin.top - margin.bottom) / 29) * countY)
            })

        xScale.range([0, newWidth]);
        xAxis.scale(xScale);

        svg.select('.x.axis')
             .call(xAxis)
            
        category.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        renderLegend(swoopyView);
        chooseSwoopy(swoopyView);
    }

    function highlightBtn(btn) {
        btns.forEach( button => {
            d3.select(`#${button}`).classed('active', false);
        })
        d3.select(btn).classed('button active', true);
    }

    function handleMouseOut() {
        d3.select(this)
            .classed('active', false)

        let circles_all = d3.select('svg[id="svg-wrapper"]').selectAll(`circle`);
        circles_all.style('opacity', 1);

        var id = d3.select(this).attr('id');
        d3.select(`#label-${id}`).classed('label-active', false);
        tooltip.classed('active', false);
    }

    function handleMouseOver(d, i) {
        
        let circles_all = d3.select('svg[id="svg-wrapper"]').selectAll(`circle`);
        circles_all.style('opacity', .3);
        let circles_category_current = d3.selectAll(`circle[id="${this.id}"]`);
        circles_category_current.style('opacity', 1);

        d3.select(this)
            .classed('active', true)

        var id = d3.select(this).attr('id');

        d3.select(`#label-${id}`).classed('label-active', true)

        updateTooltip(d, this);
    }

    function updateTooltip(d, that) {

        tooltip = d3.select('#tooltip')
        // tooltip.style('display', 'flex');
        tooltip.classed('active',true);
        
        if (clientWidth > 600) {

            var x = d3.event.pageX + 10
            var y = d3.event.pageY + 10

            if(clientWidth - x < 260) { x = d3.event.pageX - 280;}

            tooltip
                .style('left', `${x}px`)
                .style('top', `${y}px`)									
        }

        var count = d3.select('#count_value');
        var money = d3.select('#money_value');
        var date = d3.select('#date');
        var category = d3.select('#category_title');

        var yearId = d3.select(that).attr('data-year');
        var categoryId = d3.select(that).attr('id');

        category.text(cat_dict[categoryTitles[categoryId - 1]]);
        date.text(years[yearId]);
        count.text(`${numberFormat(d.count)}`);
        money.text(`${numberFormat(d.money)} € (${d.moneyShare}%)`);
    }

    d3.select('#btn_money_abs').on('click', () => {
        swoopyView = 'moneyAbsolute'
        chooseSwoopy(swoopyView);
        updateMoneyAbs();
        renderLegend(swoopyView);
        highlightBtn('#btn_money_abs');
    });

    d3.select('#btn_money_rel').on('click', () => {
        swoopyView = 'moneyRelative'
        chooseSwoopy(swoopyView);
        updateMoneyRel();
        renderLegend(swoopyView);
        highlightBtn('#btn_money_rel');
    });

    d3.select('#btn_count_rel').on('click', () => {
        swoopyView = 'countRelative'
        chooseSwoopy(swoopyView);
        updateCountRel();
        renderLegend(swoopyView);
        highlightBtn('#btn_count_rel');
    });

    d3.select('#btn_count_abs').on('click', () => {
        swoopyView = 'countAbsolute'
        chooseSwoopy(swoopyView);
        updateCountAbs();
        renderLegend(swoopyView);
        highlightBtn('#btn_count_abs');
    });

    function updateCountAbs() {
        circle
                .transition()
                .duration(750)
                .attr('r', (d) => {
                    var value = d['count'].map(countMinMax[0], countMinMax[1], config.svg.minRad, config.svg.maxRad)
                    var radius = Math.sqrt((value/ Math.PI))
                    if(d.count === 0) { return 0 };
                    return radius;
                })
                .attr('class', 'circle-count')
    }

    function updateCountRel() {
        circle
            .transition()
            .duration(750)
            .attr('r', (d) => {
                var value = d['countShare'].map(0, 100, config.svg.minRad, config.svg.maxRad)
                var radius = Math.sqrt((value/ Math.PI))
                if(d.countShare === 0) { return 0 };
                return radius;
            })
            .attr('class', 'circle-count')
    }

    function updateMoneyRel() {
        circle
            .transition()
            .duration(750)
            .attr('r', (d) => {
                var value = d['moneyShare'].map(0, 100, config.svg.minRad, config.svg.maxRad);
                var radius = Math.sqrt((value/ Math.PI))
                if(d.moneyShare === 0) { return 0 };
                return radius;
            })
            .attr('class', 'circle-count')
    }

    function updateMoneyAbs() {
        console.log('inside')
        circle
            .transition()
            .duration(750)
            .attr('r', (d) => {
                var value = d['money'].map(moneyMinMax[0], moneyMinMax[1], config.svg.minRad, config.svg.maxRad);
                var radius = Math.sqrt((value/ Math.PI))
                if(d.money === 0) { return 0 };
                return radius;
            })
            .attr('class', 'circle-money')
    }

    function chooseSwoopy(swoopyId) {

        d3.selectAll('.swoopy_canvas').remove();
        d3.selectAll('.annotation').remove();
        d3.selectAll('.arrow').remove();

        clientWidth = window.innerWidth;

        // if (clientWidth < 900) {
        // 	antns.moneyAbsolute[0].pos.end = 61;
        // 	antns.moneyAbsolute[1].pos.end = 222;

        // 	antns.countAbsolute[0].pos.end = 150;
        // 	antns.countAbsolute[1].pos.end = 240;

        // 	antns.moneyRelative[0].pos.end = 182;
        // }


        if (clientWidth > 600) {
            renderSwoopy(swoopyId);
        }




    }

    function updateSwoopy() {

        antns[swoopyView].forEach( annotation => {

            posX1 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.start}']`).attr('cx'));
            posX2 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.end}']`).attr('cx'))  + margin.right + 15;
            posY1 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.start}']`).attr('cy')) + margin.top;
            posY2 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.end}']`).attr('cy')) + margin.top + 15;


            swoopyArrow
                .datum([[posX2, posY2], [posX1 , posY1]])
                .attr('x', posX2 + 10)
                .attr('y', posY2 + 10)

            swoopyText
                .attr('x', posX2 + 10)
                .attr('dy', (d,i) => { 
                        var lineHeight = 1.2; 
                        return `${lineHeight}em` ;
                    })
        })

    }

    function renderSwoopy(view) {

        let swoopyCanvas;
        
        antns[view].forEach( annotation => {
            
            posX1 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.start}']`).attr('cx'));
            posX2 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.end}']`).attr('cx'))  + margin.right + 15;
            posY1 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.start}']`).attr('cy')) + margin.top;
            posY2 = Math.abs(d3.select(`circle[data-uid='${annotation.pos.end}']`).attr('cy')) + margin.top + 15;

            swoopyArrow = svg.append("path")
                .attr('class', 'arrow')
                .attr('marker-end', 'url(#arrowhead)')
                .datum([[posX2, posY2], [posX1 , posY1]])
                .attr("d", swoopy);

            swoopyCanvas = svg
                .append('rect')
                .classed('swoopy_canvas', true)
                .attr('x', posX2)
                .attr('y', posY2 + 5)
                .attr('width', "250px")
                .attr('height', "85px")
                .style('fill', '#FFFFFF')
                .style('opacity', '.9')
            
            swoopyText = svg
                .append("text")
                .classed('annotation', true)
                .attr('x', posX2 + 10)
                //.attr('textLength', 200)
                .attr('y', posY2 + 10)
            
            swoopyText.selectAll('tSpan')
                .data(annotation.content)
                .enter()
                .append('tspan')
                .attr('x', posX2 + 10)
                .attr('dy', (d,i) => { 
                    var lineHeight = 1.2; 
                    return `${lineHeight}em` ;
                })
                .text( d => { return d })
            }) 
    }

    function swoopyArrow() {

        var angle = Math.PI,
            clockwise = true,
            xValue = function(d) { return d[0]; },
            yValue = function(d) { return d[1]; };

        function render(data) {
            data = data.map(function(d, i) {
                return [xValue.call(data, d, i), yValue.call(data, d, i)];
        });

        // get the chord length ("height" {h}) between points
        var h = hypotenuse(data[1][0]-data[0][0], data[1][1]-data[0][1])

        // get the distance at which chord of height h subtends {angle} radians
        var d = h / ( 2 * Math.tan(angle / 2) );

        // get the radius {r} of the circumscribed circle
        var r = hypotenuse(d, h/2)

        var path =  "M " + data[0][0] + "," + data[0][1]
            + " a " + r + "," + r
            + " 0 0," + (clockwise ? "1" : "0") + " "
            + (data[1][0]-data[0][0]) + "," + (data[1][1]-data[0][1]);

        return path
        }

        function hypotenuse(a, b) {
        return Math.sqrt( Math.pow(a,2) + Math.pow(b,2) );
        }

        render.angle = function(_) {
        if (!arguments.length) return angle;
        angle = Math.min(Math.max(_, 1e-6), Math.PI-1e-6);
        return render;
        };

        render.clockwise = function(_) {
        if (!arguments.length) return clockwise;
        clockwise = !!_;
        return render;
        };

        render.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return render;
        };

        render.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return render;
        };

        return render;
        }

    window.addEventListener('scroll', (event) => {

        if(ready){

            var client = d3.select('.project').node().getBoundingClientRect().top

            if (client < -300 && once ) {
                once = false;
                circle
                    .transition()
                    .duration(1000)
                    .attr('r', (d) => {
                        var value = d.money.map(moneyMinMax[0], moneyMinMax[1], config.svg.minRad, config.svg.maxRad);
                        var radius = Math.sqrt((value/ Math.PI))
                        if(d.money === 0) { return 0 };
                        return radius;
                })
            }
        }
    })

    window.addEventListener('resize', (event) => {
        render();
    })

})(window,d3);