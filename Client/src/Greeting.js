import React from 'react';


function Greeting(props){
        let monthName;
        if(props.month === 1){
                monthName = "January";
        } else if (props.month === 2){
                monthName = "February";
        }else if (props.month === 3){
                monthName = "March";
        }else if (props.month === 4){
                monthName = "April";
        }else if (props.month === 5){
                monthName = "May";
        }else if (props.month === 6){
                monthName = "June";
        }else if (props.month === 7){
                monthName = "July";
        }else if (props.month === 8){
                monthName = "August";
        }else if (props.month === 9){
                monthName = "September";
        }else if (props.month === 10){
                monthName = "October";
        }else if (props.month === 11){
                monthName = "November";
        }else if (props.month === 12){
                monthName = "December";
        }
        return (
        <h1 id="message">Hello {props.name} {props.surname} from {props.country}. On {props.day} of {monthName} you will have {props.age}</h1>
        );

}

export default Greeting;