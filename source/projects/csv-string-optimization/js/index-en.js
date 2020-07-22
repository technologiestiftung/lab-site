d3.select('#algo-expand').on('click', function(){
  if(d3.select(this).classed('active')){
      d3.select('#algo-expand').classed('active',false);
      d3.select('#algo-expansion').style('display','none');
      d3.select('#algo-expand span').html('►');
  }else{
      d3.select('#algo-expand').classed('active',true);
      d3.select('#algo-expansion').style('display','block');
      d3.select('#algo-expand span').html('▼');
  }
});

var toggleState = false;
d3.select('#btn-toggle').on('click', function(){
  if(!toggleState){
      toggleState = true;
      d3.select('#field-template').style('display','block');
      d3.select('#table-container').style('display','none');
      d3.select(this).property('value', 'Back to the cleaning interface')
  }else{
      toggleState = false;
      d3.select('#field-template').style('display','none');
      d3.select('#table-container').style('display','block');
      d3.select(this).property('value', 'Show Template-JSON')
  }
});

/*Drag'n'Drop*/
if (typeof window.FileReader !== 'undefined') {
  var csvHolder = document.getElementById('field-csv'),
      templateHolder = document.getElementById('field-template');

  buildHolder(csvHolder);
  buildHolder(templateHolder);
}

function buildHolder(holder){
  holder.ondrop = function(e) {
      e.preventDefault();

      var file = e.dataTransfer.files[0],
          reader = new FileReader();

      reader.onload = function(event) {
          holder.innerText = event.target.result;
      };

      reader.readAsText(file);
      return false;
  };
}

var analyse_state = false;

d3.select('#field-csv').on('change', function(){
  refreshCSV();
});

d3.select('#btn-refresh').on('click', function(){
  refreshCSV();
});

d3.select('#field-template').on('change', function(){
  globalTemplate = JSON.parse(d3.select(this).node().value);
  setTemplateField(globalTemplate, true);
});

function refreshCSV(){
  d3.select('#btn-refresh-message').text('Importing data...');
  var csv = d3.select('#field-csv').node().value;
  var delimiters = ['\t',',',';'], found = 0, delimiter = ',';
  delimiters.forEach(function(d){
      var f = numberOfStrs(csv, d);
      if(f>found){
          found = f;
          delimiter = d;
      }
  });

  d3.select('#field-delimiter').property('value', delimiter);

  updateColumns();

  d3.select('#btn-refresh-message').text('');
}

d3.select('#field-delimiter').on('change', function(){
  updateColumns();
});

function updateColumns(){
  var parser = d3.dsvFormat(d3.select('#field-delimiter').property('value'));
  var csv = parser.parse(d3.select('#field-csv').node().value);
  
  d3.selectAll('#field-column option').remove();

  d3.select('#field-column').selectAll('option').data(csv.columns).enter().append('option')
      .attr('value', function(d){
          return d;
      })
      .text(function(d){
          return d;
      });
  
}

function numberOfStrs(str, stringsearch) {
  for(var i=count=0; i<str.length; count+=+(stringsearch===str[i++]));
  return count;
}

function tableHead(sel, type){
  var tr = sel.append(type).append('tr');
  tr.append('th').text('String');
  tr.append('th').text('Count');
  tr.append('th').text('Replace with');
  tr.append('th').text('Is not part of the group');
}

function setTemplateField(template, updateTable){
  var template_str = '[\n';

  template.forEach(function(d,i){
      template_str += '    [\n';
      d.forEach(function(dd,ii){
          template_str += '        '+JSON.stringify(dd);
          template_str += ((ii<d.length-1)?',':'') +'\n';
      });
      template_str += '    ]'+ ((i<template.length-1)?',':'') +'\n';
  });

  template_str += ']';

  d3.select('#field-template').node().value = template_str;

  if(updateTable){
      buildTable(template);
  }
}

