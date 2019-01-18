/**
 * @description -coco git generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const merge = require('deepmerge');
const Generator = require('yeoman-generator');

class GitGenerator extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'confirm',
        name: 'commitizen',
        message: 'Would you like to enable the Cool commitizen feature?',
      },
    ]);
  }

  writing() {
    // initialize commitizen when necessary
    if (this.answers.commitizen) {
      const metaFile = this.destinationPath('package.json');
      const exist = this.fs.exists(metaFile);

      if (exist) {
        const meta = this.fs.readJSON(metaFile);
        const extension = {
          config: {
            commitizen: {
              path: 'cz-conventional-changelog',
            },
          },
        };

        const override = merge(meta, extension);

        this.fs.writeJSON(metaFile, override, null, 2);
      }
    }

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.spawnCommandSync('git', ['init', '--quiet']);

    if (this.answers.commitizen) {
      const devDependencies = ['commitizen', 'cz-conventional-changelog'];

      this.yarnInstall(devDependencies, { dev: true });
    }
  }
}

module.exports = GitGenerator;
