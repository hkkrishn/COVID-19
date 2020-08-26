
//Author:Harikrishnan Kuppusamykrishnan
//Project: COVID-19 Tracker
//Date: 08/06/2020
//Description: Helper functions

//function to sort the incoming data by case count
export const sortData = (data)=>{
    const sortedData = [...data]
    sortedData.sort((a,b)=>{
        if(a.cases > b.cases){
            return -1
        } else{
            return 1
        }
    })
    return sortedData;
}
