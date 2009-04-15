/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr2
*/
YUI.add('node-event-simulate', function(Y) {

/*
 * Functionality to simulate events.
 * @module node
 * @for Node
 * @submodule node-event-simulate
 */

    /**
     * Simulates an event on the node.
     * @param {String} type The type of event to simulate (i.e., "click").
     * @param {Object} options (Optional) Extra options to copy onto the event object.
     * @return {void}
     * @method simulate
     * @static
     */     
    Y.Node.prototype.simulate = function(type, options){
        Y.Event.simulate(Y.Node.getDOMNode(this), type, options);
    };



}, '3.0.0pr2' ,{requires:['node-base']});
