
import {buildTargetPath, isFolderSync, slug} from '../utils';
const questions = (force: boolean) => {
  return [{
    name: 'folderName',
    message: '📁 What should be the folder name? (Will appear in the url)',
    type: 'input',
    filter: async (value: string) => {
      return slug(value);
    },
    validate: (value: string) => {
      if (value) {
        const pt = buildTargetPath(slug(value));
        if (isFolderSync(pt) === true && force === false) {
          process.stdout.write('\n\n 🚨 🚨 🚨 The folder already exists  🚨 🚨 🚨 \n\n');
          return false;
        } else if (isFolderSync(pt) === false) {
          return true;
        } else if (isFolderSync(pt) === true && force === true) {
          return true;
        }
      } else {
        process.stdout.write('\n\n 🚨 🚨 🚨 No value given 🚨 🚨 🚨 \n\n');
        process.exit(1);
      }
    }
  },
    {
      name: 'fileType',
      message: '📄 What type of markup do you want to use?',
      type: 'list',
      choices: [{name: 'Markdown [M↓]', value: 'md', default: true}, {name: 'HTML ', value: 'html'}]
    },
    {
      name: 'de_title',
      message: '🇩🇪  Write a title:',
      type: 'input',
    },
    {
      name: 'en_title',
      message: '🇬🇧  Write a title:',
      type: 'input',
    },
    {
      name: 'de_subtitle',
      message: '🇩🇪  Write a subtitle:',
      type: 'input',
    },
    {
      name: 'en_subtitle',
      message: '🇬🇧  Write a subtitle:',
      type: 'input',
    },
    {
      name: 'description',
      message: '🍼 Write a description for the RSS feed:',
      type: 'input',
    },
    {
      name: 'type',
      message: '⚙️  What type of project is this?',
      type: 'list',
      choices: [{name: 'publication'}, {name: 'workshop'}, {name: 'dataset'}, {name: 'prototype'}]

    },
    {
      name: 'colorMode',
      message: '🎨 Is the header image bright or dark?',
      type: 'list',
      choices: [{name: 'bright', value: 'bright', default: true}, {name: 'dark', value: 'dark'}]
    },
    {
      name: 'visible',
      message: '👀 Should the project be visible?',
      type: 'list',
      choices: [{name: 'is visible', value: true}, {name: 'is not visible', value: false}]
    },
    {
      name: 'featured',
      message: '🥇 Should it be a featured image?',
      type: 'list',
      choices: [{name: 'is featured', value: true}, {name: 'is not featured', value: false, default: true}]
    },
    {
      name: 'authors',
      message: '✏️  Who are the authors?',
      type: 'checkbox',
      choices: [
      {name: '🙄  Alexandra Kapp', value: 'alexandra-kapp'},
      {name: '🧐  Benjamin Seibel', value: 'benjamin-seibel'},
      {name: '😳  Fabian Dinklage', value: 'fabian-dinklage'},
      {name: '🤔  Fabian Morón Zirfas', value: 'fabian-moron-zirfas'},
      {name: '😬  Sebastian Meier', value: 'sebastian-meier'},
      {name: '🤩  Victoria Dykes', value: 'victoria-dykes'},
      ]
    },
    {
      name: 'externalUrl',
      message: '🔗 Is there a external url for the project?',
      type: 'input',
    },
    {
      name: 'status',
      message: '⌛️ What is the status of the project?',
      type: 'list',
      choices: [{name: 'is ongoing', value: 'ongoing'}, {name: 'is finished', value: 'finished', default: true}]
    },
  ];
};
export default questions;
