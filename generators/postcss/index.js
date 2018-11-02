/**
 * @description -coco postcss generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const hbs = require('handlebars');
const Generator = require('yeoman-generator');

class PostcssGenerator extends Generator {
  configuring() {
    const template = this.fs.read(this.templatePath('postcss.config.js.hbs'));
    const content = hbs.compile(template)({});

    this.fs.write(this.destinationPath('postcss.config.js'), content);
  }

  install() {
    const devDependencies = [
      'autoprefixer',
      'postcss-nested',
      'postcss-flexbugs-fixes',
    ];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = PostcssGenerator;
