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

var q = d3.queue(),
    data = {},
    width = 700,
    height = 600,
    projection = d3.geoMercator()
      .center([13.43, 52.51])
      .scale(55000)
      .translate([width / 2, height / 2]),
    path = d3.geoPath().projection(projection),
    colors = ['rgb(220,200,45)','rgb(145,200,130)','rgb(55,90,165)','rgb(20,150,140)'],
    files = ['cityparts','corridors','districts','districtspaces','planningspaces','postcode','predictionsspaces','subtrafficcells','trafficcells'];

files.forEach(function(f){
    q.defer(d3.json, '../data/'+f+'.topojson')
});

q.awaitAll(function(error, results) {
  if (error) throw error;
  
  results.forEach(function(d,i){
    data[files[i]] = topojson.feature(d, d.objects["-"]).features;
  });

  d3.selectAll('.layermix').each(function(l){
    var container = d3.select(this),
        layers = container.attr('data-layer').split(','),
        rLayers = container.attr('data-layer').split(',').reverse(),
        labels = container.attr('data-labels').split(','),
        menu = container.append('div'),
        svg = container.append('svg')
            .attr('width',width)
            .attr('height',height)
            .attr('preserveAspectRatio','xMinYMin meet')
            .attr('viewBox','0 0 '+width+' '+height);

    svg.selectAll('g').data(rLayers).enter().append('g')
        .attr('class', function(d){
            return 'layer '+d;
        }).style('stroke',function(d,i){
            return colors[layers.length-1-i];
        }).style('display', function(d,i){
            return (i==(layers.length-1))?'block':'none';
        })
        .selectAll('path').data(function(d){ return data[d]; }).enter().append('path')
            .attr('d', path);

    menu.append('ul').attr('class', 'menu').selectAll('li').data(layers).enter().append('li')
    .style('color', function(d,i){
        return colors[i];
    }).append('a').text(function(d,i){
        return labels[i];
    }).classed('active', function(d,i){
        return (i == 0)?true:false;
    }).style('color', function(d,i){
        return colors[i];
    })
    .on('click', function(d){
        var t = d3.select(this);
        if(t.classed('active')){
            container.select('.layer.'+d).style('display','none');
        }else{
            container.select('.layer.'+d).style('display','block');
        }
        t.classed('active', !t.classed('active'));
    });

  });

  var layermixResize = debounce(function() {
    d3.selectAll('.layermix').each(function(d){
        var t = d3.select(this);
        var w = t.node().clientWidth;
        if(w<width){
            t.select('svg').attr('height', w/width*height);
        }else{
            t.select('svg').attr('height', height);
        }
    });
  }, 250);

  window.addEventListener('resize', layermixResize);

  layermixResize();
});