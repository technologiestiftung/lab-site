const lineChart = (params) => {

  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    xTickNum = params.xTickNum || false,
    data = params.data,
    xGrid = params.xGrid || false,
    yGrid = params.yGrid || false,
    xLabel = params.xLabel || false,
    yLabel = params.yLabel || false,
    group_sort = params.group_sort || false,
    date_column = params.date_column || 'date',
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    group_column = params.group_column || false,
    colors = params.colors || '#000',
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false,
    xTicks = params.xTicks || false

  data.forEach(d=>{
    if(isTime){
      d[date_column] = parseTime(d[date_column])
    }else{
      d[date_column] = +d[date_column]
    }
    d[data_column] = +d[data_column]
  })

  let x = params.x || (isTime==true) ? d3.scaleTime().rangeRound([0, dWidth]).domain(d3.extent(data, d=>d[date_column])) : d3.scaleLinear().range([0, dWidth]).domain(d3.extent(data, function(d) { return d[date_column]; })),
    y = params.y || d3.scaleLinear().rangeRound([dHeight, 0]).domain(((zero_based) ? [0,d3.max(data, d=>d[data_column])] : d3.extent(data, d=>d[data_column] ) )),
    line = params.line || d3.line().x(d=>x(d[date_column])).y(d=>y(d[data_column]))

  //Let's get drawing

  let xAxis = d3.axisBottom(x)
  if(xTicks) xAxis.tickFormat(xTicks)
  if(xTickNum) xAxis.ticks(xTickNum)

  if(xGrid){
    let xGridLines = d3.axisBottom(x)

    if(xTicks) xGridLines.tickFormat(xTicks)
    if(xTickNum) xGridLines.ticks(xTickNum)

    g.append('g')
      .attr("transform", `translate(0,${dHeight})`)
      .attr("class", "gridline")
      .call(xGridLines
          .tickSize(-dHeight)
          .tickFormat("")
      )
  }

  if(yGrid){
    let yGridLines = d3.axisLeft(y)

    g.append('g')
      .attr("class", "gridline")
      .call(yGridLines
          .tickSize(-dWidth)
          .tickFormat("")
      )
  }

  g.append("g")
    .attr("transform", "translate(0," + dHeight + ")")
    .call(xAxis)

  g.append("g")
    .call(d3.axisLeft(y))

  if(group_column){
    let keys = []
    if(group_sort){
      keys = group_sort
    }else{
      data.forEach(d=>{ if(keys.indexOf(d[group_column])==-1){ keys.push(d[group_column]); } })
    }

    keys.forEach((key,ki)=>{
      g.append("path")
        .attr('class','path')
        .attr('id', 'path_'+key)
        .datum(data.filter(d=>(d[group_column]==key)?true:false))
        .attr("fill", "none")
        .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    })
  }else{
    g.append("path")
      .datum(data)
      .attr('class','path')
      .attr("fill", "none")
      .attr("stroke", (typeof colors == 'object')?colors[key]:colors)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  if(xLabel){
    g.append('g')
      .attr('transform',`translate(${dWidth},${dHeight+10})`)
      .append('text')
        .text(xLabel)
        .attr('text-anchor','end')
        .attr("fill", "#000")
        .style('font-size',10)
        .style('font-family','sans-serif')
  } 

  if(yLabel){
    g.append('g')
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .style('font-size',10)
        .style('font-family','sans-serif')
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(yLabel);
  }

  module.svg = ()=>svg
  module.x = (d)=>x(d)
  module.y = (d)=>y(d)
  module.g = ()=>g
  module.dHeight = ()=>dHeight
  module.dWidth = ()=>dWidth
  module.parseTime = (d)=>parseTime(d)

  return module

}

const histogram = (params) => {

  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    data = params.data,
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    colors = params.colors || '#000',
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false,
    equalize = params.equalize || false,
    values = []

  data.forEach(d=>{
    if(isTime){
      if(d[data_column]!='NaN'){
        values.push(parseTime(d[data_column]))
      }
    }else{
      if(d[data_column]!='NaN'){
        values.push(+d[data_column])
      }
    }
  })

  let maxValue = params.maxValue || d3.max(values)

  //thresholdScott,thresholdFreedmanDiaconis,thresholdSturges
  let bin_count = params.bins || d3.thresholdSturges(values, d3.min(values), maxValue)

  let x = d3.scaleLinear()
    .domain([d3.min(values), maxValue])
    .range([0, dWidth])

  let bins = d3.histogram()
    .domain(x.domain())
    .thresholds(bin_count)
    (values)

  let bin_values = []

  bins.forEach(b=>{
    let e = d3.extent(b)
    if(isNaN(e[0])||isNaN(e[1])){
      bin_values.push({count:b.length, label:'-'})
    }else{
      if(Math.floor(e[0]) != Math.floor(e[1])){
        bin_values.push({count:b.length, label:Math.floor(e[0]) + '-' + Math.floor(e[1])})
      }else{
        bin_values.push({count:b.length, label:Math.floor(e[0])})
      }
    }
  })

  let maxLength = params.maxLength || d3.max(bins, d => (equalize)?equalize(d.length):d.length)

  let binBands = []
  for(let b = 0; b<bin_values.length; b++){ binBands.push(b); }

  let sx = d3.scaleBand()
    .domain(binBands)
    .range([0, dWidth])

  let y = d3.scaleLinear()
    .domain([0, maxLength]).nice()
    .range([dHeight, 0  ])

    //Let's get drawing

  g.append('g')
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").attr('x1', dWidth).style('stroke','rgba(0,0,0,0.1)'))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  g.append('g')
    .attr("transform", `translate(0,${dHeight})`)
    .call(d3.axisBottom(sx).tickFormat(d=>bin_values[d].label))
   

  g.append('g')
    .call(d3.axisBottom(sx).tickFormat(d=>(bin_values[d].count>0)?(equalize)?Math.round(equalize(bin_values[d].count)):bin_values[d].count:''))
    .call(g => g.selectAll(".tick line").style('stroke',d=>(bin_values[d].count>0)?'#000':'transparent'))
    .call(g => g.selectAll(".tick text").attr('dy',-12))
    .call(g => g.selectAll(".tick").attr('transform',(d,di)=>`translate(${sx(di)+sx.bandwidth()/2},${y((equalize)?equalize(bin_values[d].count):bin_values[d].count)-7})`))
    .call(g => g.select(".domain").remove())

  g.append("g")
    .attr("fill", "#000")
    .selectAll("rect").data(bins).enter().append("rect")
      .attr("x", (d,i) => dWidth/bins.length*i+1)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr("y", d => {
        let h = y((equalize)?equalize(d.length):d.length)
        if(h > dHeight-1 && d.length > 0){
          h = dHeight - 1
        }
        return h
      })
      .attr("height", d => {
        let h = y(0) - y((equalize)?equalize(d.length):d.length)
        if(h>0 && h<1){
          h = 1
        }
        return h
      })

  module.svg = ()=>svg
  module.g = ()=>g
  module.dHeight = ()=>dHeight
  module.dWidth = ()=>dWidth

  return module

}

const stackedArea = (params) => {

  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    data = params.data,
    date_column = params.date_column || 'date',
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    colors = params.colors || '#000',
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false,
    sums = [],
    maxDateVal = d3.max(data, d => d3.sum(d3.keys(d).map(function(key){ return key !== date_column ? d[key] : 0 })))

  data.forEach(d=>{
    let sum = 0
    for(let key in d){
      if(isTime && key == date_column){
        d[key] = parseTime(d[key])
      }else{
        d[key] = +d[key]
        sum += d[key]
      }
    }
    sums.push(sum)
  })

  let relData = []

  data.forEach((d,di)=>{
    let rel = {}
    for(let key in d){
      if(isTime && key == date_column){
        rel[key] = d[key]
      }else{
        rel[key] = d[key]/sums[di]*maxDateVal
      }
    }
    relData.push(rel)
  })

  let keys = data.columns.filter(function(key) { return key !== date_column; }),
      x = d3.scaleTime().range([0, dWidth]).domain(d3.extent(data, function(d) { return d[date_column]; })),
      y = d3.scaleLinear().range([dHeight, 0]).domain([0, maxDateVal]),
      color = d3.scaleOrdinal(d3.schemeCategory20).domain(d3.keys(data[0]).filter(function(key) { return key !== date_column; })),
      xAxis = d3.axisBottom().scale(x),
      yAxis = d3.axisLeft().scale(y),
      area = d3.area().x(d=>x(d.data.date)).y0(d=>y(d[0])).y1(d=>y(d[1])),
      stack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(data),
      rStack = d3.stack().keys(keys).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(relData)

  let browser = g.selectAll('.browser')
      .data(stack)
    .enter().append('g')
      .attr('class', d=>'browser ' + d.key)
      .attr('fill-opacity', 0.5);

  let areas = browser.append('path')
      .attr('class', 'area')
      .attr('d', area)
      .style('fill', 'rgba(0,0,0,0.1)')
      .style('stroke', '#555')
      .style('stroke-width', '0.1')
      .on('mouseover', function(d){
        d3.select(this).style('fill', '#1e3791')
        tooltip
          .attr('transform', `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`)
          .text(d.key)
          .style('display','block')
      })
      .on('mousemove', function(d){
        tooltip
          .attr('dx', (d3.mouse(this)[0]<dWidth/2)?10:-10)
          .attr('text-anchor', (d3.mouse(this)[0]<dWidth/2)?'start':'end')
          .attr('transform', `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`)
      })
      .on('mouseout', function(){
        d3.select(this).style('fill', 'rgba(0,0,0,0.1)')
        tooltip.style('display','none')
      })

  // browser.append('text')
  //     .datum(function(d) { return d; })
  //     .attr('transform', function(d) { return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; })
  //     .attr('x', -6) 
  //     .attr('dy', '.35em')
  //     .style("text-anchor", "start")
  //     .text(function(d) { return d.key; })
  //     .attr('fill-opacity', 1);

  g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + dHeight + ')')
      .call(xAxis);

  g.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

  g.append ("text")
    .attr("dx", 10)
    .attr("dy", 15)
    .text("Downloads")
    .style('font-family', 'sans-serif')
    .style('font-size', 10)

  let tooltip = g.append('text')
    .attr('dy',6)
    .style('text-shadow','0px 0px 3px #fff')
    .style('fill','#000')
    .style('font-weight','bold')
    .style('pointer-events','none')
    .style('font-family', 'sans-serif')
    .style('font-size', 10)
    .style('text-transform','capitalize')

  let mode = true

  module.setMode = m => {
    mode = m
  }

  module.mode = () => {
    return mode
  }

  module.update = () => {
    areas.datum((d,i)=> (mode) ? stack[i] : rStack[i] ).transition().attr('d', area)
  }

  module.svg = ()=>svg
  module.g = ()=>g
  module.dHeight = ()=>dHeight
  module.dWidth = ()=>dWidth

  return module

}

