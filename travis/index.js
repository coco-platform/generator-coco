/**
 * @description -coco travis generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class TravisGenerator extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml')
    );
  }

  install() {
    const devDependencies = ['coveralls'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = TravisGenerator;
