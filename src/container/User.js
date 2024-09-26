import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCartItem, deleteCartItemError } from '../Redux/cart.action';
import axios from 'axios';
import { DELETE_CART_ITEM_ERROR, DELETE_CART_ITEM_SUCCESS } from '../Redux/ActionType';

const User = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch cart data from server
        const response = await fetch('http://localhost:3000/cart');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data); // Update state with fetched data
      } catch (error) {
        setError(error); // Set error if there's an issue 
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchUserData(); // Call the fetch function
  }, [userData]);

  const handleDelete = async (itemId) => {
    dispatch(deleteCartItem(itemId))
    // navigate('/Cart') 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="user-container">
      <h2>User Cart</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;

