import React from 'react';
import axios from 'axios';
import './styles/style.css';
import Greeting from './Greeting';
import PrintCountries from './CountriesList';

class MyForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        surname: '',
        country: '',
        birthday: '',
        resMongo: [],
        clicked: false,
        countries: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.tableInfo = this.tableInfo.bind(this);
      this.UserAge = this.UserAge.bind(this);
      this.countryReq = this.countryReq.bind(this);
    }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
    this.setState({clicked: false}); //When the user starts to type again this flag resets
  } 
  
  handleSubmit(event){
    this.setState({clicked: true});

    //graphql query
    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {name: "${this.state.name}", surname: "${this.state.surname}", country: "${this.state.country}", birthday: "${this.state.birthday}"}) {
            _id
            name
            surname
            country
            birthday
          }
        }
      `
    };

    //All graphql request are POST request (HTTP protocol)
    fetch('http://localhost:4000/graphql',{
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => { //Returns a promise
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json();
    })
    .then(resData => {    //HERE IS ALL THE DATA RETURNED
      this.setState(previousState => ({
        resMongo: [...previousState.resMongo, resData.data]
      }));
      console.log(this.state.resMongo);
      
    })
    .catch(err => {
      console.log(err);
    });
    event.preventDefault();
  };
  
  //Prints all data returned from the DB in the table
  tableInfo(){
    if(this.state.resMongo.length !== 0){
    return this.state.resMongo.map((info,index) => {
        return (
            <tr key={index}>
                <td>{info.createEvent.name} {info.createEvent.surname}</td>
                <td>{info.createEvent.country}</td>
                <td>{info.createEvent.birthday}</td>
            </tr>
        );
    })
  }
}

//Calculates de User input age in is next birthday
  UserAge(){
      let today = new Date();
      let birthDate = new Date(this.state.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      console.log("birhDate: " + this.state.birthday);
      let m = today.getMonth() - birthDate.getMonth();
      if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;  //Actual Age
      }
      if((today.getMonth() !== birthDate.getMonth()) || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() !== birthDate.getDate())){
        age++; //Age on next birthday
      }
      return age;
  }

  //Get request to the API to get list of countries   
  countryReq(){
    axios.get('http://localhost:4000/countries')  
    .then((res) => {
    this.setState({countries: res.data.countries});
    console.log(this.state.countries);
    })

}

    render(){
      let message; 
      let birthDate = new Date(this.state.birthday);
      if(this.state.clicked){    //State changes if user start to input again
        message = <Greeting clicked={this.state.clicked}  //Store HTML on message
        name={this.state.name} 
        surname={this.state.surname} 
        country={this.state.country} 
        age={this.UserAge()} 
        day={birthDate.getDate()}
        month={birthDate.getMonth() + 1} />;
      }

      return(
        <view>
        <body>
        <div className="container">
          <div className="maindiv">
            <form onSubmit={this.handleSubmit}>
              <div className="col-lft">
              <label htmlFor="fname">Name:</label> </div>
              <div className="col-rght">
              <input id="fname" type='text' name="name" onChange={this.handleChange} required/><p></p> </div>
              <div className="col-lft">
              <label htmlFor="sname">Surname:</label> </div>
              <div className="col-rght">
              <input id="sname" type='text' name="surname" onChange={this.handleChange}/><p></p> </div>
              <div className="col-lft">
              <label htmlFor="countries">Countries:</label> </div>
              <div className="col-rght">
                <div className="custom-select">
              <select id="countries" name="country" onChange={this.handleChange}  onClick={this.countryReq} required>
              <option disabled selected value>-- select an option --</option>
              <PrintCountries country={this.state.countries}/>
                </select></div><p></p></div>
                <div className="col-lft">
              <label htmlFor="birthd">Birthday:</label> </div>
              <div className="col-rght">
              <input id="birthd" type="date" name="birthday" onChange={this.handleChange}/><p></p> </div>
              <div id="buttonpos">
                <button type="submit" id="bsubmit">Save</button>
              </div>
            </form>
            {message}
          </div>
  
  
          <div className="tableDiv">
            <table>
              <tbody>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Birthday</th>
              </tr>
              {this.tableInfo()}
              </tbody>
            </table>
          </div>
        </div>
        <div id="signature">Pedro Zenha</div>
        </body>  
      </view>
      );
    }
  }
  
  export default MyForm;

