/**
 * @description - coco:browserslist generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:browserslist', () => {
  it('should generate browserslist configuration', () => {
    const postcss = path.resolve(__dirname, '../generators/browserslist');

    return renderer.run(postcss).then(() => {
      assert.file(['.browserslistrc']);

      const configuration = fs.readFileSync('.browserslistrc', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
