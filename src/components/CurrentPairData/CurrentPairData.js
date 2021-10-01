import React, {useEffect, useState} from 'react';
import configAPI from "../../api/config.js";

const initialState = {
    pair: '', price: '', date: ''
}

const CurrentPairData = ({pair}) => {
    const [currentData, setCurrentData] = useState(initialState)

    useEffect(() => {
        const ws = new WebSocket('wss://ws-sandbox.coinapi.io/v1/')
        const paramsCall = {
            "type": "hello",
            "apikey": configAPI.API_KEY,
            "heartbeat": false,
            "subscribe_data_type": ["quote"],
            "subscribe_filter_symbol_id": [`COINBASE_SPOT_${pair.replace('/', '_')}`]
        }
        ws.onopen = () => {
            ws.send(JSON.stringify(paramsCall))
        }

        ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                if ((json.event = "data")) {
                    setCurrentData({
                        pair,
                        price: json.data.ask_price,
                        date: json.date.time_exchange
                    })
                }
            } catch (err) {
                console.log(err);
            }
        };
    }, [pair])

    return (
        <ul>
            <li>
                <span>Symbol:</span>
                <span>{currentData.pair}</span>
            </li>
            <li>
                <span>Price:</span>
                <span>{currentData.price}</span>
            </li>
            <li>
                <span>Time:</span>
                <span>{currentData.date}</span>
            </li>
        </ul>
    );
};

export default CurrentPairData;