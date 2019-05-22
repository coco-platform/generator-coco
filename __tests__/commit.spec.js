/**
 * @description - coco:prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:commit', () => {
  it('should setup commitizen environment', () => {
    const commit = path.resolve(__dirname, '../generators/commit');

    return renderer
      .run(commit)
      .inTmpDir((dir) => {
        const template = path.resolve(__dirname, '__fixtures__/package.json');
        const destiny = path.resolve(dir, 'package.json');

        fs.copyFileSync(template, destiny);
      })
      .then(() => {
        assert.file(['.commitlintrc.yml']);

        const meta = fs.readFileSync('package.json', 'utf8');

        expect(meta).toMatchSnapshot();
      });
  });
});
