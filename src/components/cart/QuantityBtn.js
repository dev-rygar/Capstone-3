import React from 'react';

export default function QuantityButton ({ productId, productQuantity, setProductQuantity }) {
    const updateQuantity = (increment) => {
        const url = `${process.env.REACT_APP_API_URL}/cart/${increment ? 'add-quantity' : 'deduct-quantity'}`;
        const body = {
            productId,
            [increment ? 'additionalQuantity' : 'quantityToDeduct']: 1
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            const updatedQuantity = data.items.find(item => item.productId === productId).quantity;
            setProductQuantity(updatedQuantity);
        })
        .catch(error => console.error('Error updating quantity:', error));
    };

    const increment = () => updateQuantity(true);
    const decrement = () => updateQuantity(false);

    return (
        <div className="flex items-center justify-center space-x-2">
            <button onClick={decrement} className="...">-</button>
            <span className="text-lg font-semibold"> {productQuantity} </span>
            <button onClick={increment} className="...">+</button>
        </div>
    );
};
