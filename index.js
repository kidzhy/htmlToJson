(function(win){
    function htmlToJson(dom) {
      const result = { node: "root", child: [] };
      let doms = toArr(dom).length === 0 ? [dom] : toArr(dom);
      if (doms.length === 1 && !doms[0].childNodes) {
        return result;
      }
      for (let i = 0; i < doms.length; i++) {
        const obj = {};
        const el = doms[i];
        obj.node = el.nodeType === 1 ? "element" : "text";
        if (obj.node === "text") {
          obj.node = "text";
          obj.text = el.data;
        } else {
          obj.tag = el.tagName.toLocaleLowerCase();
          const attrs = toArr(el.attributes);
          if (attrs.length > 0) {
            obj.attr = {};
            attrs.map(it => {
              if (it.name === "style") {
                obj.attr["style"] = getStyle(el);
              } else {
                obj.attr[it.name] = it.nodeValue;
              }
            });
          }
          const child = toArr(el.childNodes);
          if (child.length > 0) {
            obj.child = htmlToJson(el.childNodes).child;
          }
        }
        result.child.push(obj);
      }
      return result;
    }

    function toArr(nodeList) {
      return Array.prototype.slice.apply(nodeList);
    }
    function getStyle(el) {
      const arr = toArr(el.style);
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        const obj = {};
        obj[arr[i]] = el.style[arr[i]];
        result.push(obj);
      }
      return result;
    }
    
    window.htmlToJson = htmlToJson;
    
})(window)
