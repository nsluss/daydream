var descendant = R.curry(function (constructor, child) {
  return constructor.prototype.isPrototypeOf(child);
})


function Tree (val) {
  this.value = val || '';
}

function Leaf (val) {
  return new Tree(val)
}

function Node (val, children) {
  var base = new Tree(val)
  base.children = children || [];
  return base;
}

function Text (value) {
  this.value = value
}

function element (name) {
  return function (value) {
    return new Element (name, value, sliceArgs(1, arguments));
  }
};


function Element (name, value, children) {
  var parent = {};
  var obj;
  if (children.length > 0) {
    obj = Object.create (Node.prototype)
    obj.value = value;
    obj.children = children;
  } else if (descendant(Text, value)) {
    obj = Text.call({}, value);
  } else {
    obj = Object.create(Leaf.prototype)
    obj.value = value;
  }
  this.name = name;
  this.value = obj;
};

Element.prototype.toHtml = function () {
  return this.name === 'text' ?
          this.value.toStr() :
          descendant(Node, this.value) ?
            '<' + this.name + stringifyAttrs(this.value.value) + '>' +
            this.value.children.map(R.invoker(0, 'toHtml')).join('') +
            '</' + this.name + '>' :
            // Leaf
            '<' + this.name + '>' +
            this.value.toStr() +
            '</' + this.name + '>'
};

Tree.prototype.empty = function () {
  return new Leaf ();
};
Tree.prototype.toStr = function () {
  return this.value;
}

Leaf.prototype = Object.create(Tree.prototype);
Leaf.prototype.constructor = Leaf;
Leaf.prototype.map = function (fn) {
  return new Leaf(fn(this.value));
};
Leaf.prototype.concat = function (tree) {
  return new Node(this.value, R.of(tree));
}


Node.prototype = Object.create(Tree.prototype);
Node.prototype.constructor = Node;
Node.prototype.map = function (fn) {
  return new Node(fn(this.value), this.children.map(R.invoker(1, 'map')(fn)))
};
Node.prototype.concat = function (tree) {
  return new Node(this.value, R.concat(this.children, R.of(tree)))
};

Text.prototype = Object.create(Leaf.prototype);
Text.constructor = Text;


Element.prototype.map = function(fn) {
  var res = fn(this.value.map(fn))
  return element(this.name, res);
}

var div  = element('div'),
    h1   = element('h1'),
    ul   = element('ul'),
    li   = element('li'),
    text = element('text')

function sliceArgs (from, args) {
  return Array.prototype.slice.call(args, from);
}

function stringifyAttrs (attrs) {
  if(!attrs){return ''} //clean up once we avoid text nodes
  var keys = Object.keys(attrs);
  return R.zipWith(function(a, b){
    return  ' ' + a + '="' + b + '"';
  }, keys, keys.map(R.flip(R.prop)(attrs)))
}
