module.exports = {
    boolean: {
        template: `<Column field="{{fieldName}}" width="100px" title={localisation.{{fieldName}} } filter="boolean" cell={BooleanCell} filterable={false} columnMenu={null} />`,
        name: 'BooleanCell'
    },
    date: {
        template: `<Column field="{{fieldName}}" width="170px" title={localisation.{{fieldName}} } filter="date" cell={DateCell} filterable={false} columnMenu={null} />`,
        name: 'DateCell'
    },
    string: {
        template: `<Column field="{{fieldName}}" width="220px" title={localisation.{{fieldName}} } />`,
        name: undefined
    },
    textField: {
        template: `<Column locked field="{{fieldName}}" width="220px" title={localisation.{{fieldName}} } />`,
        name: undefined
    },
    number: {
        template: `<Column field="{{fieldName}}" width="170px" title={localisation.{{fieldName}} } filter="numeric" columnMenu={null} />`,
        name: undefined
    },
}
