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
  it('should generate prettier configuration', () => {
    const prettier = path.resolve(__dirname, '../prettier');

    return renderer.run(prettier).then(() => {
      assert.file(['.prettierrc']);

      const configuration = fs.readFileSync('.prettierrc', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
