window.loader = (function(){
    var l;
    var cb;
    window.onload = function(){
       loader();
    }
    function loader(){
       var els = document.querySelectorAll("[data-load]");
       [].forEach.call(els, function(el){
         var src = el.getAttribute("data-load");
         var xhrReq = new XMLHttpRequest();
         xhrReq.onload = function(){
                if(this.status === 200){
                    var html = gotFile.call(this);
                    var dom = HTMLParser(html);
                    el.innerHTML = dom;
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
       }
    }
    return l;
}())