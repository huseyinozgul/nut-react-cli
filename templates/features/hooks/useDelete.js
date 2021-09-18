module.exports =
`import { useMutation, useQueryClient } from 'react-query';
import { queryConfig, queryKeys, crudOperations } from '../queries';
import { useNotification } from '../../../core/notification';
import localisation from '../../../core/locale/localisation';

const { primaryKey } = queryConfig;

export default function useDelete{{{form}}}() {
    const { notifySuccess, notifyError } = useNotification();
    const queryClient = useQueryClient();

    return useMutation(crudOperations.deleteRecord, {
        onMutate: (deletedId) => {
            const previousRecords = queryClient.getQueryData(queryKeys.all);

            if (previousRecords) {
                const remainingRecords = previousRecords.filter(rec => rec[primaryKey] === deletedId);
                queryClient.setQueryData(queryKeys.all, remainingRecords);
            }
            notifySuccess(localisation.current.deletedsuccess_message);

            return () => queryClient.setQueryData(queryKeys.all, previousRecords);
        },

        onError: (error, _newPost, rollback) => {
            notifyError(error);
            if (rollback) rollback();
        },

        onSettled: () => {
            queryClient.invalidateQueries(queryKeys.all);
        }

    });
}
`