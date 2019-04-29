class Network {
    
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.padding = config.padding,
        this.r = config.r,
        this.slider_height = this.padding.bottom + 2 * this.padding.top + 28,
        
        this.config = config;
        this.svg, this.slider_svg, this.nodes_g, this.links_g;
        
        this.init = this.init.bind(this);
    }
    
    init (network_name, language, json_file, csv_file) {
        
        this.svg = d3.select(`#${network_name}`).append("svg")
        .attr('class', 'network-wrapper')
        .attr("width", this.width)
        .attr("height", this.height);  
        
        this.slider_svg = d3.select(`#${network_name}`).append("svg")
        .attr("class", "slider-wrapper")
        .attr("width", this.width)
        .attr("height", this.slider_height);   
        
        this.links_g = this.svg.append("g").attr('class', 'link-wrapper')
        this.nodes_g = this.svg.append("g").attr('class', 'node-wrapper')
        
        var sizeScale = d3.scaleLinear()
        .domain([500, 1])
        .range([50, 1]);
        
        var x = d3.scaleLinear()
        .domain([25, 150])
        .range([0 + this.width/4, this.width/2  + this.width/4])
        .clamp(true);
        
        var scaleTicks = d3.scaleLinear()
        .domain([200, 1000])
        .range([2, 10]);
        
        // language specific adaptions
        var word_count_label
        
        if (language == "de") {
            word_count_label = "Mind. Wortanzahl"
        }
        else {
            word_count_label = "minimum word count"
        }
        
        var label = this.slider_svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", this.width / 2)
        .attr("y", this.slider_height - this.padding.bottom)
        .text(word_count_label);

        var slider = this.slider_svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + this.padding.left + "," + (18) + ")");
        
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
        .data(x.ticks(scaleTicks(this.width)))
        .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });
        
        var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("cx", x.range()[0])
        .attr("r", 9);
        
        
            var _this = this
            d3.json(json_file, function(error, graph) {
                if (error) throw error;
                graph.links.forEach(function(d,i){ d.i = i; });
                
                function update_texts(word) {
                    d3.csv(csv_file, function(text_data) {
                        var example_texts = text_data.filter(function(row) {
                            return (row['title_stemmed_list']).includes(word.toLowerCase())
                        })
                        
                        //select 5 random examples
                        example_texts = example_texts
                        .map(x => ({ x, r: Math.random() }))
                        .sort((a, b) => a.r - b.r)
                        .map(a => a.x) 
                        .slice(0, 5);
                        
                        d3.select(`#example1`)
                        .html(function(d) {return "<a target='_blank' href=\"" + example_texts[0].url + "\">" + "\""+  example_texts[0].title + "\"</a>" + ' (' + example_texts[0].org + ')'});
                        d3.select(`#example2`)
                        .html(function(d) {return "<a target='_blank' href=\"" + example_texts[1].url + "\">" + "\""+  example_texts[1].title + "\"</a>" + ' (' + example_texts[1].org + ')'});
                        d3.select(`#example3`)
                        .html(function(d) {return "<a target='_blank' href=\"" + example_texts[2].url + "\">" + "\""+  example_texts[2].title + "\"</a>" + ' (' + example_texts[2].org + ')'});
                        d3.select(`#example4`)
                        .html(function(d) {return "<a target='_blank' href=\"" + example_texts[3].url + "\">" + "\""+  example_texts[3].title + "\"</a>" + ' (' + example_texts[3].org + ')'});
                        d3.select(`#example5`)
                        .html(function(d) {return "<a target='_blank' href=\"" + example_texts[4].url + "\">" + "\""+  example_texts[4].title + "\"</a>" + ' (' + example_texts[4].org + ')'});
                    }); 
                }
                
                function update(threshold) {
                    handle.attr("cx", x(threshold));
                    
                    /* var collideScale = d3.scaleLinear()
                    .domain(x.range())
                    .range([20,40]); */
                    
                    var force = d3.forceSimulation()
                    .force("link", d3.forceLink().id(function(d) { return d.id; }))
                    .force("charge", d3.forceManyBody().strength(-2))
                    .force("collision", d3.forceCollide(25))
                    .force('center', d3.forceCenter(_this.width / 2, _this.height / 2))
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
                        var ix = thresholded_nodes[n].id
                        node_ids.push(ix)
                    }
                    var thresholded_links = graph.links.filter(function(d){return ((node_ids.includes(d.target.id) & node_ids.includes(d.source.id))|( (node_ids.includes(d.target) & node_ids.includes(d.source))))});
                    
                    force
                    .nodes(thresholded_nodes);
                    
                    force.force("link")
                    .distance(80)
                    .links(thresholded_links);
                    
                    var link = _this.links_g.selectAll(".link")
                    .data(thresholded_links, function(d){return d.i; });
                    
                    link.exit().remove();
                    
                    var distScale = d3.scaleLinear()
                    .domain([0, d3.max(thresholded_links, function(d){return d.weight; })])
                    .range([0, 20]);
                    
                    link = link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return distScale(d.weight)});
                    
                    var node = _this.nodes_g.selectAll(".node")
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
                        .attr("cx", function(d) { return d.x = Math.max(_this.padding.left, Math.min(_this.width - _this.padding.left - _this.padding.right, d.x)); })
                        .attr("cy", function(d) { return d.y = Math.max(_this.padding.top, Math.min(_this.height - _this.padding.top - _this.padding.bottom, d.y)); })
                        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                        
                        link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });
                        
                        
                    };
                }
                
                
                // tooltips
                var div = d3.select(`#${network_name}`).append('div')
                .attr('class', 'tooltip')
                .style('display', 'none');

                function mouseover(){
                    div.style('display', 'block')
                    .style('position', 'absolute');
                }
                function mousemove(){
                    var d = d3.select(this).data()[0]
                    div
                    .html('<h3 class="tooltip--title">' + d.name + '</h3>' + 
                    '<div class="tooltip--datawrapper"> <div class="tooltip--datawrapper--row">' +
                    '<p class="attr">Anzahl</p>' +
                    '<p class="value">' + d.size + '</p>' +
                    '</div> </div>')
                    .style('left', (d3.event.pageX + 20) + 'px')
                    .style('top', (d3.event.pageY + 20) + 'px');
                }
                
                function mouseout(){
                    div.style('display', 'none');
                }
                
                slider
                .call(d3.drag()
                .on("start.interrupt", function() { slider.interrupt(); })
                .on("start drag", function() { update(x.invert(d3.event.x)); }));
                
                //initiate network with min. Count of 50 nodes
                update(50);
            });
        }
}