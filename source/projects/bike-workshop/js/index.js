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
            0: 'Montag',
            24: 'Dienstag',
            48: 'Mittwoch',
            72: 'Donnerstag',
            96: 'Freitag',
            120: 'Samstag',
            148: 'Sonntag'
        }
        return weekday[x]
    }
    
    // Line Chart
    let line_config  = {
    div: 'word_count_linechart',
    file: '../data/week_usage.csv',
    width: width,
    height: 400,
    unit: "Uhr",
    xtype: 'int', //define the type of x-Axis scale (date, year, time, int, float)
    ylabel: 'Anzahl Fahrten',
    tickValues: [0, 24, 48, 72, 96, 120, 148], // define specific tick values
    map: map // if sth else than tickValue shall be displayed on xAxis, use map function
}

    linechart = new Linechart(line_config).init();

    let mapvbb_config = {
        div: 'mapvbb',
        file: startsubway,
        value: ['start_count', 'Bauwerk Name'],
        scaleMax: 1000,
        hovertext: "Anzahl Fahrten: ",
        geometry: 'point',
        width: width,
        height: 400,
    }

    map = new Map(mapvbb_config).init();


    let map_config = {
        div: 'map',
        file: counts,
        value: ['counts', 'PLRNAME'],
        hovertext: "Anzahl Fahrten: ",
        geometry: 'polygon',
        width: width,
        height: 400,
    }

    map = new Map(map_config).init();


    

});

window.addEventListener('resize', function (evt) {
//TODO
});