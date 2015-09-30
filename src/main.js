function element (name) {
  var el = function (attrs, children, text) {
    var children = sliceArgs(1, arguments);
    var attrs = attrs;
    return {
      toHtml: function () {
        return '<' + name + stringifyAttrs(attrs) + '>' +
               text +
               (children ? children.map(R.invoker(0, 'toHtml')).join('') : '') +
               '</' + name +'>'
      },
      map: function (fn) {//broken

        return newEl(fn({attrs: attrs, name: name, children: children, text: text || ''}))
      }
    }
  }
  return el;
}

function text (val) { //alias for this and other elements to allow instantiation by passing an object
  return {
    toHtml: function () { return val },
    map: function () {return newEl(fn({attrs: {}, name:'text', children: [], text: text || ''}))} //setting children as val may not be correct
  }

}

function newEl (description) { //broken?
  return (description.name === 'text' ?
    text(description.text) :
    R.curry(element(description.name))(description.attrs)
      .apply(Object.create(null), description.children, description.text)) //can't curry, but need to keep the .apply() in order to pass a list instead of an array, but that doesn't work if we want to pass text as an argument to all of our element functions. this may be where we need to start using applicative/functor/monad instances (lift?)
}

var div  = element('div'),
    h1   = element('h1'),
    ul   = element('ul'),
    li   = element('li')
    //text = element('text')

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
