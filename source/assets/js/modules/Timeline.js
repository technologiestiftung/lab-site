// timeline w/ brushing
// https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172

// timeline package
// https://vasturiano.github.io/timelines-chart/example/categorical/

// smaller timeline package
// http://bl.ocks.org/emeeks/3184af35f4937d878ac0

// minimal timeline w/ zoom take this example!!!
// http://bl.ocks.org/TBD/600b23e56545026ae6fda2905efa42ce

import {  
    select as d3Select,
    scaleTime as d3ScaleTime,
    min as d3Min,
    max as d3Max,
    isoParse as d3IsoParse,
    axisBottom as d3AxisBottom,
    zoom as d3Zoom,
    event as d3Event,
    json as d3Json
} from 'd3';

class Timeline {
    constructor(domElement) {
        this.vars = {
            container: domElement,
            wrapper: null,
            width: null,
            height: null,
            minX: null,
            maxX: null,
            x: null,
            lang: null,
            elmX: null,
            svgs: null,
            catchAll: null,
            elmW: null,
            parser: null,   
            xAxis: null,
            xAxisElm: null,
            prototype: null,
            workshop: null,
            dataset: null,
            publication: null,
            circleRadius: 5,
            tooltip: null,
            tooltipTitle: null,
            svgDefs: null,
            legend: null,
            swimlanes: [],
            processedTimelines: [],
            timelines: [],
            types: ['workshop', 'dataset', 'publication', 'prototype'],
            colors: {
                'prototype': '#41b496',
                'dataset': '#e60032',
                'workshop': '#dcc82d',
                'publication': '#2d91d2',
            }
        }
        
        this.timeline = this.timeline.bind(this);
        this.findlane = this.findlane.bind(this);
        this.updateTooltip = this.updateTooltip.bind(this);
        this.setupBars = this.setupBars.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    init() {
        this.setupTimeline();
    }

    setupTimeline() {
        this.vars.width = this.vars.container.clientWidth;
        this.vars.parser = d3IsoParse;
        this.lang = d3Select('html').attr('lang');

        

        d3Json('/timeline.json')
            .then((dat) => {
                this.data = dat.filter(elm => { return elm.isproject && elm.lang == this.lang; })
                
                this.vars.minX = d3Min(this.data, (d) => { return this.vars.parser(d.start)});
                this.vars.maxX = d3Max(this.data, (d) => { return this.vars.parser(d.end)});

                this.setupLegend();
                this.setupScales();
                this.setupBars();
                this.setupTooltip();
                this.setupZoom();
            })
    }

    updateScales() {
        this.vars.x = d3ScaleTime()
            .domain([this.vars.minX, this.vars.maxX])
            .rangeRound([0, this.vars.width]);

        this.vars.xAxis = d3AxisBottom(this.vars.x)
            .ticks(this.vars.width / 100);

        this.vars.wrapper
            .attr('width', this.vars.width);

        this.vars.xAxisElm
            .call(this.vars.xAxis);
    }

    setupScales() {
        this.vars.x = d3ScaleTime()
            .domain([this.vars.minX, this.vars.maxX])
            .rangeRound([0, this.vars.width]);

        this.vars.elmX = d => { return this.vars.x(this.vars.parser(d.start)) };
        this.vars.elmW = d => { return this.vars.x(this.vars.parser(d.end)) - this.vars.x(this.vars.parser(d.start)) };

        this.vars.xAxis = d3AxisBottom(this.vars.x)
            .ticks(this.vars.width / 100);

        this.vars.svgs = d3Select(this.vars.container)
            .append('div')
            .classed('svgs', true)

        this.vars.wrapper = this.vars.svgs
            .append('svg')
            .attr('width', this.vars.width)
            .attr('class', 'timeline-svg')

        this.vars.xAxisElm = this.vars.wrapper
            .append('g')
            .attr('class', 'timeline-axis')
            .call(this.vars.xAxis)

        d3Select('.domain').remove()
    }

    setupZoom() {
        let svgDomElm = document.querySelector('.timeline-svg')
        let axisDomElm = document.querySelector('.timeline-axis')

        this.vars.height = svgDomElm.clientHeight;

        this.vars.xAxisElm
            .attr('transform', `translate(0, ${this.vars.height - 22})`);

        this.vars.wrapper.call(d3Zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', () => {
                let transform = d3Event.transform;
                this.vars.xAxisElm.call(this.vars.xAxis.scale(transform.rescaleX(this.vars.x)));

                this.vars.prototype.selectAll('rect')
                    .attr('x', d => { return transform.applyX(this.vars.elmX(d)) })
                    .attr('width', d => { return transform.k * this.vars.elmW(d) })

                this.vars.publication.selectAll('rect')
                    .attr('x', d => { return transform.applyX(this.vars.elmX(d)) })
                    .attr('width', d => { return transform.k * this.vars.elmW(d) })

                this.vars.workshop.selectAll('rect')
                    .attr('x', d => { return transform.applyX(this.vars.elmX(d)) })
                    .attr('width', d => { return transform.k * this.vars.elmW(d) })

                this.vars.dataset.selectAll('circle')
                    .attr('cx', d => { return transform.applyX(this.vars.elmX(d)) })
        
            }))
    }

    fitsIn (lane, band) {   
        if (lane.end < band.start || lane.start > band.end) {
    		return true;
    	}     
        let filteredLane = lane.filter(function (d) {return d.start <= band.end && d.end >= band.start});
        
    	if (filteredLane.length === 0) {
    		return true;
    	}
    	return false;
    }

    findlane (band) {
        //make the first array
    	if (this.vars.swimlanes[0] === undefined) {
            this.vars.swimlanes[0] = [band];
    		return;
    	}
    	var l = this.vars.swimlanes.length - 1;
        var x = 0;
        
    	while (x <= l) {
    		if (this.fitsIn(this.vars.swimlanes[x], band)) {
                this.vars.swimlanes[x].push(band);
    			return;
    		}
    		x++;
    	}
    	this.vars.swimlanes[x] = [band];
    	return;
    }

    setupTooltip() {
        
        this.vars.tooltip = d3Select('body')
            .append('div')
            .classed('timeline-tooltip', true)
        
        this.vars.tooltipTitle = this.vars.tooltip
            .append('span')
            .classed('timeline-tooltip__text', true)

    }

    updateTooltip(name) {
        let x = d3Event.pageX + 10;
        let y = d3Event.pageY + 10;

        this.vars.tooltip
            .attr('style', `left: ${x}px; top: ${y}px; position: absolute`)
        
        this.vars.tooltipTitle
            .text(name)
    }

    timeline (data) {
    	if (!arguments.length) return this.timeline;

    	this.vars.timelines = data;

        this.vars.processedTimelines = [];
        this.vars.swimlanes = [];
         
        this.processTimelines()
        
    	this.vars.processedTimelines.forEach((band) => {
    		this.findlane(band);
    	});

        var height = 60 / this.vars.swimlanes.length;
        console.log('inside timeline!')
        height = Math.min(height, Infinity);
                
    	this.vars.swimlanes.forEach( (lane, i) => {
    		lane.forEach(function (band) {
    			band.y = -(i * (height));
    			band.dy = height; // add "padding" later here?
    			band.lane = i;
    		});
        });

    	return this.vars.processedTimelines;
    }

    processTimelines() {
    	this.vars.timelines.forEach(band => {
    		var projectedBand = {};
            for (var x in band) {
                if (band.hasOwnProperty(x)) {
                    projectedBand[x] = band[x];
                }
            }
    		projectedBand.startX = this.vars.elmX(band);
    		projectedBand.width = this.vars.elmW(band);
    		projectedBand.lane = 0;
    		this.vars.processedTimelines.push(projectedBand);
    	});
    }

    setupLegend() {
        this.vars.legend = d3Select(this.vars.container)
            .append('div')
            .classed('legend', true)

        this.vars.types.forEach(type => {

            let legendTypeWrapper = this.vars.legend
                .append('div')
                .classed(`${type}-legend-wrapper legend-wrapper`, true)

                legendTypeWrapper.append('span')
                    .classed('legend__description', true)
                    .text(type)
                    .style('color', this.vars.colors[type])
        })

    }

    onResize() {
        const container = d3Select(this.vars.container);
        const timeline_svg = d3Select('.timeline-svg');

        const container_width = document.getElementsByClassName('timeline__wrapper')[0].getBoundingClientRect().width;

        // document.getElementsByClassName('.timeline__wrapper').getBoundingClientRect()

        // timeline_svg.attr('width', container_width);

        this.vars.width = container_width;

        this.updateScales()
        this.updateBars()
    }


    updateBars() {
            const onlyThisType = this.data.filter(function(d) {return d.type === type});
            const theseBands = this.timeline(onlyThisType);

            this.vars['prototype'].selectAll('rect')
            .data(theseBands)
            .attr('x', d => d.startX)
            .attr('width', d => d.width)
    }

    setupBars () {
        // this.vars.types.forEach((type, iType) => {

            const type = 'prototype';
            const iType = 0;

            // add real data here later.
            // const onlyThisType = this.data.filter(function(d) {return d.type === type});
            const onlyThisType = this.data;
            const theseBands = this.timeline(onlyThisType);

            this.vars[type] = this.vars.wrapper
                .append('g')
                .attr('class', `${type}-band`)

            if (this.vars.svgDefs == null) {
                this.vars.svgDefs = this.vars.wrapper.append('defs');
            }

            var gradient = this.vars.svgDefs.append('linearGradient')
                .attr('id', `${type}-gradient`);

            gradient.append('stop')
                .attr('class', 'stop-left')
                .attr('offset', '0');

            gradient.append('stop')
                .attr('class', `stop-right__${type}`)
                .attr('offset', '1');

            this.vars[type].selectAll('rect')
                .data(theseBands)
                .enter()
                .append("a")
                .attr("xlink:href", function(d) { return d.url })
                .append('rect')
                .attr('x', dat => dat.startX)
                .attr('y', dat => {
                    return dat.y;
                })
                .attr('width', d => d.width)
                .attr('height', 6)
                .attr('fill', d => this.vars.colors[d.type])
                .on('mouseover', (d, i, nodes) => {
                    this.updateTooltip(d.name);
                    this.vars.tooltip.classed('active', true);
                    d3Select(nodes[i]).attr('height', 8);
                })
                .on('mouseout', (d, i, nodes) => {
                    this.vars.tooltip.classed('active', false);
                    this.vars.tooltip.attr('style', 'display: none');
                    d3Select(nodes[i]).attr('height', 6);
                })


            this.vars[type]
                .attr('transform', (d,i) => {
                    const height = this.vars[type].node().getBoundingClientRect().height;
                    return `translate(0,${height + 50})`;
                })
                    
            }
        // })
    
}

export default Timeline;