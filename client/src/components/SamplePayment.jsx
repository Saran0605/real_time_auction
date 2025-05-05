import React from 'react';

function SamplePayment() {
    // Helper to dynamically load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert('Failed to load Razorpay SDK. Please check your internet connection.');
            return;
        }

        // Demo data, replace with your actual form data as needed
        const participantName = "Test User";
        const place = "Test Place";
        const phoneNo = "9999999999";
        const secretToken = Math.random().toString(36).substr(2, 10);

        // IMPORTANT: Replace with your actual Razorpay Key ID
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID', // <-- Replace this with your real key!
            amount: 10000, // ₹100 in paisa
            currency: 'INR',
            name: 'Auction Entry Fee',
            description: 'Join auction and get secret token',
            handler: function (response) {
                // You can send these details to your backend for verification and further processing
                alert(
                    `Payment successful!\nPayment ID: ${response.razorpay_payment_id}\nSecret Token: ${secretToken}`
                );
                // Example: send to backend
                /*
                fetch('http://localhost:5004/auction/joinAuction', {
                    method: 'POST',
                    body: JSON.stringify({
                        participantName,
                        place,
                        phoneNo,
                        secretToken,
                        razorpay_payment_id: response.razorpay_payment_id
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    // handle response
                });
                */
            },
            prefill: {
                name: participantName,
                contact: phoneNo
            },
            theme: {
                color: '#0d6efd'
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <h2>Sample Payment Module</h2>
            <button className="btn btn-primary" onClick={handlePayment}>
                Pay ₹100 & Join Auction
            </button>
        </div>
    );
}

export default SamplePayment;
