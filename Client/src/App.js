import React from 'react';
import './styles/style.css';

class MyForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        surname: '',
        country: '',
        birthday: '',
        resMongo: [],
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  } 
  
  handleSubmit(event){
    
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

    fetch('http://localhost:4000/graphql',{
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json();
    })
    .then(resData => {
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
  
    render(){
      return(
        //<form onSubmit={this.handleSubmit}>
        <view>
        <div className="container">
          <div className="maindiv">
            <form onSubmit={this.handleSubmit}>
              <div className="col-lft">
              <label htmlFor="fname">Name:</label> </div>
              <div className="col-rght">
              <input id="fname" type='text' name="name" onChange={this.handleChange} /><p></p> </div>
              <div className="col-lft">
              <label htmlFor="sname">Surname:</label> </div>
              <div className="col-rght">
              <input id="sname" type='text' name="surname" onChange={this.handleChange}/><p></p> </div>
              <div className="col-lft">
              <label htmlFor="countries">Countries:</label> </div>
              <div className="col-rght">
                <div className="custom-select">
              <select id="countries" name="country" onChange={this.handleChange}>
                <option name="Spain">Spain</option>
                <option name="Germany">Germany</option>
                </select></div><p></p></div>
                <div className="col-lft">
              <label htmlFor="birthd">Birthday:</label> </div>
              <div className="col-rght">
              <input id="birthd" type="date" name="birthday" onChange={this.handleChange}/><p></p> </div>
              <div id="buttonpos">
                <button type="submit" id="bsubmit">Save</button>
              </div>
            </form>
            <h1 id="message">Hello {this.state.name} {this.state.surname} from {this.state.country}</h1>
          </div>
  
  
          <div className="tableDiv">
            <table>
              <tbody>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Birthday</th>
              </tr>
              <tr>
                <td></td>
                <td>Portugal</td>
                <td>11/12/1996</td>
              </tr>
              <tr>
                <td>Inês Mota</td>
                <td>Mexedo</td>
                <td>19/03/1997</td>
              </tr>
              </tbody>
            </table>
          </div>
  
  
        </div>
      </view>
      );
    }
  }
  
  export default MyForm;

