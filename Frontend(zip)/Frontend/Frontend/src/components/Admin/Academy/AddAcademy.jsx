import { useState, useEffect } from "react";
import { Navbar } from "../Navbar.jsx"
import { Form, Button, Row, Col ,Container} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import axios from "../Config/axios";
import validate from './Validate';
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import {TiArrowBack} from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";


function AddAcademy() {
    const initialValues = {
        instituteName: "",
        mobile: "",
        instituteimgurl: "",
        email: "",
        instituteAddress: "",
        instituteDescription: "",
    };

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const reg = /^[a-zA-Z ]*$/;
    const handleSubmit = (e) => {
        e.preventDefault(handleChange);
        const validationErrors = validate(values);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if (noErrors) {
            axios.post('/admin/addInstitute', { ...values })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
            setValues({
                ...values,
                instituteName: "",
                mobile: "",
                instituteimgurl: "",
                email: "",
                instituteAddress: "",
                instituteDescription: "",
                buttonText: "Submitted",

            });
            console.log("data posted to database");
            toast.success('Institute Added',{position: toast.POSITION.TOP_CENTER,autoClose:1000})
            navigate("/admin/viewInstitutes");

      } else {
        console.log("errors try again", validationErrors);
      }
    }
    const back = () => {
        navigate(`/admin/viewInstitutes`);
    }

    const reset=()=>{
        setValues({
          ...values,
          instituteName: "",
          mobile: "",
          instituteimgurl: "",
          email: "",
          instituteAddress: "",
          instituteDescription: "",
    
      });
      setErrors('');
    }

    return (
        <div>
            <Navbar />
            <Form className="p-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                value={values.instituteName}
                                placeholder="Enter academy name "
                                name="instituteName"
                                onChange={handleChange} required />
                            {errors.instituteName && <p style={{ color: 'red' }}>{errors.instituteName}</p>}
                        </Col>

                        <Col>
                            <Form.Control type="number"
                                value={values.mobile}
                                placeholder="Enter the contact number"
                                name="mobile"
                                onChange={handleChange} required />
                            {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
                        </Col>

                    </Row>
                </Form.Group>

                <Form.Group className="mb-3 " >
                    <Row>

                        <Col>
                            <Form.Control type="text"
                                value={values.email}
                                placeholder="Enter the academy email"
                                name="email"
                                onChange={handleChange} required />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </Col>

                    </Row>
                </Form.Group>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                            <Form.Control type="text"
                                value={values.instituteimgurl}
                                placeholder="Enter academy image url "
                                name="instituteimgurl"
                                onChange={handleChange} required />
                            {errors.instituteimgurl && <p style={{ color: 'red' }}>{errors.instituteimgurl}</p>}
                            <br />
                            <Form.Control type="text"
                                value={values.instituteAddress}
                                placeholder="Enter academy location "
                                name="instituteAddress"
                                onChange={handleChange} required />
                            {errors.instituteAddress && <p style={{ color: 'red' }}>{errors.instituteAddress}</p>}
                        </Col>
                        <Col>
                            <Form.Control as="textarea"
                                value={values.instituteDescription}
                                placeholder="Enter the Academy description" rows={4}
                                name="instituteDescription"
                                onChange={handleChange} required />
                            {errors.instituteDescription && <p style={{ color: 'red' }}>{errors.instituteDescription}</p>}
                        </Col>

                    </Row>
                </Form.Group>

                <Container>
                  <Row>
                    <Col >
                        <Button className="float-end" variant="light" type="submit" onClick={() => back()}>
                          <TiArrowBack size={30}/>Back
                        </Button>
                    </Col>

                    <Col md={9}>
                        <Button className="float-end" variant="danger" onClick={()=>reset()}>
                          <BiReset size={20}/>Reset
                        </Button>
                    </Col>

                    <Col>
                        <Button className="float-end" variant="success" type="submit" >
                          <IoIosAddCircle />Add Academy
                        </Button>
                        
                    </Col>      
                  </Row>
                </Container>
            </Form>
        </div>

    );
}
axios.create({
    baseURL: "https://localhost:8080",
    headers: {
        "Content-type": "application/json"
    }
});

export default AddAcademy;