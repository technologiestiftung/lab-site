let fs = require('fs'),
	moment = require('moment')

let index_html = {
	DE:fs.readFileSync('scripts/templates/index.html', 'utf8'),
	EN:fs.readFileSync('scripts/templates/index_en.html', 'utf8')
},
feed_xml = {
	DE:fs.readFileSync('scripts/templates/feed_de.xml', 'utf8'),
	EN:fs.readFileSync('scripts/templates/feed_en.xml', 'utf8')
}

let project_path = 'docs/projects/',
	projects = [],
	filters = {DE:[],EN:[]},
	langs = ['DE','EN']

fs.readdirSync(project_path).forEach(file => {
	if (file != '.DS_Store' && file.length > 2 && fs.existsSync(project_path+file+'/project.json')) {
		let project = JSON.parse(fs.readFileSync(project_path+file+'/project.json', 'utf8'))
		if(project.LIVE){
			console.log(project.PROJECT)
			if(project.DATE.indexOf('/')==-1){
				project.DATE = '12/2017'
			}

			let date = project.DATE.split('/')

			project.sort = moment(date[2]+'-'+date[1]+'-'+date[0])
			projects.push(project)

			langs.forEach(lang=>{
				(project['TAG_'+lang].split(',')).forEach(t=>{
					if(filters[lang].indexOf(t.trim())==-1){
						filters[lang].push(t.trim())
					}
				})
			})
		}
	}
})

projects.sort(function(a,b){
	return b.sort - a.sort;
})

let filter_html = {EN:'',DE:''},
	projects_html = {EN:'',DE:''},
	items_xml = {EN:'',DE:''}

function strToValue(str){
	if(str && str.length > 1){
		return (str.split(' ').join('-')).toLowerCase().trim();
	}else{
		return '';
	}
}

langs.forEach(lang=>{
	filters[lang].forEach(f=>{
		filter_html[lang] += '\n'
		filter_html[lang] += '                    <li><a class="button" data-value="' + strToValue(f) + '">' + f + '</a></li>'
	})
	index_html[lang] = index_html[lang].replace('{{FILTERLIST}}', filter_html[lang])
})

langs.forEach(lang=>{
	projects.forEach(p=>{

		let tags = '';

		(p['TAG_'+lang].split(',')).forEach((t,i)=>{
			tags += ((i>0)?' f-':'f-')+strToValue(t.trim());
		})

		projects_html[lang] += '\n'
		projects_html[lang] += '                    <li class="show ' + tags + '">'+'\n'
        projects_html[lang] += '                    	<a href="./projects/' + p.PROJECT + '/index' + ((lang=='DE')?'':'_en') + '.html">'+'\n'
		projects_html[lang] += '                  		  <img src="./projects/' + p.PROJECT + '/thumb@2x.jpg" srcset="./projects/' + p.PROJECT + '/thumb.jpg, ./projects/' + p.PROJECT + '/thumb@2x.jpg 2x" alt="' + p['PROJECT_TITLE_'+lang] + '" />'+'\n';
		(p['TAG_'+lang].split(',')).forEach((t,i)=>{
			projects_html[lang] += '<span class="tag button">' + t.trim() + '</span>';
		})
		projects_html[lang] += '          		          <span class="date">' + p.DATE + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="title">' + p['PROJECT_TITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="subtitle">' + p['SHORT_SUBTITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         	           </a>'+'\n'
		projects_html[lang] += '                    </li>'+'\n'


		items_xml[lang] += '\n'
		items_xml[lang] += '<item>'+'\n'
		items_xml[lang] += '<title><![CDATA['+p['PROJECT_TITLE_'+lang]+']]></title>'+'\n'
		items_xml[lang] += '<link>http://lab.technologiestiftung-berlin.de/projects/'+p.PROJECT+'/index' + ((lang=='DE')?'':'_en') + '.html</link>'+'\n'
		items_xml[lang] += '<pubDate>'+p.sort.format('ddd, D MMM YYYY HH:mm:ss ')+' +0100</pubDate>'+'\n'
		items_xml[lang] += '<category><![CDATA['+p['TAG_'+lang]+']]></category>'+'\n'
		items_xml[lang] += '<description><![CDATA['+p['PROJECT_DESCRIPTION_'+lang]+']]></description>'+'\n'
		items_xml[lang] += '<content:encoded><![CDATA['+p['PROJECT_DESCRIPTION_'+lang]+']]></content:encoded>'+'\n'
		items_xml[lang] += '<dc:creator><![CDATA['+p.AUTHOR_NAME+']]></dc:creator>'+'\n'
		items_xml[lang] += '<guid isPermaLink="true">http://lab.technologiestiftung-berlin.de/projects/'+p.PROJECT+'/index' + ((lang=='DE')?'':'_en') + '.html</guid>'+'\n'
		items_xml[lang] += '</item>'+'\n'

	})
	index_html[lang] = index_html[lang].replace('{{PROJECTLIST}}', projects_html[lang])
	feed_xml[lang] = feed_xml[lang].replace('{{ITEMS}}', items_xml[lang])
	feed_xml[lang] = feed_xml[lang].replace('{{TIMESTAMP}}', moment().format('ddd, D MMM YYYY HH:mm:ss ')+' +0100')

	fs.writeFileSync('docs/index' + ((lang=='DE')?'':'_en') + '.html', index_html[lang], 'utf8')
	fs.writeFileSync('docs/feed' + ((lang=='DE')?'':'_en') + '.xml', feed_xml[lang], 'utf8')
})

