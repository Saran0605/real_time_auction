
import './App.css'
import AuctionList from './components/AuctionList'
import AuctionRoom from './components/AuctionRoom'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auction" element={<AuctionRoom/>}/>
        {/* <Route path="/auctionList" element={<AuctionList/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
