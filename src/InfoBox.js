//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Info Box component to display covid data.

import React from 'react'
import { CardContent,Card,Typography } from '@material-ui/core'

const InfoBox= ({title,cases,total})=> {
  return (
    <Card className = "infoBox">
        <CardContent>
        <Typography className = "infoBox_title" color = "textSecondary">{title}</Typography>
        <h2 className = "infoBox_cases">{cases}</h2>
        <Typography className = "infoBox_total" color = "textSecondary">{total} Total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox

