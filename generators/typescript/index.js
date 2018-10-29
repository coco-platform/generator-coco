/**
 * @description -coco travis generator
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
const hbs = require('handlebars');
const Generator = require('yeoman-generator');

class TravisGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('root', {
      desc: 'the source code directory',
      alias: 'r',
      type: String,
      default: 'src',
    });
  }

  configuration() {
    const template = this.fs.read(this.templatePath('tsconfig.json.hbs'));
    const context = {
      root: this.options.root,
    };
    const content = hbs.compile(template)(context);

    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.write(this.destinationPath('tsconfig.json'), content);
  }

  install() {
    const devDependencies = ['typescript', 'tslint'];

    this.yarnInstall(devDependencies, { dev: true });
  }
}

module.exports = TravisGenerator;
