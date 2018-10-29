/**
 * @description -coco meta generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const hbs = require('handlebars');
const Generator = require('yeoman-generator');
// scope
const regExp = {
  scope: /^[\w-]+$/,
  author: /^[a-z]{3,8}\.?[a-z]{3,20}$/,
};

class MetaGenerator extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'provider',
        message: `What's the git cloud provider?`,
        choices: ['github.com', 'gitlab.com', 'bitbucket.org'],
        default: 'github.com',
      },
      {
        type: 'input',
        name: 'scope',
        message: `what's the repo scope?`,
        validate(input) {
          return (
            regExp.scope.test(input) ||
            'Invalid repo scope, only [A-Za-z_-] accepted'
          );
        },
      },
      {
        type: 'input',
        name: 'repo',
        message: `what's the repo name?`,
        validate(input) {
          return (
            regExp.scope.test(input) ||
            'Invalid package scope, only [A-Za-z_-] accepted'
          );
        },
      },
      {
        type: 'input',
        name: 'description',
        message: `what's the repo description?`,
      },
    ]);
  }

  writing() {
    const readmeTemplate = this.fs.read(this.templatePath('README.md.hbs'));
    const readmeContent = hbs.compile(readmeTemplate)(this.answers);
    const jsonTemplate = this.fs.read(this.templatePath('package.json.hbs'));
    const jsonContent = hbs.compile(jsonTemplate)(this.answers);

    this.fs.write(this.destinationPath('README.md'), readmeContent);
    this.fs.write(this.destinationPath('package.json'), jsonContent);
  }
}

module.exports = MetaGenerator;
