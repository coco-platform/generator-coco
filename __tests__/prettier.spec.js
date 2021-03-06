/**
 * @description - coco:prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:prettier', () => {
  it('should setup prettier environment', () => {
    const prettier = path.resolve(__dirname, '../generators/prettier');

    return renderer
      .run(prettier)
      .inTmpDir((dir) => {
        const template = path.resolve(__dirname, '__fixtures__/package.json');
        const destiny = path.resolve(dir, 'package.json');

        fs.copyFileSync(template, destiny);
      })
      .then(() => {
        assert.file(['.prettierrc']);

        const meta = fs.readFileSync('package.json', 'utf8');

        expect(meta).toMatchSnapshot();
      });
  });
});
