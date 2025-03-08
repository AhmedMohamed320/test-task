'use client';

import { useEffect, useState } from 'react';

export default function useFilterData(lang) {

    const [filterData, setFilterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFilterData() {
            setLoading(true);
            setError(null);

            try {
                const headers = {
                    'x-lang': lang
                };

                const response = await fetch(
                    'https://fae-jewellery.trendline.marketing/api/products/filter-data',
                    { headers }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch filter data');
                }

                const json = await response.json();
                setFilterData(json.data);
            } catch (err) {
                setError(err.message || 'Error fetching filter data');
            } finally {
                setLoading(false);
            }
        }

        fetchFilterData();
    }, [lang]);

    return { filterData, loading, error };
}
