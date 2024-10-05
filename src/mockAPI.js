import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockSearchData from './mockData/SearchResultsPageMock.json';  // Import the search data
import mockItemData from './mockData/ItemDetailsMockData.json';      // Import the item details data
import mockUserData from './mockData/AboutPageMockData.json';      // Import the user data

export const setupMockAPI = () => {
  const mock = new MockAdapter(axios, { delayResponse: 500 });

  // Mocking the search API call for /buyer/search
  mock.onGet(/\/buyer\/search/).reply(config => {
    const query = new URLSearchParams(config.params).get('query') || '';
    console.log('Mock API - Search query received:', query);

    // Filter the search results based on the query
    const filteredResults = mockSearchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    return [200, filteredResults];
  });

  // Mocking the Item Details API call for /buyer/item/:itemId
  mock.onGet(/\/buyer\/item\/\d+/).reply(config => {
    const itemId = parseInt(config.url.split('/').pop());  // Extract itemId from URL
    console.log('Mock API - Item ID received:', itemId);

    const item = mockItemData.find(item => item.id === itemId);
    if (item) {
      return [200, item];
    } else {
      return [404, { message: 'Item not found' }];
    }
  });

  // Mocking the About Page Personal Info API call for /user/info
  mock.onGet('/user/info').reply(200, mockUserData);  // Return the user data from the mock

  mock.onPost('/seller/create-item').reply(config => {
    const newItem = JSON.parse(config.data);  // Parse the new item data from the request
    console.log('Mock API - New item received:', newItem);
  
    // You can simulate success or failure here.
    return [200, { message: 'Item created successfully' }];
  });
};
