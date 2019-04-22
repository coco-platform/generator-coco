/**
 * @description -coco gitlab CI generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class GitlabCIGenerator extends Generator {
  configuring() {
    this.fs.copy(
      this.templatePath('.gitlab-ci.yml'),
      this.destinationPath('.gitlab-ci.yml')
    );
  }
}

module.exports = GitlabCIGenerator;
