import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageConversation = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/messages');
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations', error);
      }
    };
    fetchConversations();
  }, []);

  const handleConversationClick = (conversationId) => {
    setActiveConversation(conversations.find(c => c.id === conversationId));
  };

  const handleSendMessage = async () => {
    if (!message) return;
    try {
      await axios.post(`http://localhost:8080/messages/${activeConversation.id}`, { message });
      setMessage('');  // Clear message field
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Message Conversations</h2>
      <div style={{ display: 'flex' }}>
        <div>
          <ul>
            {conversations.map((conversation) => (
              <li key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>
                Conversation with {conversation.otherUser}
              </li>
            ))}
          </ul>
        </div>
        {activeConversation && (
          <div>
            <h3>Conversation with {activeConversation.otherUser}</h3>
            <ul>
              {activeConversation.messages.map((msg, index) => (
                <li key={index}>{msg.content}</li>
              ))}
            </ul>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageConversation;
