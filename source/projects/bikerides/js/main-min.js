"use strict";var _config;function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var year_transformed,charts_wrapper,x,i,j,selElmnt,a,b,c,data_line,names_dict,filepath="../assets/all_years.json",filepath_v2="../assets/structure.json",values_array=["Skalierung","Absolut","Relativ Median","Relativ Max"],years_array=["Jahr",2017,2016,2015,2014,2013,2012],months_array=[0,1,2,3,4,5,6,7,8,9,10,11],types_array=["Zeitraum","Monat","Woche","Wochentage","Wochenenden"],year_value=2017,type_value="Monat",metric_value="Absolut",radarChart=[],radar_chart_week=[],wrapper_div=".polar-chart-wrapper",grid_dict=[{station:2,index:0,name:""},{station:3,index:1,name:""},{station:0,index:2,name:""},{station:1,index:3,name:"10-PA-BER-N"},{station:1,index:4,name:"10-PA-BER-S"},{station:0,index:5,name:""},{station:0,index:6,name:""},{station:1,index:7,name:"15-SP-KLO-N"},{station:0,index:8,name:""},{station:1,index:9,name:"27-RE-MAR"},{station:1,index:10,name:"12-PA-SCH"},{station:0,index:11,name:""},{station:0,index:12,name:""},{station:0,index:13,name:""},{station:1,index:14,name:"15-SP-KLO-S"},{station:1,index:15,name:"02-MI-JAN-N"},{station:1,index:16,name:"03-MI-SAN-W"},{station:1,index:17,name:"03-MI-SAN-O"},{station:0,index:18,name:""},{station:0,index:19,name:""},{station:0,index:20,name:""},{station:0,index:21,name:""},{station:1,index:22,name:"02-MI-JAN-S"},{station:1,index:23,name:"05-FK-OBB-W"},{station:1,index:24,name:"05-FK-OBB-O"},{station:1,index:25,name:"06-FK-FRA-W"},{station:1,index:26,name:"06-FK-FRA-O"},{station:0,index:27,name:""},{station:1,index:28,name:"13-CW-PRI"},{station:1,index:29,name:"18-TS-YOR-W"},{station:1,index:30,name:"18-TS-YOR-O"},{station:1,index:31,name:"19-TS-MON"},{station:1,index:32,name:"21-NK-MAY"},{station:1,index:33,name:"26-LI-PUP"},{station:1,index:34,name:"24-MH-ALB"},{station:0,index:35,name:""},{station:1,index:36,name:"17-SK-BRE-W"},{station:1,index:37,name:"17-SK-BRE-O"},{station:0,index:38,name:""},{station:1,index:39,name:"23-TK-KAI"},{station:0,index:40,name:""},{station:0,index:41,name:""},{station:0,index:42,name:""},{station:0,index:43,name:""},{station:1,index:44,name:"20-TS-MAR-N"},{station:1,index:45,name:"20-TS-MAR-S"},{station:0,index:46,name:""},{station:2,index:47,name:""},{station:3,index:48,name:""}],config=(_defineProperty(_config={width:180,year:2017,height:75},"width",75),_defineProperty(_config,"levels",5),_defineProperty(_config,"name",""),_defineProperty(_config,"radius",1),_defineProperty(_config,"value_metric","Relativ Max"),_defineProperty(_config,"factor",1),_defineProperty(_config,"type","Monat"),_defineProperty(_config,"month",0),_defineProperty(_config,"factor_legend",.85),_defineProperty(_config,"max_value",1e4),_defineProperty(_config,"margin",{left:30,right:30,top:18,bottom:42}),_config);function createWrapper(){charts_wrapper=d3.select(wrapper_div).append("div").classed("charts-wrapper",!0),createGrid()}function createTooltipLineChart(){var e=d3.select(".line-chart-wrapper").append("div").classed("tooltip-wrapper-line",!0).attr("id","tooltip-line-chart").style("display","none");e.append("div").classed("station-wrapper-line-chart",!0);var t=e.append("div").classed("time-wrapper-line-chart",!0);t.append("div").classed("month-wrapper-line-chart",!0),t.append("div").classed("year-wrapper-line-chart",!0)}function createTooltip(){var e=d3.select(wrapper_div).append("div").classed("tooltip-wrapper",!0).attr("id","tooltip").style("display","none");e.append("div").classed("station-wrapper",!0);var t=e.append("div").classed("time-wrapper",!0);t.append("div").classed("month-wrapper",!0),t.append("div").classed("year-wrapper",!0);var a=e.append("div").classed("values-wrapper",!0),n=a.append("div").classed("median",!0);n.append("span").text("Median:").classed("value-desc",!0),n.append("span").attr("id","median-value");var r=a.append("div").classed("max",!0);r.append("span").text("Max:").classed("value-desc",!0),r.append("span").attr("id","max-value");var i=a.append("div").classed("total",!0).classed("value-desc",!0);i.append("span").text("Total:"),i.append("span").attr("id","total-value")}function createIntroText(){var e=d3.select(wrapper_div).append("div").classed("intro-wrapper",!0);e.append("span").classed("intro-headline",!0).text("Wie verändert sich der Radverkehr in Berlin? "),e.append("span").text("Zeige unterschiedliche Rhythmen der Radfahrer im Datensatz durch Auswahl der Filter (z.B. Tages-, Wochen- und Jahresrhythmus):")}function createIntroTextLineChart(){var e=d3.select(".line-chart-wrapper").append("div").classed("intro-wrapper",!0);d3.select(".line-chart-wrapper").append("div").classed("chart-wrapper-line",!0).attr("id","stacked");e.append("span").classed("intro-headline",!0).text("Alle Radzählstellen im Vergleich"),e.append("span").text("Entdecke welche in welchem Jahr die Radzählstellen in Betrieb genommen worden sind und wie sich das jährliche Verkehrsaufkommen der Zählstellen verändert.")}function create_filter_ui(){createIntroText(),createIntroTextLineChart();var e=d3.select(wrapper_div).append("div").classed("ui-wrapper",!0);e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-year",!0).selectAll("option").data(years_array).enter().append("option").property("value",function(e){return"2017"==e}).text(function(e){return e}),e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-type",!0).selectAll("option").data(types_array).enter().append("option").text(function(e){return e}).property("value",function(e){return"Monat"==e}),e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-value",!0).selectAll("option").data(values_array).enter().append("option").text(function(e){return e}).property("value",function(e){return"Absolut"==e})}function onchange(){var e,t="Jahr"==d3.select("div.select-selected.year").html()?2017:d3.select("div.select-selected.year").html(),a="Zeitraum"==d3.select("div.select-selected.cycle").html()?"Monat":d3.select("div.select-selected.cycle").html(),n="Skalierung"==d3.select("div.select-selected.metric").html()?"Relativ Max":d3.select("div.select-selected.metric").html();t!=year_value?(e="year",year_value=t):a!=type_value?(e="type",type_value=a):n!=metric_value&&(e="metric",metric_value=n),config.type=a,config.value_metric=n,config.year=parseInt(year_value),"year"==e?updateChart(filepath,config):"type"==e?renderChart(filepath,config):"metric"==e&&updateChart(filepath,config)}function init(e){create_filter_ui(),createWrapper(),createTooltip(),createTooltipLineChart(),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Wochentage",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},49),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Woche",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},50),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Monat",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},51),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Wochenenden",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},52),renderChart(e,config),createStackedArea(e)}function removeCharts(){charts_wrapper.selectAll("svg").selectAll("g").remove(),charts_wrapper.select(".river-svg-wrapper").remove()}function updateChart(e,t){d3.json(e).then(function(e){Object.keys(e).forEach(function(a,n){t.name=a,null!=radarChart[n]&&radarChart[n].updateGraphics(e[a][t.year],t)})}).catch(function(e){throw console.log(617),e})}function createGrid(){var e=config.width+config.margin.left+config.margin.right,t=config.height+config.margin.top+config.margin.bottom;charts_wrapper.append("div").classed("river-svg-wrapper",!0),charts_wrapper.selectAll("svg").data(grid_dict).enter().append("svg").attr("width",e).attr("height",t).attr("class",function(e){return"wrapper-".concat(e.index," svg-wrapper")})}function addSVG(){charts_wrapper.append("div").classed("river-svg-wrapper",!0),d3.svg("../assets/spree.svg").then(function(e){var t=document.importNode(e.documentElement,!0);d3.select(".river-svg-wrapper").each(function(){this.appendChild(t)})})}function renderChart(e,t){if(removeCharts(),addSVG(),null!=document.querySelector(".select-selected.metric")){var a=document.querySelector(".select-selected.metric").innerHTML;"Select metric"!=a&&(config.value_metric=a)}d3.json(e).then(function(e){Object.keys(e).forEach(function(t,a){grid_dict.forEach(function(n){1==n.station&&t==n.name?(radarChart[a]=new Radarchart(e[t][config.year],config),radarChart[a].init(n.index,t)):0==n.station&&d3.select(".wrapper-".concat(n.index)).classed("empty",!0),2==n.station&&createLegend(n.index),3==n.station&&createSrc(n.index)})})}).catch(function(e){throw console.log(688),e})}function exampleChart(e,t,a,n,r){var i=n.width+n.margin.left+n.margin.right,s=n.height+n.margin.top+n.margin.bottom;d3.select("#".concat(n.type,"-example")).append("svg").classed("wrapper-".concat(r),!0).classed(" svg-wrapper",!0).attr("width",i).attr("height",s);d3.json(e).then(function(e){var i=e[a][t];radar_chart_week[r]=new Radarchart(i,n),radar_chart_week[r].init(r,a)}).catch(function(e){throw console.log(712),e})}Math.radians=function(e){return e*Math.PI/180},Math.degrees=function(e){return 180*e/Math.PI},d3.json("../assets/names_dict.json").then(function(e){names_dict=e}).catch(function(e){throw console.log(304),e}),init(filepath);var selects={year:"2017",type:"Monat",value:"Absolut"};function checkSelection(e){var t=e.innerHTML,a=e.previousSibling.classList[0];d3.select(".".concat(a)).selectAll("option").property("value",function(e,a){return t==e}),selects[a.slice(7)]!=t&&(selects[a.slice(7)]=t,onchange())}function createLegend(e){if(null==d3.select(".legend-wrapper")._groups[0][0]){var t=d3.select(".wrapper-".concat(e)).append("g").classed("legend-wrapper",!0).attr("width",config.width+config.margin.left+config.margin.right).attr("height",config.height+config.margin.top+config.margin.bottom);t.append("circle").classed("legend_median",!0).attr("cx","5").attr("cy","11").attr("r",4).style("fill","#2824b2");t.append("text").classed("legend_text",!0).text("Median Wert d.").style("transform","translateX(15px) translateY(15px)"),t.append("text").classed("legend_text",!0).text("Anzahl Fahrradfahrer").style("transform","translateX(15px) translateY(28px)");t.append("circle").classed("legend_median",!0).attr("cx","5").attr("cy","51").attr("r",4).style("fill","#3ce39f");t.append("text").classed("legend_text",!0).text("Höchster Wert d.").style("transform","translateX(15px) translateY(55px)"),t.append("text").classed("legend_text",!0).text("Anzahl Fahrradfahrer").style("transform","translateX(15px) translateY(68px)")}}function createSrc(e){if(null==d3.select(".src-wrapper")._groups[0][0]){var t=d3.select(".wrapper-".concat(e)).append("g").classed("src-wrapper",!0).attr("width",config.width+config.margin.left+config.margin.right).attr("height",config.height+config.margin.top+config.margin.bottom);t.append("text").classed("legend_text",!0).text("Quelle:").style("transform","translateX(15px) translateY(15px)").style("font-weight","bold"),t.append("text").classed("legend_text",!0).text("Senatsverwaltung").style("transform","translateX(15px) translateY(28px)"),t.append("text").classed("legend_text",!0).text("für Umwelt und").style("transform","translateX(15px) translateY(41px)"),t.append("text").classed("legend_text",!0).text("Stadtentwicklung").style("transform","translateX(15px) translateY(53px)")}}function createSumObj(e){var t=[],a={};return["2012-01-01","2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01"].forEach(function(n){a.date=n,e.forEach(function(e){a[e]=0}),t.push(a),a={}}),t}function createStackedArea(e){var t,a,n;d3.json(e).then(function(e){var r=Object.keys(e);t=createSumObj(r),r.forEach(function(r){a=e[r],Object.keys(a).forEach(function(e){if(null!=a[e][0]){n=a[e][0].months;var i=0;n.forEach(function(e){i+=e.sum}),t.forEach(function(t){year_transformed=e+"-01-01",t.date==year_transformed&&(t[r]=i)})}})});var i=[];t.forEach(function(e){for(var t in e)"date"!=t&&e[t]>0&&i.push({date:e.date,type:t,value:e[t]})}),t.columns=["date","type","value"],data_line=i;var s=document.querySelector("#stacked").getBoundingClientRect(),c=s.width>700?700:s.width;lineChart({container:d3.select("#stacked"),data:i,yLabel:"Radfahrer",isTime:!0,height:400,group_column:"type",zero_based:!0,width:c})}).catch(function(e){throw console.log(892),e})}var lineChart=function(e){var t={},a=e.container||d3.select("body"),n=e.height||250,r=e.width||500,i=e.xTickNum||!1,s=e.data,c=e.xGrid||!1,l=e.yGrid||!1,o=e.xLabel||!1,d=e.yLabel||!1,p=e.group_sort||!1,h=e.date_column||"date",m=e.data_column||"value",u=e.zero_based||!1,f=e.group_column||!1,g=e.colors||"#000",v=a.append("svg").attr("width",r).attr("height",n).attr("viewBox","0 0 ".concat(r," ").concat(n)).attr("preserveAspectRatio","xMidYMid meet"),x=e.margin||{top:20,right:20,bottom:30,left:65},y=r-x.left-x.right,_=n-x.top-x.bottom,w=v.append("g").attr("transform","translate(".concat(x.left,",").concat(x.top,")")),b=e.parseTime||d3.timeParse("%Y-%m-%d"),A=e.isTime||!1,k=e.xTicks||!1;s.forEach(function(e){e[h]=A?b(e[h]):+e[h],e[m]=+e[m]});var S=function(e){return e.date},M=d3.scaleLinear().range([0,r]),L=function(e){return e.value},E=d3.scaleLinear().range([n,0]);M.domain([d3.min(s,S),d3.max(s,S)]),E.domain([d3.min(s,L),d3.max(s,L)]);var T=e.x||1==A?d3.scaleTime().rangeRound([0,y]).domain(d3.extent(s,function(e){return e[h]})):d3.scaleLinear().range([0,y]).domain(d3.extent(s,function(e){return e[h]})),C=e.y||d3.scaleLinear().rangeRound([_,0]).domain(u?[0,d3.max(s,function(e){return e[m]})]:d3.extent(s,function(e){return e[m]})),B=e.line||d3.line().x(function(e){return T(e[h])}).y(function(e){return C(e[m])}),R=d3.axisBottom(T);if(k&&R.tickFormat(k),i&&R.ticks(i),c){var O=d3.axisBottom(T);k&&O.tickFormat(k),i&&O.ticks(i),w.append("g").attr("transform","translate(0,".concat(_,")")).attr("class","axis-line-chart").call(O.tickSize(-_).tickFormat(""))}if(l){var P=d3.axisLeft(C);w.append("g").attr("class","gridline").call(P.tickSize(-y).tickFormat(""))}if(w.append("g").attr("transform","translate(0,"+_+")").attr("class","axis-line-chart").call(R),w.append("g").attr("class","axis-line-chart").call(d3.axisLeft(C)),f){var j=[];p?j=p:s.forEach(function(e){-1==j.indexOf(e[f])&&j.push(e[f])}),j.forEach(function(e,t){w.append("path").attr("class","path").attr("id","path_"+e).datum(s.filter(function(t){return t[f]==e})).attr("fill","none").attr("stroke","#50ABE3").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",2).attr("d",B).on("mouseover",function(e,t){var a,n,r,i,s;a=e,r=window.innerWidth,window.innerHeight,i=d3.event.pageX+10,s=d3.event.pageY+10,r-i<150&&(i=d3.event.pageX-125),n=d3.select("#tooltip-line-chart"),null!=a[0].type&&(n.select(".station-wrapper-line-chart").text(names_dict[a[0].type]),n.attr("style","left: ".concat(i,"px; top: ").concat(s,"px; position: absolute")).classed("active",!0)),function(e,t){var a="#path_".concat(e[0].type),n=d3.select(a);d3.selectAll(".path").classed("inactive",!0),n.classed("active",!0).classed("inactive",!1)}(e)}).on("mouseout",function(e,t){d3.select("#tooltip-line-chart").attr("style","display: none"),d3.selectAll(".path").classed("inactive",!1).classed("active",!1)})})}else w.append("path").datum(s).attr("class","path").attr("fill","none").attr("stroke","object"==_typeof(g)?g[key]:g).attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",1.5).attr("d",B);return o&&w.append("g").attr("transform","translate(".concat(y,",").concat(_+10,")")).append("text").text(o).attr("text-anchor","end").attr("class","legend-tick").attr("fill","#000").style("font-size",10).style("font-family","sans-serif").style("letter-spacing","2px"),d&&w.append("g").append("text").attr("fill","#000").attr("transform","rotate(-90)").style("font-size",10).style("font-family","sans-serif").attr("class","legend-tick").attr("y",6).attr("dy","0.71em").attr("text-anchor","end").text(d),t.svg=function(){return v},t.x=function(e){return T(e)},t.y=function(e){return C(e)},t.g=function(){return w},t.dHeight=function(){return _},t.dWidth=function(){return y},t.parseTime=function(e){return b(e)},t};for(x=document.getElementsByClassName("custom-select"),i=0;i<x.length;i++){for(selElmnt=x[i].getElementsByTagName("select")[0],a=document.createElement("DIV"),0==i&&a.setAttribute("class","select-selected year"),1==i&&a.setAttribute("class","select-selected cycle"),2==i&&a.setAttribute("class","select-selected metric"),a.setAttribute("onclick","checkSelection(this)"),a.innerHTML=selElmnt.options[selElmnt.selectedIndex].innerHTML,x[i].appendChild(a),(b=document.createElement("DIV")).setAttribute("class","select-items select-hide"),j=1;j<selElmnt.length;j++)(c=document.createElement("DIV")).innerHTML=selElmnt.options[j].innerHTML,"Monat"!=c.innerHTML&&2017!=c.innerHTML&&"Relativ Max"!=c.innerHTML||c.setAttribute("class","same-as-selected"),c.addEventListener("click",function(e){var t,a,n,r,i;for(r=this.parentNode.parentNode.getElementsByTagName("select")[0],i=this.parentNode.previousSibling,a=0;a<r.length;a++)if(r.options[a].innerHTML==this.innerHTML){for(r.selectedIndex=a,i.innerHTML=this.innerHTML,t=this.parentNode.getElementsByClassName("same-as-selected"),n=0;n<t.length;n++)t[n].removeAttribute("class");this.setAttribute("class","same-as-selected");break}i.click()}),b.appendChild(c);x[i].appendChild(b),a.addEventListener("click",function(e){e.stopPropagation(),closeAllSelect(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}function closeAllSelect(e){var t,a,n,r=[];for(t=document.getElementsByClassName("select-items"),a=document.getElementsByClassName("select-selected"),n=0;n<a.length;n++)e==a[n]?r.push(n):a[n].classList.remove("select-arrow-active");for(n=0;n<t.length;n++)r.indexOf(n)&&t[n].classList.add("select-hide")}document.addEventListener("click",closeAllSelect);var clientWidth=window.innerWidth;clientWidth<411&&(d3.select(".wrapper-47").style("display","none"),d3.select(".wrapper-48").style("display","none"));