import React, { useState } from 'react';
import "./AddStudent.css";
import axios from "../Config/axios";
//import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from '../Navbar.jsx';
//import useState from 'react/cjs/react.production.min';

export function AddStudent() {
  const [firstName, setFirstname] = useState('');
  const [lastName, setlastName] = useState('');
  const [gender, setgender] = useState('');
  const [fatherName, setfatherName] = useState('');
  const [phoneNumber1, setphoneNumber1] = useState('');
  const [phoneNumber2, setphoneNumber2] = useState('');
  const [motherName, setmotherName] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [studentId, setstudentId] = useState('');
  const [courseId, setcourseId] = useState('');
  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [nationality, setnationality] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (phoneNumber1.toString().length !== 10) {
      alert(`Phone number must contains 10 digits.`)
    }
    else if (phoneNumber2.toString().length !== 10) {
      alert(`Phone number must contains 10 digits.`)
    }
    else if (pincode.toString().length !== 6) {
      alert(`Pincode must contains 6 digits.`)
    } else {
      console.log(firstName, `;`, lastName, `;`, gender, `;`, fatherName, `;`, phoneNumber1, `;`, phoneNumber2, `;`, motherName, `;`,
        email, `;`, dob, `;`, studentId, `;`, courseId, `;`, address1, `;`, address2, `;`, city, `;`, state, `;`, pincode, `;`, nationality);
      alert(`Student "${firstName}" added successfully.`)
    }

    const user = {
      firstName: firstName, lastName: lastName, gender: gender, fatherName: fatherName,
      phoneNumber1: phoneNumber1, phoneNumber2: phoneNumber2, motherName: motherName,
      email: email, dob: dob, address1: address1,
      address2: address2, city: city, state: state, pincode: pincode, nationality: nationality
    }
    axios
      .post('http://localhost:8080/admin/addStudent', user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>

      <Navbar />

      <div className='addstudentform'>
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)} className="form-control" placeholder="First Name" id="name" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} className="form-control" placeholder="Last Name" id="name" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <select value={gender} onChange={(e) => setgender(e.target.value)} className="form-select" aria-label="Default select example" required>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="text" value={fatherName} onChange={(e) => setfatherName(e.target.value)} className="form-control" placeholder="Father Name" id="name" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="number" value={phoneNumber1} onChange={(e) => setphoneNumber1(e.target.value)} className="form-control" placeholder="Phone Number" id="name" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="number" value={phoneNumber2} onChange={(e) => setphoneNumber2(e.target.value)} className="form-control" placeholder="Alternate Phone Number" id="name" required />
              </div>
            </div>
          </div>

          <div className='sideform'>
            <div className="new">
              <input type="text" value={motherName} onChange={(e) => setmotherName(e.target.value)} className="form-control" placeholder="Mother Name" id="name" required />
            </div>
            <div className="new">
              <label htmlFor="exampleInputEmail1" className="form-label"></label>
              <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" placeholder="Email ID" id="name" required />
            </div>
            <div className="new">
              <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
              <DatePicker selected={dob} onChange={(e) => setdob(e)} className="form-control" showYearDropdown scrollableMonthYearDropdown ></DatePicker>
            </div>
          </div>


          <div className='address'>
            <p id='add'><b>Address Information</b></p>
            <div className="newa">
              <input type="text" value={address1} onChange={(e) => setaddress1(e.target.value)} className="form-control" placeholder="Address Line1" id="name" required />
            </div>
            <div className="newa">
              <label htmlFor="exampleInputEmail1" className="form-label"></label>
              <input type="text" value={address2} onChange={(e) => setaddress2(e.target.value)} className="form-control" placeholder="Address Line2" id="name" required />
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text" value={city} onChange={(e) => setcity(e.target.value)} className="form-control" placeholder="City" id="name" required />
                </div>
              </div>
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text" value={state} onChange={(e) => setstate(e.target.value)} className="form-control" placeholder="State" id="name" required />
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="number" value={pincode} onChange={(e) => setpincode(e.target.value)} className="form-control" placeholder="Pincode" id="name" required />
                </div>
              </div>
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text" value={nationality} onChange={(e) => setnationality(e.target.value)} className="form-control" placeholder="Nationality" id="name" required />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" value="Submit" className="btn1 btn-primary">ADD STUDENT</button>
        </form>
      </div>
    </div>
  )
}
