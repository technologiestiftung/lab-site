var sumChart = function(_container, _data){
  var module = {},
    data = _data,
    container = _container,
    el = container.append('span').attr('id','sum');

  module.init = function(){
    module.update();
  };

  module.data = function(_data){
    data = _data;
    module.update();
  };

  module.update = function(){
    el.html('<span>Aktuell angezeigte Gesamtsumme:</span><br />' + currency(data.value()));
  };

  return module;
};