import React, { useState } from 'react';
import PersonalInfo from '../components/PersonalInfo';
import PurchaseHistory from '../components/PurchaseHistory';
import ActiveListings from '../components/ActiveListings';
import MessageConversation from '../components/MessageConversation';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Clear the token
    navigate('/login');  // Redirect to login page
  };

  return (
    <div>
      <h1>Account Overview</h1>
      <nav>
        <ul>
          <li onClick={() => setActiveTab('personal-info')}>Personal Info</li>
          <li onClick={() => setActiveTab('purchase-history')}>Purchase History</li>
          <li onClick={() => setActiveTab('active-listings')}>Active Listings</li>
          <li onClick={() => setActiveTab('message-conversations')}>Message Conversations</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      <div className="tab-content">
        {activeTab === 'personal-info' && <PersonalInfo />}
        {activeTab === 'purchase-history' && <PurchaseHistory />}
        {activeTab === 'active-listings' && <ActiveListings />}
        {activeTab === 'message-conversations' && <MessageConversation />}
      </div>
    </div>
  );
};

export default AboutPage;
