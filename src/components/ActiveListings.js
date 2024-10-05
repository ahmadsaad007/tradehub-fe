import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchActiveListings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/active-listings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching active listings:', error);
      }
    };

    fetchActiveListings();
  }, []);

  return (
    <div>
      <h2>Your Active Listings</h2>
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>{listing.productName} - ${listing.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveListings;
