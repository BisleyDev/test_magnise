import React, {useEffect, useState} from 'react'
import './App.css'
import getPriceForPeriod from "./api/getPriceForPeriod.js";
import Chart from "./components/Chart/Chart";
import SelectPair from "./components/SelectPair/SelectPair";
import CurrentPairData from "./components/CurrentPairData/CurrentPairData";
import moment from "moment/moment";

function App() {
  const [pair, setPair] = useState('BTC/USD')
  const [dataHistory, setDataHistory] = useState([])

  useEffect( () => {
    (async () => {
      if(pair) {
        const data = await getPriceForPeriod(pair.replace('/', '_'), '1DAY') || []
        setDataHistory(data.map((item) => ({date: moment(item.time_open).format('L'), prices: item.price_close})).reverse())
      }
    })()
  }, [pair])


  return (
    <>
      <SelectPair getSelectPair={setPair}/>
      <CurrentPairData pair={pair}/>
      <Chart dataHistory={dataHistory}/>
    </>
  );
}

export default App;
