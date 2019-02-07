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
        end: "01-03-2017"
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
        end: "01-03-2018"
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
        end: "01-08-2018"
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
        end: "01-03-2018"
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
            prototypes: null,
            workshops: null,
            datasets: null,
            publications: null
        }
        
        this.init()
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
        
        // console dimensions
        console.log(this.vars.width, this.vars.height);
        console.log(this.vars.minX);
    }

    setupScales() {
        this.vars.x = d3ScaleTime()
            .domain([this.vars.minX, this.vars.maxX])
            .rangeRound([0, this.vars.width]);

        this.vars.elmX = d => { return this.vars.x(this.vars.parser(d.start)) };
        this.vars.elmW = d => { return this.vars.x(this.vars.parser(d.end)) - this.vars.x(this.vars.parser(d.start)) };

        this.vars.xAxis = d3AxisBottom(this.vars.x)
            .ticks(this.vars.width / 100);

        this.vars.xAxisElm = d3Select(this.vars.container)
            .append('svg')
            .attr('width', this.vars.width)
            .attr('class', 'timeline-axis')
            .call(this.vars.xAxis)
    }

    setupBars() {
        this.vars.prototypes = d3Select(this.vars.container)
            .append('svg')
    }
}

export default Timeline;