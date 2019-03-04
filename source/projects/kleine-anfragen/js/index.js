
document.addEventListener('DOMContentLoaded',function() {
    
    // Network graph
    
    var padding = {top: 20, right: 20, bottom: 20, left: 20},
    rectHeight = 30,
    rectDist = 2
    
    var width = 1000,
    height = 600,
    text_height = 5*rectHeight + 5*rectDist + 2*padding.bottom + 2*padding.top + 18
    r = 6
    
    var svg = d3.select("#network").append("svg")
    .attr("width", width)
    .attr("height", height);   
    var text_svg = d3.select("#network").append("svg")
    .attr("width", width)
    .attr("height", text_height);   
    
    var links_g = svg.append("g");
    var nodes_g = svg.append("g")
    
    var sizeScale = d3.scaleLinear()
    .domain([500, 1])
    .range([50, 1]);
    
    var x = d3.scaleLinear()
    .domain([25, 150])
    .range([0 + width/4, width/2  + width/4])
    .clamp(true);
    
    var slider = text_svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + padding.left + "," + (padding.top + 18) + ")");
    
    slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    
    slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });
    
    var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("cx", x.range()[0])
    .attr("r", 9);
    
    text_svg.append("text")
    .attr("x", x.range()[0] - 10)
    .attr("y", 18 + padding.top)
    .attr("text-anchor", "end")
    .attr("font-size", "14px")
    .style("opacity", 0.5)
    .text("Minimum Wortanzahl");
    
    var examples_rect = text_svg.append("g")
    .attr("class", "example_rect")
    
    for (var i = 0; i < 5; i++){ 
        examples_rect.append("rect")
        .attr("x", padding.left)             
        .attr("y", (d, ) => text_height - padding.bottom - (i+1) * (rectHeight+ rectDist))
        .attr("rx", 3)         
        .attr("ry", 3)
        .attr('width', width - padding.left - padding.right)
        .attr('height', 30);
    }
    
    var text_g = text_svg.append('g')
    .attr("class", "example_text")
    
    d3.json("../graph_small.json", function(error, graph) {
        if (error) throw error;
        graph.links.forEach(function(d,i){ d.i = i; });
        
        function update_texts(word) {
            d3.csv("../preprocessed.csv", function(text_data) {
                example_texts = text_data.filter(function(row) {
                    return (row['title_stemmed_list']).includes(word.toLowerCase())
                })
                
                //select 5 random examples
                example_texts = example_texts
                .map(x => ({ x, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(a => a.x) 
                .slice(0, 5);
                
                var examples = text_g.selectAll(".example_text")
                .data(example_texts, function(d){return d.index; })
                examples.exit().remove();
                
                var examples = examples.enter().append("text")
                .attr("class", "example_text")
                .attr("x", padding.left + 10)
                .attr("y", (d, i) => text_height - padding.bottom - (i+1) * (rectHeight+rectDist) + rectHeight/1.5)
                .html(function(d) {return "<a href=\"" + d.url + "\">" + "\""+  d.title + "\"</a>" + ' (' + d.org + ')'});
            });
        }
        
        function update(threshold) {
            handle.attr("cx", x(threshold));
            
            var collideScale = d3.scaleLinear()
            .domain(x.range())
            .range([20,40]);
            
            var force = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-2))
            .force("collision", d3.forceCollide(25))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .alphaDecay(.009)
		    .velocityDecay(0.9)
            .on("tick", ticked);
            
            function dragstarted(d) {
                if (!d3.event.active) force.alphaTarget(0.5).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
            
            function dragended(d) {
                if (!d3.event.active) force.alphaTarget(0.5);
                d.fx = null;
                d.fy = null;
            }
            
            var thresholded_nodes = graph.nodes.filter(function(d){return (d.size > threshold)});
            var node_ids = [];
            for (var n in thresholded_nodes) {
                ix = thresholded_nodes[n].id
                node_ids.push(ix)
            }
            var thresholded_links = graph.links.filter(function(d){return ((node_ids.includes(d.target.id) & node_ids.includes(d.source.id))|( (node_ids.includes(d.target) & node_ids.includes(d.source))))});
            
            force
            .nodes(thresholded_nodes);
            
            force.force("link")
            .distance(80)
            .links(thresholded_links);
            
            var link = links_g.selectAll(".link")
            .data(thresholded_links, function(d){return d.i; });
            
            link.exit().remove();
            
            var distScale = d3.scaleLinear()
            .domain([0, d3.max(thresholded_links, function(d){return d.weight; })])
            .range([0, 20]);

            link = link.enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return distScale(d.weight)});
            
            var node = nodes_g.selectAll(".node")
            .data(thresholded_nodes, function(d){ return d.id; })
            
            node.exit().remove();
            
            node = node.enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));  
            
            node.append("circle")
            .attr("r", function(d) {return sizeScale(d.size); })
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout)
            .on('click', function(d) {update_texts(d.name); });
            
            node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) {return d.name })
            .on('click', function(d) {update_texts(d.name); });
            
            function ticked () {
                node
                .attr("cx", function(d) { return d.x = Math.max(padding.left, Math.min(width - padding.left - padding.right, d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(padding.top, Math.min(height - padding.top - padding.bottom, d.y)); })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                
                link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
                
                
            };
            force.restart()
            
        }
        
        // tooltips
        var div = d3.select("#network").append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');
        
        function mouseover(){
            div.style('display', 'inline');
        }
        function mousemove(){
            var d = d3.select(this).data()[0]
            div
            .html(d.size)
            .style('left', (d3.event.pageX - 34) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px');
        }
        function mouseout(){
            div.style('display', 'none');
        }
        
        
        slider
        .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { update(x.invert(d3.event.x)); }));
        
        //initiate network with min. Count of 30 nodes
        update(50);
    });
    
    // Line Chart
    
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width_line = 600 - margin.left - margin.right,
    height_line = 400 - margin.top - margin.bottom;
    
    // set the ranges
    var x_line = d3.scaleTime().range([0, width_line]);
    var y_line = d3.scaleLinear().range([height_line, 0]);
    
    
    
    // define the line
    var valueline = d3.line()
    .x(function(d) { return x_line(d.date); })
    .y(function(d) { return y_line(d.count); });
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg_count = d3.select("#word_count").append("svg")
    .attr("width", width_line + margin.left + margin.right)
    .attr("height", height_line + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
    
    // Get the data
    d3.csv("../all_words_ts.csv", function(error, data) {
        
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
        .attr("transform", "translate(0," + height_line + ")")
        .call(d3.axisBottom(x_line));
        
        // Add the Y Axis
        svg_count.append("g")
        .call(d3.axisLeft(y_line));
    });
    
    // Pie Chart
    
    // tooltips
    var div_pie = d3.select("body").append('div')
    .attr('class', 'tooltip')
    .style('display', 'none');
    function mouseover_pie(){
        div_pie.style('display', 'inline');
    }
    function mousemove_pie(){
        var d = d3.select(this).data()[0]
        div_pie
        .html(d.data.percentage + "<br> - <br>" + d.value)
        .style('left', (d3.event.pageX - 34) + 'px')
        .style('top', (d3.event.pageY - 12) + 'px');
    }
    function mouseout_pie(){
        div_pie.style('display', 'none');
    }
    
    //general settings
    var pie_width = 1000,
    pie_height = 500,
    radius = Math.min(pie_width, pie_height) / 2;
    
    svg = d3.select("#pie17")
    .append('svg')
    .attr('width', pie_width)
    .attr('height', pie_height);
    
    var g = svg.append("g")
    .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");
    
    var color = d3.scaleOrdinal(['rgb(110,205,245)','rgb(100,185,230)','rgb(45,145,210)','rgb(55,90,165)', '#1e3791', '#e41a1c']);
    
    var pie = d3.pie().value(function(d) { 
        return d.absolute; 
    });
    var path = d3.arc()
    .outerRadius(radius*0.6)
    .innerRadius(radius*0.3);
    
    var label = d3.arc()
    .outerRadius(radius*0.7)
    .innerRadius(radius*0.7);
    
    // for ministries Wahlperiode 17
    d3.csv("../ministries_17.csv", function(error, data) {
        
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
            // changes the point to be on left or right depending on where label is.
            pos[0] = radius * 0.6 * (midAngle(d) < Math.PI ? 1 : -1);
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
            var pos = label.centroid(d);
            pos[0] = radius * 0.6 * (midAngle(d) < Math.PI ? 1 : -1);
            return [path.centroid(d), label.centroid(d), pos]
        });
        
        
    });
    
    //ministries Wahlperiode 18
    
    var svg = d3.select("#pie18")
    .append('svg')
    .attr('width', pie_width)
    .attr('height', pie_height);
    
    var g_pie18 = svg.append("g")
    .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");
    
    d3.csv("../ministries_18.csv", function(error, data) {
        if (error) {
            throw error;
        }
        
        var arc = g_pie18.selectAll(".arc")
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
            // changes the point to be on left or right depending on where label is.
            pos[0] = radius * 0.6 * (midAngle(d) < Math.PI ? 1 : -1);
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
            var pos = label.centroid(d);
            pos[0] = radius * 0.6 * (midAngle(d) < Math.PI ? 1 : -1);
            return [path.centroid(d), label.centroid(d), pos]
        });
        
    });
});