var binChart = function(_container, _bins, _title, _filterFunction, _filterKey){

  var module = {},
    filterFunction = _filterFunction,
    filterKey = _filterKey,
    filters = [],
    title = _title,
    uid = guid(),
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
    svg = container.append('svg').classed('bin_chart', true)
    defs = svg.append('defs'),
    color = d3.scaleLinear().domain([data[0].from, data[data.length-1].to]).range(['rgba(11,138,221,0.1)','rgba(11,138,221,1)']),
    color_red = d3.scaleLinear().domain([data[0].from, data[data.length-1].to]).range(['rgba(231,4,51,0.1)','rgba(231,4,51,1)']),

    defs.selectAll('linearGradient.blue').data(data).enter().append('linearGradient')
      .attr('class','blue')
      .attr('id', (d,i)=>`binGrad${i}-${uid}`)
      .attr('x1','0%')
      .attr('x2','0%')
      .attr('y1','0%')
      .attr('y2','100%')
      .html(d=>`<stop offset="0%" style="stop-color:${color(d.from)};stop-opacity:1" /><stop offset="100%" style="stop-color:${color(d.to)};stop-opacity:1" />`)

    defs.selectAll('linearGradient.red').data(data).enter().append('linearGradient')
      .attr('class','red')
      .attr('id', (d,i)=>`binGrad-red-${i}-${uid}`)
      .attr('x1','0%')
      .attr('x2','0%')
      .attr('y1','0%')
      .attr('y2','100%')
      .html(d=>`<stop offset="0%" style="stop-color:${color_red(d.from)};stop-opacity:1" /><stop offset="100%" style="stop-color:${color_red(d.to)};stop-opacity:1" />`)

    let before = 0
    data.forEach((d,i)=>{
      data[i]['before'] = before
      before += d.value
    })

    var g = svg.append('g')
           .attr('transform','translate('+(padding)+','+(2*padding)+')'),

    chart = svg.append('g').attr('transform','translate('+padding+','+(2*padding)+')')
      .selectAll('g').data(data).enter().append('g')
        .attr('class','binGs')
        .on('click', function(d,i){
            filterFunction(filterKey, i);
        }),

    chart_bins = chart.append('rect').attr('class','blue-rect').datum((d,i)=>bins[i]).attr('height',10).style('fill',(d,i)=>`url(#binGrad${i}-${uid})`),
    chart_bins_red = chart.append('rect').attr('class','red-rect').datum((d,i)=>bins[i]).attr('height',10).style('fill',(d,i)=>`url(#binGrad-red-${i}-${uid})`),
    chart_labels = chart.append('text').attr('dx',8).attr('dy',16).style('fill','#000'),
    chart_text = chart_labels.append('tspan').text(d=>d.value).style('font-weight','bold');

  if(data[0].from == 1){
    chart_labels.append('tspan').text(d=>((d.to > 1)?(' Empfänger mit '+d.from+((d.to == d.from)?'':(' bis '+d.to))+' Projekten'):' Empfänger mit einem Projekt'))
  }else{
    chart_labels.append('tspan').text(d=>` ${title} ${(d.from != d.to)?('zwischen '+currency(d.from,true)+' und '+currency(d.to,true)):('von '+currency(d.to,true))}`)
  }

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
    _filters.forEach((f,fi)=>{
      _filters[fi] = parseInt(_filters[fi])
    })

    bins = _bins;
    filters = _filters;

    chart_bins.datum((d,i)=>bins[i])
    chart_bins_red.datum((d,i)=>bins[i])
    chart_text.datum((d,i)=>bins[i])

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

    chart_bins_red
      .transition().duration((init)?0:500)
        .attr('height',d=>y(d.value));

    chart_text.text(d=>d.value)

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

    chart_bins_red
      .attr('width',width-padding*2)

    svg.attr('width',width);
    svg.attr('height',height);

    module.update();
  };

  return module;
};