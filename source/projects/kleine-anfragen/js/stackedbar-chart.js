class StackedBarChart {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.margin = {top: 20, right: 20, bottom: 20, left: 20};
        this.padding = 10;
        this.barWidth = 50;
        this.config = config;
        this.g, this.svg;
        
        this.init = this.init.bind(this);
    }
    
    init (chart_name, csv_file, language) {

        var dataValue = function(d) { return d.absolute; }
        var labelValue = function(d) { return  (language == "de") ? d.ministry : d.ministry_en; }
        var percentValue = function(d) {return d.percentage}
        
        var color = d3.scaleOrdinal(['#e41a1c', '#1e3791', 'rgb(55,90,165)', 'rgb(45,145,210)', 'rgb(100,185,230)', 'rgb(110,205,245)']);
        
        var _this = this
        //read data
        d3.csv(csv_file, function(error, data) {
            if (error) {
                throw error;
            }
            data = data.map(function(d) {
                return { value: dataValue(d), label: labelValue(d), percent: percentValue(d) };
            });

            var sumVals = d3.sum(data, function(d) { return d.value; });
            var barScale = d3.scaleLinear()
            .domain([0, sumVals])
            .range([0, (_this.height-_this.margin.left-_this.margin.right)]);
            
            _this.svg = d3.select(`#${chart_name}`)
            .append('svg').data([data])
            .attr('class', 'barchart-wrapper')
            .attr('width', _this.width)
            .attr('height', _this.height);
            
            _this.g = _this.svg.append("g")
            .attr("class", "rect-wrapper")
            .attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top + ")");
            
            var svg = d3.select(this).selectAll("svg").data([data]);
            var gEnter = svg.enter().append("svg").append("g");
            _this.g.append("g").attr("class", "rects")
            .selectAll(".data-rects").data(data).enter()
            .append("rect").attr("class", "data-rects");
            
            _this.g.selectAll("line.legend")
            .data(data).enter()
            .append("line").attr("class", "legend");
            
            _this.g.selectAll("text.legend_percent")
            .data(data).enter()
            .append("text")
            .attr("class", "legend_percent");
            
            _this.g.selectAll("text.legend_sen")
            .data(data).enter()
            .append("text")
            .attr("class", "legend_sen")
            
            var rectG = _this.g.select("g.rects");
            var dataRects = rectG.selectAll(".data-rects").data(data, function(d) { return d.label; });
            dataRects.enter().append("rect").attr("class", "data-rects");
            rectG.selectAll(".data-rects").transition()
            .duration(750)
            .attr("y", function(d, i) {
                return data.slice(0, i).reduce(function (a, d) { return a + barScale(d.value); }, 1) + (_this.padding / 2);
            })
            .attr("x", 0.1 * _this.width)
            .attr("height", function(d) { console.log(d.value);return Math.max(barScale(d.value) - (_this.padding / 2), 1); })
            .attr("width", _this.barWidth)
            .attr("fill", function(d) {return color(d.label); });
            
            // Getting midpoint for legend
            function legendX(d, i) {
                return data.slice(0, i).reduce(function (a, d) { return a + barScale(d.value); }, (Math.max((barScale(d.value) - (_this.padding / 2)), 1) / 2)) + (_this.padding / 2);
            };
            function legendX_text(d, i) {
                return data.slice(0, i).reduce(function (a, d) { return a + barScale(d.value); }, (Math.max((barScale(d.value) - (_this.padding / 2)), 1) / 2)) + (_this.padding / 2) + 5;
            };
            
            var legend = _this.g.selectAll("line.legend").data(data, function(d) { return d.label; });
            legend.enter().append("line").attr("class", "legend");
            _this.g.selectAll("line.legend")
            .transition()
            .duration(750)
            .attr("y1", legendX)
            .attr("y2", legendX)
            .attr("x1", 0.1 * _this.width + _this.barWidth + 10)
            .attr("x2", 0.15 * _this.width + _this.barWidth - 10)
            .attr("stroke", "#000000")
            .attr("stroke-width", 0.5);
            
            legend.enter().append("text").attr("class", "legend_percent")
            _this.g.selectAll("text.legend_percent")
            .transition()
            .duration(750)
            .attr("text-anchor", "left")
            .attr("y", legendX_text)
            .attr("x", 0.15 * _this.width + _this.barWidth)
            .text(function(d) { return d.percent})
            
            legend.enter().append("text").attr("class", "legend_sen")
            _this.g.selectAll("text.legend_sen")
            .transition()
            .duration(750)
            .attr("text-anchor", "left")
            .attr("y", legendX_text)
            .attr("x", 0.15 * _this.width + _this.barWidth + 70)
            .text(function(d) { return d.label})
        });
    }
}