import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultImg from "../images/noProductIMG.png";
import styles from "../styles/SingleProductStyle"; 
import ATCButton from './cart/ATCButton'; 

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
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
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img
            src={product.image || DefaultImg}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>₱{product.price}</p>
          <ATCButton productId={product._id} />
        </div>
      </div>
    </div>
  );
}
