import axios from 'axios';
import {headers} from './config.js';

export default async function getLastPricePair(pair) {
	if (!pair) return;
	const URL = `https://rest.coinapi.io/v1/quotes/current?filter_symbol_id=BINANCE_SPOT_${pair}`;
	try {
		const res = await axios.get(URL, { headers });
		return res.data;
	} catch (e) {
		console.log(e);
	}
}
