import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuctionGround.css';
import { useLocation } from 'react-router-dom';

function AuctionGround() {
    const location = useLocation();
    const { auctionName, auctionDescription, productList: stateProductList } = location.state || {};

    const [timeLeft, setTimeLeft] = useState(60);
    const [currentBid, setCurrentBid] = useState(() => {
        const savedBid = localStorage.getItem('currentBid');
        return savedBid ? parseInt(savedBid, 10) : 100000;
    });
    const [lastBidder, setLastBidder] = useState("User123");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [bidHistory, setBidHistory] = useState(() => {
        return JSON.parse(localStorage.getItem('bidHistory')) || [];
    });
    const [chatMessages, setChatMessages] = useState([]);

    const images = [
        "https://picsum.photos/800/400?random=1",
        "https://picsum.photos/800/400?random=2",
        "https://picsum.photos/800/400?random=3"
    ];

    useEffect(() => {
        localStorage.setItem('currentBid', currentBid.toString());
    }, [currentBid]);

    useEffect(() => {
        if ((!stateProductList || stateProductList.trim() === '') && auctionName) {
            fetch(`http://localhost:5004/auction/byName/${encodeURIComponent(auctionName)}`)
                .then(res => res.json())
                .catch(err => {
                    console.error('Failed to fetch product list:', err);
                });
        }
    }, [auctionName, stateProductList]);

    const updateBidHistoryInCache = (newBid, bidder) => {
        const storedBids = JSON.parse(localStorage.getItem('bidHistory')) || [];
        const newBidHistory = [
            { bidder, amount: newBid, time: "Just now" },
            ...storedBids
        ];
        if (newBidHistory.length > 5) newBidHistory.pop();
        localStorage.setItem('bidHistory', JSON.stringify(newBidHistory));
        setBidHistory(newBidHistory);
    };

    const handleBid = (amount) => {
        const newBid = currentBid + amount;
        setCurrentBid(newBid);
        updateBidHistoryInCache(newBid, "You");
        setLastBidder("You");
        setTimeLeft(60);
    };

    const resetBids = () => {
        setCurrentBid(100000);
        localStorage.setItem('currentBid', "100000");
        localStorage.removeItem('bidHistory');
        setBidHistory([]);
    };

    // Gemini Suggestion Fetch + Chat Integration
    const getGeminiSuggestion = async () => {
        setChatMessages(prev => [...prev, { sender: 'user', text: 'Give me an AI suggestion.' }]);

        try {
            const response = await fetch('http://localhost:5004/api/gemini/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: auctionName,
                    betValue: currentBid,
                    description: auctionDescription
                })
            });

            const data = await response.json();
            if (data?.suggestion) {
                setChatMessages(prev => [...prev, { sender: 'bot', text: data.suggestion }]);
            } else {
                setChatMessages(prev => [...prev, { sender: 'bot', text: 'No suggestion received.' }]);
            }
        } catch (error) {
            console.error("Failed to get Gemini suggestion:", error);
            setChatMessages(prev => [...prev, { sender: 'bot', text: 'Error getting suggestion.' }]);
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            fetch('http://localhost:5004/auction/finalBid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    auctionId: location.state?.auctionData?._id,
                    bidderName: lastBidder,
                    finalAmount: currentBid,
                    auctionName: auctionName
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Final bid stored:', data);
                    alert(`Auction ended! Final bid: ₹${currentBid} by ${lastBidder}`);
                })
                .catch(err => console.error('Error storing final bid:', err));
        }
    }, [timeLeft, currentBid, lastBidder, auctionName, location.state]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isBiddingDisabled = timeLeft <= 0;

    return (
        <div className="auction-ground">
            <div className="container py-5">
                <div className="row">
                    {/* Bid Information */}
                    <div className="col-md-3">
                        <div className="bid-info-card">
                            <div className="mb-3">
                                <h5 className="mb-1">Auction Name: {auctionName || 'N/A'}</h5>
                                {auctionDescription && (
                                    <div>
                                        <strong>Description:</strong>
                                        <div>{auctionDescription}</div>
                                    </div>
                                )}
                            </div>
                            <h3>Current Bid</h3>
                            <div className="current-bid">₹{currentBid.toLocaleString()}</div>
                            <div className="last-bidder">
                                Last Bidder: <span>{lastBidder}</span>
                            </div>
                            <div className="time-left">
                                Time Left: <span className={timeLeft <= 30 ? 'text-danger' : ''}>
                                    {formatTime(timeLeft)}
                                </span>
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
                                    onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                >
                                    ‹
                                </button>
                                <button
                                    className="slider-btn"
                                    onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* AI Chat Box */}
                        <div className="chat-box mb-4">
                            <div className="chat-window">
                                {chatMessages.map((msg, idx) => (
                                    <div key={idx} className={`chat-message ${msg.sender}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-info" onClick={getGeminiSuggestion}>
                                Get AI Suggestion
                            </button>
                        </div>

                    {/* Bid Controls */}
                    <div className="bid-controls">
                        <button className="bid-btn" onClick={() => handleBid(25000)} disabled={isBiddingDisabled}>
                            +25K <span className="btn-effect"></span>
                        </button>
                        <button className="bid-btn btn-primary" onClick={() => handleBid(50000)} disabled={isBiddingDisabled}>
                            +50K <span className="btn-effect"></span>
                        </button>
                        <button className="bid-btn btn-large" onClick={() => handleBid(75000)} disabled={isBiddingDisabled}>
                            +75K <span className="btn-effect"></span>
                        </button>
                    </div>

                    <div className="reset-btn-container mt-3">
                        <button className="btn btn-danger" onClick={resetBids}>
                            Reset Bids
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}

export default AuctionGround;