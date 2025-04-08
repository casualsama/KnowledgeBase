### 选择页面元素

``` js
var element = document.getElementById("myElementId");
var elements = document.getElementsByTagName("div");
var elements = document.getElementsByClassName("myClass");
var element = document.querySelector(".myClass #specificId");
var elements = document.querySelectorAll("div.myClass");
```

> 分别为 根据Id选择，根据Tag名称选择，根据类名选择，根据CSS选择器选择第一个，根据

### var let const区别总结表格

| 特性       | `var` | `let` | `const` |
| :--------- | :---- | :---- | :------ |
| 作用域     | 函数  | 块级  | 块级    |
| 提升       | 是    | 部分  | 部分    |
| 重复声明   | 允许  | 禁止  | 禁止    |
| 重新赋值   | 允许  | 允许  | 禁止    |
| 全局属性   | 是    | 否    | 否      |
| 暂时性死区 | 无    | 有    | 有      |

### 闭包

> **闭包是指有权访问另一个函数作用域中变量的函数**，简单说就是函数内部定义的函数可以访问外部函数的变量，即使外部函数已经执行完毕。

``` js
function outer() {
  let count = 0; // 外部函数变量
  
  function inner() { // 内部函数(闭包)
    count++;
    console.log(count);
  }
  
  return inner;
}

const closure = outer(); // outer执行完毕
closure(); // 1 (仍然能访问count)
closure(); // 2
```

#### 闭包的三个关键特性

1. **访问外部作用域**：内部函数可以访问外部函数的变量
2. **变量持久化**：外部函数执行完后，其变量不会被销毁
3. **私有性**：外部无法直接访问闭包内的变量

#### 闭包的实际应用

##### 一、创建私有变量

``` js
function createCounter() {
  let count = 0; // 私有变量
  
  return {
    increment: function() { count++; },
    getCount: function() { return count; }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
console.log(count); // ReferenceError: count未定义
```

##### 二、模块模式

```js
const calculator = (function() {
  let memory = 0; // 私有状态
  
  return {
    add: function(x) { memory += x; },
    getMemory: function() { return memory; }
  };
})();

calculator.add(5);
console.log(calculator.getMemory()); // 5
```

##### 三、函数工厂

```js
function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### this指向问题

| 调用方式             | `this` 指向                                                  |
| -------------------- | ------------------------------------------------------------ |
| 普通函数调用         | `this` 是 **全局对象**（浏览器中是 `window`，严格模式下是 `undefined`） |
| 箭头函数             | 没有自己的 `this`，取**定义时的外层作用域的 this**           |
| 对象方法调用         | `this` 是这个对象                                            |
| new 调用（构造函数） | `this` 是新创建的实例对象                                    |
| bind / call / apply  | 显式指定 `this`                                              |
| 事件监听器中         | 默认为触发事件的元素（但可能因箭头函数改变）                 |

### 变量和函数提升

> 在 JavaScript 中，变量和函数的声明会被“提升”到当前作用域的顶部。这个行为叫做**变量提升（Variable Hoisting）**。
>
> 也就是说，**声明会被提前，但赋值不会被提前。**

##### 一、var的提升 

- 声明会被提升到函数或全局作用域顶部。
- 初始值不会提升，未赋值前访问是 `undefined`。

``` js
console.log(a); // undefined
var a = 10;
```

##### 二、let 和 const 的提升 

- 声明也会被提升，但**不会初始化**。
- 在声明之前访问，会报错：**ReferenceError**。
- 它们处于一个“暂时性死区（TDZ）”。

``` js
console.log(b); // ❌ ReferenceError
let b = 10;
console.log(c); // ❌ ReferenceError
const c = 20;
```

小结：

| 关键字 | 是否提升 | 初始化    | 提前访问行为   |
| ------ | -------- | --------- | -------------- |
| var    | 是       | undefined | 返回 undefined |
| let    | 是       | 否        | 报错（TDZ）    |
| const  | 是       | 否        | 报错（TDZ）    |

##### 三、函数声明

- 会被完整提升（包括函数体）。
- 可以在声明前调用。

```js
foo(); // ✅ 输出 "hi"
function foo() {
  console.log("hi");
}
```

##### 四、函数表达式

- 变量提升了，但函数体不会。
- 如果是 `var`，访问是 `undefined`，执行报错。

```js
bar(); // ❌ TypeError: bar is not a function
var bar = function () {
  console.log("hello");
};
```

##### 五、箭头函数表达式

- 本质也是函数表达式。
- `let` / `const` 声明时，在 TDZ 内访问会直接报错。

```js
baz(); // ❌ ReferenceError
const baz = () => {
  console.log("arrow");
};
```

