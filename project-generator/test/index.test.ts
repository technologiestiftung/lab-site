import {expect, test} from '@oclif/test';

import cmd = require('../src');

describe.skip('project-generator', () => {
  test
    .stdout()
    .do(() => cmd.run([]))
    .it('runs the cli returns the help', ctx => {
      expect(ctx.stdout).to.contain('Generate a new project');
    });

  // test
  //   .stdout()
  //   .do(() => cmd.run(['--name', 'jeff']))
  //   .it('runs hello --name jeff', ctx => {
  //     expect(ctx.stdout).to.contain('hello jeff')
  //   });
});
