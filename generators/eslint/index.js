/**
 * @description -coco eslint generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class EslintGenerator extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );
  }

  install() {
    const dependencies = ['eslint', 'babel-parser'];

    this.yarnInstall(dependencies, { dev: true });
  }
}

module.exports = EslintGenerator;
