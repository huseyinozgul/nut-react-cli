const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const prettier = require('prettier');
const { capitalizeFirstLetter } = require('../helpers/stringHelpers');

const template = Handlebars.compile(require('../templates/features/Form'));

const components = [
    ['FormCheckbox', Handlebars.compile(require('../templates/components/FormCheckbox'))],
    ['FormComboBoxRemoteData', Handlebars.compile(require('../templates/components/FormComboBoxRemoteData'))],
    ['FormDateTimePicker', Handlebars.compile(require('../templates/components/FormDateTimePicker'))],
    ['FormDropDownList', Handlebars.compile(require('../templates/components/FormDropDownList'))],
    ['FormInput', Handlebars.compile(require('../templates/components/FormInput'))],
    ['FormNumericTextBox', Handlebars.compile(require('../templates/components/FormNumericTextBox'))],
    ['FormRadioGroup', Handlebars.compile(require('../templates/components/FormRadioGroup'))],
    ['FormTextArea', Handlebars.compile(require('../templates/components/FormTextArea'))]
]

Handlebars.registerHelper('getFormComponentName', function (field) {
    if (field.component === 'Invisible')
        return;

    return field.component + ',';
});

Handlebars.registerHelper('getFormComponent', function (field) {
    if (field.component === 'Invisible')
        return;

    const component = components.find(([key, template]) => key === field.component);
    if (!component)
        return;

    const componentTemplate = component[1];
    return componentTemplate(field);

});

module.exports = async (config) => {

    const directoryPath = path.join(process.cwd(), `src/features/${capitalizeFirstLetter(config.model)}`);
    const fullFilePath = path.join(directoryPath, `${config.form}.js`);

    const fileContent = prettier.format(template(config), { semi: false, useTabs: true, tabWidth: 4, parser: "babel" });

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, fileContent, 'utf8');

}