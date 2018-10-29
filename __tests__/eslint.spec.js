/**
 * @description - coco:eslint generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const yeomon = require('yeoman-test');
const assert = require('yeoman-assert');
const hbs = require('handlebars');

describe('coco:eslint render', () => {
  const template = fs.readFileSync(
    path.resolve(
      process.cwd(),
      'generators',
      'eslint',
      'templates',
      '.eslintrc.yml.hbs'
    ),
    'utf8'
  );
  const compile = hbs.compile(template);

  it('should render properly with babel parser', () => {
    const ctx = {
      babel: true,
    };

    expect(compile(ctx)).toMatchSnapshot();
  });

  it('should render properly without babel parser', () => {
    const ctx = {
      babel: false,
    };

    expect(compile(ctx)).toMatchSnapshot();
  });

  it('should render property context', () => {
    const ctx = {
      context: ['node', 'jest'],
    };

    expect(compile(ctx)).toMatchSnapshot();
  });

  it('should render property environment extension', () => {
    const ctx = {
      extends: ['eslint:recommended'],
    };

    expect(compile(ctx)).toMatchSnapshot();
  });
});

describe('coco:eslint generator', () => {
  it('should output eslint configuration', () => {
    const eslint = path.resolve(__dirname, '../generators/eslint');
    const prompts = {
      babel: false,
      context: ['node', 'jest'],
      environment: 'Web',
    };

    return yeomon
      .run(eslint)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['.eslintrc.yml']);

        const configuration = fs.readFileSync('.eslintrc.yml', 'utf8');

        expect(configuration).toMatchSnapshot();
      });
  });
});
