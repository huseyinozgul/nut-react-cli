const inquirer = require('inquirer');

module.exports = {
  askModel: () => {
    const questions = [
      {
        name: 'model',
        type: 'input',
        message: 'Model name?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter model name';
          }
        },
        transformer: function (...args) {
          const hash = args[0];
          return (hash || '').toLowerCase();
        }

      }
    ];
    return inquirer.prompt(questions);
  },
  askModels: (defaultValue) => {
    const questions = [
      {
        name: 'models',
        type: 'input',
        message: 'Plural of Model',
        default: defaultValue,
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter Plural of Model!';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askComponentNames: (formName, gridName) => {
    const questions = [
      {
        name: 'form',
        type: 'input',
        message: 'Form Component Name?',
        default: formName,
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter form component name!';
          }
        }
      },
      {
        name: 'form_en',
        type: 'input',
        message: 'Form Component Name in EN?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter form name in EN?';
          }
        }
      },
      {
        name: 'form_tr',
        type: 'input',
        message: 'Form Component Name in TR?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter form name in TR?';
          }
        }
      },
      {
        name: 'grid',
        type: 'input',
        message: 'Grid Component Name?',
        default: gridName,
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter grid component name!';
          }
        }
      },
      {
        name: 'grid_en',
        type: 'input',
        message: 'Grid Component Name in EN?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter grid name in EN?';
          }
        }
      },
      {
        name: 'grid_tr',
        type: 'input',
        message: 'Grid Component Name in TR?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter grid name in TR?';
          }
        }
      },

    ];
    return inquirer.prompt(questions);
  },

  askApiUrls: ({ listUrl, crudUrl }) => {
    const questions = [
      {
        name: 'listUrl',
        type: 'input',
        message: 'List Url?',
        default: listUrl,
        validate: function (value) {
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
        validate: function (value) {
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
  askFields: () => {
    const questions = [
      {
        name: 'fieldName',
        type: 'input',
        message: 'Field Name?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter field name!';
          }
        }
      },
      {
        name: 'fieldProperty',
        type: 'list',
        choices: ['primaryKey', 'textField', 'field'],
        message: 'Field Property?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please choose field property!';
          }
        }
      },
      {
        name: 'fieldType',
        type: 'list',
        choices: ['string', 'number', 'boolean', 'date'],
        message: 'Field Type?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please choose field type!';
          }
        }
      },
      {
        name: 'en',
        type: 'input',
        message: 'Title in EN?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter title in EN!';
          }
        }
      },
      {
        name: 'tr',
        type: 'input',
        message: 'Title in TR?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter title in TR!';
          }
        }
      },
      {
        name: 'component',
        type: 'list',
        choices: ['FormInput', 'FormComboBoxRemoteData', 'FormDropDownList', 'FormNumericTextBox', 'FormCheckbox', 'FormRadioGroup', 'FormDateTimePicker', 'FormTextArea', 'Invisible'],
        message: 'Field Component?',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please choose field component';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
  askAnotherField: () => {
    const questions = [
      {
        name: 'repeat',
        type: 'confirm',
        message: 'Do you want to add another field?'
      }
    ];
    return inquirer.prompt(questions);
  },
};