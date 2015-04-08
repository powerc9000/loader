window.loader = (function(){
    var l;
    var ajaxDoneCB;
    var loadedInDomCB;
    var runOnLoad = true;
    var scopes = {};
    window.addEventListener("load", function(){
        if(runOnLoad){
            loader();
        }
    });
    function sanitizeAndLoad(el, scope, xhrResponse, cb){
        var html = gotFile.call(xhrResponse, scope);
        var dom = HTMLParser(html);
        el.innerHTML = dom;
        cb && cb();
        loadedInDomCB && loadedInDomCB();
    }
    function loader(){
       var els = document.querySelectorAll("[data-load]");
        [].forEach.call(els, function(el){
            var src = el.getAttribute("data-load");
            var scope = el.getAttribute("data-scope");
            fetch(el, src, scope);
        });
    }
    function fetch(el, src, scope, cb){
        var xhrReq = new XMLHttpRequest();
        xhrReq.onload = function(){
            if(this.status === 200){
                sanitizeAndLoad(el, scope, this, cb);
            }
        }
        xhrReq.open("get", src);
        xhrReq.send();
    }
    function gotFile(scope){
        var data = scopes[scope] || {};
        var response = this.responseText;
        var text = ajaxDoneCB && ajaxDoneCB(response, data);
        return text || response;
    }
    function HTMLParser(html){
        html = html.replace(/<script.*?>[\s\S]*?<\/script>/ig, "");
        return html;
    }
    l = {
       onLoad: function(c, allc){
            loadedInDomCB = allc;
            ajaxDoneCB = c;
            return this;
       },
       runOnLoad: function(yes){
            runOnLoad = yes;
       },
       load: function(el, src, cb){
            var scope = el.getAttribute("data-scope");
            fetch(el, src, scope);
       },
       addScope: function(name, data){
            scopes[name] = data;
       },
       run: function(){
            loader();
       }
    }
    return l;
}())
