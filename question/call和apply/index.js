console.log('call和apply')
// 在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
// JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。
function fruit () {}
fruit.prototype = {
    color: 'red',
    say: function () {
        console.log(this)
        // console.log("My color is " + this.color)
    }
}
const apple = new fruit

apple.say()

const banana = {
    color: 'yellow'
}
apple.say.call(banana)
apple.say.apply(banana)

var array1 = [12 , "foo" , {name:"Joe"} , -2458]; 
var array2 = ["Doe" , 555 , 100]; 
// Array.prototype.push.apply(array1, array2); 
Array.prototype.push.call(array1, array2); 
// array1.push(array2)
console.log(array1)

var  numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.apply(Math, numbers),   //458
    maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
// number 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。
console.log(Math.max(...numbers))

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}

// Javascript中存在一种名为伪数组的对象结构。比较特别的是 arguments 对象，
// 还有像调用 getElementsByTagName , document.childNodes 之类的，它们返回NodeList对象都属于伪数组。不能应用 Array下的 push , pop 等方法。
// 但是我们能通过 Array.prototype.slice.call 转换为真正的数组的带有 length 属性的对象，这样 domNodes 就可以应用 Array 下的所有方法了。

var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));

var fakeArray01 = {0:'a',1:'b',length:2};//这是一个标准的伪数组对象 
var arr01 = Array.prototype.slice.call(fakeArray01); 
console.log(arr01.pop())
// const a = [1,2,3,4]
// const b = a.slice()
// console.log(b)

// bind()最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值。
// 常见的错误就像上面的例子一样，将方法从对象中拿出来，然后调用，并且希望this指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。
// 使用bind()方法能够很漂亮的解决这个问题：

this.num = 9; 
var mymodule = {
  num: 81,
  getNum: function() { 
    console.log(this.num);
  }
};

mymodule.getNum(); // 81

var getNum = mymodule.getNum;
getNum(); // 9, 因为在这个例子中，"this"指向全局对象

var boundGetNum = getNum.bind(mymodule);
boundGetNum(); // 81


var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81

// apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
// apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
// apply 、 call 、bind 三者都可以利用后续参数传参；
// bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

// $('#div1').on('click', function() {
//     console.log(this)
// })

var foo = {
    bar : 1,
    eventBind: function(){
        console.log(this)
        // var _this = this;
        $('#div1').on('click',function(event) {
            /* Act on the event */
            console.log(event)
            console.log(this)
            // console.log(_this.bar);     //1
        });
    }
}
foo.eventBind()