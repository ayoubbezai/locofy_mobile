import DestinationServices from '../services/destinations.service'
import { useQuery } from '@tanstack/react-query';

export const useDestinations = ({ search = '', perPage = 10, page = 1, filters = {} }) => {
    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['destinations', { search, perPage, page, filters }],
        queryFn: () => DestinationServices({ search, perPage, page, filters }),
        staleTime: 0, 
        cacheTime: search || filters.types ? 0 : 5 * 60 * 1000,

    });

    return { data, isLoading, isError, refetch, isFetching }
}