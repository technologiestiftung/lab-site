function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

var temporal = (function(){

  var data = [{label:'Außenwanderungen',start:2005,end:2015,interval:1},{label:'Binnenwanderungen',start:2005,end:2013,interval:1},{label:'Einwohnerregister',start:2007,end:2016,interval:1},{label:'Mikozensus',start:2005,end:2016,interval:1},{label:'Auszubildende KLdB1992',start:2010,end:2011,interval:1},{label:'Auszubildende KLdB2010',start:2012,end:2015,interval:1},{label:'BQFG v1',start:2012,end:2013,interval:1},{label:'BQFG v1',start:2014,end:2016,interval:1},{label:'Zensus',start:2011,end:2011,interval:1},{label:'Wahlen',start:2005,end:2013,interval:4}];

  var label_width = 150,
      margin = 20,
      lineHeight = 30,
      start = d3.min(data, function(d){return d.start;}),
      end = d3.max(data, function(d){return d.end;}),
      height = (lineHeight*data.length + margin*3),
      width = window.innerWidth,
      barWidth = (width - 3.5*margin - label_width)/(end-start + 1),
      labelData = [],
      svg = d3.select('#temporal-overlaps').attr('height',height).style('height',height).append('g').attr('transform','translate('+margin+','+(margin*1.5)+')');

  data.forEach(function(d,c){
      d['data'] = [];
      for(var i = start; i<=end; i++){
          if(c===0){
              labelData.push(i);
          }
          if(d.interval == 1){
              if(i>=d.start && i<=d.end){
                  d.data.push(true);
              }else{
                  d.data.push(false);
              }
          }else if(d.interval == 4){
              if(i>=d.start && i<=d.end && (i-d.start)%4==0){
                  d.data.push(true);
              }else{
                  d.data.push(false);
              }
          }
      }
  });

  function drawItems(){

      var labels = svg.append('g').attr('transform','translate('+(label_width+margin)+',0)').selectAll('text').data(labelData).enter().append('text')
          .attr('text-anchor','middle')
          .attr('dx', function(d,i){ return i*barWidth + barWidth/2; })
          .attr('dy', 12)
          .text(function(d,i){
              if(width < 420 && i%2){
                  return '';
              }else if(width < 600){
                  return '\''+(d+'').substr(2,2);
              }
              return d;
          })
          .style('font-family','Helvetica,Arial,sans-serif')
          .style('font-size',12);

      var temporalItems = svg.selectAll('g').data(data).enter().append('g').attr('transform',function(d,i){return 'translate(0,'+(i*lineHeight)+')';});

          temporalItems.append('text')
              .text(function(d){return d.label})
              .attr('text-anchor','end')
              .attr('dx',label_width)
              .attr('dy',lineHeight-12)
              .style('font-family','Helvetica,Arial,sans-serif')
              .style('font-size',12);

          temporalItems.selectAll('rect').data(function(d){return d.data;}).enter().append('rect')
              .attr('height', lineHeight-2)
              .attr('width', barWidth-2)
              .attr('y',1)
              .attr('x',function(d,i){
                  return i*barWidth + label_width + margin + 1;
              })
              .style('opacity',0.5)
              .style('fill', function(d){
                  if(d){
                      return '#3192d0';
                  }
                  return 'rgba(0,0,0,0)';
              });
  }

  var resizeTemporal = debounce(function() {
      svg.selectAll('*').remove();
      width = window.innerWidth;
      barWidth = (width - 3.5*margin - label_width)/(end-start + 1);
      drawItems();
  }, 250);

  window.addEventListener('resize', resizeTemporal);
  resizeTemporal();
})();

var spatial = (function(){

  // Prepare our physical space
  var svg = d3.select('#spatial-overlaps').attr("viewBox", "0 0 500 500"),
      width = 500,
      height = 500;

  var projection = d3.geoMercator()
        .center([13.42, 52.51])
        .scale(40000)
        .translate([width / 2, height / 2]),
      path = d3.geoPath().projection(projection);

      d3.json("../data/Bezirk.topojson", function(error, topo) {
        if (error) throw error;

        svg.append('path').attr('d', path(topojson.mesh(topo)))
        .style('fill','transparent')
        .style('stroke','black');

          var b = path.bounds(topojson.mesh(topo));
          svg.append('rect')
              .attr('x',b[0][0])
              .attr('y',b[0][1])
              .attr('width',(b[1][0]-b[0][0]))
              .attr('height',(b[1][1]-b[0][1]))
              .style('fill','transparent')
              .style('stroke','#000')
              .style('stroke-dasharray','5, 5');

          svg.append('text')
              .text('Berlin - Bounding Box')
              .attr('x',b[0][0])
              .attr('y',b[0][1])
              .attr('dy',-4)
              .style('font-family','Helvetica,Arial,sans-serif')
              .style('font-size',12);
      });

  var resizeSpatial = debounce(function() {
      if(window.innerWidth < 500){
          svg.style('height', window.innerWidth);
      }
  }, 250);

  window.addEventListener('resize', resizeSpatial);
  resizeSpatial();

})();