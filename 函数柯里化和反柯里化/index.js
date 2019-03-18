console.log('函数柯里化和反柯里化')

// function add(a, b) {
//     return a + b;
// }

// //函数只能传一个参数时候实现加法
// function curry(a) {
//     return function(b) {
//         return a + b;
//     }
// }
// var add2 = curry(2); //add2也就是第一个参数为2的add版本
// console.log(add2(3))//5

// 通过以上简单介绍我们大概了解了，函数柯里化基本是在做这么一件事情：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

Function.prototype.uncurrying = function() {
    var that = this;
    return function() {
        return Function.prototype.call.apply(that, arguments);
    }
};

function sayHi () {
    console.log(arguments)
    return "Hello " + this.value +" "+[].slice.call(arguments);
}
var sayHiuncurrying=sayHi.uncurrying();
console.log(sayHiuncurrying)
console.log(sayHiuncurrying({value:'world'},"hahaha"));