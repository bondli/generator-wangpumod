'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


function firstUpperCase(str) {
  return str.replace(/^\S/, function(s) {
    return s.toUpperCase();
  });
}

function camelTrans(str, isBig) {
  var i = isBig ? 0 : 1;
  str = str.split('-');
  for (; i < str.length; i++) {
    str[i] = firstUpperCase(str[i]);
  }
  return str.join('');
}

var WangpumodGenerator = Generator.extend({
	initializing: function () {
		this.pkg = require('../package.json');
		// Greetings to the user.
		this.log(yosay(
			'Welcome to ' + chalk.red('official Generator wangpu module') + ' generator!'
		));
	},

  askForApplicationDetails: function () {
    this.fileName = path.basename(process.cwd());
    if(this.fileName.indexOf('wpm-') === -1){
      this.log(yosay(
  			'你的模块名称必须是以' + chalk.red('wpm-') + '开头'
  		));
      process.exit(1);
    }
    this.className = camelTrans(this.fileName.replace('wpm-', ''), true);
    //console.log(this.fileName, this.className);
	},

  createApplicationScaffold: function () {
    fs.mkdir('src');
    fs.mkdir('build');
    fs.mkdir('data');
    fs.mkdir('pages');

    fs.mkdir('src/web');
    fs.mkdir('src/weex');
  },

  createApplicationTemplateFiles: function () {
    var templateVars = {
      fileName: this.fileName,
      className: this.className
    };
    this.fs.copyTpl(
      this.templatePath('_package.json'), this.destinationPath('package.json'), templateVars
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js')
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'), this.destinationPath('README.md'), templateVars
    );
    this.fs.copy(
      this.templatePath('_editorconfig'), this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_gitignore'), this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_babelrc'), this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('webpack.config.web.js'), this.destinationPath('webpack.config.web.js')
    );
    this.fs.copy(
      this.templatePath('webpack.config.weex.js'), this.destinationPath('webpack.config.weex.js')
    );
    this.fs.copy(
      this.templatePath('index.html'), this.destinationPath('index.html')
    );

    this.fs.copyTpl(
      this.templatePath('page.we'), this.destinationPath('src/weex/index.we'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('page.js'), this.destinationPath('src/web/index.js'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('page.scss'), this.destinationPath('src/web/index.scss'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('web.html'), this.destinationPath('pages/web.html'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('weex.html'), this.destinationPath('pages/weex.html'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('web-mock.json'), this.destinationPath('data/web-mock.json'), templateVars
    );
    this.fs.copyTpl(
      this.templatePath('weex-mock.json'), this.destinationPath('data/weex-mock.json'), templateVars
    );
  },

  install: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install'],
			bower: false
		});
	},

  end: function () {
    this.log(yosay(
      'All done! To get going run:\n' +
      chalk.green('gulp \n')
    ));
  }
});

module.exports = WangpumodGenerator;
