const featProjectsHandler = () => {

    let indexCurrent = 0;
    let intervalCurrent = 0;

    const featProjects = document.querySelectorAll('.featured-list__project');

    if (featProjects.length > 0) {
        const untoggleAll = (htmlCollection) => {
            for (let index = 0; index < htmlCollection.length; index++) {
                const element = htmlCollection[index];
                element.childNodes[1].classList.remove('hovered');
            };
        };
        
        for (let index = 0; index < featProjects.length; index++) {
            const element = featProjects[index];
            element.addEventListener('mouseover', () => {
                clearInterval(intervalCurrent);
                untoggleAll(featProjects);
                element.childNodes[1].classList.add('hovered');
            });
            element.addEventListener('mouseout', () => {
                untoggleAll(featProjects);
                element.childNodes[1].classList.remove('hovered');
            });
        };
    
        featProjects[indexCurrent].childNodes[1].classList.add('hovered');
    
        intervalCurrent = setInterval(() => { 
            if (indexCurrent == featProjects.length) {
                untoggleAll(featProjects);
                indexCurrent = 0;
                featProjects[indexCurrent].childNodes[1].classList.add('hovered');
                indexCurrent++
            } else {
                untoggleAll(featProjects);
                featProjects[indexCurrent].childNodes[1].classList.add('hovered');
                indexCurrent++
            }
        }, 5000);
    }
}

export default featProjectsHandler;