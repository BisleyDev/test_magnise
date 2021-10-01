import React from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const Chart = ({dataHistory}) => {
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