/**
 * @description -coco travis generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} JestAnswers
 *
 * @property {boolean} universal - whether require none javascript assets
 * @property {string} environment - node or jsdom
 * @property {string} root - source code root directory
 */

// packages
const hbs = require('handlebars');
const Generator = require('yeoman-generator');

class JestGenerator extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'universal',
        message: 'Do you need require none javascript assets?',
        default: false,
      },
      {
        type: 'list',
        name: 'environment',
        message: 'What environment do you need?',
        choices: ['node', 'jsdom'],
        default: 0,
      },
      {
        type: 'input',
        name: 'root',
        message: `What's your source code directory name?`,
        default: 'src',
      },
    ]);
  }

  configuring() {
    const template = this.fs.read(this.templatePath('jest.config.js.hbs'));
    const compile = hbs.compile(template);
    const content = compile(this.answers);

    this.fs.write(this.destinationPath('jest.config.js'), content);
  }

  install() {
    const devDependencies = !this.answers.universal
      ? ['babel-jest']
      : ['babel-jest', '@coco-platform/jest-tools'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = JestGenerator;
