import axios from 'axios';
import configAPI from './config.js';

export default async function getPriceForPeriod(pair, period = '1DAY') {
	if (!pair) return;
	const URL = `https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_${pair}/latest?period_id=${period}`;
	const headers = {
		'X-CoinAPI-Key': configAPI.API_KEY,
	};
	try {
		const res = await axios.get(URL, { headers });
		return res.data;
	} catch (e) {
		console.log(e);
	}
}
