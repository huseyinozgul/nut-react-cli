module.exports=
`import { useQuery, useQueryClient } from 'react-query';

import { useNotification } from '../../../core/notification';
import { queryKeys, queryConfig, crudOperations } from '../queries';

const { primaryKey } = queryConfig;

export default function use{{{grid}}}(dataState) {
    const { notifyError } = useNotification();
    const queryClient = useQueryClient();

    return useQuery(
        [...queryKeys.all, dataState],
        crudOperations.getAll,
        {
            onSuccess: (data) => {
                data.data.forEach(item => {
                    queryClient.setQueryData(queryKeys.detail(item[primaryKey]), item);
                });
            },
            onError: (error) => {
                notifyError(error);
            }
        });
}
`