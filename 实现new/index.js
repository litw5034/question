console.log('实现new')


// 首先了解new做了什么，使用new关键字调用函数（new ClassA(…)）的具体步骤：

// 　　1、创建一个新对象：

// 　　var obj = {};

// 　　2、设置新对象的constructor属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的prototype对象；

// 　　obj.__proto__ = ClassA.prototype;

// 　　3、使用新对象调用函数，函数中的this被指向新实例对象：

// 　　ClassA.call(obj);　　//{}.构造函数()

// 　　4、将初始化完毕的新对象地址，保存到等号左边的变量中

// 　　注意：若构造函数中返回this或返回值是基本类型（number、string、boolean、null、undefined）的值，则返回新实例对象；若返回值是引用类型的值，则实际返回值为这个引用类型。

var foo = "bar";
function test () {
　　this.foo = "foo";
}
new test();            　　　　　//test中的this指新对象，并未改变全局的foo属性
console.log(this.foo);             // "bar"
console.log(new test().foo);  // "foo";


// 用原生JS实现new方法

// 通过分析原生的new方法可以看出，在new一个函数的时候，
// 会返回一个func同时在这个func里面会返回一个对象Object，
// 这个对象包含父类func的属性以及隐藏的__proto__
function New(f) {
    //返回一个func
    return function () {
        var o = {"__proto__": f.prototype};
        f.apply(o, arguments);//继承父类的属性
        return o; //返回一个Object
    }
}

function Person(name,age){
    this.name = name;
    this.age = age;
}

//new一个Person的实例p1做研究对比
var p1 = new Person("Richard", 22);
console.log(p1)
//此时p1包含name、age属性，同时p1的__proto__指向Person的prototype
p1.name;//Richard
p1.age;//22

var p2 = New(Person)("Jack",25);
p2.name;//Jack
p2.age;//25

// // 此时p2 instanceof Person 返回的是true；
// Person.prototype.gender ="male";
// p1.gender//male
// p2.gender//male

// 优先级由高到低：小括号(xxx)  >  属性访问.   >  new foo()  >  foo()

// 注意new Foo()优先级高于Foo();

// function getName(){
//     console.log(1)
// }
// function Foo() {
//     this.getName = function () {
//         console.log(2); 
//     };
//     return this;
// }
// Foo.getName = function () {
//     console.log(3);
// };
//先从.属性访问符号开始往前面找一个最近的对象，同时注意new Foo()优先于Foo();
// var a=new Foo.getName();//3;
// 属性.的优先级高于new foo()，所以===new (Foo.getName)();返回Foo.getName类型的实例
// var b=new Foo().getName();//2;
// new foo() //的优先级高于foo()，所以就相当于new foo()的属性，===(new Foo()).getName()；返回undefined
// var c=new new Foo().getName();//2;
// new foo() //优先级低于属性.，所以其实相当于就是new一个new foo()的getName属性函数，===new (new Foo().getName)();返回Foo.getName类型的实例
// new Date().getTime();//===((new Date()).getTime)()
// (new Date).getTime();//===((new Date()).getTime)()
// new Date.getTime();//Uncaught TypeError: Date(...).getTime is not a function；===new (Date.getTime)()

// console.log(Foo())
// var aa = new Foo.getName()
// console.log(aa)
// var aa = new new Foo().getName()
// console.log(aa)
// var aa = new getName()
// console.log(aa)

// function haha() {
//     console.log(999)
// }
// const ll = new haha()
// console.log(ll)

function Test(name, age) {
    this.name = name || 'litw'
    this.age = age || 10
}
function myNew(obj) {
    var current = {}
    current.__proto__ = obj.prototype
    obj.call(current)
    return current
}
function myNew1(obj) {
    return function () {
        var current = {}
        current.__proto__ = obj.prototype
        console.log(arguments)
        obj.apply(current, arguments)
        return current
    }
}
const test111 = myNew1(Test)('hhaha', 111)
console.log(test111)
console.log(new Test('nihao', 20))



function test2222() {
    console.log(arguments)
}
test2222(1,2,3,4,5,[1,2,3])