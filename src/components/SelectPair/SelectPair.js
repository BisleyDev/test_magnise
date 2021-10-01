import React, {useEffect, useState} from 'react';
import getBtcPairsWithCoinbase from "../../api/getBtcPairsWithCoinbase";

const SelectPair = ({getSelectPair}) => {
    const [pairs, setPairs] = useState([])
    const [selectedPair, setSelectedPair] = useState('')

    useEffect( () => {
        (async ()=>{
            try{
                const res = await getBtcPairsWithCoinbase()
                const parseData = res.map(item => `${item.asset_id_base}/${item.asset_id_quote}`)
                setPairs(parseData)
                getSelectPair(parseData[0])
            } catch (e) {
                console.log(e)
            }
        })()

    }, [])
    return (
        <>
            <select onChange={event => setSelectedPair(event.target.value)}>
                <option disabled value=''>Select pair</option>
                {pairs.map(pair => (
                    <option key={pair} value={pair}>{pair}</option>
                ))}
            </select>
            <button onClick={event => getSelectPair(selectedPair)}>Subscribe</button>
        </>
    );
};

export default SelectPair;