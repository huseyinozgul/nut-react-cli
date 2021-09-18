const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const prettier = require('prettier');

const template = Handlebars.compile(require('../templates/features/Grid'));
const columns = require('../templates/components/GridColumns');

Handlebars.registerHelper('getGridColumn', function (field) {
    if (field.component === 'Invisible')
        return;

    const colProperty = field.fieldProperty === 'textField' ? 'textField' : field.fieldType;
    const column = colProperty && columns[colProperty]
    if (!column)
        return;

    const componentTemplate = Handlebars.compile(column);
    return componentTemplate(field);

});

module.exports = async (config) => {

    const directoryPath = path.join(process.cwd(), `src/features`);
    const fullFilePath = path.join(directoryPath, `${config.grid}.js`);

    const fileContent = prettier.format(template(config), { semi: false, useTabs: true, tabWidth: 4, parser: "babel" });

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(fullFilePath, fileContent, 'utf8');

}