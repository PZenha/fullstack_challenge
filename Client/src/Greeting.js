import React from 'react';

function Greeting(props){
   
        return (
        <h1 id="message">Hello {props.name} {props.surname} from {props.country}</h1>
        );

}

export default Greeting;