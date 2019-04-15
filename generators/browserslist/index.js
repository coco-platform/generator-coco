/**
 * @description -coco browsers list generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class BrowsersListGenerator extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.browserslistrc'),
      this.destinationPath('.browserslistrc')
    );
  }
}

module.exports = BrowsersListGenerator;
