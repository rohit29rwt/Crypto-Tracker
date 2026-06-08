import React from 'react'
import { fetchCryptos } from '../api/coinGecko'
import { useEffect } from 'react'
import { useState } from 'react'
import CryptoCard from '../components/CryptoCard'

const Home = () => {

  const [cryptoList, setCryptoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() =>{
    fetchCryptoData();
  }, [])

const fetchCryptoData = async () =>{
 try{ 
  const data = await fetchCryptos();
  setCryptoList(data)
}catch(err){
  console.error(" Error Fetching Crypto :", err)
}finally{
  setIsLoading(false)
}
}

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-content'>
          <div className='logo-section'>
          <h1>🔎Crypto Tracker</h1>
          <p>Get cryptocurrency prices and market data</p>
        </div>
        <div className='search-section'>
          <input type="text" placeholder='Search Crypto Here' className='search-input' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        </div>
        </div>
      </header>
      <div className='controls'>
        <div className='view-toggle'>
          <button className={viewMode === 'grid'? "active" : ""} onClick={() => setViewMode('grid')}>Grid</button>
          <button className={viewMode === 'list'? "active" : ""} onClick={() => setViewMode('list')}>List</button>
        </div>
      </div>

      {isLoading ? 
    <div className='loading'>
      <div className='spinner' />
      <p> Loading Crypto Data...</p>
    </div> 
    : 
    <div className={`crypto-container ${viewMode}`}>
      {cryptoList
      .filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    .map((crypto, key) =>(
        <CryptoCard crypto={crypto} key={key} />
      ))}
      </div>}
    </div>
  )
}

export default Home