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
        this.station_name, this.tooltip, this.month_dict, this.month_dict_long, this.all_axis_week, this.circles = {}, this.updateCount = 0, this.areas = {}, this.category, this.titleName, this.year, this.colorMax, this.colorMean
        this.days_dict = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }

        this.file = file, this.type, this.local_max, this.value_metric;
        this.radians = 2 * Math.PI;
        this.segmentsWrapper, this.nodesWrapper, this.areasWrapper
        this.data, this.svg, this.all_axis, this.axis, this.title
        this.total, this.node_coords = {'mean':[], 'max':[]};

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
    }

    init(station_index) {
        this.type = config.type;
        this.data = this.type == "week" ? this.mergeDays(this.file) : this.file;
        this.station_name = this.file[0].name;
        this.all_axis = (this.data.map((i,j) => {return i.month}));
        this.all_axis_week = [0,1,2,3,4,5,6];
        this.year = config.year;
        this.total = config.type == 'week' ? this.all_axis_week.length : this.all_axis.length;
        this.colorMax = "#3ce39f"
        this.colorMean = "#2824b2"

        this.svg = d3.select(`svg.wrapper-${station_index}`)
            .on('mouseover', (d,i) => {
                d3.selectAll('.mean-area').style('opacity', .15);
                d3.selectAll('.max-area').style('opacity', .15);
                this.svg.select('.mean-area').style('opacity', 1);
                this.svg.select('.max-area').style('opacity', 1);
            })    
            .on('mouseout', (d,i) => {
                d3.selectAll('.mean-area').style('opacity', .5);
                d3.selectAll('.max-area').style('opacity', .5);
            })    
        
        this.segmentsWrapper = this.svg.append('g')
            .classed('segments-wrapper', true)
        
        this.nodesWrapper = this.svg.append('g')
            .classed('nodes-wrapper', true)
        
        this.areasWrapper = this.svg.append('g')
            .classed('areas-wrapper', true)
        
        this.title = this.svg.append('g')
            .classed('title-wrapper', true)

        this.createSegments();
        this.createTitle();
        // this.switchData();
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
        let data_axis = this.type == 'week' ? this.all_axis_week : this.all_axis;

        this.month_dict = {
            0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'Mai', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Okt', 10: 'Nov', 11: 'Dec'
        }

        this.month_dict_long = {
            0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'
        }

        this.week_dict = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

        let dict_axis = this.type == 'week' ? this.week_dict : this.month_dict;

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
            .text(d => { 
                // console.log(d);
                return dict_axis[d]})
            .attr("text-anchor", "middle")
            .attr('class', (d,i) => {
                return `legend-${i} legend`
            })
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
        this.createCircles('mean', this.colorMean);
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
        let x = d3.event.pageX + 10;
        let y = d3.event.pageY + 10;

        this.tooltip = d3.select('#tooltip');

        d3.select('.station-wrapper').text(this.titleName);
        d3.select('.month-wrapper').text(this.month_dict_long[index]);
        d3.select('.year-wrapper').text(this.year);
        d3.select('#median-value').text(this.data[index].median).style('color', this.colorMean);
        d3.select('#max-value').text(this.data[index].max).style('color', this.colorMax);
        d3.select('#total-value').text(this.data[index].sum_days);

        this.tooltip
            .attr('style', `left: ${x}px; top: ${y}px; position: absolute`)
            .classed('active', true)
    }

    updateGraphics(new_data, config_new) {
        this.type = config_new.type;
        this.value_metric = config_new.value_metric;
        this.data = new_data;
        this.max_local = this.calcMaxLocal(this.data);

        if (this.value_metric == 'relative') {
            this.max_value = this.max_local.max;
        } else if (this.value_metric == 'absolute') {
            this.max_value = config.max_value;
        }


        this.updateCircles('max', '#004466');
        this.updateCircles('mean', '#00ffa2');
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

    updateAreas(data, color, category, index_current) {
        this.areas[category] = this.areasWrapper.selectAll(`.${category}-area area ${index_current}-area`)
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
        this.node_coords = {'mean':[], 'max':[]};
        this.category = category;
        let index_current

        this.circles[category] = this.nodesWrapper.selectAll(`.${category}-circle`)
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
                let polar_coord_x = (this.width / 2) * (d[category] / this.max_value) * this.factor * Math.sin(i*this.radians / this.total);
                let polar_coord_y = (this.height / 2) * (d[category] / this.max_value) * this.factor * Math.cos(i*this.radians / this.total);

                let single_coord = [];
                single_coord.push(polar_coord_x);
                single_coord.push(polar_coord_y);
                this.node_coords[category].push(single_coord);

                return polar_coord_x
            })
            .attr("cy", (d,i) => {
                let polar_coord = this.height / 2 * (d[category] / this.max_value)*this.factor* Math.cos(i*this.radians/this.total);
                return polar_coord;
            })
            .attr('transform', `translate( ${(this.width/2 + this.margin.left) - this.factor}, ${(this.height/2 + this.margin.top)  - this.factor})`)
            
            
            this.updateAreas(this.node_coords[category], color, category, index_current);
    }

}