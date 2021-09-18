module.exports = 
`import { Action } from '../../../constants';
import { crudOperations as baseCrudOperations } from '../../../core/api';

const all = '{{models}}';
const model = '{{model}}';
const primaryKey = '{{primaryKey}}';
const textField = '{{textField}}';
const listUrl = '{{listUrl}}';
const crudUrl = '{{crudUrl}}';
const fields = [{{#each fields}}'{{fieldName}}',{{/each}}];

export const queryConfig = { model, primaryKey, textField, listUrl, crudUrl, fields }

export const queryKeys = {
    all: [all],
    detail: (id) => [all, id],
}

export const mapReducer = (items) => {
    const rawData = Array.isArray(items) ? items : [items];
    return rawData.map(raw => ({
        ...raw
        // map type fields
    }));
}

export const newRecord = () => ({ 
    {{#each fields}}
        {{{fieldByType .}}},
    {{/each}}
});

export const crudOperations = {

    createRecord: async (data) => await baseCrudOperations.createRecord({ primaryKey, crudUrl, data }),

    updateRecord: async (data) => await baseCrudOperations.updateRecord({ crudUrl, data }),

    deleteRecord: async (id) => await baseCrudOperations.deleteRecord({ crudUrl, id }),

    getRecord: async ({ queryKey }) => {
        const [, id] = queryKey;
        return await baseCrudOperations.getRecord({ id, crudUrl, newRecord, mapReducer });
    },

    getAll: async ({ queryKey }) => {
        const [, dataState] = queryKey;
        return await baseCrudOperations.getAll({ dataState, listUrl, mapReducer });
    }
}
`