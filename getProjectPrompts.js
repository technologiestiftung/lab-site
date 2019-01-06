const prompts = require('prompts');

async function getProjectPrompts() {
    // TODO: Alternative project title for url?
    const projectQuestions = [
        {
            type: 'text',
            name: 'title',
            message: 'What is the new projects name?',
            validate: value =>
                value.length > 0 ? true : 'Please enter a project name'
        },
        {
            type: 'multiselect',
            name: 'authors',
            message: 'Who are the authors?',
            choices: [
                {
                    title: 'Benjamin',
                    value: 'Benjamin Seibel',
                    selected: true
                },
                { title: 'Sebabstian', value: 'Sebastian Meier' },
                { title: 'Tori', value: 'Victoria Dykes' },
                { title: 'Fabian', value: 'Fabian Dinklage' }
            ]
        },
        {
            type: 'select',
            name: 'type',
            message: 'Is this a featured project?',
            choices: [
                { title: 'Non-featured project', value: 'non-featured' },
                { title: 'Featured project', value: 'featured' }
            ]
        },
        {
            type: 'select',
            name: 'type',
            message: 'What is the status of the project?',
            choices: [
                { title: 'Project is ongoing', value: 'ongoing' },
                { title: 'Already finished', value: 'finished' }
            ]
        },
        {
            type: 'select',
            name: 'type',
            message: 'What is the projects type?',
            choices: [
                { title: 'Publication', value: 'publication' },
                { title: 'Prototype', value: 'prototype' },
                { title: 'Workshop', value: 'workshop' },
                { title: 'Dataset', value: 'dataset' }
            ]
        },
        {
            type: 'confirm',
            name: 'confirmation',
            message: (prev, values) => `Create new project: ${values.title}?`
        }
    ];

    return await prompts(projectQuestions);
}

module.exports = getProjectPrompts;
