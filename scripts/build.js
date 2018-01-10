let fs = require('fs')

let index_html = {
	DE:fs.readFileSync('scripts/templates/index.html', 'utf8'),
	EN:fs.readFileSync('scripts/templates/index_en.html', 'utf8')
}

let project_path = 'docs/projects/',
	projects = [],
	filters = {DE:[],EN:[]},
	langs = ['DE','EN']

fs.readdirSync(project_path).forEach(file => {
	if (file != '.DS_Store' && file.length > 2 && fs.existsSync(project_path+file+'/project.json')) {
		let project = JSON.parse(fs.readFileSync(project_path+file+'/project.json', 'utf8'))
		if(project.DATE.indexOf('/')==-1){
			project.DATE = '12/2017'
		}
		let d = project.DATE.split('/')
		project.sort = parseInt(d[1]) + parseInt(d[0])/24
		projects.push(project)

		langs.forEach(lang=>{
			if(filters[lang].indexOf(project['TAG_'+lang])==-1){
				filters[lang].push(project['TAG_'+lang])
			}
		})
	}
})

projects.sort(function(a,b){
	return b.sort - a.sort;
})

let filter_html = {EN:'',DE:''},
	projects_html = {EN:'',DE:''}

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

		projects_html[lang] += '\n'
		projects_html[lang] += '                    <li class="f-' + strToValue(p['TAG_'+lang]) + '">'+'\n'
        projects_html[lang] += '                    	<a href="http://lab.technologiestiftung-berlin.de/projects/' + p.PROJECT + '/index' + ((lang=='DE')?'':'_en') + '.html">'+'\n'
		projects_html[lang] += '                  		  <img src="http://lab.technologiestiftung-berlin.de/projects/' + p.PROJECT + '/thumb@2x.png" alt="' + p['PROJECT_TITLE_'+lang] + '" />'+'\n'
		projects_html[lang] += '          		          <span class="tag button">' + p['TAG_'+lang] + '</span><span class="date">' + p.DATE + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="title">' + p['PROJECT_TITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="subtitle">' + p['SHORT_SUBTITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         	           </a>'+'\n'
		projects_html[lang] += '                    </li>'+'\n'

	})
	index_html[lang] = index_html[lang].replace('{{PROJECTLIST}}', projects_html[lang])

	fs.writeFileSync('docs/index' + ((lang=='DE')?'':'_en') + '.html', index_html[lang], 'utf8')
})

