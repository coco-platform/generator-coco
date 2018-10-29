/**
 * @description - coco:typescript generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const yeomon = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:typescript generator', () => {
  it('should output typescript configuration', () => {
    const typescript = path.resolve(__dirname, '../generators/typescript');
    const options = {
      root: './lib',
    };

    return yeomon
      .run(typescript)
      .withOptions(options)
      .then(() => {
        assert.file(['tslint.json', 'tsconfig.json']);

        const lint = fs.readFileSync('tslint.json', 'utf8');
        const compile = fs.readFileSync('tsconfig.json', 'utf8');

        expect(lint).toMatchSnapshot();
        expect(compile).toMatchSnapshot();
      });
  });
});
