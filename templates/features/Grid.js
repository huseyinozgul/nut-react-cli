module.exports=
`import React, { useState } from 'react';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { CommandCell, GridLoadingPanel, PageHeader, Grid, {{#each fields}}{{{getGridColumnComponent .}}}{{/each}} } from '../../components';

import { NewButton, RefreshButton } from '../../components/Buttons';

import { DefaultDataState } from '../../constants/config';
import { Action } from '../../constants';

import { useLocale } from '../../core/locale';
import { usePermissions } from '../../core/auth';

import { useWindows } from '../../controllers/windows';

import { queryConfig } from './queries';
import use{{grid}} from './hooks/use{{grid}}';
import useDelete{{form}} from './hooks/useDelete{{form}}';

const { primaryKey, model, textField } = queryConfig;
const initialState = Object.assign(DefaultDataState, { sort: [{ field: textField, dir: "asc" }] });

const {{grid}} = () => {
    const [dataState, setDataState] = useState(initialState);

    const { data, isLoading, refetch } = use{{grid}}(dataState);
    const { mutate: deleteRecord } = useDelete{{form}}();

    const rights = usePermissions(model);

    const { showWindow } = useWindows();
    const { localisation } = useLocale();

    const onDataStateChange = e => {
        setDataState(e.dataState);
    }

    const onFilterChange = e => {
        setDataState({ ...dataState, filter: e.filter });
    }

    const onRefresh = () => refetch(dataState);

    const onNew = e => {
        showWindow({ id: model, props: { recordId: Action.NEW } });
    }

    const onEdit = async (dataItem) => {
        showWindow({ id: model, props: { recordId: dataItem[primaryKey] } });
    }

    const onDelete = (dataItem) => deleteRecord(dataItem[primaryKey]);

    return (
        <div className='p-2'>
            <PageHeader text={localisation.{{grid}} }>
                {rights && rights.canCreate && <NewButton onClick={onNew} />}
                &nbsp;
                <RefreshButton onClick={onRefresh} />
            </PageHeader>
            <Grid
                {...dataState}
                {...data}
                onFilterChange={onFilterChange}
                onDataStateChange={onDataStateChange}
                onRowDoubleClick={e => rights.canUpdate && onEdit(e.dataItem)}
            >
                {{#each fields}}
                    {{{getGridColumn .}}}
                {{/each}}                
                <Column locked title={localisation.actions} width="80px" filterable={false} sortable={false} columnMenu={null} cell={props => (
                    <CommandCell {...props}>
                        {rights.canDelete && <Button primary={true} look="outline" onClick={() => onDelete(props.dataItem)}>{localisation.delete}</Button>}
                    </CommandCell>
                )} />
            </Grid>
            {isLoading && <GridLoadingPanel />}
        </div>
    );
}

export default {{grid}};
`