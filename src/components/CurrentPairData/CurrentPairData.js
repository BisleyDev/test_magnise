import React, { useEffect, useState } from 'react';
import {configAPI} from '../../api/config.js';
import moment from 'moment/moment';
import getLastPricePair from '../../api/getLastPricePair';

const initialState = {
	pair: '',
	price: '',
	date: '',
};

const CurrentPairData = ({ pair }) => {
	const [currentData, setCurrentData] = useState(initialState);
	useEffect(() => {
		const lastPrise = async () => {
			try {
				const res = await getLastPricePair(pair.replace('/', '_'));
				const lastTrade = res[0].last_trade;
				setCurrentData((prev) => ({
					pair,
					price: lastTrade.price,
					date: moment(lastTrade.time_exchange).format('lll'),
				}));
			} catch (e) {
				console.log(e);
			}
		};
		lastPrise();

		const ws = new WebSocket('wss://ws.coinapi.io/v1/');
		const paramsCall = {
			type: 'hello',
			apikey: configAPI.API_KEY,
			heartbeat: false,
			subscribe_data_type: ['trade'],
			subscribe_filter_symbol_id: [`BINANCE_SPOT_${pair.replace('/', '_')}`],
		};
		ws.onopen = () => {
			ws.send(JSON.stringify(paramsCall));
		};

		ws.onmessage = function (event) {
			const json = JSON.parse(event.data);
			try {
				if ((json.event = 'trade' && json.price)) {
					setCurrentData((prev) => ({
						pair,
						price: json.price,
						date: moment(json.time_exchange).format('lll'),
					}));
				}
			} catch (err) {
				console.log(err);
			}
		};
		return () => {
			ws.close();
		};
	}, [pair]);
	return (
		<ul>
			<li>
				<span>Symbol: </span>
				<span>{currentData.pair}</span>
			</li>
			<li>
				<span>Price: </span>
				<span>{currentData.price}</span>
			</li>
			<li>
				<span>Time: </span>
				<span>{currentData.date}</span>
			</li>
		</ul>
	);
};

export default CurrentPairData;
