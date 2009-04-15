/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add("classnamemanager",function(B){var A="classNamePrefix",C="classNameDelimiter";B.config[A]=B.config[A]||"yui";B.config[C]=B.config[C]||"-";B.ClassNameManager=function(){var D=B.config[A],F=B.config[C],E={};return{getClassName:function(H,G){if(G){H=B.Array(arguments,0,true).join(F);}return E[H]||(E[H]=D+F+H);}};}();},"3.0.0pr2");