const histoline = (params) => {

  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    data = params.data,
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    colors = params.colors || '#000',
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false,
    values = []

  data.forEach(d=>{
    if(d[data_column]!='NaN'){
      if(isTime){
        values.push(parseTime(d[data_column]))
      }else{
        values.push(+d[data_column])
      }
    }
  })

  let x = d3.scaleLinear()
    .domain(d3.extent(values)).nice()
    .range([0, dWidth])

  let lineLimit = (d3.max(values)-d3.min(values))

  let lineBins = d3.histogram()
    .thresholds(lineLimit)
    (values)

  let min = d3.min(values)

  lineBins.forEach((l,li)=>{
    l.v = li+min
  })

  lineBins.slice(lineLimit, lineBins.length-lineLimit)
  lineBins = lineBins.filter(d=>(d.length>0)?true:false)

  let line = d3.line()
    .x(d => x(d.v))
    .y((d,i) => y(d.length))

  let y = d3.scaleLinear()
    .domain([0, d3.max(lineBins, d => d.length)]).nice()
    .range([dHeight, 0  ])

    //Let's get drawing

  g.append('g')
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").attr('x1', dWidth).style('stroke','rgba(0,0,0,0.1)'))
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  g.append('g')
    .attr("transform", `translate(0,${dHeight})`)
    .call(d3.axisBottom(x))
   
  g.append('g')
    .append('path')
    .attr('fill','transparent')
    .attr('stroke', 'red')
    .attr('d', line(lineBins))

  return module

}

