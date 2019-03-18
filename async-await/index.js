console.log('async/await')
// async function f() {
//     return 1
// }
// // async 会返回一个promise 如果存在return <非promise>语句 那么 会包装成promise返回
// console.log(f())
// f().then(alert) // 1

// async function f() {
//     return Promise.resolve(1)
// }
// // 也可以显式的返回一个promise
// console.log(f())
// f().then(alert) // 1

// async function f() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('done!'), 1000)
//     })
//     console.log(promise)
//     let result = await promise // 直到promise返回一个resolve值（*）
//     console.log(result)
//     // alert(result) // 'done!' 
// }
// f()

// async function f() {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('done!'), 1000)
//     })
//     let result = await promise // 直到promise返回一个resolve值（*）
//     alert(result) // 'done!' 
// }
// f()

// async function showAvatar() {
//     // read our JSON
//     let response = await fetch('/article/promise-chaining/user.json')
//     let user = await response.json()
    
//     // read github user
//     let githubResponse = await fetch(`https://api.github.com/users/${user.name}`)
//     let githubUser = await githubResponse.json()
    
//     // 展示头像
//     let img = document.createElement('img')
//     img.src = githubUser.avatar_url
//     img.className = 'promise-avatar-example'
//     documenmt.body.append(img)
    
//     // 等待3s
//     await new Promise((resolve, reject) => {
//         setTimeout(resolve, 3000)
//     })
    
//     img.remove()
    
//     return githubUser
// }
// showAvatar()


// await接受thenables
// 就像promise.then，await也允许使用thenable对象（那些具有可调用的then方法的对象）。
// 同样，第三方对象可能不是一个promise，但是promise的兼容性表示，如果它支持.then方法，那么它就能用于await。

// 例如，这里await接受了new Thenable(1)

class Thenable {
   constructor(num) {
       this.num = num
   }
   then(resolve, reject) {
    //    alert(resolve) // function() {native code}
       // 1000ms后将this.num*2作为resolve值
        setTimeout(()=> {
           console.log(2)
           resolve(this.num * 2)
        ,10000})
   }
}
async function f() {
   // 等待1s，result变为2
   let result = await new Thenable(1)
   console.log(1)
//    alert(result)
}
f()
// 如果await得到了一个带有then方法的非promise对象，它将会调用提供原生函数resolve、reject作为参数的方法，然后await一直等待，直到他们其中的一个被调用（在上面的例子它发生在（*）行）。
// (验证不成功)(验证不成功)(验证不成功)(验证不成功)


// 放在一个函数前的async有两个作用：
// 1.使函数总是返回一个promise
// 2.允许在这其中使用await

// promise前面的await关键字能够使JavaScript等待，直到promise处理结束。然后：
// 1.如果它是一个错误，异常就产生了，就像在那个地方调用了throw error一样。
// 2.否则，它会返回一个结果，我们可以将它分配给一个值

// 他们一起提供了一个很好的框架来编写易于读写的异步代码。

// 有了async/await，我们很少需要写promise.then/catch，但是我们仍然不应该忘记它们是基于promise的，
// 因为有些时候（例如在最外面的范围内）我们不得不使用这些方法。Promise.all也是一个非常棒的东西，它能够同时等待很多任务。