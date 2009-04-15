/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add("plugin",function(C){function A(D){A.superclass.constructor.apply(this,arguments);}A.NAME="plugin";A.NS="plugin";var B={_handles:null,initializer:function(D){if(D.owner){this._owner=D.owner;}else{}this._handles=[];},destructor:function(){if(this._handles){for(var E=0,D=this._handles.length;E<D;E++){this._handles[E].detach();}}},doBefore:function(H,F,E){var D=this._owner,G;E=E||this;if(H in D){G=C.Do.before(F,this._owner,H,E);}else{if(D.on){G=D.on(H,F,E);}}this._handles.push(G);return G;},doAfter:function(H,F,E){var D=this._owner,G;E=E||this;if(H in D){G=C.Do.after(F,this._owner,H,E);}else{if(D.after){G=D.after(H,F,E);}}this._handles.push(G);return G;},toString:function(){return this.constructor.NAME+"["+this.constructor.NS+"]";}};C.extend(A,C.Base,B);C.Plugin=A;},"3.0.0pr2",{requires:["base"]});