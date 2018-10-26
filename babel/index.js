/**
 * @description - coco babel generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} BabelAnswers
 *
 * @property {Array<string>} presets
 * @property {string} environment
 */

// packages
const Generator = require('yeoman-generator');

class BabelGenerator extends Generator {
  async prompting() {
    const questions = [
      {
        type: 'checkbox',
        name: 'presets',
        message: 'Which presets would you like to use?',
        default: ['@babel/preset-env'],
        choices: [
          { name: '@babel/preset-env' },
          { name: '@babel/preset-typescript' },
          { name: '@babel/preset-react' },
        ],
      },
      {
        type: 'list',
        name: 'environment',
        message: 'Which environment would you like to coding?',
        // react has more specific configuration than standard web environment
        choices: ['Node', 'Web', 'React'],
        default: 0,
      },
    ];

    this.answers = await this.prompt(questions);
  }

  configuring() {}
}

module.exports = BabelGenerator;
