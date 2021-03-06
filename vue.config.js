const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  outputDir: 'docs',
  publicPath: isProd ? './' : '/',
  pages: {
    index: {
      entry: 'src/pages/projects.js',
      filename: 'index.html',
      title: 'Zhengjinjiang.Design',
    },
    page: {
      entry: 'src/pages/page.js',
      filename: 'page.html',
      title: 'Zhengjinjiang.Design',
    },
    project: {
      entry: 'src/pages/project.js',
      filename: 'project.html',
      title: 'Project - Zhengjinjiang.Design',
    },
  },
};
