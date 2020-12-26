import React from "react";
import addIcon from "../../assets/icons/add-24px.svg";
import "./home.scss";
import AddressBookService from "../../services/addressbook-service";
import Display from "../display/display";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressBookArray: [],
      AllPersonsArray: [],
    };
    this.addressBookService = new AddressBookService();
  }
  
  componentDidMount() {
    this.getAllPerson();
  }

  getAllPerson = () => {
    this.addressBookService
      .getAllPersons()
      .then((response) => {
        console.log("Contact ", response.data.data);
        this.setState({
          addressBookArray: response.data.data,
          AllPersonsArray: response.data.data,
        });
      })
      .catch((err) => {
        console.log("There is an error ", err);
      });
  };
 

  render() {
    return (
      <div>
        <header className='header row center'>
                <div className="logo">
                    <img src={logo} alt="" width="30px" />
                    <div>
                        <span className="emp-text">ADDRESS</span> <br />
                        <span className="emp-text emp-payroll">BOOK</span>
                    </div>
                </div>
            </header>
        <div className="column content">
        <div className="emp-detail">
            <div className="detail-text">
              Person Details <div className="count"></div>
            </div>
              
              <Link to="person-form" className="add-button flex-row-center" >
                <img src={addIcon} alt="" /> Add Person
              </Link>
              </div>
            
              
          <div className="table-main">
            <Display
              addressBookArray={this.state.addressBookArray}
              getAllEmployee={this.getAllEmployee}
            />
          </div>
        </div>
      </div>
    );
  }
} 