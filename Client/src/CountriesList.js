import React from 'react';

function PrintCountries(props){
    return(
        props.country.map(function(item,i){
           return <option key={i} value={item} name={item}> {item} </option>
        })  
    )
}

export default PrintCountries;