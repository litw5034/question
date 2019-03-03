console.log('深拷贝和浅拷贝')

// 如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

// let a=[0,1,2,3,4],
//     b=a;
// console.log(a===b);
// a[0]=1;
// console.log(a,b);

// 基本类型--名值存储在栈内存中，例如let a=1;
// 当你b=a复制时，栈内存会新开辟一个内存
// 所以当你此时修改a=2，对b并不会造成影响，因为此时的b已自食其力，翅膀硬了，不受a的影响了。当然，let a=1,b=a;虽然b不受a影响，但这也算不上深拷贝，因为深拷贝本身只针对较为复杂的object类型数据。

// 引用数据类型--名存在栈内存中，值存在于堆内存中，但是栈内存会提供一个引用的地址指向堆内存中的值

// 当b=a进行拷贝时，其实复制的是a的引用地址，而并非堆里面的值。
// 而当我们a[0]=1时进行数组修改时，由于a与b指向的是同一个地址，所以自然b也受了影响，这就是所谓的浅拷贝了。
// 那，要是在堆内存中也开辟一个新的内存专门为b存放值，就像基本类型那样，岂不就达到深拷贝的效果了

// 这么我们封装一个深拷贝的函数(PS：只是一个基本实现的展示，并非最佳实践)

// function deepClone(obj){
//     let objClone = Array.isArray(obj)?[]:{};
//     if(obj && typeof obj==="object"){
//         for(key in obj){
//             if(obj.hasOwnProperty(key)){
//                 //判断ojb子元素是否为对象，如果是，递归复制
//                 if(obj[key]&&typeof obj[key] ==="object"){
//                     objClone[key] = deepClone(obj[key]);
//                 }else{
//                     //如果不是，简单复制
//                     objClone[key] = obj[key];
//                 }
//             }
//         }
//     }
//     return objClone;
// }    
// let a=[1,2,3,4],
//     b=deepClone(a);
// a[0]=2;
// console.log(a,b);

// 跟之前想象的一样，现在b脱离了a的控制，不再受a影响了。
// 这里再次强调，深拷贝，是拷贝对象各个层级的属性，可以看个例子。JQ里有一个extend方法也可以拷贝对象，我们来看看
// let a=[1,2,3,4],
//     b=a.slice();
// a[0]=2;
// console.log(a,b);

// 那是不是说slice方法也是深拷贝了，毕竟b也没受a的影响，上面说了，深拷贝是会拷贝所有层级的属性，还是这个例子，我们把a改改

// let a=[0,1,[2,3],4],
//         b=a.slice();
// a[0]=1;
// a[2][0]=1;
// console.log(a,b);


// 拷贝的不彻底啊，b对象的一级属性确实不受影响了，但是二级属性还是没能拷贝成功，仍然脱离不了a的控制，说明slice根本不是真正的深拷贝。

// 除了递归，我们还可以借用JSON对象的parse和stringify

// function deepClone(obj){
//     let _obj = JSON.stringify(obj),
//         objClone = JSON.parse(_obj);
//     return objClone
// }    
// let a=[0,1,[2,3],4],
//     b=deepClone(a);
// a[0]=1;
// a[2][0]=1;
// console.log(a,b);

// 除了上面两种方法之外，我们还可以借用JQ的extend方法。

// $.extend( [deep ], target, object1 [, objectN ] )

// deep表示是否深拷贝，为true为深拷贝，为false，则为浅拷贝

// target Object类型 目标对象，其他对象的成员属性将被附加到该对象上。

// object1  objectN可选。 Object类型 第一个以及第N个被合并的对象。 

// let a=[0,1,[2,3],4],
//     b=$.extend(true,[],a);
// a[0]=1;
// a[2][0]=1;
// console.log(a,b);
// 可以看到，效果与上面方法一样，只是需要依赖JQ库。

// 说了这么多，了解深拷贝也不仅仅是为了应付面试题，在实际开发中也是非常有用的。例如后台返回了一堆数据，你需要对这堆数据做操作，
// 但多人开发情况下，你是没办法明确这堆数据是否有其它功能也需要使用，直接修改可能会造成隐性问题，深拷贝能帮你更安全安心的去操作数据，根据实际情况来使用深拷贝，大概就是这个意思。

// 本文算是个人对于深浅拷贝的学习笔记整理，这里借用了以下资料的思想。