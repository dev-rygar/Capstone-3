import React from 'react';
import Swal from 'sweetalert2';

export default function ProcessOrder({ typeOfButton, orderId, fetchOrders }) {
    const handleOrderProcess = () => {
        const isReceiveAction = typeOfButton === 'receive';
        const endpoint = isReceiveAction 
            ? `${process.env.REACT_APP_API_URL}/orders/complete/${orderId}`
            : `${process.env.REACT_APP_API_URL}/orders/cancel/${orderId}`;

        fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            Swal.fire({
                title: "Success!",
                icon: "success",
                text: `Order Successfully ${isReceiveAction ? "Completed" : "Cancelled"}`,
            });
            fetchOrders()
        })
        .catch((error) => {
            console.error("Error processing order:", error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "An error occurred, please try again",
            });
        });
    };

    return (
        <button 
            onClick={handleOrderProcess}
            className={`pl-3 font-medium text-${typeOfButton === 'receive' ? "blue" : "red"}-600 hover:text-${typeOfButton === 'receive' ? "blue" : "red"}-800 hover:underline`}
        >
            {typeOfButton === 'receive' ? "Receive" : "Cancel"}
        </button>
    );
}
