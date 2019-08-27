/**
 * @description -coco eslint generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} EslintAnswers
 *
 * @property {boolean} babel
 * @property {Array<string>} context
 * @property {string} environment
 */

// packages
const hbs = require('handlebars');
const Generator = require('yeoman-generator');
// scope
const PresetExtensions = {
  Node: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb-base',
    'prettier',
  ],
  Web: ['eslint:recommended', 'airbnb-base', 'prettier'],
  React: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/react'],
};
const PresetDependencies = {
  Node: [
    'eslint-plugin-node',
    'eslint-config-airbnb-base',
    'eslint-plugin-import',
    'eslint-config-prettier',
  ],
  Web: [
    'eslint-config-airbnb-base',
    'eslint-plugin-import',
    'eslint-config-prettier',
  ],
  React: [
    'eslint-config-airbnb',
    'eslint-plugin-import',
    'eslint-plugin-react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react-hooks',
    'eslint-config-prettier',
  ],
};

class EslintGenerator extends Generator {
  async prompting() {
    const questions = [
      {
        type: ' confirm',
        name: 'babel',
        message: 'Would you like to use babel as eslint parser?',
        default: true,
      },
      {
        type: 'checkbox',
        name: 'context',
        message: 'Which context would you like to lint?',
        default: ['browser', 'jest'],
        choices: ['browser', 'node', 'jest'],
      },
      {
        type: 'rawlist',
        name: 'environment',
        message: 'Which runtime environment would you like to use?',
        choices: ['Node', 'Web', 'React'],
        default: 0,
      },
    ];

    /**
     * @type {EslintAnswers}
     */
    this.answers = await this.prompt(questions);
  }

  configuration() {
    const template = this.fs.read(this.templatePath('.eslintrc.yml.hbs'));
    const compile = hbs.compile(template);

    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.write(
      this.destinationPath('.eslintrc.yml'),
      compile({
        babel: this.answers.babel,
        context: this.answers.context,
        // React 上下文环境
        react: this.answers.environment === 'React',
        extends: Reflect.get(PresetExtensions, this.answers.environment),
      })
    );
  }

  install() {
    const baseDependencies = ['eslint'];
    const dedicatedDependencies = Reflect.get(
      PresetDependencies,
      this.answers.environment
    );

    if (this.answers.babel) {
      baseDependencies.push('babel-eslint');
    }

    this.yarnInstall([...baseDependencies, ...dedicatedDependencies], {
      dev: true,
    });
  }
}

module.exports = EslintGenerator;
