var lang = 'en';
var geo_data, correlation, map, population;

var tooltip = d3_tooltip();
d3.select('body').call(tooltip);

d3.json('../data/complete.topojson', function(err, data){
  geo_data = topojson.feature(data, data.objects.Bezirk).features;
  correlation = d3_correlation(geo_data);
  d3.selectAll('.correlation').call(correlation);
  map = d3_map(geo_data);
  d3.selectAll('#map').call(map);
  population = d3_population(geo_data);
  d3.selectAll('#population').call(population);

});

var minimap = d3_minimap();
d3.selectAll('.minimap').call(minimap);

var compare = d3_compare();
d3.selectAll('#compare-container').call(compare);

d3.select(window).on('resize', debouncer(function(e){
  minimap.resize();
  map.resize();
  correlation.resize();
  compare.resize();
  population.resize();
}));
