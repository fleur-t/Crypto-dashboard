import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Coins from './Coins'
import CoinDetails from './CoinDetail'
import MarketShare from './MarketShare'
import Header from './header'
import Footer from './footer'

// useParams();

function App() {

  const [coins, setCoins] = useState([])


  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
    .then(httpResponse => httpResponse.json())
    .then(jsonResponse => {
      setCoins(jsonResponse.Data.LIST);      
    })
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Coins />}/>
          <Route path={"coins/:id"} element={<CoinDetails />}/>
          <Route path={"/market-share"} element={<MarketShare />} />  
        </Routes>
      </main>
      <Footer />
    </>

  )
}
export default App