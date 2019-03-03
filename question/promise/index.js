console.log('promise')

// function getData() {
//     var promise = new Promise((resolve,reject)=>{
//         const urlData = 'url1Data'
//         if(urlData === 'url1Data') {
//             resolve(urlData)
//         } else {
//             reject(urlData)
//         }
//     }).then(
//         data => {
//             console.log('resolve1');
//             console.log('传入data1', data)
//             const urlData = 'url2Data'
//             if(urlData === 'url2Data') {
//                 return urlData
//             } else {
//                 console.log('rejected1');
//                 return 'rejected1'
//             }
//         },
//         data => {
//             console.log('rejected1');
//         }
//     ).then(
//         data => {
//             console.log('resolve2');
//             console.log('传入data2', data)
//         },
//         data => {
//             console.log('rejected2');
//         }
//     )
// }
// getData()

// var p = new Promise(function(resolve, reject){
//     //做一些异步操作
//     setTimeout(function(){
//         console.log('执行完成');
//         resolve('随便什么数据');
//     }, 2000);
// });

// Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
// 其实这里用“成功”和“失败”来描述并不准确，按照标准来讲，resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。不过在我们开始阶段可以先这么理解，后面再细究概念。
 
// 在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法。
 
// 运行代码，会在2秒后输出“执行完成”。注意！我只是new了一个对象，并没有调用它，我们传进去的函数就已经执行了，
// 这是需要注意的一个细节。所以我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数，如：


// function runAsync(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('执行完成');
//             resolve('随便什么数据');
//         }, 2000);
//     });
//     return p;            
// }
// runAsync()
// runAsync().then(function(data){
//     console.log(data);
//     //后面可以用传过来的数据做些其他操作
//     //......
// });
// 在runAsync()的返回上直接调用then方法，then接收一个参数，是函数，并且会拿到我们在runAsync中调用resolve时传的的参数。
// 运行这段代码，会在2秒后输出“执行完成”，紧接着输出“随便什么数据”。


function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;            
}

runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log('1111')
    console.log(data);
});

// reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。看下面的代码

// function getNumber(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             var num = Math.ceil(Math.random()*10); //生成1-10的随机数
//             if(num<=5){
//                 resolve(num);
//             }
//             else{
//                 reject('数字太大了');
//             }
//         }, 2000);
//     });
//     return p;            
// }

// getNumber()
// .then(
//     function(data){
//         console.log('resolved');
//         console.log(data);
//     }, 
//     function(reason, data){
//         console.log('rejected');
//         console.log(reason);
//     }
// );

// getNumber函数用来异步获取一个数字，2秒后执行完成，如果数字小于等于5，我们认为是“成功”了，调用resolve修改Promise的状态。
// 否则我们认为是“失败”了，调用reject并传递一个参数，作为失败的原因。

// catch效果和写在then的第二个参数里面一样。
// 不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。


// Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。
// 我们仍旧使用上面定义好的runAsync1、runAsync2、runAsync3这三个函数，看下面的例子：
// Promise
// .all([runAsync1(), runAsync2(), runAsync3()])
// .then(function(results){
//     console.log(results);
// });

// all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法，
// 这个词本来就是赛跑的意思。race的用法与all一样，我们把上面runAsync1的延时改为1秒来看一下：

// Promise
// .race([runAsync1(), runAsync2(), runAsync3()])
// .then(function(results){
//     console.log(results);
// });

// //请求某个图片资源
// function requestImg(){
//     var p = new Promise(function(resolve, reject){
//         var img = new Image();
//         img.onload = function(){
//             resolve(img);
//         }
//         img.src = 'xxxxxx';
//     });
//     return p;
// }

// //延时函数，用于给请求计时
// function timeout(){
//     var p = new Promise(function(resolve, reject){
//         setTimeout(function(){
//             reject('图片请求超时');
//         }, 5000);
//     });
//     return p;
// }

// Promise
// .race([requestImg(), timeout()])
// .then(function(results){
//     console.log(results);
// })
// .catch(function(reason){
//     console.log(reason);
// });

// promise有三种状态：pending/reslove/reject 。pending就是未决，resolve可以理解为成功，reject可以理解为拒绝。
// promise的最终状态会凝固，成功了以后即便再执行reject('failed')状态也不会改变。

// Promise有三种状态：未定（pending）、接受（fulfillment）和拒绝（rejection）。
// 并且，只能由未定状态变为接受状态，或者由未定状态变为拒绝状态。
// 只有在调用resolve（/reject）回调函数时，这个Promise的状态才变成接受（/拒绝）状态。
// 也就是说，在执行这两个回调函数中的任意一个之前，这个Promise都是未定状态的。