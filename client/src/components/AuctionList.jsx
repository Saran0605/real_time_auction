import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get('http://localhost:5004/auction/allAuctions');
      console.log('Fetched Auctions:', response.data);
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  };

  return (
    <div>
      <h2>All Auctions</h2>
      <ul>
        {auctions.map((auction, index) => (
          <li key={index}>
            <strong>{auction.name}</strong> - {auction.timing} - ₹{auction.entryAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
