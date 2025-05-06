import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuctionList from './AuctionList';

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
            {/*             <button className="btn btn-success" onClick={openJoinAuctionModal}>Join Auction</button> */}

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Auction</h5>
                                <button type="button" className="btn-close" onClick={closeAddAuctionModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                            <div className="form-group">
                                                <label htmlFor="description">Description:</label>
                                                <textarea className="form-control" id="description" name="description" rows="3"></textarea>
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
                                            <div className="form-group">
                                                <label htmlFor="image">Upload Image:</label>
                                                <input type="file" className="form-control" id="image" name="image" accept="image/*" />
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

            <AuctionList />
        </div>
    );
}

export default Home;