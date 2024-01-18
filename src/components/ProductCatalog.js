import React, { useState, useEffect } from "react";
import DefaultImg from "../images/noProductIMG.png";
import styles from "../styles/ProductCatalogStyle";
import ATCButton from './cart/ATCButton';


export default function ProductCatalog() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
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
      setProducts(data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Products</h2>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <a key={product.id} href={product.href} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image || DefaultImg}
                    alt={product.imageAlt || product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>₱{product.price}</p>
                <div className="mt-6">
                 <ATCButton
                    productId={product._id}
                />                 
                </div>

              </a>
            ))}
          </div>
        </div>
      </div>
    );
      }