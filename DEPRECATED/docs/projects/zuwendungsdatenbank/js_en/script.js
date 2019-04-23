var loader = (function(_container, _amount, _fullSize){

  var module = {},
    container = _container,
    amount = _amount,
    fullSize = _fullSize,
    loaded,icon,loadScale,loadCoinScale,loaderFunds,arcBG,arc,background,foreground;

  module.init = function(){
    icon = container.append('svg')
      .attr('width',100)
      .attr('height',100)
      .append('g')
        .attr('transform', 'translate(50,50)');

    loadScale = d3.scaleLinear()
      .range([0,amount])
      .domain([0,fullSize]);

    loadCoinScale = d3.scaleLinear()
      .range([0,Math.PI*2])
      .domain([0,fullSize]);

    loaderFunds = d3.select('#loader-funds');

    arcBG = d3.arc()
        .innerRadius(42)
        .outerRadius(48)
        .startAngle(0);

    arc = d3.arc()
        .innerRadius(43)
        .outerRadius(47)
        .startAngle(0);

    background = icon.append('path')
      .datum({endAngle: Math.PI*2})
        .style("fill", "#ddd")
        .attr("d", arcBG);

    foreground = icon.append("path")
        .datum({endAngle: 0})
        .style("fill", "#777")
        .attr("d", arc);

    icon.append('text')
      .attr('id', 'euro-sign')
      .attr('text-anchor','middle')
      .style('fill','#777')
      .style('font-size',72)
      .text('€')
      .attr('dy',24);
  };

  module.update = function(){
    var current = loaded.reduce(function(pv, cv) { return pv + cv; }, 0);
    loaderFunds.html(currency(Math.round(loadScale(current))));
    foreground.transition()
      .duration(200)
      .attrTween("d", arcTween(loadCoinScale(current)));
  };

  module.load = function(files, _callback){
    loaded = [];

    var q = d3.queue();

    files.forEach(function(f,fi){
      loaded.push(0);
      (function(f,fi){
        var func = (f.indexOf('json')>=0)?d3.json:d3.csv;
        q.defer(function (callback) {
          func(f, function(err,data){
            callback(data);
          })
            .on("progress", function(event){
              if(!isNaN(event.loaded)){
                loaded[fi] = event.loaded;
              }
              module.update();
            })
            .on("load", function(event){
              if(!isNaN(event.loaded)){
                loaded[fi] = event.loaded;
              }
              module.update();
            });
        });
      })(f,fi);
    });

    q.awaitAll(function(error, files) { 
      if(error){
        console.log(error);
      }
      console.log('done');
      _callback(files);
    });

  };

  function arcTween(newAngle) {
    return function(d) {
      var interpolate = d3.interpolate(d.endAngle, newAngle);
      return function(t) {
        d.endAngle = interpolate(t);
        return arc(d);
      };
    };
  }

  return module;
});

/*---------- HELPER ----------*/

function currency(d){
  var d = (d+'').split(''), c = '', j = 0;
  for(var i = d.length-1; i>=0; i--){
    c = d[i] + c;
    if(j == 2 && i != 0){
      c = '.'+c;
      j = -1;
    }
    j++;
  }
  return c + '&nbsp;€';
}