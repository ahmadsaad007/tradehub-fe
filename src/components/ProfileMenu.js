import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import PurchaseHistory from './PurchaseHistory';
import ActiveListings from './ActiveListings';
import MessageConversation from './MessageConversation';

const ProfileMenu = ({ isSeller }) => {
  const [activeTab, setActiveTab] = useState('personalInfo');

  const renderContent = () => {
    switch (activeTab) {
      case 'personalInfo':
        return <PersonalInfo />;
      case 'purchaseHistory':
        return <PurchaseHistory />;
      case 'activeListings':
        return isSeller ? <ActiveListings /> : <p>You are not a seller.</p>;
      case 'messages':
        return <MessageConversation />;
      default:
        return <p>Select a menu option</p>;
    }
  };

  return (
    <div className="profile-menu">
      <div className="menu">
        <button onClick={() => setActiveTab('personalInfo')}>Personal Info</button>
        <button onClick={() => setActiveTab('purchaseHistory')}>Purchase History</button>
        {isSeller && <button onClick={() => setActiveTab('activeListings')}>Active Listings</button>}
        <button onClick={() => setActiveTab('messages')}>Message Conversations</button>
        <button onClick={() => { localStorage.removeItem('authToken'); window.location.reload(); }}>Logout</button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default ProfileMenu;
