const prompts = require('prompts');

async function getProjectPrompts() {
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
                { title: 'Author 1', value: 'author-one', selected: true },
                { title: 'Author 2', value: 'author-two' },
                { title: 'Author 3', value: 'author-three' }
            ]
        },
        // {
        //     type: 'select',
        //     name: 'type',
        //     message: 'Is this a featured project?',
        //     choices: [
        //         { title: 'Non-featured project', value: 'non-featured' },
        //         { title: 'Featured project', value: 'featured' },
        //     ]
        // },
        // {
        //     type: 'select',
        //     name: 'type',
        //     message: 'What is the status of the project?',
        //     choices: [
        //         { title: 'Project is ongoing', value: 'ongoing' },
        //         { title: 'Already finished', value: 'finished' },
        //     ]
        // },
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
            message: (prev, values) => `Create new project: ${values.name}?`
        }
    ];

    return await prompts(projectQuestions);
}

module.exports = getProjectPrompts;
