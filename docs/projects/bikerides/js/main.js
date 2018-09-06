const filepath = "assets/all_years.json";
const filepath_v2 = "assets/structure.json";

const values_array = ['Skalierung','Absolut', 'Relativ Median', 'Relativ Max'];
const years_array = ['Jahr', 2017, 2016, 2015, 2014, 2013, 2012];
const months_array = [0,1,2,3,4,5,6,7,8,9,10,11];
const types_array = ['Zeitraum', 'Monat', 'Woche', 'Wochentage', 'Wochenenden'];
let year_value = 2017, type_value = 'Monat', metric_value = 'Absolut', radarChart = [], radar_chart_week = [], charts_wrapper;
var x, i, j, selElmnt, a, b, c;

const wrapper_div = '.special-section'

const grid_dict = [
    {
        station: 2,
        index: 0,
        name: ''
    },
    {
        station: 3,
        index: 1,
        name: ''
    },
    {
        station: 0,
        index: 2,
        name: ''
    },
    {
        station: 1,
        index: 3,
        name: '10-PA-BER-N'
    },
    {
        station: 1,
        index: 4,
        name: '10-PA-BER-S'
    },
    {
        station: 0,
        index: 5,
        name: ''
    },
    {
        station: 0,
        index: 6,
        name: ''
    },
    {
        station: 1,
        index: 7,
        name: '15-SP-KLO-N'
    },
    {
        station: 0,
        index: 8,
        name: ''
    },
    {
        station: 1,
        index: 9,
        name: '27-RE-MAR'
    },
    {
        station: 1,
        index: 10,
        name: '12-PA-SCH'
    },
    {
        station: 0,
        index: 11,
        name: ''
    },
    {
        station: 0,
        index: 12,
        name: ''
    },
    {
        station: 0,
        index: 13,
        name: ''
    },
    {
        station: 1,
        index: 14,
        name: '15-SP-KLO-S'
    },
    {
        station: 1,
        index: 15,
        name: '02-MI-JAN-N'
    },
    {
        station: 1,
        index: 16,
        name: '03-MI-SAN-W'
    },
    {
        station: 1,
        index: 17,
        name: '03-MI-SAN-O'
    },
    {
        station: 0,
        index: 18,
        name: ''
    },
    {
        station: 0,
        index: 19,
        name: ''
    },
    {
        station: 0,
        index: 20,
        name: ''
    },
    {
        station: 0,
        index: 21,
        name: ''
    },
    {
        station: 1,
        index: 22,
        name: '02-MI-JAN-S'
    },
    {
        station: 1,
        index: 23,
        name: '05-FK-OBB-W'
    },
    {
        station: 1,
        index: 24,
        name: '05-FK-OBB-O'
    },
    {
        station: 1,
        index: 25,
        name: '06-FK-FRA-W'
    },
    {
        station: 1,
        index: 26,
        name: '06-FK-FRA-O'
    },
    {
        station: 0,
        index: 27,
        name: ''
    },
    {
        station: 1,
        index: 28,
        name: '13-CW-PRI'
    },
    {
        station: 1,
        index: 29,
        name: '18-TS-YOR-W'
    },
    {
        station: 1,
        index: 30,
        name: '18-TS-YOR-O'
    },
    {
        station: 1,
        index: 31,
        name: '19-TS-MON'
    },
    {
        station: 1,
        index: 32,
        name: '21-NK-MAY'
    },
    {
        station: 1,
        index: 33,
        name: '26-LI-PUP'
    },
    {
        station: 1,
        index: 34,
        name: '24-MH-ALB'
    },
    {
        station: 0,
        index: 35,
        name: ''
    },
    {
        station: 1,
        index: 36,
        name: '17-SK-BRE-W'
    },
    {
        station: 1,
        index: 37,
        name: '17-SK-BRE-O'
    },
    {
        station: 0,
        index: 38,
        name: ''
    },
    {
        station: 1,
        index: 39,
        name: '23-TK-KAI'
    },
    {
        station: 0,
        index: 40,
        name: ''
    },
    {
        station: 0,
        index: 41,
        name: ''
    },
    {
        station: 0,
        index: 42,
        name: ''
    },
    {
        station: 0,
        index: 43,
        name: ''
    },
    {
        station: 1,
        index: 44,
        name: '20-TS-MAR-N'
    },
    {
        station: 1,
        index: 45,
        name: '20-TS-MAR-S'
    },
    {
        station: 0,
        index: 46,
        name: ''
    },
    {
        station: 2,
        index: 47,
        name: ''
    },
    {
        station: 3,
        index: 48,
        name: ''
    },
];

