// $1. let 具有块级作用域
{
    let a = 10;
    var b = 1;
}

// console.log(a) // ReferenceError: a is not defined
console.log(b) // 1

// $2. 变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
// 每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，
// 里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，
// 导致运行时输出的是最后一轮的i的值，也就是 10。
const _var = []
for (var i = 0; i < 10; i++) {
    _var[i] = function () {
        console.log('var的内部index值:', i)
    }
}

console.log('var的外部index值:', i) // 10
_var[3]() // 10

// 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是3。
// 你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？
// 这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

// 另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
const _let = []
for (let j = 0; j < 10; j++) {
    _let[j] = function () {
        console.log('let的内部index值:', j)
    }
}

// console.log('let的外部index类型:',j) // ReferenceError: j is not defined
console.log('let的外部index类型:',typeof j) // let的外部index值: undefined

_let[3]() // 3

// 函数内部的变量k是循环变量k的一个子作用域
for (let k = 0; k < 3; k++) {
    // console.log(k)
    let k = 'k的次数'
    console.log(k)
}

// k的次数
// k的次数
// k的次数


// $3. 变量提升。let 不存在变量提升
// console.log('变量提升test',ts) // 变量提升test undefined
// var ts = 1
// console.log('变量提升', lets) // ReferenceError: Cannot access 'lets' before initialization
// let lets = 2

// $4. 暂时性死区 temporal dead zone
// var tmp = 123
// if (true) {
//     // TDZ开始
//     tmp = 'abc'; // ReferenceError
//     console.log(tmp); // ReferenceError
//
//     let tmp; // TDZ结束
//     console.log(tmp); // undefined
//
//     tmp = 123;
//     console.log(tmp); // 123
// }

// typeof tdz // ReferenceError: Cannot access 'tdz' before initialization
// let tdz
// 作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

//
// var tmp = new Date();
//
// function f() {
//     console.log(tmp);
//     if (false) {
//         var tmp = 'hello world';
//     }
// }
//
// f(); // undefined
//
// function f() {
//     console.log(`I am outside`)
// }
//
// (function () {
//     if (false) {
//         function f() {
//             console.log(`i am inside`)
//         }
//     }
//     f()
// }())

// 冻结对象
const constantize = obj => {
    Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key])
        }
    })
     return Object.freeze(obj)
 }

const o = constantize({
    name: 'liujiang',
    age: 30,
    p: {
        w: 'han',
        d: 'liu'
    }
})

o.prop = 123
o.a = 'a'

console.log(o)

