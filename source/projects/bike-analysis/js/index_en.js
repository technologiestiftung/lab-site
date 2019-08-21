let svg;
let linechart;
let map;

document.addEventListener('DOMContentLoaded',function() {
  
    const style = window.getComputedStyle(document.getElementById("word_count_linechart"), null);
    const padding_total = parseFloat(style['paddingLeft'].replace('px', '')) * 2;
    const width_temp = parseFloat(style['width']);
    const width = width_temp - padding_total;

    var map = function (x) {
        var weekday = {
            0: 'Monday',
            24: 'Tuesday',
            48: 'Wednesday',
            72: 'Thursday',
            96: 'Friday',
            120: 'Saturday',
            148: 'Sunday'
        }
        return weekday[x]
    }
    
    //TODO: include language 
    
    // Line Chart
    let line_config  = {
    div: 'word_count_linechart',
    file: '../data/week_usage.csv',
    width: width,
    height: 400,
    xunit: "o'clock",
    yunit: "rides",
    xtype: 'int', //define the type of x-Axis scale (date, year, time, int, float)
    ylabel: 'Ride count ',
    tickValues: [0, 24, 48, 72, 96, 120, 148], // define specific tick values
    map: map // if sth else than tickValue shall be displayed on xAxis, use map function
}

    linechart = new Linechart(line_config).init();

    let mapvbb_config = {
        div: 'mapvbb',
        file: startsubway,
        value: ['start_count', 'Bauwerk Name'],
        scaleMax: 1000,
        hovertext: 'Ride count: ',
        geometry: 'point',
        width: width,
        height: 400,
    }

    map = new Map(mapvbb_config).init();


    let map_config = {
        div: 'map',
        file: counts,
        value: ['counts', 'PLRNAME'],
        hovertext: "Ride count: ",
        geometry: 'polygon',
        width: width,
        height: 400,
    }

    map = new Map(map_config).init();


    

});

window.addEventListener('resize', function (evt) {
//TODO
});