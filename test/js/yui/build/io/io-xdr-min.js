/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add("io-xdr",function(C){var A="io:xdrReady";function B(E,F){var D='<object id="yuiIoSwf" type="application/x-shockwave-flash" data="'+E+'" width="0" height="0">'+'<param name="movie" value="'+E+'">'+'<param name="FlashVars" value="yid='+F+'">'+'<param name="allowScriptAccess" value="sameDomain">'+"</object>";C.get("body").appendChild(C.Node.create(D));}C.mix(C.io,{_transportMap:{},_fn:{},_xdr:function(D,E,F){if(F.on){this._fn[E.id]=F.on;}E.c.send(D,F,E.id);return E;},xdrReady:function(D){C.fire(A,D);},transport:function(D){switch(D.id){case"flash":B(D.src,D.yid);this._transportMap.flash=C.config.doc.getElementById("yuiIoSwf");break;}}});},"3.0.0pr2",{requires:["io-base"]});