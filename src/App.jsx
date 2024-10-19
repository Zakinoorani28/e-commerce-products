import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    img: ''
  });

  useEffect(() => {
    axios.get('https://ecommerce-backend-2006.vercel.app/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://ecommerce-backend-2006.vercel.app/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ title: '', price: '', description: '', img: '' });
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
      });
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.img} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default App;
