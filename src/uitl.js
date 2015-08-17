var R = require('ramda');


var invoke = R.curry(function(name, obj) {
  return obj[name]();
});

var invokeOn = R.curry(function(name, arg, obj){
  return obj[name](arg);
})


function stringifyAttrs (attrs) {
  if(!attrs){return ''} //clean up once we avoid text nodes
  var keys = Object.keys(attrs);
  return R.zipWith(function(a, b){
    return a + '=' + b;
  }, keys, keys.map(R.flip(R.prop)(attrs)))
}



function log(val) {console.log(val); return val;}


//introdue laziness and currying to our nodes/elements/components
// var test = div.concat(
//             h1.concat('this is an h1!'),
//             ul.concat(
//               li.concat('text!'),
//               li.concat('more Text!')
//             )
//           )

// div.concat
//console.log(toHtml(test));


function arrify(val) {
  return Array.prototype.slice.call(val, 0);
}

var fmap = invokeOn('map');

module.exports = {
  invoke:invoke,
  stringifyAttrs:stringifyAttrs,
  log:log,
  arrify:arrify,
  fmap:fmap
}
