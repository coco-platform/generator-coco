/**
 * @description -coco gitlab CI generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const chalk = require('chalk');
const hbs = require('handlebars');
const Generator = require('yeoman-generator');

class GitlabCIGenerator extends Generator {
  async prompting() {
    const projects = [
      {
        type: 'rawlist',
        name: 'project',
        message: `What's the project type?`,
        choices: ['web', 'nodejs', 'java'],
        default: 0,
      },
    ];

    const environments = [
      {
        type: 'confirm',
        name: 'scale',
        message: `Do you have more than one production cluster?`,
        default: true,
      },
    ];

    const project = await this.prompt(projects);
    const environment = await this.prompt(environments);

    this.answers = { ...project, ...environment };
  }

  configuring() {
    if (this.answers.project === 'web') {
      const template = this.fs.read(this.templatePath('web.yml.hbs'));
      const compile = hbs.compile(template);
      const destiny = this.destinationPath('.gitlab-ci.yml');
      const content = compile(this.answers);

      this.fs.write(destiny, content);

      return;
    }

    this.log(
      chalk.cyan(
        ` Todo - Gitlab CI for ${this.answers.project} is still in progress!!!`
      )
    );
  }
}

module.exports = GitlabCIGenerator;
