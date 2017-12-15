const DOMNodeCollection = require ('./dom_node_collection.js');

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;

function $l (selector) {
  if (typeof selector === 'string') {
    return Array.from(document.querySelectorAll(selector));
  } else {
    return [selector];
  }
}

let ul = $l('ul');
let li = $l('li');
let links = $l('a');
let domul = new DOMNodeCollection(ul);
let domli = new DOMNodeCollection(li);