let config  = {
    width: 180,
    year: 2017,
    height: 75,
    width: 75,
    levels: 5,
    radius: 2,
    value_metric: 'Absolut',
    factor: 1,
    type: 'Monat',
    month: 0,
    factor_legend: .85,
    max_value: 10000,
    margin: {
        left: 30,
        right: 30,
        top: 18,
        bottom: 42
    }
}

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
    
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

function createWrapper() {
    charts_wrapper = d3.select(wrapper_div)
        .append('div')
        .classed('charts-wrapper', true)
    
    createGrid();
}

function createTooltip() {
    let tooltip = d3.select(wrapper_div)
        .append('div')
        .classed('tooltip-wrapper', true)
        .attr('id', 'tooltip')
        .style('display', 'none')
    
    tooltip.append('div')
        .classed('station-wrapper', true)
    
    let timeWrapper = tooltip.append('div')
        .classed('time-wrapper', true);

        timeWrapper.append('div').classed('month-wrapper', true)
        timeWrapper.append('div').classed('year-wrapper', true)

    let values_wrapper = tooltip.append('div')
        .classed('values-wrapper', true)
    
    let values_median = values_wrapper.append('div')
        .classed('median', true)
        
        values_median.append('span')
            .text('Median:')
            .classed('value-desc', true)
        
        values_median.append('span')
            .attr('id', 'median-value')
            
        let values_max = values_wrapper.append('div')
            .classed('max', true)
            
        values_max.append('span')
            .text('Max:')
            .classed('value-desc', true)
        
        values_max.append('span')
            .attr('id', 'max-value')
            
        let values_total = values_wrapper.append('div')
            .classed('total', true)
            .classed('value-desc', true)
            
        values_total.append('span')
            .text('Total:')
        
        values_total.append('span')
            .attr('id', 'total-value')
}

function createIntroText() {
    let intro_wrapper = d3.select(wrapper_div).append('div')
        .classed('intro-wrapper', true)
    
    intro_wrapper
        .append('span')
        .classed('intro-headline', true)
        .text('Wie verändert sich der Radverkehr in Berlin? ')

    intro_wrapper
        .append('span')
        .classed('intro-text', true)
        .text('Zeige unterschiedliche Rhythmen der Radfahrer im Datensatz durch Auswahl der Filter (z.B. Tages-, Wochen- und Jahresrhythmus):')
}

function create_filter_ui() {

    createIntroText();

    let ui_wrapper = d3.select(wrapper_div)
        .append('div')
        .classed('ui-wrapper', true)


    let select_year_wrapper = ui_wrapper.append('div')
        .classed('custom-select', true)
        .style('width', '120px')
    
    let select_year = select_year_wrapper.append('select')
        .classed('select-year', true)

    let year_options = select_year.selectAll('option')
        .data(years_array)
        .enter()
        .append('option')
        .property('value', d => {
            return d == "2017" ? true : false;
        })
        .text(d => { return d })
    

    let type_select_wrapper = ui_wrapper.append('div')
        .classed('custom-select', true)
        .style('width', '120px')
    
    let type_select = type_select_wrapper
        .append('select')
        .classed('select-type', true)
        
    let type_options = type_select.selectAll('option')
        .data(types_array)
        .enter()
        .append('option')
        .text(d => { return d })
        .property('value', d => {
            return d == 'Monat' ? true : false;
        })

    
    let value_select_wrapper = ui_wrapper.append('div')
        .classed('custom-select', true)
        .style('width', '120px')

    let value_select = value_select_wrapper.append('select')
        .classed('select-value', true)
    
    let value_options = value_select.selectAll('option')
        .data(values_array)
        .enter()
        .append('option')
        .text(d => { return d })
        .property('value', d => {
            return d == 'Absolut' ? true : false;
        })
}

