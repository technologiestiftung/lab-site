
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
    network.init('network', "en", "../data/graph_small.json", "../data/preprocessed.csv");
    
    // Line Chart
    let line_config  = {
        width: width,
        height: 400,
    }
    
    var linechart = new Linechart(line_config);
    linechart.init('word_count_linechart', "../data/all_words_ts.csv");
    
      // Stacked Bar Chart
      let bar_config  = {
        width: width,
        height: 700,
        barWidth: 50,
    }
    var barchart17 = new StackedBarChart(bar_config);
    barchart17.init('barchart-wp17', "../data/ministries_17.csv", "en");

    var barchart18 = new StackedBarChart(bar_config);
    barchart18.init('barchart-wp18', "../data/ministries_18.csv", "en");
});