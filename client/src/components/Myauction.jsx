import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Myauction = () => {
  const [joinedauctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuctions();
  }, []);

  const getAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:5004/auction/myauctions');
      console.log('Fetched joined Auctions:', response.data);
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching joined auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>All Auctions</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {joinedauctions.length === 0 && <li>No joined auctions found.</li>}
          {joinedauctions.map((my, index) => (
            <li key={index}>
              <strong>{my.participantName}</strong> - {my.place} - ₹{my.phoneNo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Myauction;
