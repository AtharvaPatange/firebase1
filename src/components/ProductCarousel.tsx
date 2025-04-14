'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define the structure of a product
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch products from the backend
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/products'); // Example API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
        // Set mock data in case of error for development purposes
        console.error("Error fetching products:", err);
        setProducts([
          { id: '1', name: 'Mock Product 1', imageUrl: '/placeholder.svg', price: 19.99 },
          { id: '2', name: 'Mock Product 2', imageUrl: '/placeholder.svg', price: 29.99 },
          { id: '3', name: 'Mock Product 3', imageUrl: '/placeholder.svg', price: 39.99 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Basic carousel placeholder structure
  // You'll likely want to integrate a library like react-slick or swiper here
  return (
    <div className="product-carousel">
      <h2>Featured Products</h2>
      <Slider {...settings}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', minWidth: '200px', textAlign: 'center' }}>
              <Link href={`/products/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', height: '150px', objectFit: 'cover' }} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <div>View Details</div>
              </Link>
            </div>
          ))
        )}
      </Slider>
      <p>Note: This is a basic scrollable list. Consider using a carousel library (e.g., react-slick, swiper) for full carousel features.</p>
    </div>
  );
};

export default ProductCarousel;
