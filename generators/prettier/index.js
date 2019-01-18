/**
 * @description -coco prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const merge = require('deepmerge');
const Generator = require('yeoman-generator');

class PrettierGenerator extends Generator {
  writing() {
    const metaFile = this.destinationPath('package.json');
    const exist = this.fs.exists(metaFile);

    // add prettier hook
    if (exist) {
      const meta = this.fs.readJSON(metaFile);
      const previous = meta.husky || {};
      const extension = {
        hooks: {
          'pre-commit': 'pretty-quick --staged',
        },
      };
      const override = {
        husky: merge(previous, extension),
      };

      this.fs.extendJSON(metaFile, override, null, 2);
    }

    this.fs.copy(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );
  }

  install() {
    const devDependencies = ['prettier', 'pretty-quick', 'husky'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = PrettierGenerator;
