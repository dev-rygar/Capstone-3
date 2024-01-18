import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from './../../styles/AddProductStyle';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [image, setImage] = useState("");
  const [salesCount, setSalesCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, description, price, qty, salesCount, isActive, image: image || '' };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`, 
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      Swal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
      });
        setName("");
        setDescription("");
        setPrice(0);
        setQty(0);
        setSalesCount(0);
        setIsActive(true);
        setImage("");
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Unable to create product. Please try again later.",
        icon: "error",
      });
    }
  };

    return (
        <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className="mb-4">
            <h1 className={styles.title}> New Product</h1>
            <label className={styles.label} htmlFor="name">
                Name
            </label>
            <input
                className={styles.input}
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className={styles.label} htmlFor="description">
                Description
            </label>
            <textarea
                className={styles.input}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className={styles.label} htmlFor="price">
                Price
            </label>
            <input
                className={styles.input}
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
                min="0"
            />
            </div>
            <div className="mb-4">
            <label className={styles.label} htmlFor="qty">
                Quantity
            </label>
            <input
                className={styles.input}
                id="qty"
                type="number"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10))}
                required
                min="0"
            />
            </div>
            <div className="mb-4">
            <label className={styles.label} htmlFor="salesCount">
                Sales Count
            </label>
            <input
                className={styles.input}
                id="salesCount"
                type="number"
                value={salesCount}
                onChange={(e) => setSalesCount(parseInt(e.target.value, 10))}
                min="0"
            />
            </div>

          <div className="mb-4">
            <label className={styles.label} htmlFor="image">
              Image URL
            </label>
            <input
              className={styles.input}
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL (optional)"
            />
          </div>

            <div className="mb-6">
            <label className={styles.label} htmlFor="isActive">
                Active
            </label>
            <input
                className={styles.checkbox}
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
            />
            </div>
            <div className="flex items-center justify-between">
            <button className={styles.submitButton} type="submit">
                Add Product
            </button>
            </div>
        </form>
        </div>
    );

}
export default AddProduct;
