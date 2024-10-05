import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SearchResultsPage from './pages/SearchResultsPage';  // Import search results page
import ItemDetailsPage from './pages/ItemDetailsPage';  // Import item details page
import CreateListingPage from './pages/CreateListingPage';  // Import the Create Listing page
import Navbar from './components/NavBar';
import { setupMockAPI } from './mockAPI';  // Import mock API setup

setupMockAPI();  // Initialize the mock API

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sch/:query" element={<SearchResultsPage />} />  {/* Search results page */}
          <Route path="/itm/:itemId" element={<ItemDetailsPage />} />  {/* Item details page */}
          <Route path="/sell" element={<CreateListingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
