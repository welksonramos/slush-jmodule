/*
* slush-jmodule
* https://github.com/welksonramos/slush-jmodule
*
* Copyright (c) 2015-present, Welkson Ramos
* Licensed under the MIT license.
*/

'use strict';

const gulp = require('gulp');
const install = require('gulp-install');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const inquirer = require('inquirer');
const rename = require('gulp-rename');
const replace = require('gulp-regex-replace');

const format = (string) => {
  let username = string ? string.toLowerCase() : '';
  return username.replace(/\s/g, '');
}

const defaults = (() => {
  let homeDir = process.env.Home || process.env.HOMEPATH || process.env.USERPROFILE;
  let workingDirName = process.cwd().split('/').pop().split('\\').pop();
  let osUserName = homeDir && homeDir.split('/').pop() || 'root';
  let configFile = homeDir + '/.gitconfig';
  let user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    moduleName: workingDirName,
    username: format(user.name) || osUserName,
    authorEmail: user.email || ''
  };
})();

const currentDateFormated = () => {
	const date = new Date(),
		day = date.getDate().toString(),
		dayFormated = (day.length == 1) ? '0' + day : day,
		month = (date.getMonth() + 1).toString(),
		monthFormated = (month.length == 1) ? '0' + month : month,
		yearFormated = date.getFullYear();
	return yearFormated + '-' + monthFormated + '-' + dayFormated;
}

gulp.task('default', (done) => {

  let prompts = [
    { type:'input', name: 'projectName', message: 'Project name', default: defaults.moduleName },
    { type:'input', name:'projectDescription', message:'Description' },
    {	type:'input',	name:'projectVersion', message:'Version', default:'1.0.0' },
    {	type:'input',	name:'creationDate', message:'Creation Date', default: currentDateFormated },
    {	type:'input', name:'authorName', message:'Author Name', default: defaults.username },
    {	type:'input',	name:'authorEmail', message:'Author E-mail', default: defaults.authorEmail },
    {type:'input', name:'authorURL', message:'Author URL'},
    {	type:'confirm', name:'moveon', message:'Continue?' }
  ];

  inquirer.prompt(prompts).then((answers) => {
    if(!answers.moveon){
      return done();
    }

  gulp.src(__dirname + '/templates/**')
  .pipe(template(answers))
  .pipe(rename(function(file){
    if(file.basename === 'mod_slush_jmodule'){
      file.basename = defaults.moduleName;
    }
    if(file.basename === 'en-GB.mod_slush_jmodule'){
      file.basename = 'en-GB.'+defaults.moduleName;
    }
    if(file.basename === 'pt-BR.mod_slush_jmodule'){
      file.basename = 'pt-BR.'+defaults.moduleName;
    }
  }))
  .pipe(replace({regex:'mod_slush_jmodule', replace: defaults.moduleName}))
  .pipe(conflict('./'))
  .pipe(gulp.dest('./'))
  .pipe(install())
  .on('finish', function () {
    done();
  })
  .resume();
});
});
