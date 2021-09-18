module.exports = {
    boolean: `<Column field="{{fieldName}}" width="100px" title={localisation.{{fieldName}} } filter="boolean" cell={BooleanCell} filterable={false} columnMenu={null} />`,
    date: `<Column field="{{fieldName}}" width="170px" title={localisation.{{fieldName}} } filter="date" cell={DateCell} filterable={false} columnMenu={null} />`,
    string: `<Column field="{{fieldName}}" width="220px" title={localisation.{{fieldName}} } />`,
    textField: `<Column locked field="{{fieldName}}" width="220px" title={localisation.{{fieldName}} } />`,
    number: `<Column field="{{fieldName}}" width="170px" title={localisation.{{fieldName}} } filter="numeric" columnMenu={null} />`
}
