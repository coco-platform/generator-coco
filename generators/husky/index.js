/**
 * @description - husky setup
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class HuskyGenerator extends Generator {
  initializing() {
    this.composeWith(require.resolve('../prettier'), {});
    this.composeWith(require.resolve('../commit'), {});
  }

  install() {
    this.yarnInstall(['husky'], { dev: true });
  }
}

module.exports = HuskyGenerator;
