function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

var embedResize = debounce(function() {
	d3.selectAll('.embed').each(function(){
		var w = d3.select(this).node().clientWidth;
		d3.select(this).select('img,object,video,iframe').each(function(){
			var cw = d3.select(this).attr('width'),
				ch = d3.select(this).attr('height');
			d3.select(this).style('height', Math.round(ch/cw*w)+'px');
		});
	});
}, 250);

window.addEventListener('resize', embedResize);

embedResize();

if(d3.select('#minilogo').size()>=1){
	logo(d3.select('#minilogo'), 50, 5, 5, false, true, {min:0.2, max:1.5});
}else if(d3.select('#logo').size()>=1){
	logo(d3.select('#logo'), 200, 20, 5, false, true, {min:0.2, max:2});
	d3.selectAll('#project-list li')
	    .classed('two-break', function(d,i){ return (i%2==0)?true:false; })
	    .classed('three-break', function(d,i){ return (i%3==0)?true:false; });
	d3.selectAll('#team-list li')
	    .classed('two-break', function(d,i){ return (i%2==0)?true:false; })
	    .classed('three-break', function(d,i){ return (i%3==0)?true:false; });
}