import React, { useState, useEffect } from 'react';
import './Products.css'

const Products = () => {
  // Step 1: Declare state variables for storing products and handling loading and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 2: Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products); // Save the products array to state
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        setError(error); // Handle any errors
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Step 3: Render the component with loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Step 4: Render the list of products
  return (
    <div className="products-container">
      <h1>Omnit Product List</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Rating: {product.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
