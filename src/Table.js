
//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Component that displays table and data delivered via props.


import React from 'react'
import './Table.css'

const Table=({countries})=> {
  return (
    <div className = "table">
    {countries.map(({country,cases})=>{
        return(
            <tr>
                <td>{country}</td>
                <td><strong>{cases}</strong></td>
            </tr>

        )
    })}

    </div>
  )
}

export default Table
