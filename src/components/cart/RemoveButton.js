import React from 'react';
import Swal from 'sweetalert2';

export default function RemoveButton({ productId, fetchCartData }) {
    const removeFromCart = () => {
        const url = `${process.env.REACT_APP_API_URL}/cart/remove/${productId}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove from cart');
            }
            return response.json();
        })
        .then(data => {
            console.log('Removed from cart:', data);
            Swal.fire({
                title: "Success!",
                icon: "success",
                text: "Item removed from cart successfully",
            });
            fetchCartData();
        })
        .catch(error => {
            console.error('Error removing from cart:', error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Failed to remove item from cart",
            });
        });
    };

    return (
        <button onClick={removeFromCart} className="text-red-600 hover:text-red-800">
            Remove
        </button>
    );
}
