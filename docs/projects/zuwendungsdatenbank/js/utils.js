var debouncer = function ( func , _timeout ) {
  var timeoutID , timeout = _timeout || 200;
  return function () {
    var scope = this , args = arguments;
    clearTimeout( timeoutID );
    timeoutID = setTimeout( function () {
      func.apply( scope , Array.prototype.slice.call( args ) );
    } , timeout );
  };
};

function currency(d){
  var d = (d+'').split(''), c = '', j = 0;
  for(var i = d.length-1; i>=0; i--){
    c = d[i] + c;
    if(j == 2 && i != 0){
      c = '.'+c;
      j = -1;
    }
    j++;
  }
  return c + '&nbsp;€';
}

function createURL(){
  var keys = [];
  for(var key in state){ keys.push(key + '=' + state[key]); }
  return '?' + keys.join('&');
}

function cleanId(id){
  switch(id){
    case '000': return '00'; break;
    case '001': return '01'; break;
    case '002': return '02'; break;
    case '003': return '03'; break;
    case '004': return '04'; break;
    case '005': return '05'; break;
    case '006': return '06'; break;
    case '007': return '07'; break;
    case '008': return '08'; break;
    case '009': return '09'; break;
    default: return id; break;
  }
}