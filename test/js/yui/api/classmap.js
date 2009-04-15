YAHOO.env.classMap = {"Test.Case": "yuitest", "Console": "console", "DOM": "dom", "JSON": "json", "Test.DateAssert": "yuitest", "YUI": "yui", "State": "attribute", "Test.ArrayAssert": "yuitest", "YUI~object": "yui", "YUI~substitute": "substitute", "io": "io", "Do.Method": "event", "Assert.UnexpectedError": "yuitest", "Node": "node", "Do": "event", "Widget": "widget", "Test.Runner": "yuitest", "Assert.ShouldError": "yuitest", "YUI~array": "yui", "Overlay": "overlay", "Drag": "dd", "Selector": "dom", "Assert": "yuitest", "Event.Handle": "event", "Assert.UnexpectedValue": "yuitest", "Base": "base", "Cookie": "cookie", "Proxy": "dd", "Y.Profiler": "profiler", "Event.Target": "event", "Test.Format.Mock": "yuitest", "Lang": "yui", "Slider": "slider", "plugin.NodeMenuNav": "node-menunav", "Test.Suite": "yuitest", "DragConstrained": "dd", "Do.AlterArgs": "event", "Plugin": "plugin", "Assert.ShouldFail": "yuitest", "Drop": "dd", "plugin.DropPlugin": "dd-plugin", "ClassNameManager": "classnamemanager", "Event.Facade": "event", "Test.TestNode": "yuitest", "Do.Error": "event", "Assert.ObjectAssert": "yuitest", "WidgetStdMod": "widget-stdmod", "DDM": "dd", "Test.Wait": "yuitest", "Do.Halt": "event", "Easing": "anim", "Event.Custom": "event", "Queue": "queue", "Assert.ComparisonFailure": "yuitest", "WidgetPositionExt": "widget-position-ext", "YUI~dump": "dump", "WidgetStack": "widget-stack", "plugin.Anim": "anim", "Attribute": "attribute", "Get": "yui", "Event.Subscriber": "event", "Do.AlterReturn": "event", "Loader": "yui", "YUI~oop": "oop", "PluginHost": "widget", "Test.Reporter": "yuitest", "Assert.Error": "yuitest", "WidgetPosition": "widget-position", "UA": "yui", "Event": "event", "plugin.DragPlugin": "dd-plugin"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
