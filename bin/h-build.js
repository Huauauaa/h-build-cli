#! /usr/bin/env node

import program from 'commander';
import download from 'download-git-repo';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';

program
  .version('0.1.0')
  .option('-i, --init <name>', 'init h-build')
  .parse(process.argv);

const options = program.opts();
const appName = options.init;

console.log({ appName });

if (appName) {
  const spinner = ora('download h-build from github').start();
  download('Huauauaa/h-build-cli#main', appName, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(chalk.blueBright('download successfully'));

    const packagePath = `${process.cwd()}/${appName}/package.json`;
    fs.readFile(packagePath, (err, data) => {
      if (err) throw err;
      const _data = JSON.parse(data.toString());
      _data.name = appName;
      _data.version = '1.0.0';

      const str = JSON.stringify(_data, null, 4);
      fs.writeFile(packagePath, str, (err) => {
        if (err) throw err;
      });
    });
  });
}
