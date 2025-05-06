import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuctionRoom() {
    const [showModal, setShowModal] = useState(false);
    const [secretToken, setSecretToken] = useState('');
    const [joinedAuctions, setJoinedAuctions] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5004/joinauction/all')
            .then(res => res.json())
            .then(data => {
                setJoinedAuctions(data);
            })
            .catch(err => {
                console.error('Failed to fetch joined auctions:', err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5004/auction/joinNow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secretToken })
        })
            .then(res => res.json())
            .then(data => {
                setShowModal(false);
                setSecretToken('');
                // Navigate to AuctionGround with auctionName and auctionDescription
                if (selectedAuction) {
                    navigate('/auctionGround', {
                        state: {
                            auctionName: selectedAuction.name || selectedAuction.auctionName,
                            auctionDescription: selectedAuction.description || selectedAuction.auctionDescription,
                            secretToken
                        }
                    });
                } else {
                    navigate('/auctionGround', { state: { secretToken } });
                }
            })
            .catch(err => {
                console.error('Join failed:', err);
                alert('Failed to join. Please try again.');
            });
    };

    return (
        <div className="auctionRoom container p-4">
            <h1 className="mb-4">Welcome to Auction Room!</h1>

            <a href="http://localhost:5004/auction/addAuctionForm" target="_blank" rel="noreferrer" className="btn btn-link mb-3">
                Go to backend
            </a>

            <button className="btn btn-primary mb-4" onClick={() => { setShowModal(true); setSelectedAuction(null); }}>Participate Now!!</button>

            {/* Modal for entering secret token */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Secret Token</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="secretToken">Secret Token:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="secretToken"
                                            value={secretToken}
                                            onChange={(e) => setSecretToken(e.target.value)}
                                            required
                                            placeholder="Enter your secret token"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Joined Auctions as cards, 3 per row */}
            <div className="mt-5">
                <h3>All Joined Auctions</h3>
                <div className="row">
                    {joinedAuctions.map((auction, index) => (
                        <div className="col-md-6 mb-4" key={auction._id || index}>
                            <div className="card h-100 shadow" style={{ minHeight: '320px', fontSize: '1.1rem' }}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-3">{auction.name || auction.auctionName || 'N/A'}</h4>
                                        {auction.description && (
                                            <div className="mb-2">
                                                <strong>Description:</strong>
                                                <div>{auction.description}</div>
                                            </div>
                                        )}
                                        <p className="card-text mb-2">
                                            <strong>Participant:</strong> {auction.participantName || 'N/A'}<br />
                                            <strong>Place:</strong> {auction.place || 'N/A'}<br />
                                            <strong>Phone No:</strong> {auction.phoneNo}<br />
                                            <strong>Agreement:</strong> {auction.agreement}
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={() => {
                                            setShowModal(true);
                                            setSecretToken('');
                                            setSelectedAuction(auction);
                                        }}>Participate</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AuctionRoom;
