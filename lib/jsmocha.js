// Namespace jsmocha
var jsMocha = {};

jsMocha.Loader = function(files, prefix) {
  for(var i=0;i<files.length;i++){
    var elm = document.createElement('script');
    elm.setAttribute("type","text/javascript");
    elm.setAttribute("src", prefix+'jsmocha/'+files[i]+'.js');
    document.getElementsByTagName("head")[0].appendChild(elm);
  }
};

jsMocha.Loader(['cardinality', 'expectation', 'expectation_list', 'mock', 'parameters_matcher'], typeof jsmocha_load_path != 'undefined' ? jsmocha_load_path : 'lib/');
