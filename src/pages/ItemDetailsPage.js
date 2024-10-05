import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetailsPage = () => {
  const { itemId } = useParams();  // Retrieve itemId from the URL
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');  // For sending messages to seller
  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/buyer/item/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/messages/seller/${item.seller.id}`, {
        message,
        itemId,
      });
      setMessage('');  // Clear the message field
      setIsMessageSent(true);  // Show a success message
    } catch (error) {
      console.error('Error sending message to seller', error);
    }
  };

  return (
    <div>
      {item ? (
        <div className="item-details">
          <h1>{item.title}</h1>
          <img src={item.imageUrl} alt={item.title} />
          <p><strong>Price:</strong> ${item.price}</p>
          <p>{item.description}</p>

          <div className="seller-info">
            <h2>Seller Information</h2>
            <p><strong>Name:</strong> {item.seller.name}</p>
            <p><strong>Description:</strong> {item.seller.description}</p>
          </div>

          <div className="message-seller">
            <h3>Message the Seller</h3>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask the seller about this item..."
                required
              />
              <button type="submit">Send Message</button>
            </form>
            {isMessageSent && <p>Your message has been sent to the seller!</p>}
          </div>
        </div>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
  );
};

export default ItemDetailsPage;
