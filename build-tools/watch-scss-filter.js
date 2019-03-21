// const fs = require('fs');
const path = require('path');
module.exports = function(pt) {
  // console.log(path);
  // console.log(stat);

  console.log(pt);
  if (path.extname(pt) === '.scss' || pt.indexOf('_scss') !== -1) {
    console.log('trigger');
    return true;
  } else {
    console.log('no trigger');
    return false;
  }
};
