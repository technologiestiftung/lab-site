import {Command, flags} from '@oclif/command';
import * as dayjs from 'dayjs';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import mkdirp = require('mkdirp');
import * as path from 'path';
import slugify from 'slugify';
import * as yaml from 'yaml';

import patch from './lib/patch';
import questions from './lib/questions';
import {isFolderSync, targetPathRoot} from './lib/utils';

// interface IRepsonse {
//   folderName: string;
//   fileType: string;
//   de_title: string;
//   en_title: string;
//   de_subtitle: string;
//   en_subtitle: string;
//   description: string;
//   projectType: string;
//   colorMode: string;
//   visible: boolean;
//   featured: boolean;
//   authors: string[];
//   externalUrl: string;
//   status: string;
// }
// const frontmatter = require('./frontmatter.json');
const frontmatter: string | object = fs.readFileSync(path.resolve(__dirname, './frontmatter.yml'), 'utf8');

// tslint:disable-next-line:no-console
// console.log(yaml.parse(frontmatter));

// process.exit();
interface IAssets {
  folders: string[];
  files: string[];
  code: Array<{path: string, content: string}>;
  frontmatter: string | object;
}
const assets: IAssets = {
  folders: ['css', 'en', 'de', 'js', 'images', 'downloads'],
  files: ['en/index', 'de/index'],
  code: [
    {path: 'js/index.js', content: 'console.log(\'hello from project js\')'},
    {path: 'css/index.css', content: 'body{color:tomato};'}],
  frontmatter
};
// assumes this is run from the root of the lab-site folder
// by a npm script
let response: any;

class ProjectGenerator extends Command {
  static description = `Generate a new project for @technologiestiftung
When you run this from a npm-scripts in our project
you have to add \`--\` to execute the commands. E.g.

    Call the help:
    $ npm run new-project -- --help

    Or generate a new project with HTML files under
    /source/projects/my-cool-project/…
    with the default frontmatter:
    $ npm run new-project -- "my cool project" -t html

    Or start the interactive prompt for generating your yaml frontmatter
    $ npm run new-project -- -p
    ________________________________
             < wooohoo \o/ >
    --------------------------------
  `;

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    type: flags.string({
      char: 't',
      description: 'the type of project possible "md" or "html"',
      default: 'md',
      options: ['md', 'html']
    }),
    prompt: flags.boolean({char: 'p',
      description: 'Use the interactive prompt to fill the yaml frontmatter\n(if not used a default will be inserted)',
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f',
      description: '💀 force the overwrite of existing files.', }),
  };

  static args = [{name: 'title', description: 'The folder for the new project. (Whitspace will be replaced uppercase as well)'}];

  async run() {
    const {args, flags} = this.parse(ProjectGenerator);
    let foldername: string | null = null;
    let type = flags.type;

    if (flags.prompt) {
      const q: any = questions(flags.force);
      response = await inquirer.prompt(q);
    }
    this.log(JSON.stringify(response));
    if (flags.force === true) {
      this.warn(`☝️ Force is used - proceed with caution: ${flags.force}`);
    }
    if (args.title === undefined && !flags.prompt) {
      await ProjectGenerator.run(['--help']);
    }
    // we have a title and no prompt
    // set some default values that also have a corresponding
    // value in the prompt

    type = (flags.prompt === true) ? response.fileType : type;
    foldername = (flags.prompt === true) ? response.folderName : slugify(args.title).toLowerCase();
    const target = path.resolve(process.cwd(), `${targetPathRoot}${foldername}`);

    // this.log(`target path: ${target}`);
    if (isFolderSync(target) && !flags.force) {
      this.error(`\n🚨 🚨 🚨\nThe folder\n\n ➡️ ${target}\n\nalready exists.\n🚨 🚨 🚨\n☝️ Use --force -f to overwrite\n\n\n\n`);
      this.exit(0);
    } else if (isFolderSync(target) && flags.force) {
      this.warn('recreating folder existing folder (I\'ll make a backup just in case this is an error)');
      fs.renameSync(target, `${target}-backup`);
    }
    assets.folders.forEach(folder => {
      let pt = `${target}/${folder}`;
      mkdirp.sync(pt);
    });

    assets.files.forEach(file => {
      let patched;
      let ymlfm = '';
      // and some dumb manual patching:
      // patch the frontmatter if we used the prompt
      if (flags.prompt) {
        patched = patch(yaml.parse(assets.frontmatter as string), response);
        if (file.indexOf('en') === 0) {
          patched.title = response.en_title;
          patched.subtitle = response.en_subtitle;
          patched.lang = 'en';
        } else if (file.indexOf('de') === 0) {
          patched.title = response.de_title;
          patched.subtitle = response.de_subtitle;
          patched.lang = 'de';
        }
        patched.date = dayjs().format('YYYY-MM-DD');

      }
      ymlfm = (flags.prompt === true) ? yaml.stringify(patched) : assets.frontmatter as string;
      fs.writeFileSync(`${target}/${file}.${type}`, `---\n${ymlfm}\n---\n`);
    });
    assets.code.forEach(ele => {
      fs.writeFileSync(`${target}/${ele.path}`, ele.content);
    });
  }
}

export = ProjectGenerator;
