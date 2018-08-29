class Radarchart {
    constructor(file, config) {
        this.width = config.width;
        this.container = config.container;
        this.height = config.height;
        this.levels = config.levels;
        this.radius = config.radius;
        this.factor = config.factor;
        this.margin = config.margin;        
        this.max_value = config.max_value;
        this.factor_legend = config.factor_legend;
        this.station_name, this.tooltip, this.month_dict, this.month_dict_long, this.all_axis_week, this.circles = {}, this.updateCount = 0, this.areas = {}, this.category, this.titleName, this.year, this.colorMax, this.colorMean, this.range, this.defs
        this.days_dict = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 },
        this.all_axis_day = [24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

        this.file = file, this.type, this.local_max, this.value_metric;
        this.radians = 2 * Math.PI;
        this.segmentsWrapper, this.nodesWrapper, this.areasWrapper
        this.data, this.svg, this.all_axis, this.axis, this.title
        this.total, this.node_coords = {'median':[], 'max':[]};

        this.init = this.init.bind(this);
        this.createSegments = this.createSegments.bind(this);
        this.createAxis = this.createAxis.bind(this);
        this.createCircles = this.createCircles.bind(this);
        this.createAreas = this.createAreas.bind(this);
        this.createGraphics = this.createGraphics.bind(this);
        this.createTitle = this.createTitle.bind(this);
        this.updateTooltip = this.updateTooltip.bind(this);
        this.updateCircles = this.updateCircles.bind(this);
        this.updateGraphics = this.updateGraphics.bind(this);
        this.mergeDays = this.mergeDays.bind(this);
        this.calcMaxLocal = this.calcMaxLocal.bind(this);
        this.highlightMonths = this.highlightMonths.bind(this);
        this.unhighlightMonths = this.unhighlightMonths.bind(this);
        this.highlightAll = this.highlightAll.bind(this);
        this.unhighlightAll = this.unhighlightAll.bind(this);
        this.mergeHours = this.mergeHours.bind(this);
    }

    init(station_index) {
        this.type = config.type;

        if(this.type == "week") {
            this.data = this.mergeDays(this.file);
            config.max_value = 10000;
        } else if (this.type == "day") {
            this.data = this.mergeHours(this.file);
            config.max_value = 1500;
        } else {
            this.data = this.file;
            config.max_value = 10000;
        }


        this.station_name = this.file[0].name;
        this.value_metric = config.value_metric;
        this.all_axis = (this.data.map((i,j) => {return i.month}));
        this.all_axis_week = [0,1,2,3,4,5,6];
        this.year = config.year;

        
        this.total = config.type == 'week' ? this.all_axis_week.length : this.all_axis.length;
        this.colorMax = "#3ce39f";
        this.colorMean = "#2824b2";
        this.max_local = this.calcMaxLocal(this.data);

        if (this.value_metric == 'relative max') {
            this.max_value = this.max_local.max;
        } else if (this.value_metric == 'relative median') {
            this.max_value = this.max_local.median;
        } else if (this.value_metric == 'absolute') {
            this.max_value = config.max_value;
        }

        this.svg = d3.select(`svg.wrapper-${station_index}`)
            .on('mouseover', (d,i) => {
                d3.selectAll('.median-area').style('opacity', .25);
                d3.selectAll('.max-area').style('opacity', .25);
                this.svg.select('.median-area').style('opacity', 1);
                this.svg.select('.max-area').style('opacity', 1);
            })    
            .on('mouseout', (d,i) => {
                d3.selectAll('.median-area').style('opacity', 1);
                d3.selectAll('.max-area').style('opacity', 1);
            })  
            
        this.defs = this.svg.append('defs')
            .append('mask')
            .attr('id', 'chart_mask')
        
        this.defs.append('circle')
            .attr('cx', config.width / 2 + this.margin.left)
            .attr('cy', config.height / 2 + this.margin.top)
            .attr('r', config.width / 2)
            .style('fill', 'white')
        
        this.segmentsWrapper = this.svg.append('g')
            .classed('segments-wrapper', true)
        
        this.nodesWrapper = this.svg.append('g')
            .classed('nodes-wrapper', true)
            .attr("mask", "url(#chart_mask)")
        
        this.areasWrapper = this.svg.append('g')
            .classed('areas-wrapper', true)
            .attr("mask", "url(#chart_mask)")
        
        this.title = this.svg.append('g')
            .classed('title-wrapper', true)

        this.createSegments();
        this.createTitle();
        // this.switchData();
    }

    mergeHours(data) {
        let data_temp = data[0].hours.map((i,j) => {
            return i[0];
        })

        return data_temp;
    }

    mergeDays(data) {
        let data_temp = data.map((i,j) => {
            return i.days;
        })

        var selected_keys = ['name', 'min', 'max', 'median', 'mean'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let sum = [{}, {}, {}, {}, {}, {}, {}];

        data_temp.forEach(month => {
            month.forEach((day, i) => {
                let day_current = day['day'];
                selected_keys.forEach(key => {

                    if (day[key] == undefined) {
                        day[key] = 0;
                    }

                    if (key == 'name') {
                        sum[i][key] = day[key];
                    } else {
                        sum[i][key] = (sum[i][key] || 0) + day[key];
                    }

                });
            })
        })

        sum.forEach(day => {
            day.min = Math.round(day.min / 12);
            day.max = Math.round(day.max / 12);
            day.median = Math.round(day.median / 12);
            day.mean = Math.round(day.mean / 12);
        })

        return sum;
    }

    createSegments() {
        for (let index = 0; index < this.levels; index++) {
            let radius = this.factor*Math.min(this.width/2, this.height/2);
            let level_factor = this.factor * radius * ((index + 1) / this.levels)

            this.segmentsWrapper.selectAll('.levels')
                .data(this.all_axis)
                .enter()
                .append('svg:line')
                .attr('x1', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.sin(i*this.radians/this.total));
                    return polar_coord;
                 })
                .attr('y1', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.cos(i*this.radians/this.total))
                    return polar_coord
                 })
                .attr('x2', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.sin((i+1)*this.radians/this.total));
                    return polar_coord
                 })
                .attr('y2', (d,i) => {
                    let polar_coord = level_factor * (this.factor*Math.cos((i+1)*this.radians/this.total));
                    return polar_coord
                 })
                .attr("class", "line")
                .style('stroke', '#E8E8E8')
                .style("stroke-opacity", "1px")
                .style("stroke-width", "1px")
                .attr('transform', `translate( ${this.width/2 + this.margin.left}, ${this.height/2  + this.margin.top})`)
        }
        this.createAxis();
    }
        
    createAxis() {
        let data_axis, dict_axis;

        this.month_dict = {
            0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'Mai', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Okt', 10: 'Nov', 11: 'Dec'
        }

        this.month_dict_long = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        }

        this.day_dict = { 0: '12', 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24' }

        this.week_dict = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

        if (this.type == 'week') {
            data_axis = this.all_axis_week;
            dict_axis = this.week_dict;
        } else if (this.type == 'month') {
            data_axis = this.all_axis;
            dict_axis = this.month_dict;
        } else if (this.type == 'day') {
            data_axis = this.all_axis_day;
            dict_axis = this.day_dict;
        };



        this.axis = this.segmentsWrapper.selectAll('.axis')
            .data(data_axis)
            .enter()
            .append('g')
            .classed('axis', true)
        
        this.axis.append('line')
            .attr('x1', (this.margin.left))
            .attr('y1', (this.margin.top))
            .attr('x2', (d,i) => { 
                return (this.width / 2) * (this.factor * Math.sin(i  * this.radians / this.total)) + this.margin.left;
            })
            .attr('y2', (d,i) => { 
                return (this.height / 2) * (this.factor * Math.cos (i * this.radians / this.total)) + this.margin.top;
            })
            .attr("class", "line")
            .style('stroke', '#E8E8E8')
            .style("stroke-width", "1px")
            .attr('transform', `translate( ${this.width/2 }, ${this.height/2 })`)
        
        this.axis.append('text')
            .text((d,i) => { 
                return dict_axis[d]})
            .attr("text-anchor", "middle")
            .attr('class', (d,i) => {
                return `legend-${i} legend`
            })
            .attr('id', (d,i) => { return i })
            .attr('x', (d,i) => {
                return (this.width / 2) * (this.factor * Math.sin(i * this.radians / this.total)) + 13 * (this.factor * Math.sin(i * this.radians / this.total)) + this.margin.left;
            })
            .attr('y', (d,i) => {
                return (this.height / 2) * (this.factor * Math.cos (i * this.radians / this.total)) + 13 * (this.factor * Math.cos(i * this.radians / this.total)) + this.margin.top + 4;
            })
            .attr('transform', `translate(${this.width/2 }, ${this.height/2 })`)
            .on('mouseover', (d,i) => {
                this.updateTooltip(d, i);
                this.highlightMonths(this.data, this.category, i);
            })
            .on('mouseout', (d,i) => {
                this.tooltip
                    .attr('style', 'display: none')
                this.unhighlightMonths(d, this.category, i);
            })

            this.createGraphics();
    }

    createCircles(category, color) {
        this.node_coords[category] = [];
        this.circles[category] = this.nodesWrapper.selectAll(`.${category}-circle`);
            
        this.updateCircles(category, color);
        this.createAreas(this.node_coords[category], color, category);
    }

    createAreas(data, color, category) {
        this.areas[category] = this.areasWrapper.selectAll(`.${category}-area`);
        this.updateAreas(this.node_coords[category], color, category);
    }

    createGraphics() {
        this.createCircles('max', this.colorMax);
        this.createCircles('median', this.colorMean);
    }

    createTitle() {
        d3.json('assets/names_dict.json').then(data => {
            this.titleName = data[this.station_name];
            this.title.append('text')
                .text(this.titleName)
                .classed('title', true)
        })
    }

    updateTooltip(data, index) {

        if (this.data[data] != undefined) {

            let x = d3.event.pageX + 10;
            let y = d3.event.pageY + 10;

            let data_timeslot = this.type == 'day' ? `${this.day_dict[index]} Uhr` : this.month_dict_long[index];

            this.tooltip = d3.select('#tooltip');

            if (this.data[data] != undefined) {
                d3.select('.station-wrapper').text(this.titleName);
                d3.select('.month-wrapper').text(data_timeslot);
                d3.select('.year-wrapper').text(this.year);
                d3.select('#median-value').text(this.data[data].median).style('color', this.colorMean);
                d3.select('#max-value').text(this.data[data].max).style('color', this.colorMax);
                d3.select('#total-value').text(this.data[data].sum_days);

                if (this.data.length == 7 || this.data.length == 24) {
                    d3.select('.total').style('display', 'none');
                } else {
                    d3.select('.total').style('display', 'flex');
                }
            }

            if (this.type == 'day') {
                d3.select('.year-wrapper').style('display', 'none');
            }

            this.tooltip
                .attr('style', `left: ${x}px; top: ${y}px; position: absolute`)
                .classed('active', true)
            }
    }

    updateGraphics(new_data, config_new) {
        this.type = config_new.type;
        this.range = config_new.range;
        this.value_metric = config_new.value_metric;

        if(this.type == "week") {
            this.data = this.mergeDays(new_data);
        } else if (this.type == "day") {
            this.data = this.mergeHours(new_data);
        } else {
            this.data = new_data;
        }

        this.max_local = this.calcMaxLocal(this.data);

        if (this.value_metric == 'relative max') {
            this.max_value = this.max_local.max;
        } else if (this.value_metric == 'relative median') {
            this.max_value = this.max_local.median;
        } else if (this.value_metric == 'absolute') {
            this.max_value = config.max_value;
        }


        this.updateCircles('median', '#00ffa2');
        this.updateCircles('max', '#004466');
    }

    calcMaxLocal(data_obj) {
        let max_local_object = {
            min: [],
            max: [],
            mean: [],
            median: []
        };

        data_obj.forEach(timeslot => {
            max_local_object['min'].push(timeslot['min']);
            max_local_object['max'].push(timeslot['max']);
            max_local_object['mean'].push(timeslot['mean']);
            max_local_object['median'].push(timeslot['median']);
        })

        for (const key in max_local_object) {
            max_local_object[key] = d3.max(max_local_object[key]);
        }
        return max_local_object;
    }

    updateAreas(data, color, category) {
        this.areas[category] = this.areasWrapper.selectAll(`.${category}-area`)
            .data([data])
        
        this.areas[category].exit().remove()

        this.areas[category] = this.areas[category]
            .enter()
            .append('polygon')
            .classed(`${category}-area`, true)
            .style("stroke-width", "2px")
            .style('fill', color)
            .merge(this.areas[category]);

        this.areas[category]
            .transition()
            .duration(500)
            .attr('points', d => {
                let str = "";
                for(var pti=0;pti<d.length;pti++) {
                    str = str+d[pti][0]+","+d[pti][1]+" ";
                }
                return str;
            })
            .attr('transform', `translate( ${(this.width/2 + this.margin.left) - this.factor}, ${(this.height/2 + this.margin.top)  - this.factor})`)
    }

    highlightMonths(data, category, index_current) {
        let index = data.month;
        d3.selectAll('.legend').classed('highlighted', d => {
            if (data.month != undefined) {
                return d == data.month ? true : false; 
            } else {
                return index_current == d ? true : false;
            }
        }).classed('hovered', false);

        d3.selectAll(`.mean-circle`).classed('highlighted', (d,i) => {
                return d.month == index_current ? true : false;
        })

        d3.selectAll(`.max-circle`).classed('highlighted', (d,i) => {
                return d.month == index_current ? true : false;
        })
    }

    highlightAll(index) {
        d3.selectAll('.legend').classed('highlighted', false);
        d3.selectAll(`.wrapper-${index}`).selectAll('.legend').classed('hovered', true);
    }

    unhighlightAll(index) {
        d3.selectAll(`.wrapper-${index}`).selectAll('.legend').classed('hovered', false);
    }

    unhighlightMonths(data, category, index_current) {
        let index = data.month;
        d3.selectAll('.legend').classed('highlighted', d => {
            return d == data.month ? false : false; 
        });

        d3.selectAll(`.mean-circle`).classed('highlighted', (d,i) => {
            return d.month == index_current ? false : false;
        })

        d3.selectAll(`.max-circle`).classed('highlighted', (d,i) => {
                return d.month == index_current ? false : false;
        })
    }

    updateCircles(category, color) {
        this.node_coords = {'median':[], 'max':[]};
        this.category = category;

        this.circles[category]  = this.nodesWrapper.selectAll(`.${category}-circle`)
            .data(this.data)

        this.circles[category].exit().remove()

        this.circles[category] = this.circles[category]
            .enter()
            .append('svg:circle')
            .classed(`${category}-circle`, true)
            .attr('class', (d,i) => { return `${category}-circle circle-${i}` })
            .attr('fill', color)
            .attr('r', this.radius)
            .on('mouseover', (d,i) => {
                this.updateTooltip(d);
                this.highlightMonths(d, category, i);
            })
            .on('mouseout', (d,i) => {
                this.tooltip
                    .attr('style', 'display: none')
                this.unhighlightMonths(d,category, i);
            })
            .merge(this.circles[category]);
        
        this.circles[category]
            .transition()
            .duration(500)
            .attr('cx', (d,i) => {
                // console.log(d);
                if (d != undefined) {
                    let polar_coord_x = (this.width / 2) * (d[category] / this.max_value) * this.factor * Math.sin(i*this.radians / this.total);
                    let polar_coord_y = (this.height / 2) * (d[category] / this.max_value) * this.factor * Math.cos(i*this.radians / this.total);
    
                    polar_coord_x = isNaN(polar_coord_x) ? 0 : polar_coord_x;
                    polar_coord_y = isNaN(polar_coord_y) ? 0 : polar_coord_y;
    
                    let single_coord = [];
                    single_coord.push(polar_coord_x);
                    single_coord.push(polar_coord_y);
    
                    this.node_coords[category].push(single_coord);
    
                    return polar_coord_x
                }
            })
            .attr("cy", (d,i) => {
                if (d != undefined) {
                    let polar_coord = this.height / 2 * (d[category] / this.max_value)*this.factor* Math.cos(i*this.radians/this.total);
                    // console.log((d[category] / this.max_value));
                    polar_coord = isNaN(polar_coord) ? 0 : polar_coord;
                    return polar_coord;
                }
            })
            .attr('transform', `translate( ${(this.width/2 + this.margin.left) - this.factor}, ${(this.height/2 + this.margin.top)  - this.factor})`)

            
            this.updateAreas(this.node_coords[category], color, category);
    }

}