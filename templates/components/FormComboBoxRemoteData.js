module.exports =
    `<Field
name={textField}
width="160px"
label={localisation.current.{{fieldName}} }
component={FormComboBoxRemoteData}
url={listUrl}
textField={textField}
dataItemKey={primaryKey}
otherFields={fields.filter(fld => !(fld === primaryKey && fld === textField))}
allowCustom={true}
returnValueType={ReturnValueTypes.TEXTFIELD}
onSelectionChanged={(value, selectedObj) => onNameSelected({ value, selectedObj, formRenderProps })}
onAddNewRecord={async (value) => await onNewRecord(value, formRenderProps)}
/>`