var R = require('ramda');
var U = require('./util.js');

function Node (name, attrs) {
  this.elem = name;
  this.attrs = attrs || {};
  this.children = [];
}

Node.prototype.nest = function () {
  var that = this;
  var newNode = R.merge(this, {children: that.children.concat(U.arrify(arguments))})
  newNode.prototype = Node.prototype
  return newNode;
  //Object.create(Node.prototype, newNode) why doesn't this work?
}

//need to avoid recursing on text nodes
Node.prototype.toHtml = function () {
  return '<' + this.elem + U.stringifyAttrs(this.attrs) + '>'
             + this.children.map(U.toHtml).join('')
             + '</' + this.elem + '>'
}

function toHtml(node) {
  return (typeof node === 'string' ? node : Node.prototype.toHtml.call(node));
}

Node.toHtml = toHtml;

module.exports = Node;
