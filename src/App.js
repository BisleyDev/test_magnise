import React, {useEffect, useState} from 'react'
import './App.css'
import getPriceForPeriod from "./api/getPriceForPeriod.js";
import Chart from "./components/Chart/Chart";
import SelectPair from "./components/SelectPair/SelectPair";

function App() {
  const [pair, setPair] = useState('')
  const [dataHistory, setDataHistory] = useState([])

  useEffect( () => {
    (async () => {
      if(pair) {
        const data = await getPriceForPeriod(pair.replace('/', '_'), '5MIN') || []
        setDataHistory(data.map((item) => ({date: item.time_open.slice(0, 10), prices: item.price_close})).reverse())
      }
    })()
  }, [pair])


  return (
    <>
      <SelectPair getSelectPair={setPair}/>
      <Chart dataHistory={dataHistory}/>
    </>
  );
}

export default App;
