import axios from 'axios';
import {headers} from "./config";

export default async function getPriceForPeriod(pair, period = '1DAY') {
	if (!pair) return;
	const URL = `https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_${pair}/latest?period_id=${period}`;

	try {
		const res = await axios.get(URL, { headers });
		return res.data;
	} catch (e) {
		console.log(e);
	}
}
