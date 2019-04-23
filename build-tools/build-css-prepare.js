const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const Delims = require('delims');
const delim = new Delims(['---', '---'], {});
const meow = require('meow');
const cli = meow(`
  Usage
    ${process.argv[1]} <input file>
`);
const outpath = path.resolve(__dirname, '../tmp');
const inputFilePath = path.resolve(process.cwd(), `${cli.input[0]}`);
rimraf(outpath, (e1) => {
  if (e1) {
    throw e1;
  }
  fs.readFile(inputFilePath, 'utf8', (e2, data) => {
    if (e2) {
      throw e2;
    }

    const fileObject = data.match(delim.matter(['---', '---'], {}));
    mkdirp(outpath, (e3) => {
      if (e3) {
        throw e3;
      }
      // tslint:disable-next-line: variable-name
      fs.writeFile(`${outpath}/index.scss`, fileObject[2], 'utf8', (error, _data) => {
        if (error) {
          throw error;
        }
        // tslint:disable-next-line: no-console
        console.log('success written file out');
        // rimraf(outpath, (e4) => {
        //   if (e4) {
        //     throw e4;
        //   }
        // });
      });
    });
  });
});
