import axios from "axios";
import configAPI from "./config.js";

export default async function getBtcPairsWithCoinbase() {
    const URL = `https://rest-sandbox.coinapi.io/v1/symbols`
    const headers = {
        'X-CoinAPI-Key': configAPI.API_KEY
    }
    const params = {
        filter_exchange_id: 'COINBASE',
        filter_symbol_id: 'BTC'
    }
    try{
        const res = await axios.get(URL, {params, headers})
        return res.data
    } catch (e) {
        console.log(e)
    }
}
