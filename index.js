#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirers = require('./inquirers');
const stringHelpers = require('./helpers/stringHelpers');
const updateLocalisation = require('./scripts/updateLocalisation');
const createHooks = require('./scripts/createHooks');
const createQueries = require('./scripts/createQueries');
const createForm = require('./scripts/createForm');
const createGrid = require('./scripts/createGrid');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Nut React CLI', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  let config = 
  {
    model: 'category',
    models: 'categories',
    listUrl: '/categories',
    crudUrl: '/category',
    form: 'Category',
    form_en: 'Categories',
    form_tr: 'Kategori',
    grid: 'Categories',
    grid_en: 'Categories',
    grid_tr: 'Kategoriler',
    fields: [
      {
        fieldName: 'cat_id',
        fieldProperty: 'primaryKey',
        fieldType: 'string',
        en: 'ID',
        tr: 'ID',
        component: 'Invisible'
      },
      {
        fieldName: 'cat_name',
        fieldProperty: 'textField',
        fieldType: 'string',
        en: 'Category Name',
        tr: 'Kategori Adı',
        component: 'FormComboBoxRemoteData'
      },
      {
        fieldName: 'cat_name2',
        fieldProperty: 'field',
        fieldType: 'string',
        en: 'Category Name2',
        tr: 'Kategori Adı2',
        component: 'FormInput'
      },
      {
        fieldName: 'cat_type',
        fieldProperty: 'field',
        fieldType: 'number',
        en: 'Category Type',
        tr: 'Kategori Tipi',
        component: 'FormRadioGroup'
      },
      {
        fieldName: 'cat_active',
        fieldProperty: 'field',
        fieldType: 'boolean',
        en: 'Cat. Active',
        tr: 'Kat. Aktif',
        component: 'FormCheckbox'
      }
    ]
  }
  // const { model } = await inquirers.askModel();
  // config.model = stringHelpers.removeNonAlphaChars(model).toLowerCase();

  // const { models } = await inquirers.askModels(config.model + 's');
  // config.models = stringHelpers.removeNonAlphaChars(models).toLowerCase();

  // const apiUrl = await inquirers.askApiUrls({
  //  crudUrl: '/' + config.model,
  //  listUrl: '/' + config.models
  // });
  // config = { ...config, ...apiUrl };

  // const componentValues = await inquirers.askComponentNames(
  //   stringHelpers.capitalizeFirstLetter(config.model),
  //   stringHelpers.capitalizeFirstLetter(config.models)
  // );
  // config = { ...config, ...componentValues };

  // config.fields = [];
  // let repeat = true;
  // do {

  //   config.fields.push(await inquirers.askFields());
  //   repeat = (await inquirers.askAnotherField()).repeat;

  // } while (repeat);

  const primaryKey = config.fields.find(({ fieldProperty }) => fieldProperty === 'primaryKey')?.fieldProperty || 'id';
  const textField = config.fields.find(({ fieldProperty }) => fieldProperty === 'textField')?.fieldProperty || 'name';

  config.primaryKey = primaryKey;
  config.textField = textField;

  await updateLocalisation(config);
  await createHooks(config);
  await createQueries(config);
  await createForm(config);
  await createGrid(config);

  console.log('Completed.');
}


run();