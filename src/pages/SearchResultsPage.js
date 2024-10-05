import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import GridItem from '../components/GridItem';

const SearchResultsPage = () => {
  const { query } = useParams();  // Retrieve query from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/buyer/search', {
          params: { query }  // Pass the query as a parameter
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching search results');
        setLoading(false);
      }
    };
  
    fetchSearchResults();
  }, [query]);

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="grid">
        {results.map((item) => (
          <Link key={item.id} to={`/itm/${item.id}`}>
            <GridItem item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
