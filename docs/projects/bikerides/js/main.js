const filepath = "assets/all_years.json";
const filepath_v2 = "assets/structure.json";

const values_array = ['Select metric','absolute', 'relative median', 'relative max'];
const years_array = ['Select year', 2017, 2016, 2015, 2014, 2013, 2012];
const months_array = [0,1,2,3,4,5,6,7,8,9,10,11];
const types_array = ['Select type', 'month', 'week', 'day'];
let year_value = 2017, type_value = 'month', metric_value = 'absolute', radarChart = [], charts_wrapper;
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
        station: 0,
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
    value_metric: 'absolute',
    factor: 1,
    type: "month",
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
        .text('Unterschiedliche Aspekte des Datensatzes durch Auswahl der Filter (z.B. Tages-, Wochen- und Jahresrhythmus):')
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
            return d == "month" ? true : false;
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
            return d == 'absolute' ? true : false;
        })
}

function onchange() {
    
    let year_value_temp = d3.select('div.select-selected.year').html() == 'Select year' ? 2017 : d3.select('div.select-selected.year').html();
    let type_value_temp = d3.select('div.select-selected.cycle').html() == 'Select type' ? 'month' : d3.select('div.select-selected.cycle').html();
    let value_metric_temp = d3.select('div.select-selected.metric').html() == 'Select metric' ? 'absolute' : d3.select('div.select-selected.metric').html();


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
    create_filter_ui();
    createWrapper();
    createTooltip();
    renderChart(file, config);
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
                    radarChart[fi] = new Radarchart(data[file][config.year], config);
                    radarChart[fi].init(item.index);
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

init(filepath);

let selects = { year: '2017', type: 'month', value: 'absolute' };

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



/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  
  if (i == 0) { a.setAttribute("class", "select-selected year"); }
  if (i == 1) { a.setAttribute("class", "select-selected cycle"); }
  if (i == 2) { a.setAttribute("class", "select-selected metric"); }

  console.log(a);

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

    if (c.innerHTML == 'month' || c.innerHTML == 2017 || c.innerHTML == 'absolute') {
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