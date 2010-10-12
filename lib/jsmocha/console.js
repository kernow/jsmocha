jsMocha.console = {
  log: function(a){
    if(typeof window.console != 'undefined'){
      console.log(a);
    }
  },
  warn: function(a){
    if(typeof window.console != 'undefined'){
      console.log(a);
    }
  }
};
