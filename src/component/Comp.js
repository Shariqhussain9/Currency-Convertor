import React from 'react'
const Comp = (props) => {
    const { option, Currency, onChangeCurrency, Amount, onChangeAmount } = props
    return (

        <div align="center" >

            <input type="number" className="input" value={Amount} onChange={onChangeAmount} />

            <select value={Currency} className="select" onChange={onChangeCurrency}>
                {option.map(opt => (

                    <option key={opt}>{opt}</option>

                ))}
            </select>


        </div>
    )
}

export default Comp