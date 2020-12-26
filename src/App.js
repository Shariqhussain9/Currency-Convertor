import React, { useEffect, useState } from 'react';
import Comp from './component/Comp';
import './App.css'
const BASE_URL = 'https://api.exchangeratesapi.io/latest';
const App = () => {
  const [Selectedoption, SetSelectedoption] = useState([]);
  const [fromCurrency, SetfromCurrency] = useState("EUR");
  const [toCurrency, SettoCurrency] = useState("CAD");
  const [Amount, SetAmount] = useState("1");
  const [exchangeRate, SetExchangeRate] = useState();
  const [Infrom, SetInfrom] = useState(true);

  let toAmount, fromAmount;
  if (Infrom) {
    fromAmount = Amount;
    toAmount = Amount * exchangeRate;
  }
  else {
    toAmount = Amount;
    fromAmount = Amount / exchangeRate;
  }


  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        SetSelectedoption([data.base, ...Object.keys(data.rates)])
        SetfromCurrency(data.base);
        SettoCurrency(Object.keys(data.rates)[0]);
        SetExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbol=${toCurrency}`)
      .then(res => res.json())
      .then(data => SetExchangeRate(data.rates[toCurrency]))
  }, [fromCurrency, toCurrency])

  return (
    <div align="center" className="body">
      <h1>Convert!!!</h1>
      <Comp option={Selectedoption} Currency={fromCurrency} onChangeCurrency={e => SetfromCurrency(e.target.value)}
        Amount={fromAmount}
        onChangeAmount={e => {
          SetAmount(e.target.value)
          SetInfrom(true)
        }} />
      <div className="equals"><h3>=</h3></div>
      <Comp option={Selectedoption} Currency={toCurrency} onChangeCurrency={e => SettoCurrency(e.target.value)}
        Amount={toAmount}
        onChangeAmount={e => {
          SetAmount(e.target.value)
          SetInfrom(false)
        }
        }

      />
    </div>
  )
}

export default App
