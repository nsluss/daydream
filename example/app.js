// var app = new Component('app', {
//             init: function (tree) {
//               debugger;
//               return tree.map(invoke('toUpperCase'))
//             }
//           },
//           div.concat(
//             h1.concat(new Text('this is an h1!')),
//             ul.concat(
//               li.concat(new Text('text!')),
//               li.concat(new Text('more Text!'))
//             )
//           )
//         );
// document.querySelector('#main').innerHTML = toHtml(test);
var myStr = 'it\'s a string!'
var test = div({id:'testId'},
             ul({class: 'test'},
               li({}, text(myStr)),
               li({}, text('item 2'))
             ),
             h1('test')
           )


// var myList = component({
//   name: 'myList'
//   init: function() {do stuff...}
//   template: div( '',
//               ul( '',
//                 li('', text('item 1')),
//                 li('', text('item 2'))
//               )
//             )
//           )
// })

//new Node('test', [new Leaf('l1'), new Leaf('l2')])
// console.log(Tree.prototype.isPrototypeOf(new Text('a')))
// var test = text('hello')
//
// console.log(div('', test))
console.log(test.toHtml()) //.map(R.invoker(0, 'toUpperCase'))
// console.log(myList.render({prop1: thing})
document.querySelector('#main').innerHTML = test.toHtml()
