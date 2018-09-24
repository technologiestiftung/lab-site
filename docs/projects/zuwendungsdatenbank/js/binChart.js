var binChart = function(_container, _bins, _funds_min, _funds_max, _bin_border, _filterFunction, _filterKey){

  var module = {},
    filterFunction = _filterFunction,
    filterKey = _filterKey,
    bin_border = _bin_border,
    filters = [],
    init = true,
    data = [],
    root = 4,
    container = _container,
    bin_count = 10,
    bins = _bins,
    funds_max = _funds_max,
    funds_min = _funds_min,
    width, height, barWidth, padding = 10, xOffset = 50, yOffset = 20,
    x = d3.scaleLinear().domain([0,bin_count-1]),
    xAxis = d3.axisBottom().scale(x).ticks(10).tickFormat((d,i)=>{
      if(i == 0) return  formatNum(bin_border[i],true) + '-' + formatNum(bin_border[i+1],true)
      return  ' < ' + formatNum(bin_border[i+1],true)

    }),
    x_axis,
    y = d3.scaleLinear(),
    yAxis = d3.axisLeft().ticks(10).scale(y).tickFormat(d=>Math.pow(d,root)),
    y_axis,
    svg = container.append('svg').classed('binChart', true);

    var defs = svg.append('defs');

    var g = svg.append('g')
           .attr('transform','translate('+(padding+xOffset)+','+(2*padding)+')'),

    chart = svg.append('g').attr('transform','translate('+(padding+xOffset)+','+(2*padding)+')').selectAll('g').data(new Array(bin_count)).enter().append('g').on('click', function(d,i){
        filterFunction(filterKey, i);
    }).classed('dategroup', true),
    chart_bins = chart.append('rect');

  function applyData(_bins){
    for(let i = 0; i<bin_count; i++){
      data[i] = 0
    }
    bins.all().forEach(b=>{
      data[b.key] = b.value
    })
  }

  applyData(bins)

  function formatNum (val, ext) {
    if(val >= 1000000000){
      return (val/1000000000).toFixed(2) + ((ext)?' Mrd. €':'');
    }else if(val >= 1000000){
      return (val/1000000).toFixed(0) + ((ext)?' Mio. €':'');
    }else if(val >= 1000){
      return (val/1000).toFixed(2) + ((ext)?' Tsd. €':'');
    }else{
      return val;
    }
  }

  module.init = function(){
    y_axis = g.append('g').classed('yaxis',true).attr('transform', 'translate(-'+padding+',0)');
    x_axis = g.append('g').classed('xaxis',true);

    module.resize();
  };

  module.data = function(_bins, _filters){
    bins = _bins;
    filters = _filters;
    applyData(bins)
    svg.classed('hasSelection', ((filters.length>0)?true:false));
    module.update();
  };

  module.update = function(){
    y.domain([0, d3.max(bins.all(), function(d){ return Math.pow(d.value, 1/root);})]);

    chart
      .classed('selected', function(d,i){
        if(filters.indexOf(i)>-1){
          return true;
        }
        return false;
      })
      .transition().duration((init)?0:500)
        .attr('transform',function(d,i){ return 'translate(' + (x(i)+1) + ',0)'; });

    chart_bins
      .transition().duration((init)?0:500)
        .attr('y',function(d,i){ return y(Math.pow(data[i], 1/root)); })
        .attr('width',function(d,i){ return barWidth-2; })
        .attr('height',function(d,i){ return height-3*padding-yOffset-y(Math.pow(data[i],1/root)); });

    y_axis.transition()
      .duration((init)?0:500)
      .call(yAxis);

    x_axis.transition()
      .duration((init)?0:500)
      .call(xAxis);

    init = false;
  };

  module.resize = function(){
    width = container.node().offsetWidth;
    height = container.node().offsetHeight;

    console.log(data.length)

    barWidth = ((width - padding*2 - xOffset) - (data.length)*padding)/(data.length+1);
    x.range([0, (width-3*padding-barWidth*2-xOffset)]);
    y.range([height-3*padding-yOffset,0]);

    svg.attr('width',width);
    svg.attr('height',height);

    yAxis.tickSize(-(width - padding - xOffset - barWidth), 0, 0);
    x_axis.attr('transform', 'translate('+(barWidth/2)+','+(height-3*padding-yOffset)+')');

    module.update();
  };

  return module;
};