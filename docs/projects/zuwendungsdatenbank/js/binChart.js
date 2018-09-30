var binChart = function(_container, _bins, _filterFunction, _filterKey){

  var module = {},
    filterFunction = _filterFunction,
    filterKey = _filterKey,
    filters = [],
    init = true,
    data = JSON.parse(JSON.stringify(_bins)),
    container = _container,
    bin_count = 10,
    bins = _bins,
    width, height, barWidth, padding = 10,
    y = d3.scaleLinear().domain([0,data.reduce((total,num)=>{
      if(typeof total == 'object') total = total.value
      return total + num.value
    })]),
    svg = container.append('svg').classed('binChart', true);

    let before = 0
    data.forEach((d,i)=>{
      data[i]['before'] = before
      before += d.value
    })

    var g = svg.append('g')
           .attr('transform','translate('+(padding)+','+(2*padding)+')'),

    chart = svg.append('g').attr('transform','translate('+padding+','+(2*padding)+')')
      .selectAll('g').data(data).enter().append('g')
        .on('click', function(d,i){
            filterFunction(filterKey, i);
        }).classed('dategroup', true),

    chart_bins = chart.append('rect').datum((d,i)=>bins[i]).attr('height',10);

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
    module.resize();
  };

  module.data = function(_bins, _filters){
    bins = _bins;
    filters = _filters;

    chart_bins.datum((d,i)=>bins[i])

    svg.classed('hasSelection', ((filters.length>0)?true:false));
    module.update();
  };

  module.update = function(){
    chart
      .classed('selected', function(d,i){
        if(filters.indexOf(i)>-1){
          return true;
        }
        return false;
      });

    chart_bins
      .transition().duration((init)?0:500)
        .attr('height',d=>y(d.value));

    init = false;
  };

  module.resize = function(){
    width = container.node().offsetWidth;
    height = container.node().offsetHeight;

    y.range([0,height-2*padding-data.length*1]);

    chart
      .attr('transform', (d,i)=>{
        return `translate(0,${y(d.before)+i*1})`
      })
      .attr('height', d=>y(d.value))

    chart_bins
      .attr('width',width-padding*2)

    svg.attr('width',width);
    svg.attr('height',height);

    module.update();
  };

  return module;
};