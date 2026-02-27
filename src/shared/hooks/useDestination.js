import DestinationServices from '../services/destinations.service'
import { useQuery } from '@tanstack/react-query';
export const useDestinations =({perPage = 10 ,page =1 ,filters = {}}) => {
    const {data , isLoading , isError, refetch}  = useQuery({
        queryKey : ['destinations',{perPage ,page ,filters}],
        queryFn :() => DestinationServices({perPage ,page ,filters}),
        onSuccess: (data) => console.log('✅ Success:', data),
        onError: (error) => console.log('❌ Error:', error),
        });

    return {data , isLoading ,isError, refetch}


}