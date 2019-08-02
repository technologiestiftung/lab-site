class Linechart {
    constructor(config) {
        this.div = config.div;
        this.file = config.file;
        this.margin = {top: 20, right: 20, bottom: 20, left: 50},
        this.width = config.width;
        this.height = config.height;
        this.xtype = config.xtype;
        this.ylabel = config.ylabel;
        this.tickValues = config.tickValues;
        this.map = config.map;
        this.width_line = this.width - this.margin.left - this.margin.right;
        this.height_line = this.height- this.margin.top - this.margin.bottom;
        this.config = config;
        this.svg;
        
        this.init = this.init.bind(this);
    }
    
    init () {
        const TYPE_YEAR = 'year';
        const TYPE_DATE = 'date';
        const TYPE_TIME = 'time';
        const TYPE_INT = 'int';
        const TYPE_FLOAT = 'float';

        var type = this.xtype;
        var ylabel = this.ylabel;
        
        // set the ranges
        if (type == TYPE_TIME | type == TYPE_YEAR | type ==TYPE_DATE) {
            var x_line = d3.scaleTime().range([0, this.width_line]);
        } else if (type == TYPE_INT) {
            var x_line = d3.scaleLinear().range([0, this.width_line]);
        } else {
            throw Error ('type not implemented')
        }
        var y_line = d3.scaleLinear().range([this.height_line, 0]);
        
        // define the line
        var valueline = d3.line()
        .x(function(d) { return x_line(d.xaxis); })
        .y(function(d) { return y_line(d.yaxis); });
        
        var svg_linechart = d3.select(`#${this.div}`).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
        
        var height_line =  this.height_line 
        var width_line = this.width_line
        var width = this.width
        var tickValues = this.tickValues
        var map = this.map
        
        // Get the data
        d3.csv(this.file, function(error, data) {
            
            if (error) throw error;
            
            var bisectDate = d3.bisector(function(d) { return d.xaxis; }).left;
            
            if (type == TYPE_YEAR) {
                var parseXvalue = d3.timeParse("%Y");
            } else if (type == TYPE_DATE){
                var parseXvalue = d3.timeParse("%Y-%m-%d");
            } else if (type == TYPE_TIME){
                var parseXvalue = d3.timeParse("%H:%M:%S");
            } else if (type== TYPE_INT){
                var parseXvalue = function(d) {return +d};
            } else {
                throw Error ('Type not implemented.')
            }
            
            // format the data
            data.forEach(function(d) {
                d.xaxis = parseXvalue(d.xaxis);
                d.yaxis = +d.yaxis;
            });
            
            // Scale the range of the data
            x_line.domain(d3.extent(data, function(d) { return d.xaxis}));
            y_line.domain([0, d3.max(data, function(d) { return d.yaxis;})]);
            
            // Add the valueline path.
            svg_linechart.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);
            
            // Add the X Axis
            svg_linechart.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height_line + ")")
            .call(d3.axisBottom(x_line).tickValues(tickValues).tickFormat(map));
            
            // Add the Y Axis
            svg_linechart.append("g")
            .attr("class", "yaxis")
            .call(d3.axisLeft(y_line).tickFormat(d3.format("d")))
            .append("text")
                .attr("class", "axis-title")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .text(ylabel);
            
            //add tooltip
            var focus = svg_linechart.append("g")
            .attr("class", "focus")
            .style("display", "none");
            
            focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height_line);
            
            focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width_line)
            .attr("x2", width_line);
            
            focus.append("circle")
            .attr("r", 7.5);   
            
            focus.append("text")
            .attr("id", "text_time")
            .attr("x", 15)
            .attr("class", "text"); 
            
            focus.append("text")
            .attr("id", "text_count")
            .attr("x", 15)
            .attr("dy", "2em")
            .attr("class", "text");
            
            svg_linechart.append("rect")
            //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height_line)
            .on("mouseover", function(){ focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
            
            function mousemove() {
                var x0 = x_line.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.yaxis > d1.yaxis - x0 ? d1 : d0;
                focus.attr("transform", "translate(" + x_line(d.xaxis) + "," + y_line(d.yaxis) + ")");
                focus.select("#text_time").text(function() { return + d.time + " Uhr"; });
                focus.select("#text_count").text(function() { return d.yaxis; });
                focus.select(".x-hover-line").attr("y2", height_line - y_line(d.yaxis));
                focus.select(".y-hover-line").attr("x2", width_line + width_line);
            }
    
        }); 
        
    }
    
}