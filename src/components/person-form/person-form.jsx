import React, { useState, useEffect } from 'react';
import './person-form.scss';
import logo from '../../assets/icons/logo.png'
import cancelIcon from '../../assets/icons/cancel3.png'
import AddressBookService from "../../services/addressbook-service";
import { useParams,  withRouter,} from 'react-router-dom';

const PersonForm = (props) => {
    let initialValue = {
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNo: '',
        isUpdate: false,
        error: {
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNo: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);

  const addressBookService = new AddressBookService();

    const params = useParams();
    useEffect(() => {
        
        if (params.id) {
          getDataById(params.id);
        }
      }, []);

      const getDataById = (id) => {
        addressBookService
          .getPerson(id)
          .then((response) => {
            console.log("data is ", response.data.data);
            let obj = response.data.data;
            setData(obj);
          })
          .catch((err) => {
            console.log("err is ", err);
          });
      };

    const setData = (obj) => {
        setForm({
          ...formValue,
          ...obj,
          id: obj.id,
          isUpdate: true,
        });
      };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
        console.log(event.target.value)
    }


    const handleValidations = async () => {
        let isError = false;
        let error = {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phoneNo: '',
        }
        if (!formValue.fullName.match("^[A-Z]{1}[a-zA-Z\\s]{2,}$")) {
            error.fullName = 'Name is Invalid!!'
            isError = true;
        }
        if (!formValue.city.match("^[A-Z]{1}[a-zA-Z]{2,}")) {
            error.city = 'City is Invalid!!'
            isError = true;
        }
        if (!formValue.state.match("^[A-Z]{1}[a-zA-Z]+")) {
            error.state = 'State is Invalid!!'
            isError = true;
        }
        if (formValue.address.length < 1) {
            error.address = 'Address is Invalid!!'
            isError = true;
        }
        if (!formValue.zip.match("^[1-9]{1}[0-9]{5}")) {
            error.zip = 'Zip Code is Invalid!!'
            isError = true;
        }
        if (!formValue.phoneNo.match("[0-9]{2}[\\s][7-9]{1}[0-9]{9}")) {
            error.phoneNo = 'phoneNo is Invalid!!'
            isError = true;
        }
       
    
        
        await setForm({ ...formValue, error: error })
        return isError;

    }
    const save = async (event) => {
        event.preventDefault();
        if(await handleValidations()){
            console.log("error", formValue);
            return;
        }else{
        let object = {
          fullName: formValue.fullName,
          address: formValue.address,
          city: formValue.city,
          state: formValue.state,
          zip: formValue.zip,
          id: formValue.id,
          phoneNo: formValue.phoneNo
        };
        if (formValue.isUpdate) {
            addressBookService
              .updatePerson(formValue.id,object)
              .then((response) => {
                alert("Contact updated successfully!");
                console.log("contact after update", response.data.data);
                props.history.push("");
              })
              .catch((error) => {
                alert("WARNING!! Error updating the data!");
                console.log("Error after update"+error);
              });
          } else {
            addressBookService
              .addPerson(object)
              .then((data) => {
                  console.log(data)
                  alert("Contact Added successfully!!")
                console.log("Data added");
                props.history.push("");
              })
              .catch((err) => {
                  console.log(err)
                  alert("WARNING!! Error while adding the data!");
                console.log("some error occured while adding");
              });
          }
        };
    }
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });

        console.log(formValue);
    }
    const cancel =() =>{
        props.history.push("");
    }
    return (
        <div className="addressbook-main">
            <header className='header'>
                <div className="logo">
                <img src={logo} alt="" width="40px" />
                    <div>
                        <span className="emp-text">Address</span> <br />
                        <span className="emp-text emp-payroll">Book</span>
                    </div>
                </div>
            </header>
            <div className="content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head ">
                    <span className="form-description">PERSON ADDRESS FORM</span>
                        <img className="cancel-icon" src={cancelIcon} onClick={cancel} alt="" width="3%"/>
                    </div>
                    <div className="column">
                        <label className="label text" htmlFor="fullName">Full Name</label>
                        <input className="input" type="text" id="fullName" name="fullName" value={formValue.fullName} onChange={changeValue} />
                    <error className="error">{formValue.error.fullName}</error>
                    </div>
                    <div className="column">
                        <label className="label text" htmlFor="phoneNo">Phone Number</label>
                        <input className="input" type="text" id="phoneNo" name="phoneNo" value={formValue.phoneNo} onChange={changeValue} />
                        <error className="error">{formValue.error.phoneNo}</error>
                    </div>

                    <div className="column">
                        <label className="label text" htmlFor="address">Address</label>
                        <textarea onChange={changeValue} id="address" value={formValue.address} className="input" name="address" placeholder=""
                            style={{ height: '120%' }}></textarea>
                    <error className="error">{formValue.error.address}</error>
                    </div>
                    <div className="row">
                    <div >
                            <span className="label text">City</span>
                            <select name="city" id="city" className="input" value={formValue.city} onChange={changeValue}>
                            <option value="city">Select City</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Bangalore</option>
                                <option value="Hyderabad">Hyderabad</option>
                            </select>
                            
                        </div>
                        <error className="error">{formValue.error.city}</error>
                        <div >
                            <span className="label text">State</span>
                            <select name="state" id="state" className="input" value={formValue.state} onChange={changeValue}>
                            <option value="state">Select State</option>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Karnatak">Karnataka</option>
                                <option value="Telangna">Telangana</option>
                            </select>
                            
                        </div>
                        <error className="error">{formValue.error.state}</error>
                        <div>
                        <label className="label text" htmlFor="zip">Zip Code</label>
                        <input className="input" type="text" id="zip" name="zip" value={formValue.zip} onChange={changeValue} />
                   
                    </div>
                    <error className="error">{formValue.error.zip}</error>
                    </div>

                    

                        <div className="submit-reset">
                            <button type="submit" className="button add-button" id="button add-button">{formValue.isUpdate ? 'Update' : 'Add'}</button>
                            <button type="button" onClick={reset} className="button reset-button">Reset</button>
                        </div>
                    
                    
                </form >
            </div >
        </div >
    )
}



export default withRouter(PersonForm); 