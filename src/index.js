//var R = require('ramda');
var invoke = R.curry(function(name, obj) {
  return obj[name]();
});

var invokeOn = R.curry(function(name, arg, obj){
  return obj[name](arg);
})

function Component (name, config, template) {
  this.name = name;
  this.attrs = {};
  this.config = config || {};
  this.config.init = config.init || R.identity
  this.template = config.init(template);
}

Component.prototype.toHtml = function () {
  return this.template.toHtml()
};

function Node (value, children) {
  this.value = value || {};
  this.children = children || [];
}

Node.prototype.concat = function () {
  return new Node(this.value, this.children.concat(arrify(arguments)));
}

//need to avoid recursing on text nodes
Node.prototype.toHtml = function () {
  return '<' + this.value + '>' //+ stringifyAttrs(this.attrs)
             + this.children.map(toHtml).join('')
             + '</' + this.value + '>'
}

Node.prototype.map = function (fn) {
  return new Node(fn(this.value), this.children.map(invokeOn('map', fn)))
};

function Text (val) {
  this.value = val;
}

Text.prototype.map = function (fn) {
  return new Text(fn(this.value));
}

function stringifyAttrs (attrs) {
  if(!attrs){return ''} //clean up once we avoid text nodes
  var keys = Object.keys(attrs);
  return R.zipWith(function(a, b){
    return a + '=' + b;
  }, keys, keys.map(R.flip(R.prop)(attrs)))
}

var div  = new Node('div'),
    h1   = new Node('h1'),
    h2   = new Node('h2'),
    h3   = new Node('h3'),
    h4   = new Node('h4'),
    h5   = new Node('h5'),
    h6   = new Node('h6'),
    ul   = new Node('ul'),
    li   = new Node('li'),
    ol   = new Node('ol'),
    span = new Node('span');

function upper (str) {
  return str.toUpperCase;
}

log(div.concat(new Text('test')).map(upper))
function log(val) {console.log(val); return val;}
//
// var test = div.concat(
//             h1.concat('this is an h1!'),
//             ul.concat(
//               li.concat('text!'),
//               li.concat('more Text!')
//             )
//           )

// div.concat
// console.log(toHtml(test));
function toHtml(node) {
  return (typeof node === 'Text' ? node.value : Node.prototype.toHtml.call(node));
}

function arrify(val) {
  return Array.prototype.slice.call(val, 0);
}
