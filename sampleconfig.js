export default {
    model: 'category',
    models: 'categories',
    listUrl: '/masterdata/categories',
    crudUrl: '/masterdata/category',
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