const heatgrid = (params) => {
  let module = {},
    container = params.container || d3.select('body'),
    height = params.height || 250,
    width = params.width || 500,
    data = params.data,
    date_column = params.date_column || 'date',
    data_column = params.data_column || 'value',
    zero_based = params.zero_based || false,
    group_column = params.group_column || false,
    colors = params.colors || ['rgba(255,255,255,1)','rgba(0,0,0,1)'],
    svg = container.append('svg').attr('width', width).attr('height', height).attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMidYMid meet'),
    margin = params.margin || {top: 20, right: 20, bottom: 30, left: 50},
    dWidth = width - margin.left - margin.right,
    dHeight = height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`),
    parseTime = params.parseTime || d3.timeParse("%Y-%m-%d"),
    isTime = params.isTime || false

  data.forEach(d=>{
    if(isTime){
      d[date_column] = parseTime(d[date_column])
    }else{
      d[date_column] = +d[date_column]
    }
    d[data_column] = +d[data_column]
  })

  let cols = params.cols || 10,
      rows = params.rows || 10

  let x = params.x || (isTime==true) ? d3.scaleTime().rangeRound([0,cols-1]).domain(d3.extent(data, function(d) { return d[date_column]; })) : d3.scaleLinear().rangeRound([0, cols-1]).domain(d3.extent(data, function(d) { return d[date_column]; })),
    y = params.y || d3.scaleLinear().rangeRound([rows-1, 0]).domain((zero_based)?[0,d3.max(data, function(d) { return d[data_column]; })]:d3.extent(data, function(d) { return d[data_column]; })),
    cell_width = dWidth/cols,
    cell_height = dHeight/rows,
    sx = params.x || (isTime==true) ? d3.scaleTime().rangeRound([0, (dWidth-cell_width)]).domain(d3.extent(data, function(d) { return d[date_column]; })) : d3.scaleLinear().range([0, (dWidth-cell_width)]).domain(d3.extent(data, function(d) { return d[date_column]; })),
    sy = params.y || d3.scaleLinear().rangeRound([dHeight, 0]).domain((zero_based)?[0,d3.max(data, function(d) { return d[data_column]; })]:d3.extent(data, function(d) { return d[data_column]; }))

  let grid = {}

  data.forEach(d=>{
    let gx = x(d[date_column]),
        gy = y(d[data_column])

    if(!(gx in grid)){
      grid[gx] = {}
    }

    if(!(gy in grid[gx])){
      grid[gx][gy] = 0
    }

    grid[gx][gy]++
  })

  let cells = []

  for(let gx in grid){
    for(let gy in grid[gx]){
      cells.push({
        x:gx,
        y:gy,
        c:grid[gx][gy]
      })
    }
  }

  let color = d3.scaleLinear().domain([0, d3.max(cells, (d)=>d.c)]).range([colors[0],colors[1]])

  g.append("g")
    .attr("transform", `translate(${cell_width/2},${dHeight})`)
    .call(d3.axisBottom(sx))

  g.append("g")
    .call(d3.axisLeft(sy))

  g.append('g').selectAll('rect').data(cells).enter().append('rect')
    .attr('width', cell_width)
    .attr('height', cell_height)
    .attr('x', d=>d.x*cell_width)
    .attr('y', d=>d.y*cell_height)
    .attr('fill', d=>color(d.c))

  return module
}



/*------------ CHART BUILDING ------------*/

d3.csv('./output/charts/all.csv').then(data=>{
  let chart = lineChart({
    container:d3.select('#introvis'),
    data:data,
    yLabel:'Downloads',
    isTime:true,
    zero_based:true,
    group_column:'type',
    width:500,
    height:250,
    group_sort:['pv','a_pv','r_pv','ra_pv','ora_pv'],
    colors:{
      pv:'rgba(0,0,0,0.25)',
      a_pv:'rgba(0,0,0,0.5)',
      r_pv:'rgba(0,0,0,0.75)',
      ra_pv:'rgba(0,0,0,1)',
      ora_pv:'rgba(255,0,0,1)'
    }
  })

  let peakData = [
        {y:30,dy:20,date:'2013-04-01',note:{title:'VBB Data'}},
        {y:30,dy:20,date:'2013-09-01',note:{title:'Election 2013'}},
        {y:30,dy:20,date:'2017-03-01',note:{title:'Favourite first names'}},
        {y:30,dy:20,date:'2017-09-01',note:{title:'Election 2017'}}
      ]

  peakData.forEach(p=>{ 
    p['x'] = chart.x(chart.parseTime(p.date)); 
    if(p.x>chart.dWidth()/2){
      p['dx'] = -50
    }else{
      p['dx'] = 50
    }
    p['annotation'] = chart.g()
      .append("g")
        .attr("class", "annotation-group")
        .call(d3.annotation()
          .notePadding(5)
          .type(d3.annotationCalloutElbow)
          .annotations([p])
        )
        .style('display','none')
  })

  let peakLines = chart.g().append('g').selectAll('line').data(peakData).enter().append('line')
        .attr('x1', d=>d.x)
        .attr('x2', d=>d.x)
        .attr('y1', 0)
        .attr('y2', chart.dHeight())
        .attr('stroke','red')
        .attr('stroke-dasharray','5,5')

  let story = [
    {
      title:'Downloads',
      copy:'The line chart on left shows the download for data sets in Berlin\'s OpenData portal since April 2013.<br /><br />Click continue to learn more.'
    },
    {
      title:'Internal data',
      copy:'When analysing the data we identified a lot of data sets which are not accessible (anymore) or do not exist at all. For further analysis we are only using data that is still available in the portal. Because for the other sets we cannot access any meta data.'
    },
    {
      title:'Tests',
      copy:'On closer inspection we found out, that a few downloads happen before the data sets are being published. This is probably due to administrators testing if files were uploaded correctly.'
    },
    {
      title:'Outlier',
      copy:'On first sight it is obvious that there are multiple outliers.'
    },
    {
      title:'VBB Data',
      copy:'During April 2013 the VBB published their timetables and routes under a CreativeCommons license. During the first month those data sets were very popular. By now the VBB offers an API, which is why the VBB data sets are not as popular anymore.'
    },
    {
      title:'Elections',
      copy:'During elections the download numbers rise. In particular the datasets for election districts are of interest.'
    },
    {
      title:'Favourite first names',
      copy:'A topic which is of interest for the press every year, are popular first names. Newspapers publish a lot of graphs and maps.'
    },
    {
      title:'Cleaned data',
      copy:'For further analysis the peaks are removed from the data. Otherwise they would make it hard to detect other kinds of patterns in the data.'
    }
  ], currentStory = 0

  let introStory = ()=>{
    d3.select('#introtitle').html(story[currentStory].title)
    d3.select('#introcopy').html(story[currentStory].copy)

    chart.svg().selectAll('.path').style('display','none')

    peakData.forEach(p=>{ p.annotation.style('display','none'); })

    let show = ['pv']

    switch(currentStory){
      case 0:
        peakLines.style('display','none')
      break;
      case 1:
        show = ['pv','a_pv']
      break;
      case 2:
        peakLines.style('display','none')
        show = ['pv','a_pv','ra_pv']
      break;
      case 3:
        peakLines.style('display','block')
        show = ['pv','a_pv','ra_pv']
      break;
      case 4:
        show = ['pv','a_pv','ra_pv']
        peakData[0].annotation.style('display','block')
      break;
      case 5:
        show = ['pv','a_pv','ra_pv']
        peakData[1].annotation.style('display','block')
        peakData[3].annotation.style('display','block')
      break;
      case 6:
        show = ['pv','a_pv','ra_pv']
        peakData[2].annotation.style('display','block')
      break;
      case 7:
        show = ['pv','a_pv','ra_pv','ora_pv']
      break;
    }

    chart.svg().selectAll('#path_'+show.join(', #path_')).style('display','block')

    d3.select('#introprev').property('disabled',(currentStory == 0)?true:false)
    d3.select('#intronext').property('disabled',(currentStory == story.length-1)?true:false)
  }

  d3.select('#intronext').on('click', ()=>{
    if(currentStory < story.length-1){
      currentStory++
      introStory()
    }
  })

  d3.select('#introprev').on('click', ()=>{
    if(currentStory > 0){
      currentStory--
      introStory()
    }
  })

  introStory()

}).catch(err=>{ throw err; })

d3.json('./output/charts/outlier.json').then(data=>{

  data.forEach(o=>{

    let container = d3.select('#outliers').append('div')

    container.append('h3').attr('class', 'p-top').text(o.title)

    let text = `<strong>License</strong>: ${o.license_title}<br /><strong>Published on</strong>:${o.date_released}<br /><strong>Author</strong>:${o.author}<br /><a href="https://daten.berlin.de/datensaetze/${o.page}">Goto Dataset &raquo;</a>`

    container.append('p').attr('class','copy small-copy').html(text)

    lineChart({
      container:container,
      yLabel:'Zugriffe',
      xGrid:true,
      yGrid:true,
      data:o.original_pv,
      data_column:'c',
      isTime:true,
      width:700,
      xTickNum:5,
      zero_based:true,
      colors:'#000'
    })

  })

}).catch(err=>{ throw err; })

d3.csv('./output/charts/bots.csv').then(data=>{
  data.forEach(d=>{ d.value = d.value*100; })
  lineChart({
    container:d3.select('#timepatterns'),
    data:data,
    isTime:true,
    width:700,
    yLabel:'Part of data sets with clicks in %',
    zero_based:true,
    group_column:'type', 
    colors:{
      req:'rgba(0,0,0,1)',
      reql:'rgba(0,0,0,0.5)'
    }
  })
}).catch(err=>{ throw err; })

d3.csv('./output/charts/releases.csv').then(data=>{
  let chart = lineChart({
    container:d3.select('#newdata'),
    data:data,
    yLabel:'New data sets',
    yGrid:true,
    width:700,
    isTime:true,
    zero_based:true,
    y:d3.scaleLinear().rangeRound([200, 0]).domain([0,100])
  })

  chart.g()
    .append("g")
      .attr("class", "annotation-group black")
      .call(d3.annotation()
        .notePadding(5)
        .type(d3.annotationCalloutElbow)
        .annotations([{
          note:{title:'19.2.2014',label:'403 new data sets'},
          x:chart.x(chart.parseTime('2014-02-19')),
          y:20,
          dx:20,
          dy:50
        }])
      )
}).catch(err=>{ throw err; })

d3.csv('./output/charts/seasonal.csv').then(data=>{
  lineChart({
    container:d3.select('#seasonal'),
    data:data,
    yLabel:'Downloads rel. to year\'s max.',
    width:700,
    xGrid:true,
    group_column:'year',
    date_column:'month',
    zero_based:true,
    xTicks:(d)=>{
      //let m = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
      let m = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
      return m[d]
    },
    colors:{
      2014:'rgba(0,0,0,0.25)',
      2015:'rgba(0,0,0,0.5)',
      2016:'rgba(0,0,0,0.75)',
      2017:'rgba(0,0,0,0.1)'
    }
  })
}).catch(err=>{ throw err; })

d3.csv('./output/charts/overtime.csv').then(data=>{
  lineChart({
    container:d3.select('#individual'),
    data:data,
    group_column:'type',
    colors:'rgba(0,0,0,0.1)'
  })

  heatgrid({
    container:d3.select('#individual'),
    data:data,
    rows:10,
    cols:24,
    zero_based:true
  })
}).catch(err=>{ throw err; })

  d3.csv('./output/charts/histofull.csv').then(data=>{
    histogram({
      container:d3.select('#histograms-1'),
      data:data,
      data_column:'all'      
    })
    histogram({
      container:d3.select('#histograms-2'),
      data:data,
      data_column:'mean'      
    })
    histogram({
      container:d3.select('#histograms-3'),
      data:data,
      data_column:'median'      
    })
    histoline({
      container:d3.select('#histograms-1'),
      data:data,
      data_column:'all'      
    })
    histoline({
      container:d3.select('#histograms-2'),
      data:data,
      data_column:'mean'      
    })
    histoline({
      container:d3.select('#histograms-3'),
      data:data,
      data_column:'median'      
    })
  }).catch(err=>{ throw err; })

d3.select('#showhistos').on('click', ()=>{
  let el = d3.select('#individual-histograms'),
    but = d3.select('#showhistos'),
    display = el.style('display')

  if(display == 'block'){
    el.style('display','none')
    but.text('Show the first 12 month of a data set in histograms')
  }else{
    el.style('display','block')
    but.text('Hide histograms')
  }
})

d3.csv('./output/charts/histotime.csv').then(data=>{

  let type = 'median' // mean,median
  let maxs = [], overallmax = 0
  for(let t = 1; t<=12; t++){
    maxs[t] = 0
    data.forEach(d=>{
      if(d['t'+t+'_'+type] != 'NaN'){
        maxs[t]++
      }
    })
    if(maxs[t]>overallmax) overallmax = maxs[t]
  }

  for(let t = 1; t<=12; t++){
    let chart = histogram({
      container:d3.select('#individual-histograms'),
      data:data,
      width:400,
      height:200,
      maxValue:160,
      maxLength:820,
      bins:20,
      equalize:(d)=>d/maxs[t]*overallmax,
      data_column:`t${t}_${type}`
    })

    chart.g().append('g').attr('transform', `translate(${chart.dWidth()},0)`)
      .append('text').attr('text-anchor','end').text(t+' Monate nach Release')
      .attr('dy',6)
      .style('font-family','sans-serif').style('font-weight','bold').style('font-size',12)
  }
}).catch(err=>{ throw err; })

d3.csv('./output/charts/group_author.csv').then(data=>{

  let chart = stackedArea({
    container:d3.select('#stacked_groups_2'),
    data:data,
    isTime:true,
    height:600,
    width:700
  })

  d3.select('#stacked_groups_2-abs').on('click', ()=>{
    chart.setMode(true)
    chart.update()
  })

  d3.select('#stacked_groups_2-rel').on('click', ()=>{
    chart.setMode(false)
    chart.update()
  })


}).catch(err=>{ throw err; })

d3.csv('./output/charts/group_group_name.csv').then(data=>{

  let chart = stackedArea({
    container:d3.select('#stacked_groups_1'),
    data:data,
    isTime:true,
    height:600,
    width:700
  })

  d3.select('#stacked_groups_1-abs').on('click', ()=>{
    chart.setMode(true)
    chart.update()
  })

  d3.select('#stacked_groups_1-rel').on('click', ()=>{
    chart.setMode(false)
    chart.update()
  })

}).catch(err=>{ throw err; })

d3.csv('./output/charts/group_license_title.csv').then(data=>{

  let chart = stackedArea({
    container:d3.select('#stacked_groups_3'),
    data:data,
    isTime:true,
    height:600,
    width:700
  })

  d3.select('#stacked_groups_3-abs').on('click', ()=>{
    chart.setMode(true)
    chart.update()
  })

  d3.select('#stacked_groups_3-rel').on('click', ()=>{
    chart.setMode(false)
    chart.update()
  })


}).catch(err=>{ throw err; })

const buildTable = (data,id) => {

  let table = d3.select('#'+id).append('table'),
      thead = table.append('thead').append('tr'),
      tbody = table.append('tbody'),
      tr = tbody.selectAll('tr').data(data).enter().append('tr')

  thead.append('th').text('Dataset')
  thead.append('th').text('Downloads')

  tr.append('td').html(d=> ('group' in d) ? `<strong><a href="https://daten.berlin.de/datensaetze/${d.page}">${d.page}</a></strong><br /><span class="small">${d.group}</span>` : `<a href="https://daten.berlin.de/datensaetze/${d.page}">${d.page}</a>`)
  tr.append('td').html(d=>`<strong>${Math.round(d.count)}</strong>`)
}



d3.csv('./output/charts/top_abs.csv').then(data=>{
  buildTable(data, 'top_abs')
}).catch(err=>{ throw err; })

d3.csv('./output/charts/top_month.csv').then(data=>{
  buildTable(data,'top_month')
}).catch(err=>{ throw err; })

d3.csv('./output/charts/top_group_abs.csv').then(data=>{
  buildTable(data,'top_group_abs')
}).catch(err=>{ throw err; })

d3.csv('./output/charts/top_group_month.csv').then(data=>{
  buildTable(data,'top_group_month')
}).catch(err=>{ throw err; })