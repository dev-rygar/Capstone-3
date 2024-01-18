import React from 'react';
import { useState, useEffect } from 'react';
import EditProduct from './table_buttons/EditProduct';
import Archive from './table_buttons/Archive';


export default function ProductTable() {
    const [products, setProducts] = useState([])
   
    const fetchProducts = async () => {
        try {
        const token = localStorage.getItem('access'); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data); 
        } catch (error) {
        console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const refreshProducts = () => {
        fetchProducts();
    };

    return (

            <div className="overflow-x-auto">
                <table className='min-w-full bg-white rounded-lg'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>ID</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>Name</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>Description</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>Price</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>Qty</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>Sold</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base'>isActive</th>
                            <th className='text-left py-3 px-4 uppercase font-semibold text-sm lg:text-base' colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className='border-b'>
                                <td className='py-3 px-4'>{product._id}</td>
                                <td className='py-3 px-4'>{product.name}</td>
                                <td className='py-3 px-4'>{product.description}</td>
                                <td className='py-3 px-4'>{product.price}</td>
                                <td className='py-3 px-4'>{product.qty}</td>
                                <td className='py-3 px-4'>{product.salesCount}</td>
                                <td className='py-3 px-4'>{product.isActive ? 'Yes' : 'No'}</td>
                                <td className='py-3 px-4'>
                                    <EditProduct product={product} refreshProducts={refreshProducts} />
                                </td>
                                <td className='py-3 px-4'>
                                <Archive product={product} refreshProducts={refreshProducts} />
                                </td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>
              
            </div>
            


    )
}
