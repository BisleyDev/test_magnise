import axios from "axios";
import configAPI from "./config.js";

export default async function getLastPricePair(pair = 'BTC_USD') {
	const URL = `https://rest.coinapi.io/v1/symbols?price&filter_symbol_id=BITSTAMP_SPOT_${pair}`
	const headers = {
		'X-CoinAPI-Key': configAPI.API_KEY
	}
	try {
		const res = await axios.get(URL, { headers })
		return res.data
	} catch (e) {
		console.log(e)
	}
}