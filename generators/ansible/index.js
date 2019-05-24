/**
 * @description - coco ansible generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} AnsibleAnswers
 *
 * @property {Array<string>} environments
 * @property {string} project
 */

// packages
const Generator = require('yeoman-generator');
const chalk = require('chalk');

class AnsibleGenerator extends Generator {
  async prompting() {
    const questions = [
      {
        type: 'checkbox',
        name: 'environments',
        message: 'Which environment would you like to use?',
        choices: [
          { name: 'development', checked: true },
          { name: 'staging', checked: true },
          { name: 'production', checked: true },
        ],
      },
      {
        type: 'rawlist',
        name: 'project',
        message: `What's the project type?`,
        choices: ['web', 'java'],
        default: 0,
      },
    ];

    this.answers = await this.prompt(questions);
  }

  writing() {
    // render default hosts placeholder
    this.answers.environments.forEach((environment) => {
      this.fs.copyTpl(
        this.templatePath('hosts.ejs'),
        this.destinationPath(`ansible/${environment}/hosts`),
        this.answers
      );
    });

    // render default ansible orchestration
    this.fs.copy(
      this.templatePath(`${this.answers.project}.yml`),
      this.destinationPath(`ansible/site.yml`)
    );
  }

  end() {
    this.log(
      chalk.magenta(
        `\nAnsible setup successful, change following variable within hosts: \n`
      )
    );

    if (this.answers.project === 'web') {
      this.log(`  ${chalk.cyan('static_bundle')}`);
      this.log(`    bundle location relative to ansible/site.yml.\n`);
      this.log(`  ${chalk.cyan('static_container')}`);
      this.log(`    nginx root to un-archive the bundle.\n\n`);
    }

    if (this.answers.project === 'java') {
      this.log(`  ${chalk.cyan('container')}`);
      this.log(`    remote location to transfer the jar binary.\n`);
      this.log(`  ${chalk.cyan('port')}`);
      this.log(`    spring service listening port.\n`);
      this.log(`  ${chalk.cyan('env')}`);
      this.log(`    spring service active profile environment.\n`);
      this.log(`  ${chalk.cyan('package')}`);
      this.log(`    compiled binary location, pass by command line.\n\n`);
    }
  }
}

module.exports = AnsibleGenerator;
