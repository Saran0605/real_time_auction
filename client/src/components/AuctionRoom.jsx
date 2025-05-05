function AuctionRoom(){

    return(
        <div className="auctionRoom">
            <h1>Welcome to Auction Room!</h1>

            <a href="http://localhost:5004/auction/addAuctionForm"> go to backend</a> 

            <form action="http://localhost:5004/auction/newForm" method="POST">
                <input type="text" name="user" value="ragul"/>
                <input type="submit" />
            </form>
        </div>
    )

}
export default AuctionRoom;