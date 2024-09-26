import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateItemQuantityFailure, updateItemQuantityRequest, updateItemQuantitySuccess } from '../Redux/cart.action'; // Adjust import path as needed
import axios from 'axios';

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const {item} = location.state?.item;
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (item) {
      dispatch(updateItemQuantityRequest(item.id, quantity));
      console.log("updateItemQuantityRequest", item.id, quantity);
      
      try {
        const response = await axios.get('http://localhost:3000/cart' );
        const cartData = response.data;
        const existingItem = cartData.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
          await axios.put(`http://localhost:3000/cart/${item.id}`, {
            ...item,
            quantity: existingItem.quantity + quantity // Increment quantity
          });
  
          dispatch(updateItemQuantitySuccess({ ...item, quantity: existingItem.quantity + quantity }));
        } else {
          await axios.post('http://localhost:3000/cart', { ...item, quantity });
          dispatch(updateItemQuantitySuccess({ ...item, quantity }));
        }
  
        navigate("/user", { state: { item, quantity } });
      } catch (error) {
        dispatch(updateItemQuantityFailure(error));
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  // const handleAddToCart = () => {
  //   if (item) {
  //     dispatch(addItemToCart(item.id, quantity));
  //     navigate("/user", { state: { item, quantity } });
  //   }
  // };



  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  return (
    <div>
      <h2>Product Details</h2>
      {item ? (
        <div>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Description: {item.Description}</p>
          <div>
            <button className='btn' onClick={handleIncrease}>+</button>
            {quantity}
            <button className='btn' onClick={handleDecrease}>-</button>
          </div>
          <button onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      ) : (
        <p>No item data available</p>
      )}
    </div>
  );
};

export default ProductList;
