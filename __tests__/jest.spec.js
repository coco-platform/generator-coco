/**
 * @description - coco:jest generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const yeomon = require('yeoman-test');
const assert = require('yeoman-assert');
const hbs = require('handlebars');

describe('coco:jest generator', () => {
  const template = fs.readFileSync(
    path.resolve(
      process.cwd(),
      'generators',
      'jest',
      'templates',
      'jest.config.js.hbs'
    ),
    'utf8'
  );
  const compile = hbs.compile(template);

  it('should properly render template with universal require', () => {
    const context = {
      universal: true,
      root: 'native',
      environment: 'node',
    };

    expect(compile(context)).toMatchSnapshot();
  });

  it('should properly render template without universal require', () => {
    const context = {
      universal: false,
      root: 'native',
      environment: 'node',
    };

    expect(compile(context)).toMatchSnapshot();
  });

  it('should output jest configuration', () => {
    const jest = path.resolve(__dirname, '../generators/jest');
    const prompts = {
      universal: false,
      environment: 'node',
      root: './src',
    };

    return yeomon
      .run(jest)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['jest.config.js']);

        const configuration = fs.readFileSync('jest.config.js', 'utf8');

        expect(configuration).toMatchSnapshot();
      });
  });
});
