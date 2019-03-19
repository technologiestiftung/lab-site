class Radarchart {
    constructor(file, config) {
        this.width = config.width;
        this.container = config.container;
        this.height = config.height;
        this.levels = config.levels;
        this.radius = config.radius;
        this.factor = config.factor;
        this.type = config.type;
        this.config = config;
        this.margin = config.margin;        
        this.max_value = config.max_value;
        this.factor_legend = config.factor_legend;
        this.station_name, this.tooltip, this.month_dict, this.month_dict_long, this.all_axis_week, this.circles = {}, this.updateCount = 0, this.areas = {}, this.category, this.titleName, this.year, this.colorMax, this.colorMean, this.range, this.defs, this.week_dict_long
        this.days_dict = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 },

        this.file = file, this.local_max, this.value_metric;
        this.radians = -2 * Math.PI;
        this.segmentsWrapper, this.nodesWrapper, this.areasWrapper
        this.data, this.svg, this.all_axis_month, this.all_axis_week, this.all_axis_hour, this.axis, this.title
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
        this.calcMaxLocal = this.calcMaxLocal.bind(this);
        this.highlightMonths = this.highlightMonths.bind(this);
        this.unhighlightMonths = this.unhighlightMonths.bind(this);
        this.highlightAll = this.highlightAll.bind(this);
        this.unhighlightAll = this.unhighlightAll.bind(this);
        this.mergeHours = this.mergeHours.bind(this);
    }

    init(station_index, name) {

        let placeholder_data = [{
            'sum': 0,
            'max': 0,
            'median': 0
        }]
        
        this.type = this.config.type;

        if(this.type == 'Woche') {
            if(this.file[0] != undefined) {
                this.data = this.file[0].days;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 10000;
        } else if (this.type == 'Wochentage') {
            if(this.file[0] != undefined) {
                this.data = this.file[0].hoursWeekdays;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 800;
        } else if (this.type == 'Monat') {
            if(this.file[0] != undefined) {
                this.data = this.file[0].months;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 10000;
        } else if (this.type == 'Wochenenden') {
            if(this.file[0] != undefined) {
                this.data = this.file[0].hoursWeekends;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 800;
        }

        this.station_name = name;
        this.value_metric = config.value_metric;
        this.all_axis_month = [0,1,2,3,4,5,6,7,8,9,10,11];
        this.all_axis_week = [0,1,2,3,4,5,6];
        this.all_axis_hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        this.year = config.year;

        if (this.type == 'Woche') {
            this.total = this.all_axis_week.length
            this.all_axis = this.all_axis_week;
        } else if (this.type == 'Wochentage' || this.type == 'Wochenenden') {
            this.total = this.all_axis_hour.length
            this.all_axis = this.all_axis_hour;
        } else if (this.type == 'Monat') {
            this.total = this.all_axis_month.length
            this.all_axis = this.all_axis_month;
        }

        this.colorMax = "#3ce39f";
        this.colorMean = "#2824b2";
        
        this.max_local = this.calcMaxLocal(this.data);

        if (this.value_metric == 'Relativ Max') {
            this.max_value = this.max_local.max;
        } else if (this.value_metric == 'Relativ Median') {
            this.max_value = this.max_local.median;
        } else if (this.value_metric == 'Absolut') {
            this.max_value = config.max_value;
        }
        

        this.svg = d3.select(`svg.wrapper-${station_index}`)
            .on('mouseover', (d,i) => {
                d3.selectAll('.median-area').style('opacity', .8);
                d3.selectAll('.max-area').style('opacity', .8);
                d3.selectAll('.median-circle').style('opacity', 1);
                d3.selectAll('.max-circle').style('opacity', 1);
            })    
            .on('mouseout', (d,i) => {
                d3.selectAll('.median-area').style('opacity', .8);
                d3.selectAll('.max-area').style('opacity', .8);
                d3.selectAll('.median-circle').style('opacity', 1);
                d3.selectAll('.max-circle').style('opacity', 1);
            })  
            
        this.defs = this.svg.append('defs')
            .append('mask')
            .attr('id', `chart_mask-${station_index}`)
        
        this.defs.append('circle')
            .attr('cx', this.width / 2 + this.margin.left) //  
            .attr('cy', this.height / 2 + this.margin.top) //  
            .attr('r', this.width / 2)
            .style('fill', 'white')
            .style('stroke', 'black')
            .style('stroke-width', '1px')
        
        this.segmentsWrapper = this.svg.append('g')
            .classed('segments-wrapper', true)
        
        this.areasWrapper = this.svg.append('g')
            .classed('areas-wrapper', true)
            .attr("mask", `url(#chart_mask-${station_index})`)
        
        this.nodesWrapper = this.svg.append('g')
            .classed('nodes-wrapper', true)
            .attr("mask", `url(#chart_mask-${station_index})`)
        
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

    createSegments() {
        for (let index = 0; index < this.levels; index++) {
            let radius = this.factor*Math.min(this.width/2, this.height/2);
            let level_factor = this.factor * radius * ((index + 1) / this.levels)

            this.segmentsWrapper.selectAll('.levels')
                .data(this.all_axis)
                .enter()
                .append('svg:line')
                .attr('x1', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.sin(i*this.radians/this.total + Math.PI));
                    return polar_coord;
                 })
                .attr('y1', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.cos(i*this.radians/this.total + Math.PI))
                    return polar_coord
                 })
                .attr('x2', (d,i) => { 
                    let polar_coord = level_factor * (this.factor*Math.sin((i+1)*this.radians/this.total + Math.PI));
                    return polar_coord
                 })
                .attr('y2', (d,i) => {
                    let polar_coord = level_factor * (this.factor*Math.cos((i+1)*this.radians/this.total + Math.PI));
                    return polar_coord
                 })
                .attr("class", "line")
                .style('stroke', '#E0E0E0')
                .style("stroke-opacity", "1px")
                .style("stroke-width", "1px")
                .attr('transform', `translate( ${this.width/2 + this.margin.left}, ${this.height/2  + this.margin.top})`)
        }
        this.createAxis();
    }
        
    createAxis() {
        let data_axis, dict_axis;

        this.month_dict = {
            0: 'Jan', 1: 'Feb', 2: 'Mär', 3: 'Apr', 4: 'Mai', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Okt', 10: 'Nov', 11: 'Dez'
        }

        this.month_dict_long = {
            0: 'Januar', 1: 'Februar', 2: 'März', 3: 'April', 4: 'Mai', 5: 'Juni', 6: 'Juli', 7: 'August', 8: 'September', 9: 'Oktober', 10: 'November', 11: 'Dezember'
        }

        this.day_dict = { 0: '24', 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24' }

        this.week_dict = { 0: 'So', 1: 'Mo', 2: 'Di', 3: 'Mi', 4: 'Do', 5: 'Fr', 6: 'Sa' }

        this.week_dict_long = { 0: 'Sonntage', 1: 'Montage', 2: 'Dienstage', 3: 'Mittwoche', 4: 'Donnerstage', 5: 'Freitage', 6: 'Samstage' }

        if (this.type == 'Woche') {
            data_axis = this.all_axis_week;
            dict_axis = this.week_dict;
        } else if (this.type == 'Monat') {
            data_axis = this.all_axis;
            dict_axis = this.month_dict;
        } else if (this.type == 'Wochentage' || this.type == 'Wochenenden') {
            data_axis = this.all_axis_hour;
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
                return (this.width / 2) * (this.factor * Math.sin(i  * this.radians / this.total + Math.PI)) + this.margin.left;
            })
            .attr('y2', (d,i) => { 
                return (this.height / 2) * (this.factor * Math.cos (i * this.radians / this.total + Math.PI)) + this.margin.top;
            })
            .attr("class", "line")
            .style('stroke', '#E0E0E0')
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
                return (this.width / 2) * (this.factor * Math.sin(i * this.radians / this.total + Math.PI)) + 13 * (this.factor * Math.sin(i * this.radians / this.total + Math.PI)) + this.margin.left;
            })
            .style('z-index', 100000000)
            .attr('y', (d,i) => {
                return (this.height / 2) * (this.factor * Math.cos (i * this.radians / this.total + Math.PI)) + 13 * (this.factor * Math.cos(i * this.radians / this.total + Math.PI)) + this.margin.top + 4;
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
        d3.json('../assets/names_dict.json').then(data => {
            this.titleName = data[this.station_name];
            this.title.append('text')
                .text(this.titleName)
                .classed('title', true)
        })

        this.svg.select('.title-wrapper')
            .style('transform', `translateY(${this.height + this.margin.top + this.margin.bottom - 10}px) translateX(${(this.width + this.margin.left + this.margin.right) / 2}px)`)
            // .style('transform', "translateY(125px) translateX(67px)")
        }

    updateTooltip(data, index) {

        const clientWidth = window.innerWidth;
        const clientHeight = window.innerHeight;

        if (this.data[data] != undefined) {

            let x = d3.event.pageX + 10;
            let y = d3.event.pageY + 10;

            if(clientWidth - x < 150) { x = d3.event.pageX - 175;};
            if(clientHeight - y < 150) { y = d3.event.pageY - 125;};

            let data_timeslot;

            console.log(this.type);

            if (this.type == 'Wochentage' || this.type == 'Wochenenden') {
                data_timeslot = this.day_dict[index] + ' Uhr';
            } else if (this.type == 'Woche') {
                data_timeslot = this.week_dict_long[index];
            } else {
                data_timeslot = this.month_dict_long[index];
            }

            this.tooltip = d3.select('#tooltip');

            if (this.data[data] != undefined) {
                d3.select('.station-wrapper').text(this.titleName);
                d3.select('.month-wrapper').text(data_timeslot);
                d3.select('.year-wrapper').text(this.year);
                d3.select('#median-value').text(this.data[data].median).style('color', this.colorMean);
                d3.select('#max-value').text(this.data[data].max).style('color', this.colorMax);
                d3.select('#total-value').text(this.data[data].sum);

                if (this.data.length == 7 || this.data.length == 24) {
                    d3.select('.total').style('display', 'none');
                } else {
                    d3.select('.total').style('display', 'flex');
                }
            }

            if (this.type == 'Wochentage' || this.type == 'Wochenenden') {
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

        let placeholder_data = [{
            'sum': 0,
            'max': 0,
            'median': 0
        }]

        if(this.type == 'Woche') {
            if(new_data[0] != undefined) {
                this.data = new_data[0].days;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 10000;
        } else if (this.type == 'Wochentage') {
            if(new_data[0] != undefined) {
                this.data = new_data[0].hoursWeekdays;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 800;
        } else if (this.type == 'Monat') {
            if(new_data[0] != undefined) {
                this.data = new_data[0].months;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 10000;
        } else if (this.type == 'Wochenenden') {
            if(new_data[0] != undefined) {
                this.data = new_data[0].hoursWeekends;
            } else {
                this.data = placeholder_data;
            }
            config.max_value = 800;
        }

        this.max_local = this.calcMaxLocal(this.data);

        if (this.value_metric == 'Relativ Max') {
            this.max_value = this.max_local.max;
        } else if (this.value_metric == 'Relativ Median') {
            this.max_value = this.max_local.median;
        } else if (this.value_metric == 'Absolut') {
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
            .style("stroke-width", "1px")
            .style("stroke", color)
            .style('fill', color)
            .style('fill-opacity', .75)
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
                if (d != undefined) {
                    let polar_coord_x = (this.width / 2) * (d[category] / this.max_value) * this.factor * Math.sin(i*this.radians / this.total + Math.PI);
                    let polar_coord_y = (this.height / 2) * (d[category] / this.max_value) * this.factor * Math.cos(i*this.radians / this.total + Math.PI);
    
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
                    let polar_coord = this.height / 2 * (d[category] / this.max_value)*this.factor* Math.cos(i*this.radians/this.total + Math.PI);
                    polar_coord = isNaN(polar_coord) ? 0 : polar_coord;
                    return polar_coord;
                }
            })
            .attr('transform', `translate( ${(this.width/2 + this.margin.left) - this.factor}, ${(this.height/2 + this.margin.top)  - this.factor})`)

            
            this.updateAreas(this.node_coords[category], color, category);

            
    }

}