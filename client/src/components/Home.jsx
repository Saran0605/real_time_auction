import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const gotoAuctionRoom = () => {
        navigate('/auction');
    };

    const openAddAuctionModal = () => {
        setShowModal(true);
    };

    const closeAddAuctionModal = () => {
        setShowModal(false);
    };

/*     const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData);

        fetch('http://localhost:5004/auction/addAuctionForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        }) */

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch('http://localhost:5004/auction/addAuctionForm', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            closeAddAuctionModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="home">
            <h1>Welcome to home Page!</h1>
            <button className="btn btn-primary" onClick={gotoAuctionRoom}>Auction Room</button>
            <button className="btn btn-success" onClick={openAddAuctionModal}>Add Auction</button>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Auction</h5>
                                <button type="button" className="btn-close" onClick={closeAddAuctionModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="http://localhost:5004/auction/addAuctionForm" method="POST" /* id='add_auction' onSubmit={handleSubmit} */>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="auctionName">Name:</label>
                                                <input type="text" className="form-control" id="auctionName" name="auctionName" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="auctionTiming">Timing:</label>
                                                <input type="text" className="form-control" id="auctionTiming" name="auctionTiming" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="entryAmount">Entry Amount:</label>
                                                <input type="number" className="form-control" id="entryAmount" name="entryAmount" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="startDate">Start Date:</label>
                                                <input type="date" className="form-control" id="startDate" name="startDate" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="time">Time:</label>
                                                <input type="time" className="form-control" id="time" name="time" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="participants">No of Participants:</label>
                                                <input type="number" className="form-control" id="participants" name="participants" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="productList">Product List:</label>
                                                <textarea className="form-control" id="productList" name="productList" rows="4"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={closeAddAuctionModal}>Close</button>
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

export default Home;