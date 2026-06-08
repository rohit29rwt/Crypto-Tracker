import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { fetchChartData, fetchCoinData } from '../api/coinGecko'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const CoinDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [coin, setCoin] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    loadCoinData()
    loadChartData()
  }, [id])

  const loadCoinData = async () =>{
  try{ 
    const data = await fetchCoinData(id)
    setCoin(data)
  }catch(err){
    console.error(" Error Fetching Crypto :", err)
  }finally{
    setIsLoading(false)
  }
  }

    const loadChartData = async () =>{
  try{ 
    const data = await fetchChartData(id);
     const formattedData = data.prices.map((price) => ({
      time: new Date(price[0]).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price:price[1].toFixed(2),
  }))
    setChartData(formattedData);
  }catch(err){
    console.error(" Error Fetching Crypto :", err)
  }finally{
    setIsLoading(false)
  }
  }

  if (isLoading) {
  return (
    <div className="app">
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading coin data...</p>
      </div>
    </div>
  )
}

  if(!coin){
    return<div className='app'>
      <div className="no-results">
        <p>No coin found by that name</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  }

  const isPositive =
  coin.market_data.price_change_percentage_24h >= 0

  return (
  <div className="app">
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1>🔎 Crypto Tracker</h1>
        </div>
        <button onClick={() => navigate("/")} className='back-button'>Back to Crypto list</button>
      </div>
    </header>
    <div className='coin-detail'>
      <div className="coin-header">
        <div className="coin-title">
          <img src={coin.image.large} />
          <div>
            <h1>{coin.name}</h1>
            <p className='symbol'>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <span className='rank'>Rank #{coin.market_data.market_cap_rank}</span>
      </div>

    <div className="coin-price-section">
      <div className="current-price">
        <h2>${(coin.market_data.current_price.usd)}</h2>
        <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>{isPositive ? "↑" : "↓"}{" "}
          {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>
      <div className='price-ranges'>
        <div className='price-range'>
          <span className='range-label'>24h High</span>
          <span className='range-value'> $ {coin.market_data.high_24h.usd}</span>
        </div>
        <div className='price-range'>
          <span className='range-label'>24h Low</span>
          <span className='range-value'> $ {coin.market_data.low_24h.usd}</span>
        </div>
      </div>
    </div>

    <div className='chart-section'>
      <h3>Price chart (last 7 days)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}> 
          <CartesianGrid strokeDasharray="3 3" stroke='rgba(240, 240, 240, 0.97)' />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            domain={["auto", "auto"]}
          />
          <Line dataKey="price" type="monotone" dot={false} stroke='#ADD8E6'/>
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>
  )
}

export default CoinDetail