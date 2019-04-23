var state = {};

function retrieveUrl(){
  state = {};
  var comps = window.location.href.split('?');
  if(comps.length>1){
    var cs = comps[1].split('&');
    cs.forEach(function(c){
      var el = c.split('=');
      if(el[1]==""){
        state[el[0]] = [];
      }else{
        state[el[0]] = el[1].split(',');
      }
    });
  }
  updateFilter();
}

window.addEventListener('popstate', function() {
  retrieveUrl();
});

var dispatcher = d3.history('action');

dispatcher.on('action', function() {
  updateUI();
});