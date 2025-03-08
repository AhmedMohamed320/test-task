'use client';

import { useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProducts(filters, lang) {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-cart_id': 'test',
        'x-lang': lang
      };

      const response = await fetch(
        'https://fae-jewellery.trendline.marketing/api/products',
        {
          method: 'POST',
          headers,
          body: JSON.stringify(filters || {}),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const json = await response.json();
      const productData = json.data.products;
      setProducts(productData?.data || []);
      setPagination(productData?.meta || null);
    } catch (err) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    pagination,
    loading,
    error,
    fetchProducts,
  };
}
