import React from 'react';
import Swal from 'sweetalert2';

export default function Archive ({ product, refreshProducts }) {
  const archiveToggle = () => {
    const endpoint = product.isActive 
      ? `${process.env.REACT_APP_API_URL}/products/archive/${product._id}`
      : `${process.env.REACT_APP_API_URL}/products/activate/${product._id}`;

    fetch(endpoint, {
      method: "PATCH",
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
      if (data.archivedProduct || data.updatedProduct) {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: `Product Successfully ${product.isActive ? "Archived" : "Activated"}`,
        });
        refreshProducts(); 
      } else {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Please try again",
        });
      }
    })
    .catch((error) => {
      console.error("Error toggling product status:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "An error occurred, please try again",
      });
    });
  };

  return (
    <button 
      className={`bg-${product.isActive ? "red" : "green"}-500 hover:bg-${product.isActive ? "red" : "green"}-700 text-white font-bold py-2 px-4 rounded`} 
      onClick={archiveToggle}>
      {product.isActive ? "Archive" : "Activate"}
    </button>
  );
};

