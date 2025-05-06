import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuctionGround.css';

function AuctionGround() {
    const [currentBid, setCurrentBid] = useState(100000);
    const [lastBidder, setLastBidder] = useState("User123");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [bidHistory, setBidHistory] = useState([
        { bidder: "User456", amount: 95000, time: "2 mins ago" },
        { bidder: "User789", amount: 90000, time: "5 mins ago" }
    ]);

    const images = [
        "https://via.placeholder.com/800x400/2a5298/ffffff?text=Product+Image+1",
        "https://via.placeholder.com/800x400/1e3c72/ffffff?text=Product+Image+2",
        "https://via.placeholder.com/800x400/334d7c/ffffff?text=Product+Image+3"
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

    return (
        <div className="auction-ground">
            <div className="container py-5">
                <div className="row">
                    {/* Bid Information */}
                    <div className="col-md-3">
                        <div className="bid-info-card">
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
