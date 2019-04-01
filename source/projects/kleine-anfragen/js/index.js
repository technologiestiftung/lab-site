
let svg;

document.addEventListener('DOMContentLoaded',function() {
    
    // Network graph
    const style = window.getComputedStyle(document.getElementById("navigation"), null);
    const padding_total = parseFloat(style['paddingLeft'].replace('px', '')) * 2;
    const width_temp = parseFloat(style['width']);
    const width = width_temp - padding_total;
    
    let network_config  = {
        width: width,
        height: 600,
        rectHeight: 30,
        rectDist: 2,
        padding: {top: 20, right: 20, bottom: 20, left: 20},
        r: 6
    }
    
    var network = new Network(network_config);
    network.init('network', "../graph_small.json", "../preprocessed.csv");
    
    // Line Chart
    let line_config  = {
        width: width,
        height: 400,
    }
    
    var linechart = new Linechart(line_config);
    linechart.init('word_count_linechart', "../all_words_ts.csv");
    
    // Pie Chart
    let pie_config  = {
        width: width,
        height: 500,
    }
    
    var piechart17 = new Piechart(pie_config);
    piechart17.init('piechart-wp17', "../ministries_17.csv");
    
    var piechart18 = new Piechart(pie_config);
    piechart18.init('piechart-wp18', "../ministries_18.csv");
});