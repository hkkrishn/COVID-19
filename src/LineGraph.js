//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Component that displays graph.

// endppint to gather all data : "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

import React from 'react'
import {useState} from 'react'
import {Line} from 'react-chartjs-2'

function LineGraph() {

    const [data,setData] = useState({})


    return (
        <div>
        <Line
        data
        options

        />



        </div>
    )
}

export default LineGraph
