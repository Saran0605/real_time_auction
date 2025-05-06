
import './App.css'
import AuctionGround from './components/AuctionGround'
import AuctionRoom from './components/AuctionRoom'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auction" element={<AuctionRoom/>}/>
        { <Route path="/auctionGround" element={<AuctionGround/>}/> }
      </Routes>
    </Router>
  )
}

export default App
