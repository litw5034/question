console.log('let和const和var')

// let与const都是只在声明所在的块级作用域内有效。

// let声明的变量可以改变，值和类型都可以改变，没有限制。

// const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

// const a ;//报错,一旦声明变量，应该立即赋值！！

// const b = 2;
// b = 3//报错，因为定义常量之后不能成重新赋值！！

// 对于复合类型的变量，如数组和对象，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

// const names = [];
// names = [1,2,3] //出错，因为变量names指向的地址不能发生改变，应始终指向[]所在的地址！！！[1,2,3]与[]不是同一个地址
// //不会报错，因为names指向的地址不变，改变的只是内部数据
// const names = [];
// names[0] = 1
// names[1] = 2
// names[2] = 3

// 如果想让定义的对象或数组的内部数据也不能够修改和改变，可以使用object.freeze(names)进行冻结，这样为对象添加新属性就不起作用。

// 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数

// 复制代码
// var constantize = (obj) => {
//   Object.freeze(obj);
//   Object.keys(obj).forEach( (key) => {
//     if ( typeof obj[key] === 'object' ) {
//       constantize( obj[key] );
//     }
//   });
// };

// var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
// var声明的变量会挂载在window上，而let和const声明的变量不会：
// 复制代码
//  var a = 1;
//  // var a;//不会报错
//  console.log('函数外var定义a：' + a);//可以输出a=1
//  function change(){
//  a = 4;
//  console.log('函数内var定义a：' + a);//可以输出a=4
//  } 
//  change();
//  console.log('函数调用后var定义a为函数内部修改值：' + a);//可以输出a=4

// 同一作用域下let和const不能声明同名变量，而var可以
// var a = 100;
// console.log(a); // 100

// var a = 10;
// console.log(a); // 10
// let a = 100;
// let a = 10;

//  控制台报错：Identifier 'a' has already been declared  ===> 标识符a已经被声明了。

var a = 100;

if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    let a = 1;
}