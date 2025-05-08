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
        <div style={styles.body}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Auction Platform</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/auction">Auction Room</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="home" style={styles.home}>
                <div className="button-container" style={styles.buttonContainer}>
                    <button className="btn btn-primary" style={styles.button} onClick={gotoAuctionRoom}>Auction Room</button>
                    <button className="btn btn-success" style={styles.button} onClick={openAddAuctionModal}>Add Auction</button>
                </div>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog" style={styles.modal}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content" style={styles.modalContent}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Auction</h5>
                                    <button type="button" className="btn-close" onClick={closeAddAuctionModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="auctionName" style={styles.label}>Name:</label>
                                                    <input type="text" className="form-control" id="auctionName" name="auctionName" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="auctionTiming" style={styles.label}>Timing:</label>
                                                    <input type="text" className="form-control" id="auctionTiming" name="auctionTiming" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="entryAmount" style={styles.label}>Entry Amount:</label>
                                                    <input type="number" className="form-control" id="entryAmount" name="entryAmount" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="startDate" style={styles.label}>Start Date:</label>
                                                    <input type="date" className="form-control" id="startDate" name="startDate" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description" style={styles.label}>Description:</label>
                                                    <textarea className="form-control" id="description" name="description" rows="3" required style={styles.input}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="time" style={styles.label}>Time:</label>
                                                    <input type="time" className="form-control" id="time" name="time" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="participants" style={styles.label}>No of Participants:</label>
                                                    <input type="number" className="form-control" id="participants" name="participants" required style={styles.input} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="productList" style={styles.label}>Product List:</label>
                                                    <textarea className="form-control" id="productList" name="productList" rows="4" required style={styles.input}></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="image" style={styles.label}>Upload Image:</label>
                                                    <input type="file" className="form-control" id="image" name="image" accept="image/*" required style={styles.input} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" >Submit</button>
                                            <button type="button" className="btn btn-secondary" onClick={closeAddAuctionModal} >Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <AuctionList />
            </div>
        </div>
    );
}

const styles = {
    body: {
        backgroundColor: '#080710',
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff'
    },
    home: {
        textAlign: 'center',
        padding: '50px'
    },
    title: {
        fontSize: '36px',
        fontWeight: '600',
        marginBottom: '30px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    },
    button: {
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: '600',
        background: 'rgba(0, 0, 0, 0.2)',
        border: '2px solid rgba(0, 0, 0, 0.3)',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s, border 0.3s'
    },
    modal: {
        display: 'block',
        backdropFilter: 'blur(10px)'
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.13)',
        borderRadius: '10px',
        padding: '40px',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)'
    },
    label: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '10px',
        fontWeight: '500'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '5px',
        color: 'black',
        fontSize: '16px'
    },
    modalButton: {
        width: '48%'
    }
};

export default Home;
