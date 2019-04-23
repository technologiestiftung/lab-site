class Radarchart{constructor(t,i){this.width=i.width,this.container=i.container,this.height=i.height,this.levels=i.levels,this.radius=i.radius,this.factor=i.factor,this.type=i.type,this.config=i,this.margin=i.margin,this.max_value=i.max_value,this.factor_legend=i.factor_legend,this.station_name,this.tooltip,this.month_dict,this.month_dict_long,this.all_axis_week,this.circles={},this.updateCount=0,this.areas={},this.category,this.titleName,this.year,this.colorMax,this.colorMean,this.range,this.defs,this.week_dict_long,this.days_dict={Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6},this.file=t,this.local_max,this.value_metric,this.radians=-2*Math.PI,this.segmentsWrapper,this.nodesWrapper,this.areasWrapper,this.data,this.svg,this.all_axis_month,this.all_axis_week,this.all_axis_hour,this.axis,this.title,this.total,this.node_coords={median:[],max:[]},this.init=this.init.bind(this),this.createSegments=this.createSegments.bind(this),this.createAxis=this.createAxis.bind(this),this.createCircles=this.createCircles.bind(this),this.createAreas=this.createAreas.bind(this),this.createGraphics=this.createGraphics.bind(this),this.createTitle=this.createTitle.bind(this),this.updateTooltip=this.updateTooltip.bind(this),this.updateCircles=this.updateCircles.bind(this),this.updateGraphics=this.updateGraphics.bind(this),this.calcMaxLocal=this.calcMaxLocal.bind(this),this.highlightMonths=this.highlightMonths.bind(this),this.unhighlightMonths=this.unhighlightMonths.bind(this),this.highlightAll=this.highlightAll.bind(this),this.unhighlightAll=this.unhighlightAll.bind(this),this.mergeHours=this.mergeHours.bind(this)}init(t,i){let e=[{sum:0,max:0,median:0}];this.type=this.config.type,"Woche"==this.type?(null!=this.file[0]?this.data=this.file[0].days:this.data=e,config.max_value=1e4):"Wochentage"==this.type?(null!=this.file[0]?this.data=this.file[0].hoursWeekdays:this.data=e,config.max_value=800):"Monat"==this.type?(null!=this.file[0]?this.data=this.file[0].months:this.data=e,config.max_value=1e4):"Wochenenden"==this.type&&(null!=this.file[0]?this.data=this.file[0].hoursWeekends:this.data=e,config.max_value=800),this.station_name=i,this.value_metric=config.value_metric,this.all_axis_month=[0,1,2,3,4,5,6,7,8,9,10,11],this.all_axis_week=[0,1,2,3,4,5,6],this.all_axis_hour=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],this.year=config.year,"Woche"==this.type?(this.total=this.all_axis_week.length,this.all_axis=this.all_axis_week):"Wochentage"==this.type||"Wochenenden"==this.type?(this.total=this.all_axis_hour.length,this.all_axis=this.all_axis_hour):"Monat"==this.type&&(this.total=this.all_axis_month.length,this.all_axis=this.all_axis_month),this.colorMax="#3ce39f",this.colorMean="#2824b2",this.max_local=this.calcMaxLocal(this.data),"Relativ Max"==this.value_metric?this.max_value=this.max_local.max:"Relativ Median"==this.value_metric?this.max_value=this.max_local.median:"Absolut"==this.value_metric&&(this.max_value=config.max_value),this.svg=d3.select(`svg.wrapper-${t}`).on("mouseover",(t,i)=>{d3.selectAll(".median-area").style("opacity",.8),d3.selectAll(".max-area").style("opacity",.8),d3.selectAll(".median-circle").style("opacity",1),d3.selectAll(".max-circle").style("opacity",1)}).on("mouseout",(t,i)=>{d3.selectAll(".median-area").style("opacity",.8),d3.selectAll(".max-area").style("opacity",.8),d3.selectAll(".median-circle").style("opacity",1),d3.selectAll(".max-circle").style("opacity",1)}),this.defs=this.svg.append("defs").append("mask").attr("id",`chart_mask-${t}`),this.defs.append("circle").attr("cx",this.width/2+this.margin.left).attr("cy",this.height/2+this.margin.top).attr("r",this.width/2).style("fill","white").style("stroke","black").style("stroke-width","1px"),this.segmentsWrapper=this.svg.append("g").classed("segments-wrapper",!0),this.areasWrapper=this.svg.append("g").classed("areas-wrapper",!0).attr("mask",`url(#chart_mask-${t})`),this.nodesWrapper=this.svg.append("g").classed("nodes-wrapper",!0).attr("mask",`url(#chart_mask-${t})`),this.title=this.svg.append("g").classed("title-wrapper",!0),this.createSegments(),this.createTitle()}mergeHours(t){return t[0].hours.map((t,i)=>t[0])}createSegments(){for(let t=0;t<this.levels;t++){let i=this.factor*Math.min(this.width/2,this.height/2),e=this.factor*i*((t+1)/this.levels);this.segmentsWrapper.selectAll(".levels").data(this.all_axis).enter().append("svg:line").attr("x1",(t,i)=>{return e*(this.factor*Math.sin(i*this.radians/this.total+Math.PI))}).attr("y1",(t,i)=>{return e*(this.factor*Math.cos(i*this.radians/this.total+Math.PI))}).attr("x2",(t,i)=>{return e*(this.factor*Math.sin((i+1)*this.radians/this.total+Math.PI))}).attr("y2",(t,i)=>{return e*(this.factor*Math.cos((i+1)*this.radians/this.total+Math.PI))}).attr("class","line").style("stroke","#E0E0E0").style("stroke-opacity","1px").style("stroke-width","1px").attr("transform",`translate( ${this.width/2+this.margin.left}, ${this.height/2+this.margin.top})`)}this.createAxis()}createAxis(){let t,i;this.month_dict={0:"Jan",1:"Feb",2:"Mär",3:"Apr",4:"Mai",5:"Jun",6:"Jul",7:"Aug",8:"Sep",9:"Okt",10:"Nov",11:"Dez"},this.month_dict_long={0:"Januar",1:"Februar",2:"März",3:"April",4:"Mai",5:"Juni",6:"Juli",7:"August",8:"September",9:"Oktober",10:"November",11:"Dezember"},this.day_dict={0:"24",1:"01",2:"02",3:"03",4:"04",5:"05",6:"06",7:"07",8:"08",9:"09",10:"10",11:"11",12:"12",13:"13",14:"14",15:"15",16:"16",17:"17",18:"18",19:"19",20:"20",21:"21",22:"22",23:"23",24:"24"},this.week_dict={0:"So",1:"Mo",2:"Di",3:"Mi",4:"Do",5:"Fr",6:"Sa"},this.week_dict_long={0:"Sonntage",1:"Montage",2:"Dienstage",3:"Mittwoche",4:"Donnerstage",5:"Freitage",6:"Samstage"},"Woche"==this.type?(t=this.all_axis_week,i=this.week_dict):"Monat"==this.type?(t=this.all_axis,i=this.month_dict):"Wochentage"!=this.type&&"Wochenenden"!=this.type||(t=this.all_axis_hour,i=this.day_dict),this.axis=this.segmentsWrapper.selectAll(".axis").data(t).enter().append("g").classed("axis",!0),this.axis.append("line").attr("x1",this.margin.left).attr("y1",this.margin.top).attr("x2",(t,i)=>this.width/2*(this.factor*Math.sin(i*this.radians/this.total+Math.PI))+this.margin.left).attr("y2",(t,i)=>this.height/2*(this.factor*Math.cos(i*this.radians/this.total+Math.PI))+this.margin.top).attr("class","line").style("stroke","#E0E0E0").style("stroke-width","1px").attr("transform",`translate( ${this.width/2}, ${this.height/2})`),this.axis.append("text").text((t,e)=>i[t]).attr("text-anchor","middle").attr("class",(t,i)=>`legend-${i} legend`).attr("id",(t,i)=>i).attr("x",(t,i)=>this.width/2*(this.factor*Math.sin(i*this.radians/this.total+Math.PI))+this.factor*Math.sin(i*this.radians/this.total+Math.PI)*13+this.margin.left).style("z-index",1e8).attr("y",(t,i)=>this.height/2*(this.factor*Math.cos(i*this.radians/this.total+Math.PI))+this.factor*Math.cos(i*this.radians/this.total+Math.PI)*13+this.margin.top+4).attr("transform",`translate(${this.width/2}, ${this.height/2})`).on("mouseover",(t,i)=>{this.updateTooltip(t,i),this.highlightMonths(this.data,this.category,i)}).on("mouseout",(t,i)=>{this.tooltip.attr("style","display: none"),this.unhighlightMonths(t,this.category,i)}),this.createGraphics()}createCircles(t,i){this.node_coords[t]=[],this.circles[t]=this.nodesWrapper.selectAll(`.${t}-circle`),this.updateCircles(t,i),this.createAreas(this.node_coords[t],i,t)}createAreas(t,i,e){this.areas[e]=this.areasWrapper.selectAll(`.${e}-area`),this.updateAreas(this.node_coords[e],i,e)}createGraphics(){this.createCircles("max",this.colorMax),this.createCircles("median",this.colorMean)}createTitle(){d3.json("../assets/names_dict.json").then(t=>{this.titleName=t[this.station_name],this.title.append("text").text(this.titleName).classed("title",!0)}).catch(t=>{throw console.log(303),t}),this.svg.select(".title-wrapper").attr("transform",`translate(${(this.width+this.margin.left+this.margin.right)/2},${this.height+this.margin.top+this.margin.bottom-10})`)}updateTooltip(t,i){const e=window.innerWidth,s=window.innerHeight;if(null!=this.data[t]){let a,h=d3.event.pageX+10,l=d3.event.pageY+10;e-h<150&&(h=d3.event.pageX-175),s-l<150&&(l=d3.event.pageY-125),console.log(this.type),a="Wochentage"==this.type||"Wochenenden"==this.type?this.day_dict[i]+" Uhr":"Woche"==this.type?this.week_dict_long[i]:this.month_dict_long[i],this.tooltip=d3.select("#tooltip"),null!=this.data[t]&&(d3.select(".station-wrapper").text(this.titleName),d3.select(".month-wrapper").text(a),d3.select(".year-wrapper").text(this.year),d3.select("#median-value").text(this.data[t].median).style("color",this.colorMean),d3.select("#max-value").text(this.data[t].max).style("color",this.colorMax),d3.select("#total-value").text(this.data[t].sum),7==this.data.length||24==this.data.length?d3.select(".total").style("display","none"):d3.select(".total").style("display","flex")),"Wochentage"!=this.type&&"Wochenenden"!=this.type||d3.select(".year-wrapper").style("display","none"),this.tooltip.attr("style",`left: ${h}px; top: ${l}px; position: absolute`).classed("active",!0)}}updateGraphics(t,i){this.type=i.type,this.range=i.range,this.value_metric=i.value_metric;let e=[{sum:0,max:0,median:0}];"Woche"==this.type?(null!=t[0]?this.data=t[0].days:this.data=e,config.max_value=1e4):"Wochentage"==this.type?(null!=t[0]?this.data=t[0].hoursWeekdays:this.data=e,config.max_value=800):"Monat"==this.type?(null!=t[0]?this.data=t[0].months:this.data=e,config.max_value=1e4):"Wochenenden"==this.type&&(null!=t[0]?this.data=t[0].hoursWeekends:this.data=e,config.max_value=800),this.max_local=this.calcMaxLocal(this.data),"Relativ Max"==this.value_metric?this.max_value=this.max_local.max:"Relativ Median"==this.value_metric?this.max_value=this.max_local.median:"Absolut"==this.value_metric&&(this.max_value=config.max_value),this.updateCircles("median","#00ffa2"),this.updateCircles("max","#004466")}calcMaxLocal(t){let i={min:[],max:[],mean:[],median:[]};t.forEach(t=>{i.min.push(t.min),i.max.push(t.max),i.mean.push(t.mean),i.median.push(t.median)});for(const t in i)i[t]=d3.max(i[t]);return i}updateAreas(t,i,e){this.areas[e]=this.areasWrapper.selectAll(`.${e}-area`).data([t]),this.areas[e].exit().remove(),this.areas[e]=this.areas[e].enter().append("polygon").classed(`${e}-area`,!0).style("stroke-width","1px").style("stroke",i).style("fill",i).style("fill-opacity",.75).merge(this.areas[e]),this.areas[e].transition().duration(500).attr("points",t=>{let i="";for(var e=0;e<t.length;e++)i=i+t[e][0]+","+t[e][1]+" ";return i}).attr("transform",`translate( ${this.width/2+this.margin.left-this.factor}, ${this.height/2+this.margin.top-this.factor})`)}highlightMonths(t,i,e){t.month;d3.selectAll(".legend").classed("highlighted",i=>null!=t.month?i==t.month:e==i).classed("hovered",!1),d3.selectAll(".mean-circle").classed("highlighted",(t,i)=>t.month==e),d3.selectAll(".max-circle").classed("highlighted",(t,i)=>t.month==e)}highlightAll(t){d3.selectAll(".legend").classed("highlighted",!1),d3.selectAll(`.wrapper-${t}`).selectAll(".legend").classed("hovered",!0)}unhighlightAll(t){d3.selectAll(`.wrapper-${t}`).selectAll(".legend").classed("hovered",!1)}unhighlightMonths(t,i,e){t.month;d3.selectAll(".legend").classed("highlighted",i=>(t.month,!1)),d3.selectAll(".mean-circle").classed("highlighted",(t,i)=>(t.month,!1)),d3.selectAll(".max-circle").classed("highlighted",(t,i)=>(t.month,!1))}updateCircles(t,i){this.node_coords={median:[],max:[]},this.category=t,this.circles[t]=this.nodesWrapper.selectAll(`.${t}-circle`).data(this.data),this.circles[t].exit().remove(),this.circles[t]=this.circles[t].enter().append("svg:circle").classed(`${t}-circle`,!0).attr("class",(i,e)=>`${t}-circle circle-${e}`).attr("fill",i).attr("r",this.radius).on("mouseover",(i,e)=>{this.updateTooltip(i),this.highlightMonths(i,t,e)}).on("mouseout",(i,e)=>{this.tooltip.attr("style","display: none"),this.unhighlightMonths(i,t,e)}).merge(this.circles[t]),this.circles[t].transition().duration(500).attr("cx",(i,e)=>{if(null!=i){let s=this.width/2*(i[t]/this.max_value)*this.factor*Math.sin(e*this.radians/this.total+Math.PI),a=this.height/2*(i[t]/this.max_value)*this.factor*Math.cos(e*this.radians/this.total+Math.PI);s=isNaN(s)?0:s,a=isNaN(a)?0:a;let h=[];return h.push(s),h.push(a),this.node_coords[t].push(h),s}}).attr("cy",(i,e)=>{if(null!=i){let s=this.height/2*(i[t]/this.max_value)*this.factor*Math.cos(e*this.radians/this.total+Math.PI);return s=isNaN(s)?0:s}}).attr("transform",`translate( ${this.width/2+this.margin.left-this.factor}, ${this.height/2+this.margin.top-this.factor})`),this.updateAreas(this.node_coords[t],i,t)}}