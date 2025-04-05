import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "KnowledgeBase",
  title: "Casualの知识库",
  description: "A VitePress Site",
  themeConfig: {

    outlineTitle: "目录",
    outline: [2, 6],
    // 配置页脚
    footer: {
      copyright: "Copyright@ 2025 Casual"
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Vue3', 
        items:[
          {
            text: 'pinia',
            link: '/Vue3/pinia'
          }
        ]
      },
      {
        text: 'Vue2',
        items:[
          {
            text:'概述',
            link: '/Vue2/概述'
          }
        ]
      },
      {
        text: '原生',
        items:[
          {
            text: 'javaScript',
            link: '/原生/js'
          }
        ]
      }
    ],

    // sidebar: { "/Vue3": set_sidebar("Vue3") },
    sidebar: false,
    aside: 'left',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 设置搜索框的样式
    search: {
    provider: "local",
    options: {
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档",
        },
        modal: {
          noResultsText: "无法找到相关结果",
          resetButtonTitle: "清除查询条件",
          footer: {
            selectText: "选择",
            navigateText: "切换",
          },
        },
      },
    },
  },
  }
})
