/**
 * @description - coco:git generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:git', () => {
  it('should generate git configuration', () => {
    const git = path.resolve(__dirname, '../generators/git');

    return renderer.run(git).then(() => {
      assert.file(['.gitignore']);

      const configuration = fs.readFileSync('.gitignore', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
