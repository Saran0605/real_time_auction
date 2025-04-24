
import './App.css'
import AuctionRoom from './components/AuctionRoom'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auction" element={<AuctionRoom/>}/>
      </Routes>
    </Router>
  )
}

export default App
