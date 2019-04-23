import {expect} from '@oclif/test';
// import * as fs from 'fs';
// import * as yaml from 'yaml';

import patch, {IObject} from '../src/lib/patch';

// const yamlsrc = fs.readFileSync('./src/frontmatter.yml', 'utf8');
// const orig = yaml.parse(yamlsrc);

// const res = {
//   folderName: '',
//   fileType: 'md',
//   'de-title': '',
//   'en-title': '',
//   'de-subtitle': '',
//   'en-subtitle': '',
//   description: '',
//   type: 'publication',
//   colorMode: 'bright',
//   visible: true,
//   featured: true,
//   authors: ['fabian-moron-zirfas'],
//   externalUrl: '',
//   status: 'ongoing'};
describe('patches json objects', () => {
  it('should patch an json object', () => {
    const template: IObject = {foo: 'bah'};
    const obj = {foo: 'bam', boom: 12};
    const patched = patch(template, obj);
    process.stdout.write(JSON.stringify(patched));
    expect(patched).deep.equal({foo: 'bam', boom: 12});
  });
});
