    // import { useEffect, useState } from 'react'
    // import { useSearchParams } from 'react-router-dom';
    // import './App.css'

    // function CoinDetails() {

    // const [coin, setCoins] = useState([]);
    // const [searchParam] = useSearchParams();
    // const id = searchParam.get('URI') || '';

    // useEffect(() => {
    //     fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100" + id)
    //     .then(httpResponse => httpResponse.json())
    //     .then(jsonResponse => {
    //     setCoins(jsonResponse.Data.LIST);      
    //     })
    // }, []);


    //     return(

    //         <div className='allDetails'>
    //             {coin?.map(coin => {
    //                 return (
    //             <div className='coinDetails'>
    //                 <h1 className='name'>{coin.NAME}</h1>
    //                 <h4 className='symbol'>Symbool: {coin.SYMBOL}</h4>
    //                 <h4 className='price'>Prijs: ${Number(coin.PRICE_USD).toFixed(2)}</h4>
    //                 <h4 className='marketCap'>Market Cap: ${Number(coin.TOTAL_MKT_CAP_USD).toFixed(2)}</h4>
    //                 <h4 className='volume'>Volume: ${Number(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toFixed(2)}</h4>
    //                 <h4 className='supply'>Circulating Supply: {Number(coin.SUPPLY_CIRCULATING).toFixed(2)}</h4>
    //             </div>
    //                 )
    //             })
    //         }</div>
    // )}

    // export default CoinDetails

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function CoinDetails() {
    const [coin, setCoin] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
        .then(httpResponse => httpResponse.json())
        .then(jsonResponse => {
            const allCoins = jsonResponse.Data.LIST;
            const selectedCoin = allCoins.find(
            c => c.NAME.toLowerCase() === id.toLowerCase()
            );
            setCoin(selectedCoin);
        });
    }, [id]);

if (!coin) return <p>Loading or coin not found...</p>;

return (
    <div className='allDetails'>
        <div className='coinDetails'>
            <h1 className='name'>{coin.NAME}</h1>
            <h4 className='symbol'>Symbool: {coin.SYMBOL}</h4>
            <h4 className='price'>Prijs: ${Number(coin.PRICE_USD).toFixed(2)}</h4>
            <h4>{Number(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(5)} %</h4>
            <h4 className='marketCap'>Market Cap: ${Number(coin.TOTAL_MKT_CAP_USD).toFixed(2)}</h4>
            <h4 className='volume'>Volume: ${Number(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toFixed(2)}</h4>
            <h4 className='supply'>Circulating Supply: {Number(coin.SUPPLY_CIRCULATING).toFixed(2)}</h4>
        </div>
    </div>
);
}

export default CoinDetails;

