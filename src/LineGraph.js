//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Component that displays graph.

// endppint to gather all data : "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

import React from 'react'
import {useState,useEffect} from 'react'
import numeral from 'numeral'
import {Line} from 'react-chartjs-2'
//utility function to make data in chart.js format
const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    console.log(data)
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const LineGraph=({casesType})=> {

    const [data,setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
          await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let chartData = buildChartData(data, 'cases');
              setData(chartData);
              console.log(chartData);
              // buildChart(chartData);
            });
        };

        fetchData();
      }, []);


    //utility function to arrange data in format for chart.js









    return (
        <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
    )
}

export default LineGraph
