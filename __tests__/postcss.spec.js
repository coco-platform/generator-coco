/**
 * @description - coco:postcss generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:postcss', () => {
  it('should generate postcss configuration', () => {
    const postcss = path.resolve(__dirname, '../generators/postcss');

    return renderer.run(postcss).then(() => {
      assert.file(['postcss.config.js']);

      const configuration = fs.readFileSync('postcss.config.js', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
