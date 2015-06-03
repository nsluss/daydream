// This file will describe the API for the functional micro library that will be
// used for these exercises

choose({
  isEmpty: empty,
  otherwise: qsRecurse
}).of(list)
  .where({
    qsRecurse: function (list) {
      return this.recurse(lessThanHead(list))
             .concat(head(list))
             .concat(this.recurse(greaterThanHead(list)))
    }
  })

//choose will be our exposed method that will let users interface with the 
//function builder
function choose (options) {
  
}

//Choose will be the internal object we use for building up our partially 
//constructed functions
function Choose (cases, handlers) {
  //we need to determine whether all the test case and handler functions are
  //defined either in the object passed to the choose function or globally. If
  //not, we need to give a "whereable" back from choose
}

//of introduces our value to the function that we're building up. Right now it's
//taking an explicit argument, but I'd like to generalize this out to let us 
//build a funtion that takes an arbitrary argument (isn't that the whole reason
//we're here?).
Choose.prototype.of = function (value) {
  var context = this;
  //if we know what the handler for the given case is, we run that. if not, we 
  //need a where clause. In that case we return an object with a where function
  //need to extract the "whereable" object in order to allow us to "where" for
  //test cases as well
  return this[this.handlerName] !== undefined ?
           this[this.handlerName](value) :
           {
            // where needs to be extracted into it's own constructor (perhaps 
            // more accurately a "whereable" constructor). The purpose of a 
            // "where" function will be to specify local bindings for undefined
            // functions used within a choose function builder.
              where: function (bindings) {
                return bindings[context.handlerName].bind(this)(value)
              },
              // the "whereable" needs a .recurse method to provide an interface
              // to the original chooser for recursive cases.
              recurse: context.recurse
           }
}
