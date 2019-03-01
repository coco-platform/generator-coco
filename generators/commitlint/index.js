/**
 * @description -coco prettier generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const merge = require('deepmerge');
const Generator = require('yeoman-generator');

class CommitlintGenerator extends Generator {
  writing() {
    const metaFile = this.destinationPath('package.json');
    const exist = this.fs.exists(metaFile);

    // initialize hook and config
    if (exist) {
      const meta = this.fs.readJSON(metaFile);
      const extension = {
        config: {
          commitizen: {
            path: 'cz-conventional-changelog',
          },
        },
        husky: {
          hooks: {
            'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
          },
        },
      };
      const override = merge(meta, extension);

      this.fs.extendJSON(metaFile, override, null, 2);
    }

    this.fs.copy(
      this.templatePath('.commitlintrc.yml'),
      this.destinationPath('.commitlintrc.yml')
    );
  }

  install() {
    const devDependencies = [
      'commitizen',
      'cz-conventional-changelog',
      '@commitlint/config-conventional',
      '@commitlint/cli',
      'husky',
    ];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = CommitlintGenerator;
