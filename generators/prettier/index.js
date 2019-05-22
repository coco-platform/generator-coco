/**
 * @description -coco prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const merge = require('deepmerge');
const Generator = require('yeoman-generator');

class PrettierGenerator extends Generator {
  initializing() {
    this.composeWith(require.resolve('../husky'), {});
  }

  writing() {
    const metaFile = this.destinationPath('package.json');
    const meta = this.fs.readJSON(metaFile);
    const extension = {
      husky: {
        hooks: {
          'pre-commit': 'pretty-quick --staged',
        },
      },
    };
    const override = merge(meta, extension);

    this.fs.extendJSON(metaFile, override, null, 2);
    this.fs.copy(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );
  }

  install() {
    const devDependencies = ['prettier', 'pretty-quick'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = PrettierGenerator;
