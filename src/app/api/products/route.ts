import { NextResponse } from 'next/server';

// Mock product data
const products = [
  { id: '1', name: 'Smartphone X', imageUrl: '/placeholder-phone.svg', price: 699.99 },
  { id: '2', name: 'Laptop Pro', imageUrl: '/placeholder-laptop.svg', price: 1299.00 },
  { id: '3', name: 'Wireless Headphones', imageUrl: '/placeholder-headphones.svg', price: 199.50 },
  { id: '4', name: 'Smartwatch Series 5', imageUrl: '/placeholder-watch.svg', price: 349.00 },
  { id: '5', name: 'Gaming Console Z', imageUrl: '/placeholder-console.svg', price: 499.99 },
];

export async function GET() {
  // In a real application, you would fetch data from a database here.
  // For now, we're just returning the mock data.

  // Simulate a network delay (optional)
  // await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(products);
}
