    import { Link } from 'react-router-dom';
    import './App.css';
    import { useEffect, useState } from 'react';

    function Coins() {
    const [coins, setCoins] = useState([]);
    const [favoCoins, setFavoCoins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    function addFavo(coinName) {
        if (!favoCoins.includes(coinName)) {
        setFavoCoins([...favoCoins, coinName]);
        }
    }

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
        .then(res => res.json())
        .then(data => {
            setCoins(data.Data.LIST);
        });
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
        <h1>Favoriete</h1>

        <div className="favorites">
            {favoCoins.map((coin, index) => (
            <span key={index} className="favorite-badge">{coin}</span>
            ))}
        </div>

        {/* 🔍 Search bar */}
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search for a coin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            />
        </div>

        <div className='allCoins'>
            {filteredCoins.map(coin => (
            <Link to={`/coins/${coin.NAME}`} key={coin.ID} className='coin'>
                <div className='coin'>
                <button
                    onClick={(e) => {
                    e.preventDefault();
                    addFavo(coin.NAME);
                    }}
                    className='favorite-btn'
                >
                    <img
                    src={favoCoins.includes(coin.NAME) ? "/star-solid.svg" : "/star-regular.svg"}
                    alt="star"
                    className="favorite-star"
                    />
                </button>
                <h1 className='name'>{coin.NAME}</h1>
                <h4 className='symbol'>Symbool: {coin.SYMBOL}</h4>
                <h4>{Number(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%</h4>
                <h4 className='price'>Prijs: ${Number(coin.PRICE_USD).toFixed(2)}</h4>
                </div>
            </Link>
            ))}
        </div>
        </div>
    );
    }

    export default Coins;
