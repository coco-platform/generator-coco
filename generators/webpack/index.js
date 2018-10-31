/**
 * @description -coco webpack generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} WebpackAnswers
 *
 * @property {boolean} typescript
 * @property {boolean} cssmodules
 * @property {string} definition
 */

// packages
const Generator = require('yeoman-generator');
const figlet = require('figlet');
const chalk = require('chalk');
// scope
const welcome = figlet.textSync('Coco', {
  font: 'Ghost',
  horizontalLayout: 'default',
  verticalLayout: 'default',
});

class WebpackGenerator extends Generator {
  constructor(args, options) {
    super(args, options);

    this.log(chalk.cyan(welcome));
    this.log();
    this.option('only', {
      desc: 'use only development or production configuration',
      alias: 'o',
      type: String,
    });
  }

  async prompting() {
    /**
     * @type {WebpackAnswers}
     */
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Do you need typescript within?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'cssmodules',
        message: 'Do you need css modules within?',
        default: false,
      },
      {
        type: 'input',
        name: 'definition',
        message: 'Where is the external resources mappings?',
      },
      {
        type: 'list',
        name: 'entry',
        message: 'Where is the entry file?',
        choices: [
          './src/main.js',
          './src/main.jsx',
          './src/main.ts',
          './src/main.tsx',
          './public/main.js',
          './public/main.jsx',
          './public/main.ts',
          './public/main.tsx',
        ],
      },
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('webpack.development.ejs'),
      this.destinationPath('webpack.config.js'),
      this.answers
    );

    if (this.options.only !== 'development' && this.options.only !== 'dev')
      this.fs.copyTpl(
        this.templatePath('webpack.production.ejs'),
        this.destinationPath('webpack.production.js'),
        this.answers
      );
  }

  install() {
    const devDependencies = [
      '@babel/core',
      '@coco-platform/webpack-plugin-html-minify',
      '@coco-platform/webpack-plugin-inject-external',
      'autoprefixer',
      'babel-core@bridge',
      'babel-loader',
      'case-sensitive-paths-webpack-plugin',
      'compression-webpack-plugin',
      'css-loader',
      'file-loader',
      'fork-ts-checker-webpack-plugin',
      'html-webpack-plugin',
      'mini-css-extract-plugin',
      'optimize-css-assets-webpack-plugin',
      'postcss-loader',
      'progress-bar-webpack-plugin',
      'style-loader',
      'tslint',
      'typescript',
      'uglifyjs-webpack-plugin',
      'url-loader',
      'webpack',
      'webpack-cli',
      'webpack-bundle-analyzer',
      'webpack-plugin-inject-external',
    ];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = WebpackGenerator;
