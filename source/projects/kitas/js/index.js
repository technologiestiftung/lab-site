var icons = (function(container, lang){
  var module = {},
    dict = {"1":{"2016":18634,"n":"Mitte","id":0,"fid":"01","all":363236,"rel":0.051299981279388604},"2":{"2016":14391,"n":"Friedrichshain-Kreuzberg","id":56,"fid":"02","all":278393,"rel":0.05169311009975107},"3":{"2016":22643,"n":"Pankow","id":96,"fid":"03","all":389976,"rel":0.058062547438816746},"4":{"2016":13249,"n":"Charlottenburg-Wilmersdorf","id":160,"fid":"04","all":330468,"rel":0.04009162763111708},"5":{"2016":11981,"n":"Spandau","id":241,"fid":"05","all":234630,"rel":0.051063376379832076},"6":{"2016":12966,"n":"Steglitz - Zehlendorf","id":294,"fid":"06","all":299765,"rel":0.04325388220772939},"7":{"2016":15456,"n":"Tempelhof - Schöneberg","id":348,"fid":"07","all":341161,"rel":0.045304123273176004},"8":{"2016":16470,"n":"Neukölln","id":397,"fid":"08","all":328062,"rel":0.05020392486786034},"9":{"2016":12436,"n":"Treptow - Köpenick","id":452,"fid":"09","all":253333,"rel":0.04908953827570826},"10":{"2016":13926,"n":"Marzahn - Hellersdorf","id":512,"fid":"10","all":259373,"rel":0.053691016412656674},"11":{"2016":14887,"n":"Lichtenberg","id":559,"fid":"11","all":275142,"rel":0.05410660677032223},"12":{"2016":12639,"n":"Reinickendorf","id":610,"fid":"12","all":256617,"rel":0.049252387799717086}},
    csv = null, csv_keys = {},
    all_max = 0.058062547438816746,
    max = 22643,
    icon_w = 11,
    cols = 10,
    rows = 5,
    icon_h = 20,
    spacing = 3,
    margin = 15,
    state = 1,
    icons = rows*cols,
    width = cols*icon_w + spacing*(cols-1),
    height = rows*icon_h + spacing*(rows-1),
    swidth = (width+margin)*6,
    sheight = (height+margin)*4,
    svg = container.append('svg')
        .attr('width', swidth)
        .attr('height', sheight)
        .attr('preserveAspectRatio','xMidYMid meet')
        .attr('viewBox','0 0 '+swidth+' '+sheight)
        .append('g').attr('transform', 'translate(10,10)'),
    setup = {
      0:{x:2,y:1},
      56:{x:3,y:1},
      96:{x:3,y:0},
      160:{x:1,y:1},
      241:{x:0,y:1},
      294:{x:1,y:2},
      348:{x:2,y:2},
      397:{x:3,y:2},
      452:{x:4,y:2},
      512:{x:5,y:1},
      559:{x:4,y:1},
      610:{x:2,y:0}
    };

  d3.selectAll('#icon_controlls .db').on('click', function(){
    d3.selectAll('#icon_controlls .db').classed('active',false);
    var db = d3.select(this).classed('active',true);
    if(db.attr('class').indexOf('right')>=0){
      module.set(0);
    }else{
      module.set(1);
    }
  });

  module.draw = function(){
    for(var key in dict){
      var g = svg.append('g')
        .attr('transform', 'translate('+ setup[dict[key].id].x*(width+margin) +','+ setup[dict[key].id].y*(height+30+margin) +')');

      var gis = [];

      /*g.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('x', 0)
        .attr('y', 20)
        .style('stroke', '#000')
        .style('fill', 'transparent');*/

      g.append('text')
        .attr('dy',10)
        .text(dict[key].n);

      var gi = g.append('g').attr('transform','translate(0,30)');

      for(i = 0; i<icons; i++){
        gis.push(gi.append('image')
          .attr('xlink:href', '../images/Icon-' + ((i % 2 == 0)?'male':'female') + '.png')
          .attr('width',11)
          .attr('height',20)
          .attr('x', (i - Math.floor(i/cols)*cols)*(icon_w+spacing))
          .attr('y', Math.floor(i/cols)*(icon_h+spacing))
          .style('opacity', 0.2));
      }

      dict[key]['label'] = g.append('text')
                            .attr('dy',22)
                            .style('opacity',0.5)
                            .text((dict[key].rel*icons).toFixed(2));

      dict[key]['icons'] = gis;
    }

    module.animate();
  };

  module.set = function(_state){
    state = _state;
    module.animate();
  };

  module.animate = function(){
    for(var key in dict){
      if(state == 0){
        d3.select('#icon_controlls .def').text('entspricht ca. '+Math.round(max/icons)+ ((lang=='en')?' Children between the age of 1 and 6 years':' Kindern im Alter von 1 bis 6 Jahren'));
        var num = dict[key]['2016']/max*icons;
        dict[key]['label'].text(dict[key]['2016']+((lang=='en')?' Children':' Kinder'));
      }else{
        d3.select('#icon_controlls .def').text(((lang=='en')?'equals about 453 children between the age of 1 and 6 years':'entspricht einem Kind im Alter von 1 bis 6 Jahren pro 50 Einwohner'));
        var num = dict[key].rel * icons;
        dict[key]['label'].text((dict[key].rel*icons).toFixed(2)+((lang=='en')?' Children':' Kinder'));
          num--;
      }


      for(var i = 0; i<num; i++){
        dict[key].icons[i].transition().duration(500).style('opacity',1);
      }

      if(num != Math.round(num)){
        dict[key].icons[i].transition().duration(500).style('opacity',((num-Math.floor(num))*0.8 + 0.2));
        i++;
      }

      for(i = i; i<icons; i++){
        dict[key].icons[i].transition().duration(500).style('opacity',0.2);
      }
    }
  };

  function addIcon(g, i, o){
    return  
  }

  module.update = function(){};

  module.draw();

  return module;
});

