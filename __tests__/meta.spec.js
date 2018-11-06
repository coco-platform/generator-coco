/**
 * @description - coco:meta generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');
const hbs = require('handlebars');

describe('coco:meta', () => {
  it('should generate standard README.md', () => {
    const template = fs.readFileSync(
      path.resolve(__dirname, '../generators/meta/templates/README.md.hbs'),
      'utf8'
    );
    const context = {
      provider: 'github.com',
      scope: 'coco-platform',
      repo: 'automatic-ci',
      description: 'automatic manage ci',
    };

    expect(hbs.compile(template)(context)).toMatchSnapshot();
  });

  it('should web package style package.json', () => {
    const template = fs.readFileSync(
      path.resolve(__dirname, '../generators/meta/templates/package.json.hbs'),
      'utf8'
    );
    const context = {
      provider: 'github.com',
      scope: 'coco-platform',
      repo: 'automatic-ci',
      description: 'automatic manage ci',
      web: true,
      scripts: [
        { key: 'clean', value: 'rm -rf native es lib' },
        { key: 'compile', value: 'npm-run-all -s compile:*' },
      ],
    };

    expect(hbs.compile(template)(context)).toMatchSnapshot();
  });
});

describe('coco:meta generator', () => {
  it('should generate standard', () => {
    const meta = path.resolve(__dirname, '../generators/meta');
    const prompts = {
      provider: 'github.com',
      scope: 'coco-platform',
      repo: 'automatic-ci',
      description: 'automatic manage ci',
      environment: 'Node',
    };
    const options = {
      project: 'UT',
    };
    return renderer
      .run(meta)
      .withOptions(options)
      .withPrompts(prompts)
      .then(() => {
        assert.file(['UT/README.md', 'UT/package.json']);

        const configuration = fs.readFileSync('UT/package.json', 'utf8');

        expect(configuration).toMatchSnapshot();
      });
  });
});
