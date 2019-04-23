var previewLight = function(_container, _data, _dicts, _columns, _table_root){

  var module = {},
    table_root = _table_root,
    columns = _columns,
    container = _container,
    sortKey = 'betrag',
    sortDirection = 'ASC',
    data = _data,
    dicts = _dicts,
    page = 0,
    perpage = 40;

  module.init = function(){
    module.sortData();
    module.update();
  };

  module.data = function(_data){
    data = _data;
    module.sortData();
    page = 0;
    module.update();
  };

  module.sortData = function(){
    console.log(sortDirection, sortKey)
    data.sort(function(a,b){
      var aa = a, bb = b;
      if(sortDirection == 'DESC'){
        aa = b;
        bb = a;
      }

      if(bb[sortKey]==aa[sortKey]){
        //sortKey = 'name'
      }

      if(sortKey == 'name'){
        if(bb[sortKey] < aa[sortKey]) return -1;
        if(bb[sortKey] > aa[sortKey]) return 1;
        return 0;
      }else{
        return bb[sortKey] - aa[sortKey]
      }

    });
  };

  module.setSort = function(_sortKey){
    if(sortKey == _sortKey){
      if(sortDirection == 'ASC'){
        sortDirection = 'DESC';
      }else{
        sortDirection = 'ASC';
      }
    }

    sortKey = _sortKey;
    page = 0;
    module.sortData();
    module.update();
  };

  function formNum(n){
    return ((n<10)?'0':'')+n;
  }

  module.update = function(){
    table_root.selectAll('.th-label')
      .classed('ASC', false)
      .classed('DESC', false);

    table_root.select('.th-label.th-'+sortKey)
      .classed(sortDirection, true);

    table_root.selectAll('.pagination span').text( (page*perpage + 1) + ' bis ' +  ((((page+1)*perpage)>data.length)?data.length:((page+1)*perpage)) + ' von ' + data.length);
    var tdata = data.filter(function(d,i){
      if(i>=page*perpage && i < (page+1)*perpage){
        return true;
      }
      return false;
    });
    
    container.selectAll('tr').remove();
    var rows = container.selectAll('tr').data(tdata).enter().append('tr');

    columns.forEach(function(c){
      rows.append('td').attr('class',c).datum(function(d){ return d[c]; }).html(function(d){
        console.log()
        if(c in dicts){
          return dicts[c][d];
        }
        if(c == 'betrag' || c == 'sum'){
          return currency(d);
        }
        return d;
      });
    });
  };

  module.next = function(){
    if(Math.floor(data.length/perpage)>page){
      page++;
    }
    module.update();
  };

  module.prev = function(){
    if(page > 0){
      page--;
    }
    module.update();
  };

  return module;
};