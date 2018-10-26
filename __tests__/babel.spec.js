/**
 * @description - coco:babel generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Renderer = require('../babel/renderer');

describe('coco:babel generator', () => {
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
