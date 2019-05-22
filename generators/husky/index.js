/**
 * @description - husky setup
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class HuskyGenerator extends Generator {
  install() {
    this.yarnInstall(['husky'], { dev: true });
  }
}

module.exports = HuskyGenerator;
