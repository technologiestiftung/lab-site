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
} from 'd3';

const data = [
    {
        id: 0,
        isproject: true,
        type: "prototype",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Markdown Project 1",
        lang: "en",
        start: "01-05-2016",
        end: "06-03-2017"
    },
    {
        id: 0,
        isproject: true,
        type: "prototype",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Markdown Project 1",
        lang: "en",
        start: "08-07-2016",
        end: "12-09-2017"
    },
    {
        id: 0,
        isproject: true,
        type: "prototype",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Markdown Project 1",
        lang: "en",
        start: "01-07-2016",
        end: "04-09-2016"
    },
    {
        id: 1,
        isproject: true,
        type: "prototype",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Markdown Project 1",
        lang: "en",
        start: "01-01-2018",
        end: "04-03-2018"
    },
    {
        id: 2,
        isproject: true,
        type: "publication",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Publication 1",
        lang: "en",
        start: "01-05-2018",
        end: "03-08-2018"
    },
    {
        id: 3,
        isproject: true,
        type: "workshop",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Workshop 1",
        lang: "en",
        start: "01-01-2018",
        end: "05-03-2018"
    },
    {   
        id: 4,
        isproject: true,
        type: "data",
        status: "finished",
        url: "http://localhost:4000/projects/example-md-project/en/",
        name: "Example Markdown Project 1",
        lang: "en",
        start: "01-00-2018",
        end: ""
    },
]

class Timeline {
    constructor(domElement) {
        this.vars= {
            container: domElement,
            wrapper: null,
            width: null,
            height: null,
            minX: null,
            maxX: null,
            x: null,
            elmX: null,
            elmW: null,
            parser: null,     
            xAxis: null,
            xAxisElm: null,
            prototype: null,
            workshop: null,
            dataset: null,
            publication: null,
            swimlanes: [],
            processedTimelines: [],
            timelines: [],
            types: ['workshop', 'dataset', 'publication', 'prototype']
        }
        
        this.timeline = this.timeline.bind(this);
        this.findlane = this.findlane.bind(this);
    }

    init() {
        this.setupTimeline()
        this.setupScales()
        this.setupBars()
    }

    setupTimeline() {
        this.vars.width = this.vars.container.clientWidth;
        this.vars.height = this.vars.container.clientHeight;

        this.vars.parser = d3IsoParse;

        // insert real data here
        this.vars.minX = d3Min(data, (d) => { return this.vars.parser(d.start)});
        this.vars.maxX = d3Max(data, (d) => { return this.vars.parser(d.end)});
    }

    setupScales() {
        this.vars.x = d3ScaleTime()
            .domain([this.vars.minX, this.vars.maxX])
            .rangeRound([0, this.vars.width]);

        this.vars.elmX = d => { return this.vars.x(this.vars.parser(d.start)) };
        this.vars.elmW = d => { return this.vars.x(this.vars.parser(d.end)) - this.vars.x(this.vars.parser(d.start)) };

        this.vars.xAxis = d3AxisBottom(this.vars.x)
            .ticks(this.vars.width / 100);

        this.vars.wrapper = d3Select(this.vars.container)
            .append('svg')
            .attr('width', this.vars.width)
            .attr('class', 'timeline')

        this.vars.xAxisElm = this.vars.wrapper
            .append('g')
            .attr('class', 'timeline-axis')
            .call(this.vars.xAxis)
            .attr('transform', d => {
                return `translate(0,${50})` // add dynamic height -> this.vars.height
            })

    }

    fitsIn (lane, band) {
        // console.log(band.start, lane)
    	// if (lane.end < band.start || lane.start > band.end) {
    	// 	return true;
        // }
        
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
        
        // console.log(this.vars.swimlanes[x][x])
        
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

    timeline (data) {
    	if (!arguments.length) return this.timeline;

    	this.vars.timelines = data;

        this.vars.processedTimelines = [];
        this.vars.swimlanes = [];
        
        this.processTimelines()
        
    	this.vars.processedTimelines.forEach((band) => {
    		this.findlane(band);
    	});

    	var height = 30 / this.vars.swimlanes.length;
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

    setupBars () {
        this.vars.types.forEach((type, i) => {

            // add real data here later.
            const onlyThisType = data.filter(function(d) {return d.type === type});

            const theseBands = this.timeline(onlyThisType);

            const colors = {
                'prototype': '#41b496',
                'dataset': '#e60032',
                'workshop': '#dcc82d',
                'publication': '#2d91d2',
            }
            
            this.vars[type] = this.vars.wrapper
                .append('g')
                .attr('class', `${type}-band`)
                // .attr('style', `transform: translateY(-${i * 10}px)`)
                
            this.vars[type].selectAll('rect')
                .data(theseBands)
                .enter()
                .append('rect')
                    .attr('x', d => d.startX)
                    .attr('y', d => d.y)
                    .attr('width', d => d.width)
                    .attr('height', 6)
                    .attr('fill', colors[type])

            this.vars[type]
                .attr('transform', d => {
                    const height = this.vars[type].node().getBoundingClientRect().height;
                    return `translate(0,${height})`;
                })



        })

    }
}

export default Timeline;