import React from "react";
import "./display.scss";
import { withRouter } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete-black-18dp.svg";
import editIcon from "../../assets/icons/create-black-18dp.svg";
import AddressBookService from "../../services/addressbook-service";

const Display = (props) => {
  const addressBookService = new AddressBookService();
  const update = (id) => {
    props.history.push(`person-form/${id}`);
   };
   const remove = (id) => {
    if(window.confirm("Data will be delete permanently! Click Ok to proceed or Cancel.")){
    addressBookService
      .deletePerson(id)
      .then((response) => {
        alert("Data deleted successfully!!");
        window.location.reload();
        console.log("data after delete", response.data.data);
        props.getAllPersons();
      })
    
      .catch((err) => {
        alert("error while deleting the data!");
        console.log("error after delete", err);
      });
    }
    else{
      window.location.reload();
    }
  };
  return (
    <table id="display">
      <tbody>
        <tr key={-1}>
          <th>FullName</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
        {props.addressBookArray &&
          props.addressBookArray.map((element, ind) => (
            <tr key={ind}>
              <td>{element.fullName}</td>
              <td className="">{element.address}</td>
              <td> {element.city}</td>
              <td>{element.state}</td>
              <td>{element.zip}</td>
              <td>{element.phoneNo}</td>
              <td>
                <img
                  onClick={() => remove(element.id)}
                  src={deleteIcon}
                  alt="delete"
                />
                <img
                  onClick={() => update(element.id)}
                  src={editIcon}
                  alt="edit"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default withRouter(Display); 