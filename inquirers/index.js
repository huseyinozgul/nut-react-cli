const inquirer = require('inquirer');

module.exports = {
  askModel: () => {
    const questions = [
      {
        name: 'model',
        type: 'input',
        message: 'Model name?',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter model name';
          }
        }
      },
      {
        name: 'models',
        type: 'input',
        message: 'Model as plural?',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter model as plural';
          }
        }
      },   
    ];
    return inquirer.prompt(questions);
  },    
  askApiUrls: ({listUrl, crudUrl}) => {
    const questions = [
      {
        name: 'listUrl',
        type: 'input',
        message: 'List Url?',
        default: listUrl,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter List Url';
          }
        }
      },
      {
        name: 'crudUrl',
        type: 'input',
        message: 'CRUD Url?',
        default: crudUrl,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter CRUD Url';
          }
        }
      },   
    ];
    return inquirer.prompt(questions);
  },
};