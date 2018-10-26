/**
 * @description - renderer babel rc
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * =============================================================================
 * babel preset render block
 * =============================================================================
 */
const PresetEnvNode = [
  '@babel/preset-env',
  {
    targets: {
      node: '10.0.0',
    },
  },
];
const PresetEnvWeb = [
  '@babel/preset-env',
  {
    modules: false,
    loose: true,
  },
];

class Renderer {
  /**
   * @param {BabelAnswers} answers
   */
  constructor(answers) {
    this.answers = answers;
    this.presetsRenderBlock = [];
    this.pluginsRenderBlock = [];
    this.envRenderBlock = {};
    this.dependencies = [];
  }

  // presets block
  renderBabelPresets() {
    const { presets, environment } = this.answers;

    presets.forEach((preset) => {
      this.dependencies.push(preset);

      if (preset === '@babel/preset-env') {
        if (environment === 'Node') {
          this.presetsRenderBlock.push(PresetEnvNode);
        } else {
          this.presetsRenderBlock.push(PresetEnvWeb);
        }
      } else {
        this.presetsRenderBlock.push(preset);
      }
    });

    return this;
  }

  renderBabelPlugins() {
    const { environment } = this.answers;
    const WebPresetPlugins = [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-regenerator',
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          corejs: 2,
        },
      ],
    ];

    // web share block
    if (environment === 'Web' || environment === 'React') {
      WebPresetPlugins.forEach((plugin) => {
        this.dependencies.push(Array.isArray(plugin) ? plugin[0] : plugin);
        this.pluginsRenderBlock.push(plugin);
      });

      // unit test with jest
      this.dependencies.push('@babel/plugin-transform-modules-commonjs');

      Reflect.set(this.envRenderBlock, 'test', {
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      });
    }

    if (environment === 'React') {
      // antd library optimize import
      this.dependencies.push('babel-plugin-import');

      this.pluginsRenderBlock.push([
        'babel-plugin-import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ]);

      // react hot reload
      this.dependencies.push('react-hot-loader');

      Reflect.set(this.envRenderBlock, 'development', {
        plugins: ['react-hot-loader/babel'],
      });
    }

    return this;
  }
}

module.exports = Renderer;
