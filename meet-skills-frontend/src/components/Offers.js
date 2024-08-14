import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/connections');
        setOffers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div>
      <h2>Offers</h2>
      {offers.map((offer) => (
        <div key={offer.id}>
          <p>{offer.companyName}</p>
          <p>{offer.description}</p>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      ))}
    </div>
  );
}

export default Offers;
