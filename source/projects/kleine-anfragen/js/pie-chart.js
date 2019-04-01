class Piechart {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.radius = Math.min(this.width, this.height) / 2;
        this.config = config;
        this.path, this.g, this.svg, this.label, this.pie;
        
        this.init = this.init.bind(this);
    }
    
    init (pie_name, csv_file) {
        
        //tooltip
        var tooltip = d3.select(`#${pie_name}`).append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');

        function mouseover_pie(){
            tooltip.style('display', 'inline');
        }
        function mousemove_pie(){
            var d = d3.select(this).data()[0]
            tooltip
            .html(d.data.percentage + "<br> - <br>" + d.value)
            .style('left', (d3.event.pageX - 34) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
        }
        function mouseout_pie(){
            tooltip.style('display', 'none');
        }
        
        this.svg = d3.select(`#${pie_name}`)
        .append('svg')
        .attr('class', 'piechart-wrapper')
        .attr('width', this.width)
        .attr('height', this.height);
        
        var g = this.svg.append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
        
        var color = d3.scaleOrdinal(['rgb(110,205,245)','rgb(100,185,230)','rgb(45,145,210)','rgb(55,90,165)', '#1e3791', '#e41a1c']);
        
        var pie = d3.pie().value(function(d) { 
            return d.absolute; 
        });
        var path = d3.arc()
        .outerRadius(this.radius*0.6)
        .innerRadius(this.radius*0.3);
        
        var label = d3.arc()
        .outerRadius(this.radius*0.7)
        .innerRadius(this.radius*0.7);
        
        //read data
        d3.csv(csv_file, function(error, data) {
            
            if (error) {
                throw error;
            }

            var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
            
            arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.ministry); })
            .on('mouseover', mouseover_pie)
            .on('mousemove', mousemove_pie)
            .on('mouseout', mouseout_pie);
            
            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }
            
            arc.append("text")
            .attr("text-anchor", "middle")
            .attr('transform', function(d) {
                var pos = label.centroid(d);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                // if slice centre is on the left, anchor text to start, otherwise anchor to end
                return (midAngle(d)) < Math.PI ? 'start' : 'end';
            })
            .text(function(d) { return d.data.ministry; });
            
            // add lines connecting labels to slice. A polyline creates straight lines connecting several points
            arc.append('polyline')
            .attr('points', function(d) {
                return [path.centroid(d), label.centroid(d)]
            });
        });
    }
    
}