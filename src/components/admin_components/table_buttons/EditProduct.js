import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProduct({ product, refreshProducts }) {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);

  const [showEdit, setShowEdit] = useState(false);

    const openEdit = (product) => {
    setProductId(product._id); 
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQty(product.qty);

    setShowEdit(true);
    };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription(""); 
    setPrice(0);
    setQty(0); 
  };


    const editProduct = (e, productId) => {
        e.preventDefault();
        console.log(productId)
        if (!productId) {
            console.error("Product ID is undefined");
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/products/edit/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                qty: qty,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                console.log("HTTP error response:", res);
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
            })
        .then((data) => {
             console.log("Server response:", data);
            if (data && (data.success || data.updatedProduct)) {
                Swal.fire({
                title: "Success!",
                icon: "success",
                text: "Product Successfully Updated",
                });
                closeEdit();
                refreshProducts(); 
            } else {
                Swal.fire({
                title: "Error!",
                icon: "error",
                text: "Please try again",
                });
                closeEdit();
            }
            })
        .catch((error) => {
            console.error("Error updating product:", error);
            Swal.fire({
                title: "Error!",
                icon: "error",
                text: "An error occurred, please try again",
            });
            closeEdit();
        });
    };



  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openEdit(product)}
      >
        Edit
      </button>

      {showEdit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Product
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={name} 
                  onChange={(event) => setName(event.target.value)} 
                  placeholder="Title"
                  required
                />
                <input
                  className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                  required
                />
                <input
                  className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="Price"
                  required
                />
                <input
                  className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  value={qty} 
                  onChange={(event) => setQty(event.target.value)} 
                  placeholder="Quantity" 
                  required
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={closeEdit}
                >
                  Close
                </button>
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  type="submit"
                  onClick={(event) => editProduct(event, productId)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
