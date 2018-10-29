/**
 * @description -coco git generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class EditorGenerator extends Generator {
  configuring() {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }
}

module.exports = EditorGenerator;
