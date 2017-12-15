/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__ (1);

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);