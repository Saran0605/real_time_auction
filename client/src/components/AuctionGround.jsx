import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuctionGround.css';
import { useLocation } from 'react-router-dom';

function AuctionGround() {
    const location = useLocation();
    const { auctionName, auctionDescription, productList: stateProductList } = location.state || {};

    const [productList, setProductList] = useState(stateProductList || '');
    const [currentBid, setCurrentBid] = useState(100000);
    const [lastBidder, setLastBidder] = useState("User123");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [bidHistory, setBidHistory] = useState([
        { bidder: "User456", amount: 95000, time: "2 mins ago" },
        { bidder: "User789", amount: 90000, time: "5 mins ago" }
    ]);

    const images = [
        "https://picsum.photos/800/400?random=1",
        "https://picsum.photos/800/400?random=2",
        "https://picsum.photos/800/400?random=3"
    ];

    const handleBid = (amount) => {
        const newBid = currentBid + amount;
        setCurrentBid(newBid);
        setBidHistory([
            { bidder: "You", amount: newBid, time: "Just now" },
            ...bidHistory
        ]);
        setLastBidder("You");
    };

    // Add a function to get Gemini suggestion from backend
    const getGeminiSuggestion = async (name, betValue, description) => {
        try {
            const response = await fetch('http://localhost:5004/api/gemini/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, betValue, description })
            });
            const data = await response.json();
            console.log("Gemini Suggestion:", data.suggestion || data); // Show suggestion in terminal
        } catch (error) {
            console.error("Failed to get Gemini suggestion:", error);
        }
    };

    useEffect(() => {
        // If productList is not available from state, fetch from backend using auctionName
        if ((!stateProductList || stateProductList.trim() === '') && auctionName) {
            fetch(`http://localhost:5004/auction/byName/${encodeURIComponent(auctionName)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.productList) {
                        setProductList(data.productList);
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch product list:', err);
                });
        }
    }, [auctionName, stateProductList]);

    // Call Gemini suggestion when component mounts or when relevant data changes
    useEffect(() => {
        if (auctionName && auctionDescription && currentBid) {
            getGeminiSuggestion(auctionName, currentBid, auctionDescription);
        }
    }, [auctionName, auctionDescription, currentBid]);

    return (
        <div className="auction-ground">
            <div className="container py-5">
                <div className="row">
                    {/* Bid Information */}
                    <div className="col-md-3">
                        <div className="bid-info-card">
                            {/* Show auction name and description above bid history */}
                            <div className="mb-3">
                                <h5 className="mb-1">Auction Name: {auctionName || 'N/A'}</h5>
                                {auctionDescription && (
                                    <div>
                                        <strong>Description:</strong>
                                        <div>{auctionDescription}</div>
                                    </div>
                                )}
                                <div>
                                    <strong>Product List:</strong>
                                    <ul className="mb-2">
                                        {productList && productList.trim() !== ''
                                            ? productList.split(',').map((prod, idx) => (
                                                <li key={idx}>{prod.trim()}</li>
                                            ))
                                            : <li>No products available</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <h3>Current Bid</h3>
                            <div className="current-bid">₹{currentBid.toLocaleString()}</div>
                            <div className="last-bidder">
                                Last Bidder: <span>{lastBidder}</span>
                            </div>
                            <div className="time-left">
                                Time Left: <span>05:23</span>
                            </div>
                            <div className="bid-history">
                                <h5>Bid History</h5>
                                {bidHistory.map((bid, index) => (
                                    <div key={index} className="bid-history-item">
                                        <strong>{bid.bidder}</strong>
                                        <div>₹{bid.amount.toLocaleString()}</div>
                                        <small>{bid.time}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Auction Area */}
                    <div className="col-md-9">
                        {/* Image Slider */}
                        <div className="image-slider mb-4">
                            <img src={images[currentImageIndex]} alt="Product" className="main-image" />
                            <div className="image-controls">
                                <button 
                                    className="slider-btn" 
                                    onClick={() => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : images.length - 1)}
                                >
                                    ‹
                                </button>
                                <button 
                                    className="slider-btn" 
                                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* Bid Controls */}
                        <div className="bid-controls">
                            <button className="bid-btn" onClick={() => handleBid(25000)}>
                                +25K
                                <span className="btn-effect"></span>
                            </button>
                            <button className="bid-btn btn-primary" onClick={() => handleBid(50000)}>
                                +50K
                                <span className="btn-effect"></span>
                            </button>
                            <button className="bid-btn btn-large" onClick={() => handleBid(75000)}>
                                +75K
                                <span className="btn-effect"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionGround;
