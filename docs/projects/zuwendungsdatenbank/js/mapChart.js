var mapChart = function(_container, _geojson, _data, _count_data, _dict, _filterFunction, _filterKey, _tooltip, _isMini, _theYear){

  var module = {},
    theYear = _theYear,
    isMini = _isMini,
    tooltip = _tooltip,
    container = _container,
    data = _data,
    count_data = _count_data,
    filters = [],
    filterFunction = _filterFunction,
    filterKey = _filterKey,
    dict = _dict,
    dict_keys = {},
    width = 500,
    height = 400,
    geojson = _geojson,
    geokeys = {},
    svg = container.append('svg')
      .classed('mapChart',true)
      .attr('width',width)
      .attr('height', height)
      .attr("viewBox", "0 0 "+width+" "+height)
      .attr("preserveAspectRatio", "xMidYMid meet"),
    defs = svg.append('defs').html('<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">'+
      '<stop offset="0%" style="stop-color:rgba(11,138,221,0.1);stop-opacity:1" />'+
      '<stop offset="100%" style="stop-color:rgba(11,138,221,1);stop-opacity:1" />'+
    '</linearGradient>'),
    map = svg.append('g'),
    mapOverlay = svg.append('g'),
    legend = svg.append('g'),
    legend_rect = legend.append('path')
      .style('fill', 'url(#grad1)'),
    legend_txt1 = legend.append('text')
      .text('0 €')
      .attr('dy',22)
      .style('font-size',10),
    legend_txt2 = legend.append('text')
      .text(currency(data.top(1)[0].value).replace('&nbsp;',' '))
      .attr('dy',22)
      .style('font-size',10)
      .attr('text-anchor', 'end'),
    toggle = svg.append('g'),
    toggle_text = toggle.append('text').attr('text-anchor','middle'),
    toggle_sum = toggle_text.append('tspan').text('Summe (€)').attr('class', 'toggle sum').on('click', ()=>{ 
      display_mode = 'sum';
      module.update(); 
    }),
    toggle_sep1 = toggle_text.append('tspan').text(' / '),
    toggle_count = toggle_text.append('tspan').text('Anzahl').attr('class', 'toggle count').on('click', ()=>{ 
      display_mode = 'count'; 
      module.update(); 
    }),
    toggle_sep2 = toggle_text.append('tspan').text(' / '),
    toggle_ratio = toggle_text.append('tspan').text('Verhältnis Summe/Anzahl').attr('class', 'toggle ratio').on('click', ()=>{ 
      display_mode = 'ratio';
      module.update();
    }),
    display_mode = 'sum',
    polygons = null,
    overlays = null,
    init = true,
    root = 1/4,
    projection = d3.geoMercator()
          .center([13.41, 52.51])
          .scale(35000)
          .translate([width/2, height/2]),
    color_sum = d3.scaleLinear().domain([0, Math.pow(data.top(1)[0].value, root)]).range(['rgba(11,138,221,0.1)','rgba(11,138,221,1)']),
    color_count = d3.scaleLinear().domain([0, Math.pow(count_data.top(1)[0].value, root)]).range(['rgba(11,138,221,0.1)','rgba(11,138,221,1)']),
    color_ratio = d3.scaleLinear().domain([0, Math.pow(d3.max(data.all(), (d,di)=>{ 
      if(count_data.all()[di].value == 0 || d.value == 0) return 0;
      return d.value / count_data.all()[di].value; 
    }), root)]).range(['rgba(11,138,221,0.1)','rgba(11,138,221,1)']),
    path = d3.geoPath().projection(projection);

  if(isMini){
    toggle.remove()
    svg.append('text').text(theYear).attr('transform', 'translate(15,20)').style('font-weight','bold').style('font-size','14px')
  }

  module.init = function(){

    geojson.features.forEach(function(f){
      geokeys[f.properties.PLZ99] = f;
    });

    dict.forEach(function(d){
      dict_keys[d.id] = d.label;
    });

    polygons = map.selectAll('path').data(data.all()).enter().append('path')
      .attr('d', function(d){
        if(dict_keys[d.key] in geokeys){
          return path(geokeys[dict_keys[d.key]]);
        }
        return '';
      })
      .style('stroke-width', 0.5)
      .style('stroke','rgba(255,255,255,1)');

    overlays = mapOverlay.selectAll('path').data(data.all()).enter().append('path')
      .style('fill','transparent')
      .style('stroke-width','2')
      .classed('overlays', true)
      .attr('d', function(d){
        if(dict_keys[d.key] in geokeys){
          return path(geokeys[dict_keys[d.key]]);
        }
        return '';
      }).on('click', function(d,di){
        filterFunction(filterKey, d.key);
        module.updateToolTip(d3.event.pageX, d3.event.pageY, d, di)
      })
      .on('mousemove', d=>{ tooltip.move({x:d3.event.pageX,y:d3.event.pageY}); })
      .on('mouseover', (d,di)=>{
        module.updateToolTip(d3.event.pageX, d3.event.pageY, d, di)
      }).on('mouseout', d=>{ tooltip.hide(); });

      module.resize();
  };

  module.updateToolTip = (x,y,d,di)=>{
    let showPercentage = false;
    if(filters.length == 0 || filters.indexOf(d.key)>-1){
      showPercentage = true;
    }

    tooltip.show({
      title:(dict_keys[d.key]==9999999)?`Außerhalb von Berlin`:`PLZ-${dict_keys[d.key]}`,
      body: `Summe in €:<br /><i>${currency(d.value)}` + ((showPercentage) ? `&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${(d.value/all.value()*100).toFixed(2)}%`: '') + `</i><br /><br />Anzahl Förderprojekte:<br /><i>${count_data.all()[di].value}`+ ((showPercentage)? `&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${(count_data.all()[di].value/all_groups.value()*100).toFixed(2)}%` : '') + `</i>`,
      x:x,
      y:y
    })
  }

  module.update = function(){
    svg.classed('count',false)
      .classed('sum',false)
      .classed('ratio',false)
      .classed(display_mode,true);

    polygons.transition()
      .duration((init)?0:500)
      .style('fill', function(d,i){
        switch(display_mode){
          case 'count':
            return color_count(Math.pow(count_data.all()[i].value, root));
          break;
          case 'sum':
            return color_sum(Math.pow(d.value, root));
          break;
          case 'ratio':
            let val = 0
            if(d.value > 0 && count_data.all()[i].value > 0) val = d.value/count_data.all()[i].value
            return color_ratio(Math.pow(val, root));
          break;
        }
      });

    overlays.classed('selected', function(d){
      if(filters.indexOf(d.key)>-1){
        return true;
      }
      return false;
    });

    init = false;

    switch(display_mode){
      case 'count':
        legend_txt1.text('0')
        legend_txt2.text(count_data.top(1)[0].value)
      break;
      case 'sum':
        legend_txt1.text('0 €')
        legend_txt2.text(currency(data.top(1)[0].value).replace('&nbsp;',' '))
      break;
      case 'ratio':
        legend_txt1.text('0 €')
        legend_txt2.text(currency(Math.floor(d3.max(data.all(), (d,di)=>{ 
          if(count_data.all()[di].value == 0 || d.value == 0) return 0;
          return d.value / count_data.all()[di].value; 
        }))).replace('&nbsp;',' '))
      break;
    }
    
  };

  module.resize = function(){
    //width = container.node().offsetWidth;

    toggle.attr('transform', `translate(${width*0.5},10)`)

    legend.attr('transform', `translate(${width*0.25},${height-50})`)

    legend_rect
      .attr('d', `M0,4L${width*0.5},0L${width*0.5},10L0,6Z`)

    legend_txt2.attr('dx', width*0.5)

    module.update();
  };

  module.data = function(_data, _count_data, _filters){
    data = _data;
    count_data = _count_data;
    filters = _filters;
    color_sum.domain([0, Math.pow(data.top(1)[0].value, root)]);
    color_count.domain([0, Math.pow(count_data.top(1)[0].value, root)]);
    color_ratio.domain([0, Math.pow(d3.max(data.all(), (d,di)=>{ 
      if(count_data.all()[di].value == 0 || d.value == 0) return 0;
      return d.value / count_data.all()[di].value; 
    }), root)]);

    module.update();
  };

  module.hide = ()=>{ container.style('display','none'); }
  module.show = ()=>{ container.style('display','block'); }

  return module;
};