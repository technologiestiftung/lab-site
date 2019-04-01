class Linechart {
    constructor(config) {
        this.margin = {top: 20, right: 20, bottom: 20, left: 50},
        this.width = config.width;
        this.height = config.height;
        this.width_line = this.width - this.margin.left - this.margin.right;
        this.height_line = this.height- this.margin.top - this.margin.bottom;
        this.config = config;
        this.svg;
        
        this.init = this.init.bind(this);
    }
    
    init (line_name, csv_file) {
        
        // set the ranges
        var x_line = d3.scaleTime().range([0, this.width_line]);
        var y_line = d3.scaleLinear().range([this.height_line, 0]);
        
        // define the line
        var valueline = d3.line()
        .x(function(d) { return x_line(d.date); })
        .y(function(d) { return y_line(d.count); });
        
        var svg_count = d3.select(`#${line_name}`).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
        
        var h =  this.height_line 

        // Get the data
        d3.csv(csv_file, function(error, data) {
            
            if (error) throw error;
            
            var parseTime = d3.timeParse("%Y");
            
            // format the data
            data.forEach(function(d) {
                d.date = parseTime(d.date);
                d.count = +d.count;
            });
            
            // Scale the range of the data
            x_line.domain(d3.extent(data, function(d) { return d.date}));
            y_line.domain([0, d3.max(data, function(d) {return d.count; })]);
            
            // Add the valueline path.
            svg_count.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);
            
            // Add the X Axis
            svg_count.append("g")
            .attr("transform", "translate(0," + h + ")")
            .call(d3.axisBottom(x_line));
            
            // Add the Y Axis
            svg_count.append("g")
            .call(d3.axisLeft(y_line));
        }); 
        
    }
    
}