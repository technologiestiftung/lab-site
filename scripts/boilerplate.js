//Create a new project based on the boilerplate

/*

copy boilerplate to new folder

modify index.html and index_en.html

thanks

*/

var fs = require('fs'),
	ncp = require('ncp').ncp;
	ncp.limit = 2;
 
var default_params = {
	LIVE:false,
	TYPE:'full',
	PROJECT : '{{PROJECT}}', //project URL
	DATE : '{{DATE}}',
	EMAIL : '{{EMAIL}}',	
	GITHUB_URL : '{{PROJECT}}',
	TWITTER_HANDLE : '{{TWITTER_HANDLE}}',
	AUTHOR : '{{AUTHOR}}',
	AUTHOR_IMAGE : '{{AUTHOR_IMAGE}}',
	AUTHOR_BIO_DE : '{{AUTHOR_BIO_DE}}',
	AUTHOR_BIO_EN : '{{AUTHOR_BIO_EN}}',
	TAG_DE : '{{TAG_DE}}',
	TAG_EN : '{{TAG_EN}}',
	PROJECT_DESCRIPTION_DE : '{{PROJECT_DESCRIPTION_DE}}',
	PROJECT_DESCRIPTION_EN : '{{PROJECT_DESCRIPTION_EN}}',
	PROJECT_TITLE_DE : '{{PROJECT_TITLE_DE}}',
	PROJECT_TITLE_EN : '{{PROJECT_TITLE_EN}}',
	SHORT_TITLE_DE : '{{SHORT_TITLE_DE}}',
	SHORT_TITLE_EN : '{{SHORT_TITLE_EN}}',
	SHORT_SUBTITLE_DE : '{{SHORT_SUBTITLE_DE}}',
	SHORT_SUBTITLE_EN : '{{SHORT_SUBTITLE_EN}}'
}

//TODO: Add user

for(var i = 2; i<process.argv.length; i++){
	var pair = process.argv[i].split('=')
	if(!(pair[0] in default_params)){
		console.log('unknown param '+pair[0])
	}else{
		if(pair[0] == 'TWITTER_HANDLE' && pair[1].indexOf('@')!=0){
			pair[1] = '@'+pair[1]
		}
		default_params[pair[0]] = pair[1]
	}
}

if (fs.existsSync('./authors/'+default_params.AUTHOR+'.json')) {
    let author = JSON.parse(fs.readFileSync('./authors/'+default_params.AUTHOR+'.json', 'utf8'))
    for(var key in author){
    	default_params[key] = author[key]
    }
}

if(default_params.PROJECT == '{{PROJECT}}'){

	console.log('You must provide the PROJECT param, in order to create a new folder for your project.')

}else{

	var path = './docs/projects/'+ default_params.PROJECT

	if (fs.existsSync(path)) {
		console.log('PROJECT folder already exists, overwriting is disabled, please delete the folder first')
	}else{
		//Create Folder
		fs.mkdirSync(path)
		fs.writeFileSync(path + '/project.json', JSON.stringify(default_params), 'utf8')

		//Copy Boilerplate
		ncp('./docs/projects/boilerplate'+(default_params.TYPE=='full')?'':'-light', path, function (err) {
			if (err) { return console.error(err); }

			(['index.html','index_en.html']).forEach(function(file){
				var contents = fs.readFileSync(path+'/'+file, 'utf8')

				for(var key in default_params){
					if(key.indexOf('TAG_')==0){
						let tags = '';

						(default_params[key].split(',')).forEach(t=>{
							tags += '<span class="button tag">' + t.trim() + '</span>'
						})

						contents = contents.split('{{'+key+'}}').join(tags)
					}else{
						contents = contents.split('{{'+key+'}}').join(default_params[key])
					}
				}

				fs.writeFileSync(path+'/'+file, contents, 'utf8')
			})

			console.log('Project '+default_params.PROJECT+' created!')
		})

	}

}
