/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add("node-screen",function(A){A.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(B,C){A.Node.getters[B]=A.Node.wrapDOMMethod(B);});A.Node.addDOMMethods(["getXY","setXY","getX","setX","getY","setY"]);A.each(["region","viewportRegion"],function(B,C){A.Node.getters[B]=A.Node.wrapDOMMethod(B);});A.Node.addDOMMethods(["inViewportRegion"]);A.Node.methods({intersect:function(C,B,D){if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.intersect(C,B,D);},inRegion:function(C,B,D,E){if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.inRegion(C,B,D,E);}});},"3.0.0pr2",{requires:["dom-screen"]});