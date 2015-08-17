function element (name) {
  var el = function (attrs, children) {
    var children = children;
    var attrs = attrs;
    return {
      toHtml: function () {
        return '<' + name + stringifyAttrs(attrs) + '>' +
               (children ? children.map(R.invoker(0, 'toHtml')).join('') : '') +
               '</' + name +'>'
      }
    }
  }
  return el;
}

function text (val) {
  return {
    toHtml: function () { return val }
  }
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
