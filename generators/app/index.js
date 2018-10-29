/**
 * @description - Coco generator bundle
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const Generator = require('yeoman-generator');
// scope
const babel = require.resolve('../babel');
const eslint = require.resolve('../eslint');
const git = require.resolve('../git');
const jest = require.resolve('../jest');
const prettier = require.resolve('../prettier');
const travis = require.resolve('../travis');
const typescript = require.resolve('../typescript');
const webpack = require.resolve('../webpack');
const editor = require.resolve('../editor');

class Coco extends Generator {
  initializing() {
    // generator without prompts
    this.composeWith(editor, {});
    this.composeWith(git, {});
    this.composeWith(prettier, {});
    this.composeWith(travis, {});
    // generator with prompts
    this.composeWith(babel, {});
    this.composeWith(eslint, {});
    this.composeWith(jest, {});
    this.composeWith(typescript, {});
    this.composeWith(webpack, {});
  }
}

module.exports = Coco;
