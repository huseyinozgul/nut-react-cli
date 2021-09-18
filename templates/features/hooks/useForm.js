module.exports = 
`import { useQuery } from 'react-query';
import { queryKeys, crudOperations } from '../queries';
import { useNotification } from '../../../core/notification';

export default function use{{{form}}}(id) {
    const { notifyError } = useNotification();

    return useQuery(queryKeys.detail(id), crudOperations.getRecord, {
        onError: (error) => {
            notifyError(error);
        },
    });
}
`;