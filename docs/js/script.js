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

if(d3.select('.embed').size()>=1){
	window.addEventListener('resize', embedResize);
	embedResize();
}

if(d3.select('#minilogo').size()>=1){
	d3.selectAll('.gallery li')
	    .classed('two-break', function(d,i){ return (i%2==0)?true:false; })
	    .classed('three-break', function(d,i){ return (i%3==0)?true:false; });
}else if(d3.select('#logo').size()>=1){
	logo(d3.select('#logo'), 200, 20, 5, false, true, {min:0.2, max:2});
	d3.selectAll('#project-list li')
	    .classed('two-break', function(d,i){ return (i%2==0)?true:false; })
	    .classed('three-break', function(d,i){ return (i%3==0)?true:false; });
	d3.selectAll('#team-list li')
	    .classed('two-break', function(d,i){ return (i%2==0)?true:false; })
	    .classed('three-break', function(d,i){ return (i%3==0)?true:false; });
}

/* Lightbox */

var galleries = d3.selectAll('.gallery.lghtbx');
var links = [], subtitles = [];
galleries.each(function(d, gi){
    var urls = [], titles = [];
    d3.select(this).selectAll('a').each(function(d, ai){
        var a = d3.select(this);
        urls.push(a.attr('href'));
        titles.push(a.attr('title'));
        a.on('click', function(){
            d3.event.preventDefault();    
            lightbox(links[gi], subtitles[gi], ai);
        });
    });
    links.push(urls);
    subtitles.push(titles);
});

d3.selectAll('a.lghtbx')
    .on('click', function(){
        d3.event.preventDefault();
        var d = d3.select(this);
        lightbox([d.attr('href')], [d.attr('title')], 0);
    });

function lightbox(urls, titles, i){
    var box = d3.select('body').append('div').attr('id','lightbox');

    var img = box.append('div').attr('id', 'lghtbx-container')
        .append('div').attr('class','outer')
        .append('div').attr('class','middle')
        .append('div').attr('class','inner')
            .append('img').attr('src','../../images/transparent.gif')
            .on('click', function(){
                box.remove();
            });

    box.append('div').text('Close / Schließen').attr('id', 'lghtbx-close')
        .on('click', function(){
            box.remove();
        });

    if(urls.length > 1){
        var next = box.append('a').attr('id','lghtbx-next').on('click', function(){
            if(i<urls.length-1){
                i++;
                loadImage();
            }
        });
        var prev = box.append('a').attr('id','lghtbx-prev').on('click', function(){
            if(i>0){
                i--;
                loadImage();
            }
        });
    }

    var subline = box.append('a').attr('id', 'lghtbx-subline').append('span').style('display','none');

    function loadImage(){
        if(urls.length > 1){
            prev.classed('inactive',false);
            next.classed('inactive',false);
            if(i==0){
                prev.classed('inactive',true);
            }
            if(i==urls.length-1){
                next.classed('inactive',true);   
            }
        }

        var loader = new Image();
        loader.onload = function(){
            img.attr('src', urls[i]);
            if(titles[i].length > 0){
                subline
                    .text(titles[i])
                    .style('display','block');
            }
        };

        img.attr('src','../../images/transparent.gif');
        loader.src = urls[i];
    }

    loadImage();
}