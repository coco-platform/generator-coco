/**
 * @description - coco:editor generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:editor', () => {
  it('should generate editor configuration', () => {
    const editor = path.resolve(__dirname, '../generators/editor');

    return renderer.run(editor).then(() => {
      assert.file(['.editorconfig']);

      const configuration = fs.readFileSync('.editorconfig', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