function onchange() {
    
    let year_value_temp = d3.select('div.select-selected.year').html() == 'Jahr' ? 2017 : d3.select('div.select-selected.year').html();
    let type_value_temp = d3.select('div.select-selected.cycle').html() == 'Zeitraum' ? 'Monat' : d3.select('div.select-selected.cycle').html();
    let value_metric_temp = d3.select('div.select-selected.metric').html() == 'Skalierung' ? 'Absolut' : d3.select('div.select-selected.metric').html();


    let used_selection;

    if (year_value_temp != year_value) {
        used_selection = 'year';
        year_value = year_value_temp;
    } else if (type_value_temp != type_value) {
        used_selection = 'type';
        type_value = type_value_temp;
    } else if (value_metric_temp != metric_value) {
        used_selection = 'metric';
        metric_value = value_metric_temp;
    }
    
    config.type = type_value_temp;
    config.value_metric = value_metric_temp;
    config.year = parseInt(year_value);

    if (used_selection == 'year') {
        updateChart(filepath, config);
    } else if (used_selection == 'type') {
        renderChart(filepath, config);
    } else if (used_selection == 'metric') {
        updateChart(filepath, config);
    }
}

function init(file) {

    let config_example  = {
        year: 2017,
        height: 130,
        width: 130,
        levels: 5,
        radius: 2,
        value_metric: 'Absolut',
        factor: 1,
        type: "Wochentage",
        month: 0,
        factor_legend: .85,
        max_value: 10000,
        margin: {
            left: 30,
            right: 30,
            top: 18,
            bottom: 42
        }
    }

    let config_example_weekend  = {
        year: 2017,
        height: 130,
        width: 130,
        levels: 5,
        radius: 2,
        value_metric: 'Absolut',
        factor: 1,
        type: "Wochenenden",
        month: 0,
        factor_legend: .85,
        max_value: 10000,
        margin: {
            left: 30,
            right: 30,
            top: 18,
            bottom: 42
        }
    }

    let config_example_week  = {
        year: 2017,
        height: 130,
        width: 130,
        levels: 5,
        radius: 2,
        value_metric: 'Absolut',
        factor: 1,
        type: 'Woche',
        month: 0,
        factor_legend: .85,
        max_value: 10000,
        margin: {
            left: 30,
            right: 30,
            top: 18,
            bottom: 42
        }
    }

    let config_example_month  = {
        year: 2017,
        height: 130,
        width: 130,
        levels: 5,
        radius: 2,
        value_metric: 'Absolut',
        factor: 1,
        type: 'Monat',
        month: 0,
        factor_legend: .85,
        max_value: 10000,
        margin: {
            left: 30,
            right: 30,
            top: 18,
            bottom: 42
        }
    }


    create_filter_ui();
    createWrapper();
    createTooltip();

    // file, year, station, config_current, id

    exampleChart(file, 2017, '05-FK-OBB-W', config_example, 49);
    exampleChart(file, 2017, '05-FK-OBB-W', config_example_week, 50);
    exampleChart(file, 2017, '05-FK-OBB-W', config_example_month, 51);
    exampleChart(file, 2017, '05-FK-OBB-W', config_example_weekend, 52);

    renderChart(file, config);
    createStackedArea(file);
};

function removeCharts() {
    charts_wrapper.selectAll('svg').selectAll('g').remove()
    charts_wrapper.select('.river-svg-wrapper').remove()
}

function updateChart(file, config_new) {
    d3.json(file).then((data) => {
        const files_array = Object.keys(data);
        files_array.forEach((file,fi) => {
            if (radarChart[fi] != undefined) {
                radarChart[fi].updateGraphics(data[file][config_new.year], config_new);
            }
        })
    })
}

