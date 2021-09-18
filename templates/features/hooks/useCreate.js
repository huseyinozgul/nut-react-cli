module.exports =
`import { useQueryClient, useMutation } from 'react-query';
import { queryKeys, mapReducer, crudOperations } from '../queries';
import localisation from '../../../core/locale/localisation';
import { useNotification } from '../../../core/notification';

export default function useCreate{{{form}}}() {
    const { notifySuccess, notifyError } = useNotification();
    const queryClient = useQueryClient();

    return useMutation(crudOperations.createRecord, {
        onSuccess: (data) => {
            notifySuccess(localisation.current.savedsuccess_message);
        },

        onMutate: (newData) => {
            const keys = queryKeys.all;
            const previousRecords = queryClient.getQueryData(keys);

            if (previousRecords) {
                queryClient.setQueryData(keys, old => [...old, mapReducer(newData)]);
            }

            return () => queryClient.setQueryData(keys, previousRecords);
        },

        onError: (error, _newPost, rollback) => {
            notifyError(error);
            if (rollback) rollback();
            
        }
    });
}
`