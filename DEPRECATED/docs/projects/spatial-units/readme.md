ndjson-split "d.features" < districts.geojson > districts.ndjson

ndjson-map "d.properties = {name:d.properties.Gemeinde_name}, d" < districts.ndjson > districts_clean.ndjson

ndjson-reduce < districts_clean.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > districts_clean.geojson

geo2topo districts_clean.geojson | toposimplify -p 0.0000000001 -f | topoquantize 1e5 > districts.topojson



ndjson-split "d.features" < trafficcells.geojson | ndjson-map "d.properties = {name:d.properties.spatial_alias}, d" | ndjson-reduce | ndjson-map '{type: "FeatureCollection", features: d}' | geo2topo | toposimplify -p 0.0000000001 -f | topoquantize 1e5 > trafficcells.topojson