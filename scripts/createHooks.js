const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const Handlebars = require('handlebars');
const templates = [
    [({ form }) => `useCreate${form}.js`, Handlebars.compile(require('../templates/features/hooks/useCreate'))],
    [({ form }) => `useDelete${form}.js`, Handlebars.compile(require('../templates/features/hooks/useDelete'))],
    [({ form }) => `use${form}.js`, Handlebars.compile(require('../templates/features/hooks/useForm'))],
    [({ form }) => `useSave${form}.js`, Handlebars.compile(require('../templates/features/hooks/useSave'))],
    [({ grid }) => `use${grid}.js`, Handlebars.compile(require('../templates/features/hooks/useGrid'))]
];

module.exports = async (config) => {

    for (const [getFileName, template] of templates) {

        const fileName = getFileName(config);
        const directoryPath = path.join(process.cwd(), `src/features/${config.form}/hooks`);
        const fullFilePath = path.join(directoryPath, fileName);

        const fileContent = prettier.format(template(config), { semi: true, useTabs: true, tabWidth: 4, parser: "babel" });

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        fs.writeFileSync(fullFilePath, fileContent, 'utf8');

    }
}