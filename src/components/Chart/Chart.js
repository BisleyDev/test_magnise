import React, {useEffect, useState} from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import getPriceForPeriod from "../../api/getPriceForPeriod";
import moment from "moment/moment";

const Chart = ({pair}) => {
   const [dataHistory, setDataHistory] = useState([])

   useEffect( () => {
      (async () => {
           const data = await getPriceForPeriod(pair.replace('/', '_'), '1DAY') || []
            setDataHistory(data.map((item) => ({date: moment(item.time_open).format('L'), prices: item.price_close})).reverse())
      })()
   }, [pair])
    return (
        <div>
            <LineChart width={1200} height={500} data={dataHistory}
                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="prices" />
                <Tooltip />
                <Line type="monotone" dataKey="prices" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default Chart;