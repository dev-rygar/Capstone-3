import React from 'react';
import Swal from 'sweetalert2';
import styles from '../../styles/ProductCatalogStyle'

export default function ATCButton({ productId }) {
    const addToCart = () => {
        const url = `${process.env.REACT_APP_API_URL}/cart/add`;
        const body = {
            productId,
            quantity: 1 
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            return response.json();
        })
        .then(data => {
            console.log('Added to cart:', data);
            Swal.fire({
                title: "Success!",
                icon: "success",
                text: "Item added to cart successfully",
            });
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Failed to add item to cart",
            });
        });
    };

    return (
        <button onClick={addToCart} className={styles.addToCartButton}>
            Add to Cart
        </button>
    );
}
