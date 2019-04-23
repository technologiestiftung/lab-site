var fs = require('fs');

var filePath = '../data/politikbereich.json';


function getTotalPerYear(filepath) {

  var totalSum = {
    desc: 'sum of all transfers per year',
    money: [],
    count: []
  };

  fs.readFile(filePath, (err,data) => {

    var json = JSON.parse(data);
  
    for (let i = 0; i < 8; i++) {
  
      var sum = 0;
      var count = 0;
  
      json.forEach(element => {
        if (element.years[i].money != undefined) {
          var currentYear = element.years[i].money;
          var currCount = element.years[i].count;
          sum += currentYear;
          count += currCount;
        }
  
      });
      totalSum.money.push(sum);
      totalSum.count.push(count);
    }
    shares(totalSum, json);

  });
}


function writeFile(data) {
  var parsed = JSON.stringify(data);
  fs.writeFile('../data/politikbereich_extended.json', parsed, err => {
    if (err) {console.log(err);}
  });
};


function shares(share, data) {

  data.forEach( sector => {
    sector.years.forEach( (year,i) => {
      var shareTotal = share.money[i];
      var shareCount = share.count[i];
      year.moneyShare = Math.abs(((year.money / shareTotal) * 100).toFixed(2));
      year.countShare = Math.abs(((year.count / shareCount) * 100).toFixed(2));
    })
  })

  writeFile(data);
}



getTotalPerYear(filePath);


