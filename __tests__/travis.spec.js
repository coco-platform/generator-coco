/**
 * @description - coco:travis generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const path = require('path');
const fs = require('fs');
const renderer = require('yeoman-test');
const assert = require('yeoman-assert');

describe('coco:travis', () => {
  it('should generate travis configuration', () => {
    const travis = path.resolve(__dirname, '../travis');

    return renderer.run(travis).then(() => {
      assert.file(['.travis.yml']);

      const configuration = fs.readFileSync('.travis.yml', 'utf8');

      expect(configuration).toMatchSnapshot();
    });
  });
});
