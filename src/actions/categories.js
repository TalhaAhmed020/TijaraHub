import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetCategories(id) {
      const { currentLang } = useTranslate();
    const url = endpoints.categories.list(0, currentLang.value);

    const axiosConfig = {
        headers: {
            'X-API-KEY': 'base64:mfjcG1NMo9FOM2bINcIhmwsUktk9QSfkWsPe7J6jSgU=',
        },
        // You can add other Axios configuration options here (e.g., timeout)
        // timeout: 5000,
    };

    const { data, isLoading, error, isValidating } = useSWR([url, axiosConfig], fetcher, swrOptions);


    const memoizedValue = useMemo(
        () => ({
            products: data?.data || [],
            productsLoading: isLoading,
            productsError: error,
            productsValidating: isValidating,
            productsEmpty: !isLoading && !data?.data.length,
        }),
        [data?.data, error, isLoading, isValidating]
    );

    return memoizedValue;
}
