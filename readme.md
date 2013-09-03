Loader
============

Simple html  loader
----------------------------

If you want to include an html it's simple!

`<div data-load="path/to/html.html"></div>`

The html will be loaded into the div and everyone is happy

Using with templating engine eg handlebars
-------------------------------------------

use the `loader.load(callback)` method to get the result of each load and do what you need to do eg
use `load.addScope(scopeName, values)` and `<div data-scope="scopeName"></div>` to add data to be loaded on a per template basis
the scope is passed into the loader.onLoad callback.


```javascript
loader.onLoad(function(result, scope){
    var template = Handlebars.compile(result);
    return template(scope);
})
```

Other ways to load
-----------------------

Using the `loader.load(el, src)` method you can load whatever document into whatever element

```javascript
var el = document.getElementById("id");
loader.load(el, "test.html");
```

Aditional notes
-----------------

loader automatically runs when the page loads to change this and specify when you want it to load pages. (This won't affect pages loaded with `loader.load()`);

`loader.runOnLoad(false)`

To Disable loading when the page loads

`loader.run()` to controll when the loader runs.