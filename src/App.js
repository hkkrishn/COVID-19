
//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: This is the main component that holds all the various components.


//The structure of the application is the following

//Components

//Header
//Title  + Selection Input Dropdown
//InfoBoxes
//InfoBoxes
//InfoBoxes
//Table
//Graph
//Map

//employ BEM naming convention for all classes

//api endpoint : https://disease.sh/v3/covid-19/countries

import React,{useState,useEffect} from 'react';
import './App.css';
import numeral from 'numeral'
import {prettyPrintStat} from './util'
import Table from './Table'
import InfoBox from './InfoBox'
import Map from './Map'
import {CardContent,FormControl,Select,MenuItem, Card} from '@material-ui/core';
import {sortData} from './util.js'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'
const App=()=> {
  //react hook to set state
  const [countries,setCountries] = useState([])


  //preserve current selected country in state
  const [country, setCountry] = useState("worldwide")
  const [countryInfo,setCountryInfo] = useState({})
  const [casesType, setCasesType] = useState("cases");

  //intialize center and zoom of map
  const [mapCenter,setCenter] = useState({lat:34.80746,lng:-40.4796})
  const [mapZoom,setZoom] = useState(3)

  //gather all data for countries on the Map
  const [mapCountries, setMapCountries] = useState([])

  //gather all data for the table
  const [tableData,setTableData] = useState([])

//it is possible to have more than one useEffect
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res=>res.json())
    .then((data)=>{
      setCountryInfo(data)
    })
  },[])
  //useEffect runs a piece of code given a certain condition
  useEffect(()=>{
    //The code here will run ONCE when the component loads and not again after
    //However, since we are passing the variable countries it will run once when the
    //app loads and whenever the countries variable changes.

    //aysnc request to diseases.sh
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        const countries = data.map((country)=>(

          {name:country.country,
            value:country.countryInfo.iso2}
        ))
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data)
        setCountries(countries);
      })
    }
    getCountriesData();
  },[])

  //async function to gather info for selection

  const onCountryChange = async (e)=>{
    const countryCode = e.target.value;

     //async code
     const url =countryCode === "worldwide"
     ? "https://disease.sh/v3/covid-19/all"
     : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    console.log(url)
     await fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCountryInfo(data)
      setCountry(countryCode)

      //All data from the country

      //gather center of Map
      if(countryCode === "worldwide"){
        setCenter([34.80746,-40.4796])
        setZoom(3)
      } else{
        setCenter([data.countryInfo.lat, data.countryInfo.long])
        setZoom(4)

      }



    })
    console.log("COUNTRY INFO",countryInfo)
    }



  return (
    <div className="app">
      <div className="app_left">
        <div className = "app_header">
        <h1>Covid-19 Stats</h1>
          <FormControl className = "app_dropdown">
              <Select
              variant = "outlined"
              value = {country}
              onChange = {onCountryChange}
              >
              <MenuItem  value = "worldwide">Worldwide</MenuItem>
              {countries.map((country)=>{
                return(<MenuItem  value = {country.value}>{country.name}</MenuItem>)
              })}
              </Select>
          </FormControl>
        </div>
        <p style = {{marginBottom:"10px"}}>Stay up to date with statistics regarding corona virus deaths,recoveries and cases based by country</p>
        <p style = {{marginBottom:"10px"}}>Harikrishnan®</p>
        <div className="app_stats">
        <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <div className="app_map">
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries = {tableData}/>
          <h3 style = {{marginTop:"20px",marginBottom:"15px"}}>Worldwide new {casesType}</h3>
            <LineGraph className ="app_graph" casesType={casesType} />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
