const featProjectsHandler = () => {

    let indexCurrent = 0;
    let intervalCurrent = 0;
    let className = 'collapsed';
    let intervalNew, intervallCurrent, untoggleAll

    const featProjects = document.querySelectorAll('.featured-list__project-subtext');
    const featProj = document.querySelectorAll('.featured-list__project');

    if (featProj.length > 0) {
        untoggleAll = (htmlCollection) => {
            for (let index = 0; index < htmlCollection.length; index++) {
                const element = htmlCollection[index];
                element.classList.add(className);
            };
        };
        
        for (let index = 0; index < featProj.length; index++) {
            const parent = featProj[index];
            parent.addEventListener('mouseover', () => {
                untoggleAll(featProj);
                clearInterval(intervalCurrent);
                clearInterval(intervalNew);
                parent.classList.remove(className);
            });
            parent.addEventListener('mouseout', () => {
                clearInterval(intervalCurrent);
                clearInterval(intervalNew);
                
                untoggleAll(featProj);
                parent.classList.add(className);

                intervalNew = setInterval(() => { 
                    if (indexCurrent == featProj.length) {
                        untoggleAll(featProj);
                        indexCurrent = 0;
                        featProj[indexCurrent].classList.remove(className);
                        indexCurrent++
                    } else {
                        untoggleAll(featProj);
                        featProj[indexCurrent].classList.remove(className);
                        indexCurrent++
                    }
                }, 4000);
            });
        };

    
        intervalCurrent = setInterval(() => { 
            if (indexCurrent == featProjects.length) {
                untoggleAll(featProj);
                indexCurrent = 0;
                featProj[indexCurrent].classList.remove(className);
                indexCurrent++
            } else {
                untoggleAll(featProj);
                featProj[indexCurrent].classList.remove(className);
                indexCurrent++
            }
        }, 4000);

        featProj[0].classList.remove(className);
    }

}

export default featProjectsHandler;