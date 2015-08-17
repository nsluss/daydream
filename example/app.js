var myString = "hey!"
// var myList = component({
//   name: 'myList',
//   init: function(tree, vals) {
//     return tree.toHtml()//tree.map(R.invoker(0, 'toUpperCase'))//.toHtml();//
//   },
//   template: div( {id:'testId'},
//               h1( {}, text(myString)),
//               ul( {},
//                 li( {class:'test'}, text('item 1')),
//                 li( {}, text('item 2'))
//               )
//             )
// })
//
//
// console.log(myList.render())
// document.querySelector('#main').innerHTML = myList.render()
var testNaive = div( {id:'testId'},
                 [h1( {}, [text(myString)]),
                  ul( {}, [
                    li( {class:'test'}, [text('item1')]),
                    li( {}, [text('item2')])
                  ])
                ])
console.log(div({id:'testId'},[text('test')]).toHtml())
console.log(testNaive.toHtml());
document.querySelector('#main').innerHTML = testNaive.toHtml();
