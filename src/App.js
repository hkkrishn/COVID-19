
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
import {FormControl,Select,MenuItem} from '@material-ui/core';

const App=()=> {
  //react hook to set state
  const [countries,setCountries] = useState([])

  //preserve current selected country in state
  const [country, setCountry] = useState("Worldwide")

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

        setCountries(countries);
      })
    }
    getCountriesData();
  },[])

  //async function to gather info for selection

  const onCountryChange = async (e)=>{
    const countryCode = e.target.value;
    setCountry(countryCode)

  }

  return (
    <div className="app">
    <div className = "app_header">
    <h1>COVID-19 Tracker</h1>
      <FormControl className = "app_dropdown">
          <Select
          variant = "outlined"
          value = {country}
          onChange = {onCountryChange}

          >
          <MenuItem  value = "Worldwide">Worldwide</MenuItem>
          {countries.map((country)=>{
            return(<MenuItem key = {Math.random()*1000} value = {country.value}>{country.name}</MenuItem>)
          })}

          </Select>
      </FormControl>

    </div>
    <div class="app_stats">

    </div>

    </div>
  );
}

export default App;
