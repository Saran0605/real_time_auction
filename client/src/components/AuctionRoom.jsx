import { useState } from 'react';

function AuctionRoom() {
    const [showModal, setShowModal] = useState(false);
    const [secretToken, setSecretToken] = useState('');

    const handleUserChange = (e) => {
        // Add handler for the user input if needed
        console.log(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5004/auction/joinNow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secretToken })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return text;
                }
            });
        })
        .then(data => {
            console.log('Success:', data);
            setShowModal(false);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to join. Please try again.');
        });
    };

    return (
        <div className="auctionRoom">
            <h1>Welcome to Auction Room!</h1>

            <a href="http://localhost:5004/auction/addAuctionForm"> go to backend</a> 

            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Participate Now!!</button>

            <form action="http://localhost:5004/auction/newForm" method="POST">
                <input 
                    type="text" 
                    name="user" 
                    defaultValue="ragul"
                    onChange={handleUserChange}
                />
                <input type="submit" />
            </form>

            {/* Participation Modal */}
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
                                    <div className="form-group mb-4">
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
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuctionRoom;