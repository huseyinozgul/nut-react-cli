module.exports =
    `import React, { useRef } from 'react';
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from '@progress/kendo-react-form';

import { 
    {{#each fields}}
        {{{getFormComponentName .}}}
    {{/each}}
} from '../../components/formcomponents';
import { DialogButtonsContainer, NewButton, SaveButton } from '../../components/Buttons';
import localisation from '../../core/locale/localisation';
import { Action } from '../../constants';
import { useWindows } from '../../controllers/windows';
import { ReturnValueTypes } from '../../components/formcomponents/FormComboBoxRemoteData';
import use{{{form}}} from './hooks/use{{{form}}}';
import { queryConfig, newRecord } from './queries';
import useSave{{{form}}} from './hooks/useSave{{{form}}}';
import useCreate{{{form}}} from './hooks/useCreate{{{form}}}';

const formValidator = (values) => {
    const result = {};
    
    {{#each fields}}
        if (!values.{{fieldName}})
            result.{{fieldName}} = localisation.current.validation_required;
    {{/each}}

    const validation = Object.keys(result).length > 0 ? { VALIDATION_SUMMARY: localisation.current.validation_summary, ...result } : result;

    return validation;
}

const { primaryKey, textField, listUrl, fields } = queryConfig;

const {{{form}}} = (props) => {
    const ref = useRef();
    const { data } = use{{{form}}}(props.recordId);
    const { mutate: saveRecord } = useSave{{{form}}}();
    const { mutate: createRecord } = useCreate{{{form}}}();

    const { onClose } = useWindows();

    const onSubmit = (formData) => {
        if (formData[primaryKey] === Action.NEW)
            createRecord(formData);
        else
            saveRecord(formData);

        ref.current.resetForm();
    }

    const onNewRecord = async (value, formRenderProps) => {
        const selectedObj = { ...newRecord(), [textField]: value };
        for (const field of fields.filter(fld => fld !== textField)) {
            formRenderProps.onChange(field, { value: selectedObj[field] });
        }
        return selectedObj;
    }

    const onNameSelected = ({ value, selectedObj, formRenderProps }) => {
        if (!selectedObj) return;
        if (selectedObj[primaryKey] === Action.NEW) return;

        formRenderProps.onFormReset();

        for (const field of fields) {
            formRenderProps.onChange(field, { value: selectedObj[field] });
        }
    }

    if (!data) {
        return null;
    }

    const title = data[primaryKey] === Action.NEW ? localisation.current.new+' '+localisation.current.{{form}} : data && data[textField];

    return (
        <Dialog id={props.id} title={title} onClose={onClose} width={720}>
            <Form
                ref={ref}
                onSubmit={onSubmit}
                initialValues={data}
                validator={formValidator}
                render={(formRenderProps) => (
                    <FormElement>
                        {{#each fields}}
                            {{{getFormComponent .}}}
                        {{/each}}
                        <DialogButtonsContainer>
                            <SaveButton disabled={!formRenderProps.allowSubmit} />
                            <NewButton onClick={formRenderProps.onFormReset} />
                        </DialogButtonsContainer>
                    </FormElement>
                )}
            />
        </Dialog>
    );
}

export default {{{form}}};
`