function createGrid() {
    let wrapper_width = config.width + config.margin.left + config.margin.right;
    let wrapper_height = config.height + config.margin.top + config.margin.bottom;
    
    charts_wrapper.append('div')
        .classed('river-svg-wrapper', true)

    charts_wrapper.selectAll('svg')
        .data(grid_dict)
        .enter()
        .append('svg')
        .attr('width', wrapper_width)
        .attr('height', wrapper_height)
        .attr('class', d => {
            return `wrapper-${d.index} svg-wrapper`
        })

}

function addSVG() {
    charts_wrapper.append('div')
        .classed('river-svg-wrapper', true)

    d3.svg("assets/spree.svg").then(svg => {
        var importedNode = document.importNode(svg.documentElement, true);
        d3.select('.river-svg-wrapper').each(function() {
            this.appendChild(importedNode)
          })
    })
}

function renderChart(file, config_new) {

    removeCharts();
    addSVG();

    if (document.querySelector('.select-selected.metric') != null) {
        let metric = document.querySelector('.select-selected.metric').innerHTML
        if (metric != 'Select metric') {
            config.value_metric = metric;
        }
    }

    d3.json(file).then((data) => {
        const files_array = Object.keys(data);
        files_array.forEach((file,fi) => {
            // change: push all years into radarchart
            grid_dict.forEach(item => {
                if (item.station == 1 && file == item.name) {
                    // console.log(data[file][config.year])
                    radarChart[fi] = new Radarchart(data[file][config.year], config);
                    radarChart[fi].init(item.index, file);
                } else if (item.station == 0) {
                    d3.select(`.wrapper-${item.index}`).classed('empty', true);
                }

                if (item.station == 2) {
                    createLegend(item.index);
                }

                if (item.station == 3) {
                    createSrc(item.index);
                }
            })
        })
    })
};

function exampleChart(file, year, station, config_current, id) {

    let wrapper_width = config_current.width + config_current.margin.left + config_current.margin.right;
    let wrapper_height = config_current.height + config_current.margin.top + config_current.margin.bottom;

    let week_wrapper = d3.select(`#${config_current.type}-example`);

    let week_svg = week_wrapper.append('svg')
        .classed(`wrapper-${id}`, true)
        .classed(' svg-wrapper', true)
        .attr('width', wrapper_width)
        .attr('height', wrapper_height)
    
    d3.json(file).then(data => {
        let data_station = data[station][year];

        radar_chart_week[id] = new Radarchart(data_station, config_current);
        radar_chart_week[id].init(id, station);
    })

}

init(filepath);

let selects = { year: '2017', type: 'Monat', value: 'Absolut' };

function checkSelection(selected_current) {
    let content_current = selected_current.innerHTML;
    let select_current = selected_current.previousSibling.classList[0];
    
    d3.select(`.${select_current}`).selectAll('option').property('value', (d,i) => {
        return content_current == d ? true : false;
    });

    if (selects[select_current.slice(7)] != content_current) {
        selects[select_current.slice(7)] = content_current;
        onchange();
    }
}

function createLegend(item_index) {
    if (d3.select('.legend-wrapper')['_groups'][0][0] == null) {
        let wrapper = d3.select(`.wrapper-${item_index}`);
        let legend_wrapper = wrapper.append('g')
            .classed('legend-wrapper', true) 
            .attr('width', config.width + config.margin.left + config.margin.right)
            .attr('height', config.height + config.margin.top + config.margin.bottom)
        
        let legend_median_circle = legend_wrapper.append('circle')
            .classed('legend_median', true)
            .attr('cx', '5')
            .attr('cy', '11')
            .attr('r', 4)
            .style('fill', '#2824b2')
        
        legend_wrapper.append('text')
            .classed('legend_text', true)
            .text('Median Wert d.')
            .style('transform', 'translateX(15px) translateY(15px)')
        
        legend_wrapper.append('text')
            .classed('legend_text', true)
            .text('Anzahl Fahrradfahrer')
            .style('transform', 'translateX(15px) translateY(28px)')

        let legend_max_circle = legend_wrapper.append('circle')
            .classed('legend_median', true)
            .attr('cx', '5')
            .attr('cy', '51')
            .attr('r', 4)
            .style('fill', '#3ce39f')
        
        legend_wrapper.append('text')
            .classed('legend_text', true)
            .text('Höchster Wert d.')
            .style('transform', 'translateX(15px) translateY(55px)')
        
        legend_wrapper.append('text')
            .classed('legend_text', true)
            .text('Anzahl Fahrradfahrer')
            .style('transform', 'translateX(15px) translateY(68px)')
    }
}

