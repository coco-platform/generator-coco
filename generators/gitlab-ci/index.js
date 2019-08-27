/**
 * @description - coco gitlab CI generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');

class GitlabCIGenerator extends Generator {
  async prompting() {
    const projects = [
      {
        type: 'rawlist',
        name: 'project',
        message: `What's the project type?`,
        choices: ['web', 'java'],
        default: 0,
      },
    ];

    this.answers = await this.prompt(projects);
  }

  configuring() {
    if (this.answers.project === 'web') {
      const template = this.templatePath('.gitlab-ci-web.yml');
      const destiny = this.destinationPath('.gitlab-ci.yml');

      this.fs.copy(template, destiny);
    }

    if (this.answers.project === 'java') {
      const template = this.templatePath('.gitlab-ci-java.yml');
      const destiny = this.destinationPath('.gitlab-ci.yml');

      this.fs.copy(template, destiny);
    }
  }
}

module.exports = GitlabCIGenerator;
