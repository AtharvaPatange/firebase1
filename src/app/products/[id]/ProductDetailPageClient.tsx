"use client";


import React from 'react';
import { useParams } from 'next/navigation';

interface Params {
  id?: string;
  [key: string]: string | string[] | undefined;
}

const ProductDetailPageClient: React.FC = () => {
  const params = useParams<Params>();
  const id = params?.id || 'default';

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', textAlign: 'center' }}>
      <h1>{`Product name: ${id}`}</h1>
      <img src={'/placeholder.svg'} alt={`Product ${id}`} style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', margin: '10px 0' }} />
      <p>Price: $99.99</p>
      <p>Product ID: {id}</p>
      {/* Add more product details here */}
    </div>
  );
};

export default ProductDetailPageClient;
