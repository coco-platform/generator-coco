/**
 * @description -coco meta generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable indent,max-len */

// packages
const assert = require('assert');
const hbs = require('handlebars');
const Generator = require('yeoman-generator');
// scope
const regExp = {
  scope: /^[\w-]+$/,
};
const PresetScripts = {
  Node: [
    { key: 'clean', value: 'rm -rf native es lib' },
    { key: 'compile', value: 'npm-run-all -s compile:*' },
    { key: 'compile:native', value: 'tsc --declaration --outDir native' },
    {
      key: 'compile:cjs',
      value: `babel src --source-maps --out-dir es --extensions '.js,.ts'`,
    },
  ],
  Web: [
    { key: 'clean', value: 'rm -rf native es lib' },
    { key: 'compile', value: 'npm-run-all -s compile:*' },
    { key: 'compile:native', value: 'tsc --declaration --outDir native' },
    {
      key: 'compile:esm',
      value: `babel src --source-maps --out-dir es --extensions '.js,.ts'`,
    },
    {
      key: 'compile:cjs',
      value: `babel src --source-maps --out-dir lib --extensions '.js,.ts' --plugins=@babel/plugin-transform-modules-commonjs`,
    },
    {
      key: 'dev',
      value: 'NODE_ENV=development webpack-dev-server --hot --inline',
    },
  ],
  React: [
    { key: 'clean', value: 'rm -rf dist' },
    {
      key: 'dev',
      value: 'NODE_ENV=development webpack-dev-server --hot --inline',
    },
    {
      key: 'build',
      value: 'NODE_ENV=production webpack --config webpack.production.js',
    },
  ],
};

class MetaGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('project', {
      desc: 'the new project name',
      alias: 'p',
      type: String,
    });

    assert(this.options.project, 'the project option is required');
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'environment',
        message: 'Which environment would you like to coding?',
        // react has more specific configuration than standard web environment
        choices: ['Node', 'Web', 'React'],
        default: 0,
      },
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
    const { project } = this.options;
    const readme = {
      template: this.fs.read(this.templatePath('README.md.hbs')),
      context: this.answers,
    };
    const json = {
      template: this.fs.read(this.templatePath('package.json.hbs')),
      context: {
        ...this.answers,
        scripts: Reflect.get(PresetScripts, this.answers.environment),
      },
    };

    this.fs.write(
      this.destinationPath(`${project}/README.md`),
      hbs.compile(readme.template)(readme.context)
    );
    this.fs.write(
      this.destinationPath(`${project}/package.json`),
      hbs.compile(json.template)(json.context)
    );
  }
}

module.exports = MetaGenerator;
