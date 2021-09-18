const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const templateFile = require('../templates/locale');
const template = Handlebars.compile(templateFile);

const languages = ['en', 'tr'];

module.exports = async (config) => {

    const keyPairs = languages.map(lang => ({
        lang,
        values: [
            [config.form, config[`form_${lang}`]],
            [config.grid, config[`grid_${lang}`]],
            ...config.fields.map(field => ([field.fieldName, field[lang]]))
        ]
    }));

    for (const { lang, values } of keyPairs) {

        const fullFilePath = path.join(process.cwd(), 'src/core/locale', `locale_${lang}.json`);
        const localeJson = await require(fullFilePath);

        for (const [key, value] of values) {
            if (!localeJson[key])
                localeJson[key] = value;
        }

        const content = JSON.stringify(localeJson, null, '\t');
        const fileContent = template({ content, lang });

        fs.writeFileSync(fullFilePath, fileContent, 'utf8');

    }
}