var map = (function(container, lang){

  var module = {},
    lor, kitas,
    width = 850,
    height = 700,
    circles,
    radius = d3.scaleLinear().domain([0,200]).range([1,5]),
    svg = container.append('svg')
      .attr('width',width)
      .attr('height', height)
      .attr("viewBox", "0 0 "+width+" "+height)
      .attr("preserveAspectRatio", "xMinYMin meet"),
    map = svg.append('g'),
    projection = d3.geoMercator()
      .center([13.43, 52.51])
      .scale(70000)
      .translate([width / 2, height / 2]);

    svg.append('text')
      .text(((lang=='en')?'Berlin\'s Kitas, circle radius refers to size of Kita':'Berlins Kitas: der Radius der Kreise deutet die Größe der Kitas an.'))
      .attr('text-anchor','middle')
      .style('font-family','Arial')
      .style('font-size',10)
      .attr('y', height-20)
      .attr('x',width/2);

  d3.queue()
    .defer(d3.json, '../data/Bezirk.topojson')
    .defer(d3.csv, '../data/locations.csv')
    .await(function(err, _lor, _kitas){
      if(err){console.log(err);}
      kitas = _kitas;
      lor = _lor;

      kitas.forEach(function(k,i){
        var p = projection([k.alon, k.alat]);
        kitas[i]['px'] = p[0];
        kitas[i]['py'] = p[1];
      });

      module.buildMap();
    });

  module.buildMap = function(){
    var features = topojson.feature(lor, lor.objects.Bezirk).features;
    var path = d3.geoPath().projection(projection);
    
    map.selectAll('path').data(features).enter().append("path")
      .attr("d", path);

    circles = map.selectAll('circle').data(kitas).enter().append('circle')
      .attr('cx', function(d){
        return d.px;
      })
      .attr('cy', function(d){
        return d.py;
      })
      .attr('r', function(d){
        return 1+radius(d.all);
      });

  };

  module.update = function(){};

  return module;
});