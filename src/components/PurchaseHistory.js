import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/purchase-history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <div>
      <h2>Purchase History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item.productName} - ${item.price} on {new Date(item.purchaseDate).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
