let fs = require('fs')

let index_html = fs.readFileSync('scripts/templates/index.html', 'utf8'),
	index_en_html = fs.readFileSync('scripts/templates/index_en.html', 'utf8')

let project_path = 'site/projects/',
	projects = [],
	filters = []

fs.readdirSync(project_path).forEach(file => {
	if (fs.existsSync(project_path+file+'/project.json')) {
		projects.push(JSON.parse(fs.readFileSync(project_path+file+'/project.json', 'utf8')))
	}
})




                    <li><a class="button" data-value="tool">Werkzeuge</a></li>
                    <li class="f-tool">
                        <a href="http://lab.technologiestiftung-berlin.de/projects/kita-finder/">
                            <img src="./projects/kita-finder/thumb@2x.png" alt="Berliner Kitas - Status Quo" />
                            <span class="tag button">Tool</span><span class="date">10/2017</span>
                            <span class="title">Kita Suche</span>
                            <span class="subtitle">Neuartige Suche für das Verzeichnis der Berliner Kitas</span>
                        </a>
                    </li>
