module.exports = {
  title: 'FunkyFun',
  description: 'funkyfun技术博客',
  themeConfig: {
    repo: 'funkyfun/funkyblog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      // {
      //   text: '百度',
      //   link: 'https://www.baidu.com'
      // }
    ],
    sidebar: {
      '/egret/': [
        '',     /* /tech/index.md */
        ['event', 'egret事件机制'],
        ['MVC1', '一个基于egret的MVC架构'],
        ['/summary', '返回分类']
      ],
      '/tech/': [
        '',     /* /tech/index.md */
        ['/summary', '返回分类'] /** 返回总览 */
      ],
      '/common/': [
        '',     /* /common/ */
        ['/summary', '返回分类'] /** 返回总览 */
      ],

    }
  }
}
