import React, { useState, useEffect } from 'react'
import "./AddStudent.css";
import axios from "../Config/axios";
//import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from '../Navbar.jsx';
//import useState from 'react/cjs/react.production.min';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
export function UpdateStudent() {

  let { studentId } = useParams()
  let navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    dob: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber1: "",
    phoneNumber2: "",
    gender: "",
    nationality: "",
  };
  const back = () => {
    navigate(`/admin/ViewStudent`);
  }
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    viewStudentById();
  }, []);
  const viewStudentById = () => {
    axios.get(`/admin/viewStudentById/` + studentId).then(
      (res) => {
        setValues(res.data);
        console.log(res.data);

      }
    )
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault(handleChange);
    axios
      .put(`http://localhost:8080/admin/updateStudent/` + studentId, values)
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
                <input type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="First Name"
                  name="firstName" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName" required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <select value={values.gender}
                  name="gender"
                  onChange={handleChange}
                  className="form-select" aria-label="Default select example" required>
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
                <input type="text"
                  value={values.fatherName}
                  name="fatherName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Father Name"
                  required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="number"
                  value={values.phoneNumber1}
                  name="phoneNumber1"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Phone Number"
                  required />
              </div>
            </div>
            <div className="col-md">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                <input type="number"
                  value={values.phoneNumber2}
                  name="phoneNumber2"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Alternate Phone Number"
                  required />
              </div>
            </div>
          </div>

          <div className='sideform'>
            <div className="new">
              <input type="text"
                value={values.motherName}
                name="motherName"
                onChange={handleChange}
                className="form-control"
                placeholder="Mother Name"
                required />
            </div>
            <div className="new">
              <label htmlFor="exampleInputEmail1" className="form-label"></label>
              <input type="email"
                value={values.email}
                name="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Email ID"
                required />
            </div>
            <div className="new">
              <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
              <DatePicker
                value={values.dob}
                name="dob"
                onChange={handleChange}
                className="form-control" showYearDropdown scrollableMonthYearDropdown >

              </DatePicker>
            </div>
          </div>

          <div className='address'>
            <p id='add'><b>Address Information</b></p>
            <div className="newa">
              <input type="text" value={values.address1}
                name="address2"
                onChange={handleChange}
                className="form-control"
                placeholder="Address Line1"
                required />
            </div>
            <div className="newa">
              <label htmlFor="exampleInputEmail1" className="form-label"></label>
              <input type="text"
                value={values.address2}
                name="address2"
                onChange={handleChange}
                className="form-control"
                placeholder="Address Line2"
                required />
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text"
                    value={values.city}
                    name="city"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="City"
                    required />
                </div>
              </div>
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text"
                    value={values.state}
                    name="state"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="State"
                    required />
                </div>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="number"
                    value={values.pincode}
                    name="pincode"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Pincode"
                    required />
                </div>
              </div>
              <div className="col-md">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"></label>
                  <input type="text"
                    value={values.nationality}
                    name="nationality"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nationality"
                    required />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" value="Submit" className="btn1 btn-primary">UPDATE STUDENT</button>
          <button className="btn1 btn-primary" variant="light" type="submit" onClick={() => back()}>
            <TiArrowBack size={30} />Back
          </button>
        </form>
      </div>
    </div>
  )
}

