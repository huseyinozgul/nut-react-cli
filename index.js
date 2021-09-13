#!/usr/bin/env node

//Model - lowercase
//models - auto
//Component -- auto
//Components -- auto
//listUrl -- default /models
//record  -- default /model
//AddFields
    // - field_name
    // - field type 1 primarykey, 2 textfield, 3 normal default
    // - local tr
    // - local en
    // - component
    //     - FormComboBoxRemoteData
    //     - FormRadioGroup
    //         - values
    //     - FormNumericTextBox
    //     - FormCheckbox

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirers  = require('./inquirers');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Nut React CLI', { horizontalLayout: 'full' })
  )
);

const run = async() =>{
    const model = await inquirers.askModel();
    console.log(model);
}

run();