/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add("dd-plugin",function(B){var A=function(C){C.node=C.owner;A.superclass.constructor.apply(this,arguments);};A.NAME="dd-plugin";A.NS="dd";B.extend(A,B.DD.Drag);B.namespace("plugin");B.plugin.Drag=A;},"3.0.0pr2",{requires:["dd-drag"],skinnable:false,optional:["dd-constrain","dd-proxy"]});