import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Checkout ({fetchCartData}){
    const handleCheckout = async () => {
        const token = localStorage.getItem('access');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Checkout failed');
            }

            Swal.fire({
                title: 'Success',
                text: 'Checkout successful!',
                icon: 'success',
            });
            fetchCartData();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.toString(),
                icon: 'error',
            });

        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="mt-2 md:mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all hover:scale-105"
        >
            Checkout
        </button>
    );
};
