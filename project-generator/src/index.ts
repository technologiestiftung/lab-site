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
// const ui = new inquirer.ui.BottomBar();

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
interface IConfirm {
  aok: boolean;
}
const assets: IAssets = {
  folders: ['css', 'en', 'de', 'js', 'images', 'downloads'],
  files: ['en/index', 'de/index'],
  code: [
    { path: 'js/index.js', content: 'console.log(\'hello from project js\')' },
    { path: 'css/index.css', content: '' }],
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
    let folderName: string | null = null;
    let type = flags.type;

    if (flags.prompt) {
      const q: any = questions(flags.force);
      response = await inquirer.prompt(q);
      response.externalUrl = response.externalUrl.length === 0 ? null : response.externalUrl;
      process.stdout.write('\n\n---------------------\n\n');
      process.stdout.write('\n\n!!!!R E S U L T S!!!!\n\n');
      process.stdout.write(yaml.stringify(response));
      process.stdout.write('\n\n---------------------\n\n');
      const confirm: IConfirm = await inquirer.prompt([{name: 'aok',
        message: 'Is this corect?', type: 'list', choices: [
          {name: '✅ (Y) Yeah baby!', value: true},
          {name: '⛔️ (n) Upsi. Let me start over.', value: false}
        ]
      }
      ]);
      if (confirm.aok === false) {
        process.stdout.write('aborting');
        this.exit(0);
      }
    }
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
    folderName = (flags.prompt === true) ? response.folderName : slugify(args.title).toLowerCase();
    const target = path.resolve(process.cwd(), `${targetPathRoot}${folderName}`);

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
          patched.description = response.en_description;
        } else if (file.indexOf('de') === 0) {
          patched.title = response.de_title;
          patched.subtitle = response.de_subtitle;
          patched.description = response.de_description;
          patched.lang = 'de';
        }
        // patched.externalUrl = (patched.externalUrl.length === 0) ? null : patched.externalUrl;
        patched.date = dayjs().format('YYYY-MM-DD');
        delete patched.de_description;
        delete patched.en_description;
        delete patched.en_title;
        delete patched.de_title;
        delete patched.de_subtitle;
        delete patched.en_subtitle;
        delete patched.folderName;
        delete patched.fileType;
        if (response.externalUrl === null) {
          delete patched.externalUrl;
        }

        patched.featuredImage = `/projects/${folderName}/images/featured.jpg`;
        patched.heroImage = `/projects/${folderName}/images/hero.jpg`;
        patched.thumbnail = `/projects/${folderName}/images/thumbnail.jpg`;

        this.log('🚀 This will be your yaml frontmatter\n\n');
        this.log(yaml.stringify(patched));
        this.log('\n\n----------------------------------\n\n');
        this.log('To If you did some errors overwrite this with --force');
        this.log(' npm run new-project -- --prompt --force');
        this.log('\n\n----------------------------------\n\n');
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
