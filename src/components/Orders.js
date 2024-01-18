import React, { useState, useEffect } from 'react';
import ProcessOrder from './ProcessOrder';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("access");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOrders(data.userOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    function handleReceive(orderId) {
        console.log("Order received:", orderId);
    }

    function handleCancel(orderId) {
        console.log("Order cancelled:", orderId);
    }

    return (
        <main className="flex justify-center mt-20">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">Order #</th>
                            <th scope="col" className="py-3 px-6">Total Price</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Ordered On</th>
                            <th scope="col" className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.orderId}
                                </th>
                                <td className="py-4 px-6">{order.totalPrice}</td>
                                <td className="py-4 px-6">{order.status}</td>
                                <td className="py-4 px-6">{new Date(order.orderedOn).toLocaleDateString()}</td>
                                <td className="py-4 px-6">
                                    {order.status === 'pending' && (
                                        <>
                                            <ProcessOrder  typeOfButton="receive" orderId={order.orderId} fetchOrders={fetchOrders}/>
                                            <ProcessOrder typeOfButton="cancel" orderId={order.orderId} fetchOrders={fetchOrders}/>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
