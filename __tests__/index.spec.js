/**
 * @description - coco generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:webpack', () => {
  it('should generate webpack configuration with typescript', () => {
    const webpack = path.resolve(__dirname, '../webpack');
    const prompts = {
      typescript: true,
      cssmodules: false,
      definition: 'bootcdn.stable.yml',
      entry: './src/main.js',
    };

    return renderer
      .run(webpack)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['webpack.development.js', 'webpack.production.js']);

        const development = fs.readFileSync('webpack.development.js', 'utf8');
        const production = fs.readFileSync('webpack.production.js', 'utf8');

        expect(development).toMatchSnapshot();
        expect(production).toMatchSnapshot();
      });
  });

  it('should generate webpack configuration without typescript', () => {
    const webpack = path.resolve(__dirname, '../webpack');
    const prompts = {
      typescript: false,
      cssmodules: false,
      definition: 'bootcdn.stable.yml',
      entry: './src/main.js',
    };

    return renderer
      .run(webpack)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['webpack.development.js', 'webpack.production.js']);

        const development = fs.readFileSync('webpack.development.js', 'utf8');
        const production = fs.readFileSync('webpack.production.js', 'utf8');

        expect(development).toMatchSnapshot();
        expect(production).toMatchSnapshot();
      });
  });
});
