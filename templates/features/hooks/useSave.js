module.exports =
`import { useQueryClient, useMutation } from 'react-query';
import { queryKeys, queryConfig, crudOperations } from '../queries';
import { useNotification } from '../../../core/notification';
import localisation from '../../../core/locale/localisation';

const { primaryKey } = queryConfig;

export default function useSave{{{form}}}() {

    const { notifySuccess, notifyError } = useNotification();
    const queryClient = useQueryClient();

    return useMutation(crudOperations.updateRecord, {

        onSuccess: (newData) => {
            if (queryClient.getQueryData(queryKeys.all)) {
                queryClient.setQueryData(queryKeys.all, old => {
                    return old.map(d => (d[primaryKey] === newData[primaryKey] ? newData : d));
                });
            } else {
                queryClient.setQueryData(queryKeys.all, [newData])
                queryClient.invalidateQueries(queryKeys.all);
            }

            notifySuccess(localisation.current.savedsuccess_message);

        },
        onError: (error, variables) => {
            notifyError(error);
        }

    });
}
`