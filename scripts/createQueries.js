const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const prettier = require('prettier');
const template = Handlebars.compile(require('../templates/features/queries'));

const getFieldTypeDefaultValue = (fieldType) => {
    switch (fieldType) {
        case 'number': return '0';
        case 'boolean': return 'true';
        case 'string':
        default:
            return `''`;
    }
}

Handlebars.registerHelper('fieldByType', function (field) {
    if (field.fieldProperty === 'primaryKey')
        return '[primaryKey]: Action.NEW';

    return field.fieldName + ': ' + getFieldTypeDefaultValue(field.fieldType);
});

module.exports = async (config) => {

    const directoryPath = path.join(process.cwd(), `src/features/${config.form}/queries`);
    const fullFilePath = path.join(directoryPath, 'index.js');

    const fileContent = prettier.format(template(config), { semi: true, useTabs: true, tabWidth: 4, parser: "babel" });

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, fileContent, 'utf8');

}