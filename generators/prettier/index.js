/**
 * @description -coco prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class PrettierGenerator extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );
  }

  install() {
    const devDependencies = ['prettier', 'pretty-quick'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = PrettierGenerator;
