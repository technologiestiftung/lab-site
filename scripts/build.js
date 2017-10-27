//Move the site folder to the server directory

var ncp = require('ncp').ncp;

ncp('./site', '../path_to_html', function (err) {
	if(err){
		console.log(err)
	}
	console.log('DONE')
})