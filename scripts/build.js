let fs = require('fs')

let index_html = fs.readFileSync('scripts/templates/index.html', 'utf8'),
	index_en_html = fs.readFileSync('scripts/templates/index_en.html', 'utf8')

let project_path = 'site/projects/',
	projects = [],
	filters = {de:[],en:[]},
	langs = ['de','en']

fs.readdirSync(project_path).forEach(file => {
	if (fs.existsSync(project_path+file+'/project.json')) {
		let project = JSON.parse(fs.readFileSync(project_path+file+'/project.json', 'utf8'))
		projects.push(project)
		if(filters.de.indexOf(project.TAG_DE)==-1){
			filters.de.push(project.TAG_DE)
		}
		if(filters.en.indexOf(project.TAG_EN)==-1){
			filters.en.push(project.TAG_EN)
		}
	}
})

let filter_html = {en:'',de:''},
	projects_html = {en:'',de:''}

function strToValue(str){
	return toLowerCase(str.split(' ').join('-'));
}

langs.forEach(lang=>{
	filters[lang].forEach(f=>{
		filter_html[lang] += '\n'
		filter_html[lang] += '                    <li><a class="button" data-value="' + strToValue(f) + '">' + f + '</a></li>'
	})
	index_html.replace('{{FILTERLIST}}', filter_html[lang])
})

langs.forEach(lang=>{
	projects.forEach(p=>{

		projects_html[lang] += '\n'
		projects_html[lang] += '                    <li class="f-' + strToValue(p['TAG_'+lang]) + '">'+'\n'
        projects_html[lang] += '                    	<a href="http://lab.technologiestiftung-berlin.de/projects/' + p.PROJECT + '/index' + (lang=='de')?'':'_en' + '.html">'+'\n'
		projects_html[lang] += '                  		  <img src="http://lab.technologiestiftung-berlin.de/projects/' + p.PROJECT + '/thumb@2x.png" alt="' + p['PROJECT_TITLE_'+lang] + '" />'+'\n'
		projects_html[lang] += '          		          <span class="tag button">' + p['TAG_'+lang] + '</span><span class="date">' + p.DATE + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="title">' + p['PROJECT_TITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         		           <span class="subtitle">' + p['SHORT_SUBTITLE_'+lang] + '</span>'+'\n'
		projects_html[lang] += '         	           </a>'+'\n'
		projects_html[lang] += '                    </li>'+'\n'

	})
	index_html.replace('{{PROJECTLIST}}', projects_html[lang])
})