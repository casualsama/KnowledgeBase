# Vue3 与 Pinia 学习笔记

本文档主要介绍 Vue3 项目中如何使用 Pinia 进行状态管理，包括安装、基本用法、注意事项和简单示例。

------

## 1. Pinia 简介

Pinia 是 Vue 官方推荐的状态管理库，被设计为更现代、轻量和易用。与 Vuex 相比，Pinia 具有以下特点：

- **简单易用：** API 简洁直观，学习曲线平缓。
- **类型支持：** 与 TypeScript 结合良好，可获得更好的类型提示。
- **模块化：** 将状态管理分为多个独立的 Store，更加清晰易维护。

------

## 2. 安装 Pinia

在 Vue3 项目中使用 Pinia 非常简单，你可以通过 npm 或 yarn 进行安装。

### 使用 npm 安装

```cmd
bash


复制编辑
npm install pinia
```

### 使用 yarn 安装

```cmd
bash


复制编辑
yarn add pinia
```

安装完成后，需要在 Vue 根实例中引入 Pinia 并注册：

```vue
js复制编辑// main.js 或 main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

------

## 3. 如何使用 Pinia

### 定义一个 Store

使用 `defineStore` 来创建一个 Store。下面是一个简单的示例，定义了一个计数器 Store：

```vue
js复制编辑// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 状态
  state: () => ({
    count: 0,
  }),
  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  // 行为
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
```

### 在组件中使用 Store

在 Vue 组件中，可以直接导入并使用上面定义的 Store：

```vue
vue复制编辑<template>
  <div>
    <p>计数: {{ counter.count }}</p>
    <p>双倍计数: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">增加</button>
    <button @click="counter.decrement">减少</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
```

------

## 4. 注意事项

- **模块化管理：** Pinia 推荐将状态管理拆分为多个独立的 Store，每个模块管理对应业务相关的状态。
- **响应式数据：** Store 中的状态是响应式的，因此直接修改状态会触发视图更新。
- **调试工具：** 可以使用 Vue Devtools 来调试 Pinia 状态，确保你安装了最新版本的 Vue Devtools。
- **SSR 支持：** 如果使用服务器端渲染（SSR），需要注意 Pinia 的初始化和状态脱水（hydration）问题，参考官方文档进行配置。
- **TypeScript 支持：** Pinia 与 TypeScript 结合使用时会提供更好的类型提示和错误检查，建议在 TypeScript 项目中使用。

------

## 5. 简单例子

以下是一个完整的简单例子，展示如何使用 Pinia 在 Vue3 项目中进行状态管理：

### 目录结构

```
css复制编辑src/
├── main.js
├── App.vue
└── stores/
    └── counter.js
```

### main.js

```vue
js复制编辑import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
```

### stores/counter.js

```vue
js复制编辑import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
```

### App.vue

```vue
vue复制编辑<template>
  <div id="app">
    <h1>Pinia 计数器示例</h1>
    <p>计数: {{ counter.count }}</p>
    <p>双倍计数: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">增加</button>
    <button @click="counter.decrement">减少</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './stores/counter'
const counter = useCounterStore()
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>
```

------

## 6. 总结

- **安装：** 使用 npm 或 yarn 安装 Pinia，并在根实例中注册。
- **定义 Store：** 使用 `defineStore` 定义状态、计算属性和行为。
- **组件使用：** 在 Vue 组件中导入并使用定义好的 Store，操作状态并响应视图更新。
- **注意事项：** 考虑模块化、响应式、SSR 支持和 TypeScript 的使用。