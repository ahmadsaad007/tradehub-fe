import React, { useState } from 'react';
import axios from 'axios';

const CreateListingPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sellerUsername, setSellerUsername] = useState('');
  const [imageFiles, setImageFiles] = useState(null);  // Handle image file uploads
  const [listingAddress, setListingAddress] = useState('');
  const [zip, setZip] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !description || !price || !sellerUsername || !imageFiles || !listingAddress || !zip || !categoryName) {
      setError('Please fill in all fields and upload images.');
      return;
    }

    try {
      // Create a FormData object to handle file uploads and other data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', parseFloat(price));  // Convert price to a number
      formData.append('sellerUsername', sellerUsername);
      formData.append('listingAddress', listingAddress);
      formData.append('zip', zip);
      formData.append('categoryName', categoryName);
      formData.append('createdAt', new Date());  // Automatically add createdAt field

      // Append each selected file to FormData
      Array.from(imageFiles).forEach((file, index) => {
        formData.append(`imageFiles[${index}]`, file);  // Add each file to the formData
      });

      // Make POST request to backend
      const response = await axios.post('http://localhost:8080/seller/create-item', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Tell the server we are sending form data
        }
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError('Error creating the listing.');
    }
  };

  return (
    <div>
      <h1>Create a New Listing</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Listing created successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seller Username:</label>
          <input
            type="text"
            value={sellerUsername}
            onChange={(e) => setSellerUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles(e.target.files)}  // Capture multiple files
            required
          />
        </div>
        <div>
          <label>Listing Address:</label>
          <input
            type="text"
            value={listingAddress}
            onChange={(e) => setListingAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ZIP Code:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default CreateListingPage;
