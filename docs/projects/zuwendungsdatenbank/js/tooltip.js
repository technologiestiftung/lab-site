let tooltip = function(){

  let module = {},
  	tip = d3.select('body').append('div').attr('id', 'tooltip').html('<table><tr><td class="tp-tl"></td><td class="tp-tm tooltip-title"></td><td class="tp-tr"></td></tr><tr><td class="tp-ml"></td><td class="tp-mm tooltip-body"></td><td class="tp-mr"></td></tr><tr><td class="tp-bl"></td><td class="tp-bm"></td><td class="tp-br"></td></tr></table>'),
  	title = tip.select('.tooltip-title'),
  	body = tip.select('.tooltip-body')

  	title.text('TITLE')
  	body.text('Hello World! Was geht hier. Kann man hier noch mehr schreiben, oder was?')

  module.hide = ()=>{
  	tip.style('display','none')
  }

  module.show = obj=>{
  	title.html(obj.title)
  	body.html(obj.body)

  	module.move(obj)

  	tip.style('display','block')
  }

  module.move = obj => {
  	tip.style("left", (obj.x+3) + "px")		
       .style("top", (obj.y-20) + "px")	
  }

  return module
}