function buildTable(template){
  var table = d3.select('#table-template');
  table.selectAll('*').remove();
  tableHead(table, 'thead');

  var cleanTemplate = template.filter(function(d){ if(d.length>=2){ return true; } return false; });

  if(cleanTemplate.length > 0){

      template.forEach(function(t,ti){
          if(t.length > 1){

              var tbody = table.append('tbody');

              var tr = tbody.selectAll('tr').data(t).enter().append('tr').attr('id', 'group_'+ti);

                  tr.append('td').text(function(d, i){ return d.label; });
                  tr.append('td').text(function(d, i){ return d.c; });
                  tr.append('td').append('input') 
                      .attr('name','group_'+ti)
                      .attr('type', 'radio')
                      .attr('data-group_id',ti)
                      .attr('data-item_id', function(d,i){
                          return i;
                      })
                      .attr('checked', function(d,i){
                          return (d.ok === 2)?'checked':null;
                      })
                      .on('change', function(){
                          var t = d3.select(this),
                              g_id = t.attr('data-group_id'),
                              i_id = t.attr('data-item_id');

                          globalTemplate[g_id].forEach(function(g,i){
                              globalTemplate[g_id][i].ok = 1;
                          });
                          globalTemplate[g_id][i_id].ok = 2;

                          setTemplateField(globalTemplate, false);
                      });

                  tr.append('td').attr('class','remove-link').text('x')
                      .attr('data-group_id',ti)
                      .attr('data-item_id', function(d,i){
                          return i;
                      }).on('click', function(){
                          var t = d3.select(this),
                              g_id = t.attr('data-group_id'),
                              i_id = t.attr('data-item_id');

                          globalTemplate.push([globalTemplate[g_id][i_id]]);

                          globalTemplate[g_id].splice(i_id, 1);

                          setTemplateField(globalTemplate, true);
                      });
          }
      });
  }else{

      table.append('tbody').append('tr').append('td').attr('colspan',3).text('No similar text strings were found.');
  }

  //tableHead(table, 'tfoot');
}

d3.select('#field-method').on('change', function(){
  d3.selectAll('#extra-knn, #extra-fingerprint').style('display','none');
  d3.select('#extra-'+d3.select('#field-method').node().value).style('display','block');
});

var globalTemplate = '';

d3.selectAll('.btn-send').on('click', function(){
  var btnid = d3.select(this).attr('id');
  var msg = d3.select('#'+btnid+'-message')
  msg.text('');
  if(!analyse_state){
      analyse_state = true;

      msg.text('Processing data...');

      var values = [
              ['template',true],
              ['delimiter',false],
              ['column',true],
              ['method',false],
              ['csv',false],
              ['finger_stemming',false],
              ['finger_lang',false],
              ['finger_type',false],
              ['ngram_size',false],
              ['limit',false]
          ],
          request = '';

      values.forEach(function(d,i){
          var o = d3.select('#field-'+d[0]);
          if(i>0){
              request += '&';
          }
          request += d[0] + '=' + encodeURIComponent(((d[1])?o.property('value'):o.node().value));
      });

      var type = (d3.select(this).property('id').split('-'))[1];

      fetch("https://csv-str-opti-webservice.vercel.app/"+type, { 
        method: 'POST', 
        body: JSON.stringify(request)
      })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        var template = data.data;

        if(type === 'analyse'){

            globalTemplate = template;
            setTemplateField(template, true);

        }else{

            var csv_str = '', keys = [];

            for(var key in template[0]){
                if(csv_str !== ''){ csv_str += ','; }
                csv_str += '"'+key+'"';
                keys.push(key);
            }
            csv_str += '\n';

            template.forEach(function(d,i){
                keys.forEach(function(k,ki){
                    csv_str += '"'+d[k]+'"';
                    if(ki<keys.length-1){
                        csv_str += ',';
                    }
                });
                csv_str += '\n';
            });

            d3.select('#clean-csv').node().value = csv_str;

        }

        d3.selectAll('.feedback').text('');

        analyse_state = false;
      }).catch((err) => {
        throw err;
      });
  }
});