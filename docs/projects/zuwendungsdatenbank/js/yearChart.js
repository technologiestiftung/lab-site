var yearChart = function(_container, _dates, _counts, _filterFunction, _filterKey, _tooltip){

  var module = {},
    tooltip = _tooltip,
    filterFunction = _filterFunction,
    filterKey = _filterKey,
    filters = [],
    init = true,
    container = _container,
    dates = _dates,
    counts = _counts,
    data = groupData(_dates, _counts),
    width, height, barWidth, padding = 10, xOffset = 150, yOffset = 20,
    x = d3.scaleTime().domain([dates.all()[0].key, dates.all()[dates.size()-1].key]),
    xAxis = d3.axisBottom().scale(x).tickFormat(d3.format("d")),//.ticks(d3.timeYear),
    x_axis,
    y = d3.scaleLinear(),
    y_count = d3.scaleLinear(),
    yCountAxis = d3.axisRight().ticks(10).scale(y_count),
    yAxis = d3.axisLeft().ticks(10).scale(y).tickFormat(function(d){
      if(d >= 1000000000){
        return (d/1000000000).toFixed(2) + ' Mrd. €';
      }else if(d >= 1000000){
        return (d/1000000).toFixed(0) + ' Mio. €';
      }else if(d >= 1000){
        return (d/1000).toFixed(2) + ' Tsd. €';
      }else{
        return d;
      }
    }),
    y_axis,
    y_count_axis,
    svg = container.append('svg').classed('dateChart', true);

    var defs = svg.append('defs');

    defs.selectAll('pattern').data(['texture','texture_blue','texture_grey']).enter().append('pattern')
      .attr('id', function(d){return d;})
      .attr('width',5)
      .attr('height',5)
      .attr('patternUnits','userSpaceOnUse')
      .append('image')
        .attr('xlink:href', function(d){return './images/'+d+'.png'; })
        .attr('width',5)
        .attr('height',5);

    var g = svg.append('g')
           .attr('transform','translate('+(padding+xOffset)+','+(2*padding)+')'),

    chart = svg.append('g').attr('transform','translate('+(padding+xOffset)+','+(2*padding)+')').selectAll('g').data(data).enter().append('g').on('click', function(d){
        filterFunction(filterKey, d.date.key);
        updateToolTip(d3.event.pageX,d3.event.pageY,d);
      }).classed('dategroup', true)
      .on('mousemove', d=>{ 
        tooltip.move({x:d3.event.pageX,y:d3.event.pageY}); 
      })
      .on('mouseover', d=>{
        if(filters.length == 0 || filters.indexOf(d.date.key)>-1){
          updateToolTip(d3.event.pageX,d3.event.pageY,d);
        }
      }).on('mouseout', d=>{ 
        tooltip.hide(); 
      }),
    x_label = g.append('text').text('Summe (€)').style('font-weight','bold').attr('text-anchor','end'),
    x_right_label = g.append('text').text('Anzahl').style('font-weight','bold'),
    chart_dates = chart.append('rect'),
    chart_counts = chart.append('rect').classed('counts',true);

  function updateToolTip(x,y,d){
    tooltip.show({
      title:d.count.key,
      body:`Summe in €:<br /><i>${currency(d.date.value)}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${(d.date.value/all.value()*100).toFixed(2)}%</i><br><br />Anzahl Förderprojekte:<br /><i>${d.count.value}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${(d.count.value/all_groups.value()*100).toFixed(2)}%</i>`,
      x:x,
      y:y
    });
  }

  function groupData(_dates, _counts){
    var data = [];
    _dates.all().forEach(function(d,di){
      data.push({
        date:d,
        count:_counts.all()[di]
      });
    });
    return data;
  }

  module.init = function(){
    y_axis = g.append('g').classed('yaxis',true).attr('transform', 'translate(-'+padding+',0)');
    y_count_axis = g.append('g').attr('class','yaxis right');
    x_axis = g.append('g').classed('xaxis',true);

    module.resize();
  };

  module.data = function(_dates, _counts, _filters){
    dates = _dates;
    counts = _counts;
    data = groupData(_dates, _counts);
    filters = _filters;
    svg.classed('hasSelection', ((filters.length>0)?true:false));
    module.update();
  };

  module.update = function(){
    y.domain([0, d3.max(dates.all(), function(d){ return d.value;})]);
    y_count.domain([0, d3.max(counts.all(), function(d){ return d.value;})]);

    chart.data(data)
      .classed('selected', function(d){
        if(filters.indexOf(d.date.key)>-1){
          return true;
        }
        return false;
      })
      .transition().duration((init)?0:500)
        .attr('transform',function(d,i){ return 'translate(' + x(d.date.key) + ',0)'; });

    chart_dates
      .transition().duration((init)?0:500)
        .attr('y',function(d,i){ return y(d.date.value); })
        .attr('width',function(d,i){ return barWidth/2; })
        .attr('height',function(d,i){ return height-3*padding-yOffset-y(d.date.value); });

    chart_counts
      .transition().duration((init)?0:500)
        .attr('x', barWidth/2)
        .attr('y',function(d,i){ return y_count(d.count.value); })
        .attr('width',function(d,i){ return barWidth/2; })
        .attr('height',function(d,i){ return height-3*padding-yOffset-y_count(d.count.value); });

    y_axis.transition()
      .duration((init)?0:500)
      .call(yAxis);

    y_count_axis.transition()
      .duration((init)?0:500)
      .call(yCountAxis);

    x_axis.transition()
      .duration((init)?0:500)
      .call(xAxis);

    init = false;
  };

  module.resize = function(){
    width = container.node().offsetWidth;
    height = container.node().offsetHeight;

    barWidth = ((width - padding*2 - xOffset) - (dates.size())*padding)/(dates.size()+1);
    x.range([0, (width-3*padding-barWidth*2-xOffset)]);
    y.range([height-3*padding-yOffset,0]);
    y_count.range([height-3*padding-yOffset,0]);

    svg.attr('width',width);
    svg.attr('height',height);

    x_label.attr('transform', 'translate('+ (-padding - 3) +',' + -padding + ')');
    x_right_label.attr('transform', 'translate('+((width - 2*padding - xOffset - barWidth + 3))+','+-padding+')');

    yAxis.tickSize(-(width - padding - xOffset - barWidth), 0, 0);
    yCountAxis.tickSize(-(width - padding - xOffset - barWidth), 0, 0);
    y_count_axis.attr('transform', 'translate('+(width-padding*2-xOffset-barWidth)+',0)');
    x_axis.attr('transform', 'translate('+(barWidth/2)+','+(height-3*padding-yOffset)+')');

    module.update();
  };

  return module;
};