class DOMNodeCollection {
  constructor (array) {
    this.array = array;
  }
  
  html(string) {
    if (string) {
      this.array.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.array[0];
    }
  }
  
  empty() {
    this.array.forEach ((el) => {
      el.innerHTML = "";
    });
  }
  
  append(arg) {
    this.array.forEach ((el) => {
      if (typeof arg === "string"){
      el.innerHTML += arg;
    }else {
      // debugger
      arg.forEach ((arg_el) => {
        el.innerHTML += `<${arg_el.tagName}>${arg_el.innerText}</${arg_el.tagName}>`;
      });
    }
    });
  }
  
  attr(name, value) {
    if (typeof value === 'undefined') {
      return this.array[0].getAttribute(name);
    } else {
      this.array.forEach((el)=> {
        el.setAttribute(name, value);
      });
    }
  }
  
  addClass(value){
    this.array.forEach((el) => {
      if (el.getAttribute('class')) {
        let classNames = el.getAttribute('class').split(" ");
        classNames.push(value);
        el.setAttribute('class', classNames.join(" "));
      } else {
        let attr = document.createAttribute('class');
        attr.value = value;
        el.setAttributeNode(attr);
      }
    });
  }
  
  removeClass(value){
    this.array.forEach((el)=> {
      let classNames = el.getAttribute('class').split(" ");
      let index = classNames.indexOf(value);
      classNames.splice(index, 1);
      this.attr("class", classNames);
    });
  }
  
  children() {
    let children = [];
    this.array.forEach((node) => {
      children.push(node.children );
    });
    
    return new DOMNodeCollection(children);
  }
  
  parent (){
    let parent = [];
    this.array.forEach((node) => {
      parent.push(node.parentElement);
    });
    
    return new DOMNodeCollection(parent);
  }
  
  find (selector) {
    let descendants = [];
    this.array.forEach((node)=> {
      descendants.push(node.querySelectorAll(selector));
    });
    return new DOMNodeCollection(descendants);
  }
  
  remove (selector) {
  
  }
  
}


module.exports = DOMNodeCollection;