window.loader = (function(){
    var l;
    var cb;
    var runOnLoad = true;
    window.addEventListener("load", function(){
        if(runOnLoad){
            loader();
        }
    });
    function sanitizeAndLoad(el, scope){
        var html = gotFile.call(scope);
        var dom = HTMLParser(html);
        el.innerHTML = dom;
    }
    function loader(){
       var els = document.querySelectorAll("[data-load]");
        [].forEach.call(els, function(el){
        var src = el.getAttribute("data-load");
        var xhrReq = new XMLHttpRequest();
        xhrReq.onload = function(){
                if(this.status === 200){
                    sanitizeAndLoad(el, this);
                }
            }
            xhrReq.open("get", src);
            xhrReq.send();
        });
    }
    function gotFile(){
        var response = this.responseText;
        var text = cb && cb(response);
        return text || response;
    }
    function HTMLParser(html){
        html = html.replace(/<script.*?>[\s\S]*?<\/script>/ig, "");
        return html;
    }
    l = {
       onLoad: function(c){
            cb = c;
            return this;
       },
       runOnLoad: function(yes){
            runOnLoad = yes;
       },
       load: function(el, src){
            var xhrReq = new XMLHttpRequest();
            xhrReq.onload = function(){
                if(this.status === 200){
                    sanitizeAndLoad(el, this);
                }
            }
            xhrReq.open("get", src);
            xhrReq.send();
            return this;
       },
       run: function(){
            loader();
       }
    }
    return l;
}())