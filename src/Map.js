//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Map component  component to display covid data.


import React from 'react'
import './Map.css'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'

const  Map = ({center,zoom})=> {
  return (
    <div className = "map">
      <LeafletMap center = {center} zoom = {zoom}>
      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  )
}

export default Map
