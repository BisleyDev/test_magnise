import axios from "axios";
import configAPI from "./config.js";

export default async function getPriceForPeriod(pair = 'BTC_USD', period = '1DAY') {
    const URL = `https://rest-sandbox.coinapi.io/v1/ohlcv/COINBASE_SPOT_${pair}/latest?period_id=${period}`
    const headers = {
        'X-CoinAPI-Key': configAPI.API_KEY
    }
    try {
        const res = await axios.get(URL, { headers})
        return res.data
    } catch (e) {
        console.log(e)
    }
}
