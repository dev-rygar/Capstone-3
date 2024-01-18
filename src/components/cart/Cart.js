import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityButton from './QuantityBtn';
import RemoveButton from './RemoveButton';
import Checkout from './Checkout';


export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

    const goBack = () => {
         navigate(-1);
    };
  // Fetch cart data
  const fetchCartData = () => {
    const token = localStorage.getItem('access');

    fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched cart data:", data);
      setCart(data);
    })
    .catch(error => console.error('Error fetching cart:', error));
  };

  // Fetch cart data on mount
  useEffect(() => {
    fetchCartData();
  }, []);


  return (
<div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="bg-white p-4 md:p-8 rounded shadow-lg w-full max-w-sm md:max-w-lg mx-4 relative">
        <button
            className="absolute top-2 right-2 text-red-300 hover:text-red-800 text-sm"
        >
            Clear Cart
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 text-center">Shopping Cart</h1>
        {cart && cart.items.map((item, index) => (
            <div key={index} className="mb-4 md:mb-6 flex items-center border-b border-gray-300 pb-3">
                <div className="flex-shrink-0">
                    <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="h-16 w-16 md:h-20 md:w-20 rounded-md object-cover object-center"
                    />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                        <h3 className="text-md md:text-lg font-medium text-gray-900">
                            {item.product}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500">
                            {item.description}
                        </p>
                        <p className="text-md md:text-lg font-medium text-gray-900">
                            Subtotal: ₱{item.subtotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                        <QuantityButton
                            productId={item.productId}
                            productQuantity={item.quantity}
                            setProductQuantity={fetchCartData}
                        />
                        <RemoveButton
                            productId={item.productId}
                            fetchCartData={fetchCartData}
                        />
                    </div>
                </div>
            </div>
        ))}
       {cart && (
            <div className="mt-4 md:mt-8">
                <div className="flex justify-between items-center">
                    <span className="text-md md:text-lg font-medium text-gray-900">Total Price:</span>
                    <span className="text-lg md:text-xl font-semibold text-blue-500">₱{cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <button
                        onClick={goBack}
                        className="text-gray-600 hover:text-gray-800 text-sm mt-2 md:mt-4"
                    >
                        Back
                    </button>
                    <Checkout fetchCartData={fetchCartData} />
                </div>
            </div>
        )}
    </div>
</div>


  );
}