function createSrc(item_index) {
    if (d3.select('.src-wrapper')['_groups'][0][0] == null) {
        let wrapper = d3.select(`.wrapper-${item_index}`);
        let src_wrapper = wrapper.append('g')
            .classed('src-wrapper', true) 
            .attr('width', config.width + config.margin.left + config.margin.right)
            .attr('height', config.height + config.margin.top + config.margin.bottom)

        src_wrapper.append('text')
            .classed('legend_text', true)
            .text('Quelle:')
            .style('transform', 'translateX(15px) translateY(15px)')
            .style('font-weight', 'bold')

        src_wrapper.append('text')
            .classed('legend_text', true)
            .text('Senatsverwaltung')
            .style('transform', 'translateX(15px) translateY(28px)')

        src_wrapper.append('text')
            .classed('legend_text', true)
            .text('für Umwelt und')
            .style('transform', 'translateX(15px) translateY(41px)')

        src_wrapper.append('text')
            .classed('legend_text', true)
            .text('Stadtentwicklung')
            .style('transform', 'translateX(15px) translateY(53px)')
    }
}

function createSumObj(stations_array) {
    let data_array = [];
    let years_array = ['2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01']

    let test_obj = {};

    years_array.forEach(year => {
        test_obj['date'] = year;
        stations_array.forEach(station_id => {
            test_obj[station_id] = 0;
        })
        data_array.push(test_obj);
        test_obj = {};
    })

    return data_array;
}

function createStackedArea(file) {
    let data_temp, station_data, years_array, months_data_array
    
    d3.json(file).then(data => {
        const files_array = Object.keys(data);
        data_temp = createSumObj(files_array);

        files_array.forEach(station_name => {
            station_data = data[station_name];
            years_array = Object.keys(station_data);
            

            years_array.forEach(year => {
                if (station_data[year][0] != undefined) {
                    
                    months_data_array = station_data[year][0].months;
                    let sum_year = 0;

                    months_data_array.forEach(month => {
                        sum_year = sum_year + month.sum;
                    })

                    data_temp.forEach(dyear => {
                        year_transformed = year + '-01-01';
                        if(dyear.date == year_transformed) {
                            dyear[station_name] = sum_year;
                        }
                    })
                }
            })
        })

        let data_temp_temp = []
        data_temp.forEach(year=>{
            for(let key in year){
                if(key != 'date' && year[key] > 0){
                    data_temp_temp.push({
                        date:year.date,
                        type:key,
                        value:year[key]
                    })
                }
            }
        })

        console.log(JSON.parse(JSON.stringify(data_temp_temp)))


        data_temp['columns'] = ['date','type','value']
        // for(let key in data_temp[0]){
        //     data_temp['columns'].push(key)
        // }

        let areaAhart = lineChart({
            container:d3.select('#stacked'),
            data: data_temp_temp,
            yLabel:'Radfahrer',
            isTime:true,
            height:600,
            group_column:'type',
            zero_based:true,
            width:900
          })

    })

}

