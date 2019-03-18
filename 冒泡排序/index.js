console.log('冒泡排序')

// const a = [4,5,7,1,2,3]

// for (var i=0; i<a.length -1; i++) {
//     for (var j=0; j<a.length-i-1; j++) {
//         if (a[j] > a[j+1]) {
//             const b = a[j]
//             a[j] = a[j+1]
//             a[j+1] = b
//         }
//     }
// }
// for(var i=0; i<a.length -1;i++){
//     for(var j=i+1;j<a.length;j++){
//         if(a[i]>a[j]){
//             console.log(i, a[i], a[j])
//             var temp;
//             temp=a[i];
//             a[i]=a[j];
//             a[j]=temp;
//         }
//     }
// }
// console.log(a)


// 好的，我们先来实现找数组中的最大数，并把他放到数组最后。

// var arr = [3,4,1,2];
// // 遍历数组，次数就是arr.length - 1
// for (var i = 0; i < arr.length - 1; i++) {
//     // 如果前一个数 大于 后一个数 就交换两数位置
//     if (arr[i] > arr[i + 1]) {
//         var temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//     }
// }
// console.log(arr)  // [3, 1, 2, 4]

// 我们能找到数组中最大的数，放到最后，这样重复 arr.length - 1 次，便可以实现数组按从小到大的顺序排好了。

// var arr = [3,4,1,2];
// // 遍历数组，次数就是arr.length - 1
// for (var j = 0; j < arr.length - 1; j++) {
//     // 这里 i < arr.length - 1 ，要思考思考合适吗？我们下面继续说
//     for (var i = 0; i < arr.length - 1; i++) {
//         if (arr[i] > arr[i + 1]) {
//             var temp = arr[i];
//             arr[i] = arr[i + 1];
//             arr[i + 1] = temp;
//         }
//     }
// }
// console.log(arr)  // [1,2,3,4]

// 虽然上面的代码已经实现冒泡排序了，但就像注释中提到的，内层 for 循环的次数写成，i < arr.length - 1 ，是不是合适呢？ 
// 我们想一下，当第一次，找到最大数，放到最后，那么下一次，遍历的时候，是不是就不能把最后一个数算上了呢？因为他就是最大的了，不会出现，前一个数比后一个数大，要交换位置的情况，所以内层 for 循环的次数，改成 i < arr.length - 1 -j ，才合适，看下面的代码。

// var arr = [3, 4, 1, 2];
// function bubbleSort (arr) {
//   for (var j = 0; j < arr.length - 1; j++) {
//     // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数
//     for (var i = 0; i < arr.length - 1 - j; i++) {
//       if (arr[i] > arr[i + 1]) {
//         var temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }
// bubbleSort(arr);

// 我们想下这个情况，当原数组是， 
// arr = [1,2,4,3]; 
// 在经过第一轮冒泡排序之后，数组就变成了 
// arr = [1,2,3,4]; 
// 此时，数组已经排序完成了，但是按上面的代码来看，数组还会继续排序，所以我们加一个标志位，如果某次循环完后，没有任何两数进行交换，就将标志位 设置为 true，表示排序完成，这样我们就可以减少不必要的排序，提高性能。

// var arr = [3, 4, 1, 2];
// function bubbleSort (arr) {
//   var max = arr.length - 1;
//   for (var j = 0; j < max; j++) {
//     // 声明一个变量，作为标志位
//     var done = true;
//     for (var i = 0; i < max - j; i++) {
//       if (arr[i] > arr[i + 1]) {
//         var temp = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = temp;
//         done = false;
//       }
//     }
//     if (done) {
//       break;
//     }
//   }
//   return arr;
// }
// bubbleSort(arr);

// 性能
// 时间复杂度： 平均时间复杂度O(n*n) 、最好情况O(n)、最差情况O(n*n) 
// 空间复杂度： O(1) 
// 稳定性：稳定

// 时间复杂度指的是一个算法执行所耗费的时间 
// 空间复杂度指运行完一个程序所需内存的大小 
// 稳定指，如果a=b,a在b的前面，排序后a仍然在b的前面 
// 不稳定指，如果a=b，a在b的前面，排序后可能会交换位置

// 总结
// 1、外层 for 循环控制循环次数 
// 2、内层 for 循环进行两数交换，找每次的最大数，排到最后 
// 3、设置一个标志位，减少不必要的循环

const arr1 = ['2','3']
let arr2 = [{roleId:'2'},{roleId:'3'},{roleId:'4'}]
arr1.forEach((i) => {
    arr2.forEach(function(item, key) {
        if(i == item.roleId){
            console.log(i, item.roleId, item, key)
            console.log(arr2[key])
            arr2[key].checked = true
        }else{
            arr2[key].checked = false
        }
    });
});
console.log(arr2)
// const ccc = [1,2,3,4,5,6,7]
// const ddd = [5,6,7,8]
// ccc.forEach((item, index) => {
//     ddd.forEach((data, num) => {
//         if (item === data) {
//             console.log(item)
//             ddd[num] = 9999
//         }
//     })
// })
// console.log(ddd)
// console.log([1,2,3,4,5])
// const www = [1,2,3,4,5]
// [1,2,3,4,5].forEach(item => {
//     console.log(123)
// })
// [1,2,3,4,5].map((item, index) => {
//     console.log(123)
// })

// [1, 2, 3].forEach(item => {
//     console.log(123)
// })