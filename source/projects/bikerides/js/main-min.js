const filepath="../assets/all_years.json",filepath_v2="../assets/structure.json";let year_transformed;const values_array=["Skalierung","Absolut","Relativ Median","Relativ Max"],years_array=["Jahr",2017,2016,2015,2014,2013,2012],months_array=[0,1,2,3,4,5,6,7,8,9,10,11],types_array=["Zeitraum","Monat","Woche","Wochentage","Wochenenden"];let charts_wrapper,year_value=2017,type_value="Monat",metric_value="Absolut",radarChart=[],radar_chart_week=[];var x,i,j,selElmnt,a,b,c,data_line,names_dict;const wrapper_div=".polar-chart-wrapper",grid_dict=[{station:2,index:0,name:""},{station:3,index:1,name:""},{station:0,index:2,name:""},{station:1,index:3,name:"10-PA-BER-N"},{station:1,index:4,name:"10-PA-BER-S"},{station:0,index:5,name:""},{station:0,index:6,name:""},{station:1,index:7,name:"15-SP-KLO-N"},{station:0,index:8,name:""},{station:1,index:9,name:"27-RE-MAR"},{station:1,index:10,name:"12-PA-SCH"},{station:0,index:11,name:""},{station:0,index:12,name:""},{station:0,index:13,name:""},{station:1,index:14,name:"15-SP-KLO-S"},{station:1,index:15,name:"02-MI-JAN-N"},{station:1,index:16,name:"03-MI-SAN-W"},{station:1,index:17,name:"03-MI-SAN-O"},{station:0,index:18,name:""},{station:0,index:19,name:""},{station:0,index:20,name:""},{station:0,index:21,name:""},{station:1,index:22,name:"02-MI-JAN-S"},{station:1,index:23,name:"05-FK-OBB-W"},{station:1,index:24,name:"05-FK-OBB-O"},{station:1,index:25,name:"06-FK-FRA-W"},{station:1,index:26,name:"06-FK-FRA-O"},{station:0,index:27,name:""},{station:1,index:28,name:"13-CW-PRI"},{station:1,index:29,name:"18-TS-YOR-W"},{station:1,index:30,name:"18-TS-YOR-O"},{station:1,index:31,name:"19-TS-MON"},{station:1,index:32,name:"21-NK-MAY"},{station:1,index:33,name:"26-LI-PUP"},{station:1,index:34,name:"24-MH-ALB"},{station:0,index:35,name:""},{station:1,index:36,name:"17-SK-BRE-W"},{station:1,index:37,name:"17-SK-BRE-O"},{station:0,index:38,name:""},{station:1,index:39,name:"23-TK-KAI"},{station:0,index:40,name:""},{station:0,index:41,name:""},{station:0,index:42,name:""},{station:0,index:43,name:""},{station:1,index:44,name:"20-TS-MAR-N"},{station:1,index:45,name:"20-TS-MAR-S"},{station:0,index:46,name:""},{station:2,index:47,name:""},{station:3,index:48,name:""}];let config={width:180,year:2017,height:75,width:75,levels:5,name:"",radius:1,value_metric:"Relativ Max",factor:1,type:"Monat",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}};function createWrapper(){charts_wrapper=d3.select(wrapper_div).append("div").classed("charts-wrapper",!0),createGrid()}function createTooltipLineChart(){let e=d3.select(".line-chart-wrapper").append("div").classed("tooltip-wrapper-line",!0).attr("id","tooltip-line-chart").style("display","none");e.append("div").classed("station-wrapper-line-chart",!0);let t=e.append("div").classed("time-wrapper-line-chart",!0);t.append("div").classed("month-wrapper-line-chart",!0),t.append("div").classed("year-wrapper-line-chart",!0)}function createTooltip(){let e=d3.select(wrapper_div).append("div").classed("tooltip-wrapper",!0).attr("id","tooltip").style("display","none");e.append("div").classed("station-wrapper",!0);let t=e.append("div").classed("time-wrapper",!0);t.append("div").classed("month-wrapper",!0),t.append("div").classed("year-wrapper",!0);let a=e.append("div").classed("values-wrapper",!0),n=a.append("div").classed("median",!0);n.append("span").text("Median:").classed("value-desc",!0),n.append("span").attr("id","median-value");let r=a.append("div").classed("max",!0);r.append("span").text("Max:").classed("value-desc",!0),r.append("span").attr("id","max-value");let i=a.append("div").classed("total",!0).classed("value-desc",!0);i.append("span").text("Total:"),i.append("span").attr("id","total-value")}function createIntroText(){let e=d3.select(wrapper_div).append("div").classed("intro-wrapper",!0);e.append("span").classed("intro-headline",!0).text("Wie verändert sich der Radverkehr in Berlin? "),e.append("span").text("Zeige unterschiedliche Rhythmen der Radfahrer im Datensatz durch Auswahl der Filter (z.B. Tages-, Wochen- und Jahresrhythmus):")}function createIntroTextLineChart(){let e=d3.select(".line-chart-wrapper").append("div").classed("intro-wrapper",!0);d3.select(".line-chart-wrapper").append("div").classed("chart-wrapper-line",!0).attr("id","stacked");e.append("span").classed("intro-headline",!0).text("Alle Radzählstellen im Vergleich"),e.append("span").text("Entdecke welche in welchem Jahr die Radzählstellen in Betrieb genommen worden sind und wie sich das jährliche Verkehrsaufkommen der Zählstellen verändert.")}function create_filter_ui(){createIntroText(),createIntroTextLineChart();let e=d3.select(wrapper_div).append("div").classed("ui-wrapper",!0);e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-year",!0).selectAll("option").data(years_array).enter().append("option").property("value",e=>"2017"==e).text(e=>e),e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-type",!0).selectAll("option").data(types_array).enter().append("option").text(e=>e).property("value",e=>"Monat"==e),e.append("div").classed("custom-select",!0).style("width","120px").append("select").classed("select-value",!0).selectAll("option").data(values_array).enter().append("option").text(e=>e).property("value",e=>"Absolut"==e)}function onchange(){let e,t="Jahr"==d3.select("div.select-selected.year").html()?2017:d3.select("div.select-selected.year").html(),a="Zeitraum"==d3.select("div.select-selected.cycle").html()?"Monat":d3.select("div.select-selected.cycle").html(),n="Skalierung"==d3.select("div.select-selected.metric").html()?"Relativ Max":d3.select("div.select-selected.metric").html();t!=year_value?(e="year",year_value=t):a!=type_value?(e="type",type_value=a):n!=metric_value&&(e="metric",metric_value=n),config.type=a,config.value_metric=n,config.year=parseInt(year_value),"year"==e?updateChart(filepath,config):"type"==e?renderChart(filepath,config):"metric"==e&&updateChart(filepath,config)}function init(e){create_filter_ui(),createWrapper(),createTooltip(),createTooltipLineChart(),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Wochentage",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},49),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Woche",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},50),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Monat",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},51),exampleChart(e,2017,"05-FK-OBB-O",{year:2017,height:130,width:130,levels:5,radius:1,value_metric:"Absolut",factor:1,type:"Wochenenden",month:0,factor_legend:.85,max_value:1e4,margin:{left:30,right:30,top:18,bottom:42}},52),renderChart(e,config),createStackedArea(e)}function removeCharts(){charts_wrapper.selectAll("svg").selectAll("g").remove(),charts_wrapper.select(".river-svg-wrapper").remove()}function updateChart(e,t){d3.json(e).then(e=>{Object.keys(e).forEach((a,n)=>{t.name=a,null!=radarChart[n]&&radarChart[n].updateGraphics(e[a][t.year],t)})}).catch(e=>{throw console.log(617),e})}function createGrid(){let e=config.width+config.margin.left+config.margin.right,t=config.height+config.margin.top+config.margin.bottom;charts_wrapper.append("div").classed("river-svg-wrapper",!0),charts_wrapper.selectAll("svg").data(grid_dict).enter().append("svg").attr("width",e).attr("height",t).attr("class",e=>`wrapper-${e.index} svg-wrapper`)}function addSVG(){charts_wrapper.append("div").classed("river-svg-wrapper",!0),d3.svg("../assets/spree.svg").then(e=>{var t=document.importNode(e.documentElement,!0);d3.select(".river-svg-wrapper").each(function(){this.appendChild(t)})})}function renderChart(e,t){if(removeCharts(),addSVG(),null!=document.querySelector(".select-selected.metric")){let e=document.querySelector(".select-selected.metric").innerHTML;"Select metric"!=e&&(config.value_metric=e)}d3.json(e).then(e=>{Object.keys(e).forEach((t,a)=>{grid_dict.forEach(n=>{1==n.station&&t==n.name?(radarChart[a]=new Radarchart(e[t][config.year],config),radarChart[a].init(n.index,t)):0==n.station&&d3.select(`.wrapper-${n.index}`).classed("empty",!0),2==n.station&&createLegend(n.index),3==n.station&&createSrc(n.index)})})}).catch(e=>{throw console.log(688),e})}function exampleChart(e,t,a,n,r){let i=n.width+n.margin.left+n.margin.right,s=n.height+n.margin.top+n.margin.bottom;d3.select(`#${n.type}-example`).append("svg").classed(`wrapper-${r}`,!0).classed(" svg-wrapper",!0).attr("width",i).attr("height",s);d3.json(e).then(e=>{let i=e[a][t];radar_chart_week[r]=new Radarchart(i,n),radar_chart_week[r].init(r,a)}).catch(e=>{throw console.log(712),e})}Math.radians=function(e){return e*Math.PI/180},Math.degrees=function(e){return 180*e/Math.PI},d3.json("../assets/names_dict.json").then(e=>{names_dict=e}).catch(e=>{throw console.log(304),e}),init(filepath);let selects={year:"2017",type:"Monat",value:"Absolut"};function checkSelection(e){let t=e.innerHTML,a=e.previousSibling.classList[0];d3.select(`.${a}`).selectAll("option").property("value",(e,a)=>t==e),selects[a.slice(7)]!=t&&(selects[a.slice(7)]=t,onchange())}function createLegend(e){if(null==d3.select(".legend-wrapper")._groups[0][0]){let t=d3.select(`.wrapper-${e}`).append("g").classed("legend-wrapper",!0).attr("width",config.width+config.margin.left+config.margin.right).attr("height",config.height+config.margin.top+config.margin.bottom);t.append("circle").classed("legend_median",!0).attr("cx","5").attr("cy","11").attr("r",4).style("fill","#2824b2");t.append("text").classed("legend_text",!0).text("Median Wert d.").attr("transform","translate(15,15)"),t.append("text").classed("legend_text",!0).text("Anzahl Fahrradfahrer").attr("transform","translate(15,28)");t.append("circle").classed("legend_median",!0).attr("cx","5").attr("cy","51").attr("r",4).style("fill","#3ce39f");t.append("text").classed("legend_text",!0).text("Höchster Wert d.").attr("transform","translate(15,55)"),t.append("text").classed("legend_text",!0).text("Anzahl Fahrradfahrer").attr("transform","translate(15,68)")}}function createSrc(e){if(null==d3.select(".src-wrapper")._groups[0][0]){let t=d3.select(`.wrapper-${e}`).append("g").classed("src-wrapper",!0).attr("width",config.width+config.margin.left+config.margin.right).attr("height",config.height+config.margin.top+config.margin.bottom);t.append("text").classed("legend_text",!0).text("Quelle:").attr("transform","translate(15,15)").style("font-weight","bold"),t.append("text").classed("legend_text",!0).text("Senatsverwaltung").attr("transform","translate(15,28)"),t.append("text").classed("legend_text",!0).text("für Umwelt und").attr("transform","translate(15,41)"),t.append("text").classed("legend_text",!0).text("Stadtentwicklung").attr("transform","translate(15,53)")}}function createSumObj(e){let t=[],a={};return["2012-01-01","2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01"].forEach(n=>{a.date=n,e.forEach(e=>{a[e]=0}),t.push(a),a={}}),t}function createStackedArea(e){let t,a,n,r;d3.json(e).then(e=>{const i=Object.keys(e);t=createSumObj(i),i.forEach(i=>{a=e[i],(n=Object.keys(a)).forEach(e=>{if(null!=a[e][0]){r=a[e][0].months;let n=0;r.forEach(e=>{n+=e.sum}),t.forEach(t=>{year_transformed=e+"-01-01",t.date==year_transformed&&(t[i]=n)})}})});let s=[];t.forEach(e=>{for(let t in e)"date"!=t&&e[t]>0&&s.push({date:e.date,type:t,value:e[t]})}),t.columns=["date","type","value"],data_line=s;var l=document.querySelector("#stacked").getBoundingClientRect();let d=l.width>700?700:l.width;lineChart({container:d3.select("#stacked"),data:s,yLabel:"Radfahrer",isTime:!0,height:400,group_column:"type",zero_based:!0,width:d})}).catch(e=>{throw console.log(892),e})}const lineChart=e=>{let t={},a=e.container||d3.select("body"),n=e.height||250,r=e.width||500,i=e.xTickNum||!1,s=e.data,l=e.xGrid||!1,d=e.yGrid||!1,c=e.xLabel||!1,o=e.yLabel||!1,p=e.group_sort||!1,h=e.date_column||"date",m=e.data_column||"value",g=e.zero_based||!1,u=e.group_column||!1,f=e.colors||"#000",x=a.append("svg").attr("width",r).attr("height",n).attr("viewBox",`0 0 ${r} ${n}`).attr("preserveAspectRatio","xMidYMid meet"),v=e.margin||{top:20,right:20,bottom:30,left:65},y=r-v.left-v.right,w=n-v.top-v.bottom,_=x.append("g").attr("transform",`translate(${v.left},${v.top})`),b=e.parseTime||d3.timeParse("%Y-%m-%d"),A=e.isTime||!1,k=e.xTicks||!1;s.forEach(e=>{e[h]=A?b(e[h]):+e[h],e[m]=+e[m]});var M=function(e){return e.date},S=d3.scaleLinear().range([0,r]),L=function(e){return e.value},E=d3.scaleLinear().range([n,0]);S.domain([d3.min(s,M),d3.max(s,M)]),E.domain([d3.min(s,L),d3.max(s,L)]);let T=e.x||1==A?d3.scaleTime().rangeRound([0,y]).domain(d3.extent(s,e=>e[h])):d3.scaleLinear().range([0,y]).domain(d3.extent(s,function(e){return e[h]})),C=e.y||d3.scaleLinear().rangeRound([w,0]).domain(g?[0,d3.max(s,e=>e[m])]:d3.extent(s,e=>e[m])),B=e.line||d3.line().x(e=>T(e[h])).y(e=>C(e[m])),R=d3.axisBottom(T);if(k&&R.tickFormat(k),i&&R.ticks(i),l){let e=d3.axisBottom(T);k&&e.tickFormat(k),i&&e.ticks(i),_.append("g").attr("transform",`translate(0,${w})`).attr("class","axis-line-chart").call(e.tickSize(-w).tickFormat(""))}if(d){let e=d3.axisLeft(C);_.append("g").attr("class","gridline").call(e.tickSize(-y).tickFormat(""))}if(_.append("g").attr("transform","translate(0,"+w+")").attr("class","axis-line-chart").call(R),_.append("g").attr("class","axis-line-chart").call(d3.axisLeft(C)),u){let e=[];p?e=p:s.forEach(t=>{-1==e.indexOf(t[u])&&e.push(t[u])}),e.forEach((e,t)=>{_.append("path").attr("class","path").attr("id","path_"+e).datum(s.filter(t=>t[u]==e)).attr("fill","none").attr("stroke","#50ABE3").attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",2).attr("d",B).on("mouseover",(e,t)=>{!function(e){let t;const a=window.innerWidth;window.innerHeight;let n=d3.event.pageX+10,r=d3.event.pageY+10;a-n<150&&(n=d3.event.pageX-125),t=d3.select("#tooltip-line-chart"),null!=e[0].type&&(t.select(".station-wrapper-line-chart").text(names_dict[e[0].type]),t.attr("style",`left: ${n}px; top: ${r}px; position: absolute`).classed("active",!0))}(e),function(e,t){let a=`#path_${e[0].type}`,n=d3.select(a);d3.selectAll(".path").classed("inactive",!0),n.classed("active",!0).classed("inactive",!1)}(e)}).on("mouseout",(e,t)=>{d3.select("#tooltip-line-chart").attr("style","display: none"),d3.selectAll(".path").classed("inactive",!1).classed("active",!1)})})}else _.append("path").datum(s).attr("class","path").attr("fill","none").attr("stroke","object"==typeof f?f[key]:f).attr("stroke-linejoin","round").attr("stroke-linecap","round").attr("stroke-width",1.5).attr("d",B);return c&&_.append("g").attr("transform",`translate(${y},${w+10})`).append("text").text(c).attr("text-anchor","end").attr("class","legend-tick").attr("fill","#000").style("font-size",10).style("font-family","sans-serif").style("letter-spacing","2px"),o&&_.append("g").append("text").attr("fill","#000").attr("transform","rotate(-90)").style("font-size",10).style("font-family","sans-serif").attr("class","legend-tick").attr("y",6).attr("dy","0.71em").attr("text-anchor","end").text(o),t.svg=(()=>x),t.x=(e=>T(e)),t.y=(e=>C(e)),t.g=(()=>_),t.dHeight=(()=>w),t.dWidth=(()=>y),t.parseTime=(e=>b(e)),t};for(x=document.getElementsByClassName("custom-select"),i=0;i<x.length;i++){for(selElmnt=x[i].getElementsByTagName("select")[0],a=document.createElement("DIV"),0==i&&a.setAttribute("class","select-selected year"),1==i&&a.setAttribute("class","select-selected cycle"),2==i&&a.setAttribute("class","select-selected metric"),a.setAttribute("onclick","checkSelection(this)"),a.innerHTML=selElmnt.options[selElmnt.selectedIndex].innerHTML,x[i].appendChild(a),(b=document.createElement("DIV")).setAttribute("class","select-items select-hide"),j=1;j<selElmnt.length;j++)(c=document.createElement("DIV")).innerHTML=selElmnt.options[j].innerHTML,"Monat"!=c.innerHTML&&2017!=c.innerHTML&&"Relativ Max"!=c.innerHTML||c.setAttribute("class","same-as-selected"),c.addEventListener("click",function(e){var t,a,n,r,i;for(r=this.parentNode.parentNode.getElementsByTagName("select")[0],i=this.parentNode.previousSibling,a=0;a<r.length;a++)if(r.options[a].innerHTML==this.innerHTML){for(r.selectedIndex=a,i.innerHTML=this.innerHTML,t=this.parentNode.getElementsByClassName("same-as-selected"),n=0;n<t.length;n++)t[n].removeAttribute("class");this.setAttribute("class","same-as-selected");break}i.click()}),b.appendChild(c);x[i].appendChild(b),a.addEventListener("click",function(e){e.stopPropagation(),closeAllSelect(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}function closeAllSelect(e){var t,a,n,r=[];for(t=document.getElementsByClassName("select-items"),a=document.getElementsByClassName("select-selected"),n=0;n<a.length;n++)e==a[n]?r.push(n):a[n].classList.remove("select-arrow-active");for(n=0;n<t.length;n++)r.indexOf(n)&&t[n].classList.add("select-hide")}document.addEventListener("click",closeAllSelect),console.log(document.querySelectorAll(".year")[0]);const clientWidth=window.innerWidth;clientWidth<411&&(d3.select(".wrapper-47").style("display","none"),d3.select(".wrapper-48").style("display","none"));