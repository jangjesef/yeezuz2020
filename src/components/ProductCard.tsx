import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  priceId: string;
  description?: string;
}

export default function ProductCard({ name, price, image, priceId, description }: ProductCardProps) {
  const handleBuyClick = async () => {
    const stripe = await stripePromise;
    
    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{
          priceId,
          quantity: 1,
        }],
      }),
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-64 object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{description}</p>
        <p className="text-gray-900 text-xl font-bold">${price}</p>
        <button
          onClick={handleBuyClick}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Koupit
        </button>
      </div>
    </div>
  );
} 