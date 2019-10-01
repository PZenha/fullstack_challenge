import React from 'react';
import './styles/style.css';

class MyForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        surname: '',
        country: '',
        birthday: ''
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  } 
  
  handleSubmit(event){
    event.preventDefault();
  
    const user = {
      name: this.state.name,
    };
  }
  
    render(){
      return(
        //<form onSubmit={this.handleSubmit}>
        <view>
        <div className="container">
          <div className="maindiv">
            <form onSubmit={this.handleSubmit}>
              <div className="col-lft">
              <label for="fname">Name:</label> </div>
              <div className="col-rght">
              <input id="fname" type='text' name="name" onChange={this.handleChange} /><p></p> </div>
              <div className="col-lft">
              <label for="sname">Surname:</label> </div>
              <div className="col-rght">
              <input id="sname" type='text' name="surname" onChange={this.handleChange}/><p></p> </div>
              <div className="col-lft">
              <label for="countries">Countries:</label> </div>
              <div className="col-rght">
                <div className="custom-select">
              <select id="countries" name="country" onChange={this.handleChange}>
                <option name="Spain">Spain</option>
                <option name="Germany">Germany</option>
                </select></div><p></p></div>
                <div className="col-lft">
              <label for="birthd">Birthday:</label> </div>
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
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Birthday</th>
              </tr>
              <tr>
                <td>Pedro Zenha</td>
                <td>Portugal</td>
                <td>11/12/1996</td>
              </tr>
              <tr>
                <td>Inês Mota</td>
                <td>Mexedo</td>
                <td>19/03/1997</td>
              </tr>
            </table>
          </div>
  
  
        </div>
      </view>
      );
    }
  }
  
  export default MyForm;