const lineChart = (params) => {

  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    xTickNum = params.xTickNum || false,
    data = params.data,
    xGrid = params.xGrid || false,
    yGrid = params.yGrid || false,
    xLabel = params.xLabel || false,
    yLabel = params.yLabel || false,
    group_sort = params.group_sort || false,
    date_column = params.date_column || 'date',
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    group_column = params.group_column || false,
    colors = params.colors || '#000',
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false,
    xTicks = params.xTicks || false

  data.forEach(d=>{
    if(isTime){
      d[date_column] = parseTime(d[date_column])
    }else{
      d[date_column] = +d[date_column]
    }
    d[data_column] = +d[data_column]
  })

  let x = params.x || (isTime==true) ? d3.scaleTime().rangeRound([0, dWidth]).domain(d3.extent(data, d=>d[date_column])) : d3.scaleLinear().range([0, dWidth]).domain(d3.extent(data, function(d) { return d[date_column]; })),
    y = params.y || d3.scaleLinear().rangeRound([dHeight, 0]).domain(((zero_based) ? [0,d3.max(data, d=>d[data_column])] : d3.extent(data, d=>d[data_column] ) )),
    line = params.line || d3.line().x(d=>x(d[date_column])).y(d=>y(d[data_column]))

  //Let's get drawing

  let xAxis = d3.axisBottom(x)
  if(xTicks) xAxis.tickFormat(xTicks)
  if(xTickNum) xAxis.ticks(xTickNum)

  if(xGrid){
    let xGridLines = d3.axisBottom(x)

    if(xTicks) xGridLines.tickFormat(xTicks)
    if(xTickNum) xGridLines.ticks(xTickNum)

    g.append('g')
      .attr("transform", `translate(0,${dHeight})`)
      .attr("class", "gridline")
      .call(xGridLines
          .tickSize(-dHeight)
          .tickFormat("")
      )
  }

  if(yGrid){
    let yGridLines = d3.axisLeft(y)

    g.append('g')
      .attr("class", "gridline")
      .call(yGridLines
          .tickSize(-dWidth)
          .tickFormat("")
      )
  }

  g.append("g")
    .attr("transform", "translate(0," + dHeight + ")")
    .call(xAxis)

  g.append("g")
    .call(d3.axisLeft(y))

  if(group_column){
    let keys = []
    if(group_sort){
      keys = group_sort
    }else{
      data.forEach(d=>{ if(keys.indexOf(d[group_column])==-1){ keys.push(d[group_column]); } })
    }

    keys.forEach((key,ki)=>{
      g.append("path")
        .attr('class','path')
        .attr('id', 'path_'+key)
        .datum(data.filter(d=>(d[group_column]==key)?true:false))
        .attr("fill", "none")
        .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    })
  }else{
    g.append("path")
      .datum(data)
      .attr('class','path')
      .attr("fill", "none")
      .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  if(xLabel){
    g.append('g')
      .attr('transform',`translate(${dWidth},${dHeight+10})`)
      .append('text')
        .text(xLabel)
        .attr('text-anchor','end')
        .attr("fill", "#000")
        .style('font-size',10)
        .style('font-family','sans-serif')
  } 

  if(yLabel){
    g.append('g')
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .style('font-size',10)
        .style('font-family','sans-serif')
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(yLabel);
  }

  module.svg = ()=>svg
  module.x = (d)=>x(d)
  module.y = (d)=>y(d)
  module.g = ()=>g
  module.dHeight = ()=>dHeight
  module.dWidth = ()=>dWidth
  module.parseTime = (d)=>parseTime(d)

  return module

}

const stackedArea = (params) => {

    let module = {},
      container = params.container || d3.select('body'),
      height = params.height || 250,
      width = params.width || 500,
      data = params.data,
      date_column = params.date_column || 'date',
      data_column = params.data_column || 'value',
      zero_based = params.zero_based || false,
      colors = params.colors || '#000',
      svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
      margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
      dWidth = width - margin.left - margin.right,
      dHeight = height - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
      parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
      isTime = params.isTime || false,
      sums = [],
      maxDateVal = d3.max(data, d => d3.sum(d3.keys(d).map(function(key){ return key !== date_column ? d[key] : 0 })))

    data.forEach(d=>{
      let sum = 0
      for(let key in d){
        if(isTime && key == date_column){
          d[key] = parseTime(d[key])
        }else{
          d[key] = +d[key]
          sum += d[key]
        }
      }
      sums.push(sum)
    })
  
    let relData = []
  
    data.forEach((d,di)=>{
      let rel = {}
      for(let key in d){
        if(isTime && key == date_column){
          rel[key] = d[key]
        }else{
          rel[key] = d[key]/sums[di]*maxDateVal
        }
      }
      relData.push(rel);
    })

    
  
    let keys = data.columns.filter(function(key) { return key !== date_column; }),
        x = d3.scaleTime().range([0, dWidth]).domain(d3.extent(data, function(d) { return d[date_column]; })),
        y = d3.scaleLinear().range([dHeight, 0]).domain([0, maxDateVal]),
        color = d3.scaleOrdinal(d3.schemeCategory20).domain(d3.keys(data[0]).filter(function(key) { return key !== date_column; })),
        xAxis = d3.axisBottom().scale(x),
        yAxis = d3.axisLeft().scale(y),
        area = d3.area().x(d=>x(d.data.date)).y0(d=>y(d[0])).y1(d=>y(d[1])),
        stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(data),
        rStack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(relData)
  
    let browser = g.selectAll('.browser')
        .data(stack)
      .enter().append('g')
        .attr('class', d=>'browser ' + d.key)
        .attr('fill-opacity', 0.5);
  
    let areas = browser.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', 'rgba(0,0,0,0.1)')
        .style('stroke', '#555')
        .style('stroke-width', '0.1')
        .on('mouseover', function(d){
          d3.select(this).style('fill', '#1e3791')
          tooltip
            .attr('transform', `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`)
            .text(d.key)
            .style('display','block')
        })
        .on('mousemove', function(d){
          tooltip
            .attr('dx', (d3.mouse(this)[0]<dWidth/2)?10:-10)
            .attr('text-anchor', (d3.mouse(this)[0]<dWidth/2)?'start':'end')
            .attr('transform', `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`)
        })
        .on('mouseout', function(){
          d3.select(this).style('fill', 'rgba(0,0,0,0.1)')
          tooltip.style('display','none')
        })
  
    // browser.append('text')
    //     .datum(function(d) { return d; })
    //     .attr('transform', function(d) { return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; })
    //     .attr('x', -6) 
    //     .attr('dy', '.35em')
    //     .style("text-anchor", "start")
    //     .text(function(d) { return d.key; })
    //     .attr('fill-opacity', 1);
  
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + dHeight + ')')
        .call(xAxis);
  
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
  
    g.append ("text")
      .attr("dx", 10)
      .attr("dy", 15)
      .text("Radfahrer")
      .style('font-family', 'sans-serif')
      .style('font-size', 10)
  
    let tooltip = g.append('text')
      .attr('dy',6)
      .style('text-shadow','0px 0px 3px #fff')
      .style('fill','#000')
      .style('font-weight','bold')
      .style('pointer-events','none')
      .style('font-family', 'sans-serif')
      .style('font-size', 10)
      .style('text-transform','capitalize')
  
    let mode = true
  
    module.setMode = m => {
      mode = m
    }
  
    module.mode = () => {
      return mode
    }
  
    module.update = () => {
      areas.datum((d,i)=> (mode) ? stack[i] : rStack[i] ).transition().attr('d', area)
    }
  
    module.svg = ()=>svg
    module.g = ()=>g
    module.dHeight = ()=>dHeight
    module.dWidth = ()=>dWidth
  
    return module
  
  }

/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  
  if (i == 0) { a.setAttribute("class", "select-selected year"); }
  if (i == 1) { a.setAttribute("class", "select-selected cycle"); }
  if (i == 2) { a.setAttribute("class", "select-selected metric"); }

  a.setAttribute('onclick', "checkSelection(this)")
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;

    if (c.innerHTML == 'Monat' || c.innerHTML == 2017 || c.innerHTML == 'Absolut') {
        c.setAttribute("class", "same-as-selected");
    }

    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);