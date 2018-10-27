/**
 * @description - coco:babel generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const yeomon = require('yeoman-test');
const assert = require('yeoman-assert');
const Renderer = require('../babel/renderer');

describe('coco:babel renderer', () => {
  it('should render proper babel presets within node', () => {
    const answers = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'Node',
    };
    const rc = new Renderer(answers);

    rc.renderBabelPresets();

    expect(rc.dependencies).toMatchSnapshot();
    expect(rc.presetsRenderBlock).toMatchSnapshot();
  });

  it('should render proper babel plugins within node', () => {
    const answers = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'Node',
    };
    const rc = new Renderer(answers);

    rc.renderBabelPlugins();

    expect(rc.dependencies).toMatchSnapshot();
    expect(rc.pluginsRenderBlock).toMatchSnapshot();
  });

  it('should render proper babel presets within web', () => {
    const answers = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'Web',
    };
    const rc = new Renderer(answers);

    rc.renderBabelPresets();

    expect(rc.dependencies).toMatchSnapshot();
    expect(rc.presetsRenderBlock).toMatchSnapshot();
  });

  it('should render proper babel plugins within web', () => {
    const answers = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'Web',
    };
    const rc = new Renderer(answers);

    rc.renderBabelPlugins();

    expect(rc.dependencies).toMatchSnapshot();
    expect(rc.pluginsRenderBlock).toMatchSnapshot();
    expect(rc.envRenderBlock).toMatchSnapshot();
  });

  it('should render proper babel plugins within react', () => {
    const answers = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'React',
    };
    const rc = new Renderer(answers);

    rc.renderBabelPlugins();

    expect(rc.dependencies).toMatchSnapshot();
    expect(rc.pluginsRenderBlock).toMatchSnapshot();
    expect(rc.envRenderBlock).toMatchSnapshot();
  });
});

describe('coco:babel generator', () => {
  it('should output proper babel configuration', () => {
    const babel = path.resolve(__dirname, '../babel');
    const prompts = {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      environment: 'React',
    };

    return yeomon
      .run(babel)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['.babelrc']);

        const configuration = fs.readFileSync('.babelrc', 'utf8');

        expect(configuration).toMatchSnapshot();
      });
  });
});
