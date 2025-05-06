import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [secretToken, setSecretToken] = useState('');
  const [selectedAuction, setSelectedAuction] = useState(null);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const filteredAuctions = auctions.filter(auction =>
    (auction.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openProductList = (products) => {
    setSelectedProducts(products);
  };

  const closeProductList = () => {
    setSelectedProducts(null);
  };

  const openJoinAuctionModal = (auction) => {
    setSelectedAuction(auction);
    setShowJoinModal(true);
    setSecretToken(
      Array.from(window.crypto.getRandomValues(new Uint8Array(4)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    );
  };

  const closeJoinAuctionModal = () => {
    setShowJoinModal(false);
  };

  return (
    <div className="auction-wrapper">
      <div className="auction-container py-5">
        <div className="container-fluid px-4" style={{ maxWidth: "1200px" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-light">Available Auctions</h2>
            <button className="btn btn-light" onClick={() => setShowModal(true)}>
              <i className="bi bi-list-ul me-2"></i>
              View All Auctions
            </button>
          </div>

          <div className="search-container mb-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search auctions by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="row justify-content-center">
            {filteredAuctions.map((auction, index) => (
              <div key={index} className="col-12 col-lg-8 mb-4">
                <div className="card border-0 shadow-lg auction-card">
                  {/* Show image if available */}
                  {auction.imageUrl && (
                    <img
                      src={`http://localhost:5004/uploads/${auction.imageUrl}`}
                      alt={auction.name}
                      className="card-img-top"
                      style={{ maxHeight: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                    />
                  )}
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="card-title text-primary mb-0">{auction.name}</h4>
                      <span className="badge bg-success">{auction.status || 'Active'}</span>
                    </div>
                    <div className="card-text">
                      {/* Description field */}
                      {auction.description && (
                        <div className="mb-2">
                          <strong>Description:</strong>
                          <div>{auction.description}</div>
                        </div>
                      )}
                      <div className="info-row py-2 border-bottom">
                        <i className="bi bi-clock-fill text-warning me-2"></i>
                        <span className="text-muted">Timing:</span>
                        <span className="ms-auto fw-bold">{auction.timing}</span>
                      </div>
                      <div className="info-row py-2 border-bottom">
                        <i className="bi bi-cash-stack text-success me-2"></i>
                        <span className="text-muted">Entry Amount:</span>
                        <span className="ms-auto fw-bold">₹{auction.entryAmount}</span>
                      </div>
                      <div className="info-row py-2 border-bottom">
                        <i className="bi bi-calendar-event text-info me-2"></i>
                        <span className="text-muted">Start Date:</span>
                        <span className="ms-auto fw-bold">{formatDate(auction.startDate)}</span>
                      </div>
                      <div className="info-row py-2">
                        <i className="bi bi-people-fill text-danger me-2"></i>
                        <span className="text-muted">Participants:</span>
                        <span className="ms-auto fw-bold">{auction.participants}</span>
                      </div>
                      <div className="info-row py-2">
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => openProductList(auction.productList)}
                        >
                          <i className="bi bi-box-seam me-2"></i>
                          View Products
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent p-4 d-flex justify-content-end">
                    <button
                      className="btn btn-success"
                      onClick={() => openJoinAuctionModal(auction)}
                    >
                      Join Auction
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product List Modal */}
          {selectedProducts && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Product List</h5>
                    <button type="button" className="btn-close" onClick={closeProductList}></button>
                  </div>
                  <div className="modal-body">
                    <div className="product-list">
                      {selectedProducts.split(',').map((product, index) => (
                        <div key={index} className="product-item p-2 border-bottom">
                          <i className="bi bi-check2-circle text-success me-2"></i>
                          {product.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showJoinModal && selectedAuction && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Join Auction</h5>
                    <button className="btn-close" onClick={closeJoinAuctionModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-2">
                      <label>Secret Token:</label>
                      <input type="text" className="form-control" value={secretToken} readOnly name="secretToken" />
                    </div>
                    <form action="http://localhost:5004/joinauction/join/joinAuction" method="POST">
                      <input type="hidden" name="secretToken" value={secretToken} />
                      <input type="hidden" name="auctionName" value={selectedAuction.name} />
                      <input type="hidden" name="auctionId" value={selectedAuction._id} />
                      <input type="hidden" name="auctionDescription" value={selectedAuction.description} />
                      <div className="form-group mb-2">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="participantName" required />
                      </div>
                      <div className="form-group mb-2">
                        <label>Place:</label>
                        <input type="text" className="form-control" name="place" required />
                      </div>
                      <div className="form-group mb-2">
                        <label>Phone No:</label>
                        <input type="tel" className="form-control" name="phoneNo" required />
                      </div>
                      <div className="form-group mb-2">
                        <label>Do you agree to pay processing fee later?</label>
                        <select name="agreement" required>
                          <option value="">-- Select --</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Join</button>
                        <button type="button" className="btn btn-secondary" onClick={closeJoinAuctionModal}>Close</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .auction-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          background-attachment: fixed;
          background-size: cover;
        }
        .auction-container {
          width: 100%;
          padding: 2rem 0;
        }
        .container-fluid {
          margin: 0 auto;
          padding: 0 15px;
        }
        .auction-card {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .auction-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        }
        .info-row {
          display: flex;
          align-items: center;
        }
        .btn-primary {
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .modal {
          background: rgba(0, 0, 0, 0.5);
        }
        .table th {
          background: #f8f9fa;
        }
        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .input-group {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .input-group-text, .form-control {
          border: none;
          padding: 15px;
        }
        .form-control:focus {
          box-shadow: none;
        }
        .product-list {
          max-height: 300px;
          overflow-y: auto;
        }
        .product-item {
          transition: background-color 0.2s;
        }
        .product-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default AuctionList;
