import axios from "axios";
import {headers} from "./config.js";

export default async function getBtcPairsWithBinance() {
    const URL = `https://rest.coinapi.io/v1/symbols`

    const params = {
        filter_exchange_id: 'BINANCE',
        filter_symbol_id: 'BTC'
    }
    try{
        const res = await axios.get(URL, {params, headers})
        return res.data
    } catch (e) {
        console.log(e)
    }
}
