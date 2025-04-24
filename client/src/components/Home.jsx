import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();

    const gotoAuctionRoom = ()=>{
        navigate('/auction');
    }
    return(
        <div className="home">
            <h1>Welcome to home Page!</h1>
            <button onClick={gotoAuctionRoom}>Auction Room</button>
            <button >Add Auction</button>
        </div>
    )
}
export default Home;