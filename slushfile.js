/*
 * slush-jmodule
 * https://github.com/welksonramos/slush-jmodule
 *
 * Copyright (c) 2015, Welkson Ramos
 * Licensed under the MIT license.
 */

 'use strict';
 var gulp = require('gulp'),
 install = require('gulp-install'),
 conflict = require('gulp-conflict'),
 template = require('gulp-template'),
 inquirer = require('inquirer'),
 rename = require('gulp-rename'),
 replace = require('gulp-regex-replace');

 function format(string){
 	var username = string ? string.toLowerCase() : '';
 	return username.replace(/\s/g, '');
 }

var defaults = (function () {
var homeDir = process.env.Home || process.env.HOMEPATH || process.env.USERPROFILE,
		workingDirName = process.cwd().split('/').pop().split('\\').pop(),
		osUserName = homeDir && homeDir.split('/').pop() || 'root',
		configFile = homeDir + '/.gitconfig',
		user = {};
		if (require('fs').existsSync(configFile)) {
			user = require('iniparser').parseSync(configFile).user;
}
return {
	moduleName: workingDirName,
	username: format(user.name) || osUserName,
	authorEmail: user.email || ''
};
})();
            var d = new Date(),
            year = d.getFullYear(),
            fullDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
 gulp.task('default', function (done) {

 	var prompts = [
 	{ type:'input', name: 'projectName', message: 'Project name', default: defaults.moduleName },
 	{ type:'input', name:'projectDescription', message:'Description' },
 	{	type:'input',	name:'projectVersion', message:'Version', default:'1.0.0' },
 	{	type:'input',	name:'creationDate', message:'Creation Date', default: fullDate},
 	{	type:'input', name:'authorName', message:'Author Name', default: defaults.username },
 	{	type:'input',	name:'authorEmail', message:'Author E-mail', default: defaults.authorEmail },
 	{type:'input', name:'authorURL', message:'Author URL'},
 	{	type:'confirm', name:'moveon', message:'Continue?' }
 	];

 	inquirer.prompt(prompts, function (answers) {
 		if (!answers.moveon) {
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