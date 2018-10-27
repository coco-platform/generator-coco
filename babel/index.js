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
const Renderer = require('./renderer');

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

    const answers = await this.prompt(questions);

    this.renderer = new Renderer(answers);
    this.renderer.renderBabelPresets().renderBabelPlugins();
  }

  configuring() {
    const {
      presetsRenderBlock,
      pluginsRenderBlock,
      envRenderBlock,
    } = this.renderer;

    const config = {
      presets: presetsRenderBlock,
      plugins: pluginsRenderBlock,
      env: envRenderBlock,
    };

    this.fs.write(
      this.destinationPath('.babelrc'),
      JSON.stringify(config, null, '  ')
    );
  }

  install() {
    const { dependencies } = this.renderer;

    // babel preset, plugin dependencies
    this.yarnInstall(dependencies, { dev: true });
    this.yarnInstall(
      ['@babel/cli', '@babel/core', 'babel-jest', 'babel-core@bridge'],
      { dev: true }
    );
  }
}

module.exports = BabelGenerator;
