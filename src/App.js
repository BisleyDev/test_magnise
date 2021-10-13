import React, {useState} from 'react'
import './App.css'
import Chart from "./components/Chart/Chart";
import SelectPair from "./components/SelectPair/SelectPair";
import CurrentPairData from "./components/CurrentPairData/CurrentPairData";

function App() {
  const [pair, setPair] = useState('BTC/USD')

  return (
    <>
      <SelectPair getSelectPair={setPair}/>
      <CurrentPairData pair={pair}/>
      <Chart pair={pair}/>
    </>
  );
}

export default App;
