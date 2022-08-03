import { useState, useEffect } from "react";
import { Navbar } from "../Navbar.jsx"
import { Form, Button, Row, Col,Container } from "react-bootstrap";
import axios from "../Config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validate from './Validate';
import {TiArrowBack} from "react-icons/ti";


function EditAcademy() {
    const initialValues = {
        instituteName: "",
        mobile: "",
        instituteId: "",
        instituteimgurl: "",
        email: "",
        instituteAddress: "",
        instituteDescription: "",
    };
    
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    let {instituteId} = useParams()
    let navigate = useNavigate();

    const viewInstituteById = () => {
        axios.get(`/admin/viewInstituteById/`+instituteId).then(
            (res) => {
                setValues(res.data);
                console.log(res.data);

            }
        )
    }
    const back=()=>{
        navigate(`/admin/viewInstitutes`);
    }

    const updateInstitute = (values) => {
        axios.put(`/admin/updateInstitute/`+instituteId,values).then(
            res => {
                console.log(res.data);
                navigate("/admin/viewInstitutes");        
            })
    }

    useEffect(() => {
        viewInstituteById();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault(handleChange);
        const validationErrors = validate(values);
        const noErrors = Object.keys(validationErrors).length === 0;
        setErrors(validationErrors);
        if(noErrors){
            updateInstitute (values);
            toast.success('Academy updated',{position: toast.POSITION.TOP_CENTER,autoClose:1000})
        }
        else{
            console.log(errors);
        }
    }
    return (
        <div>
            <Navbar/>
            <Form className="p-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                value={values.instituteName}
                                placeholder="Enter academy name "
                                name="instituteName" disabled
                                 />
                        </Col>
                        <Col>
                            <Form.Control type="number"
                                value={values.mobile}
                                placeholder="Enter the contact number"
                                name="mobile"
                                onChange={handleChange} />
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
                                onChange={handleChange}
                                 />
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
                                onChange={handleChange} />
                            {errors.instituteimgurl && <p style={{ color: 'red' }}>{errors.instituteimgurl}</p>}
                            <br />
                            <Form.Control type="text"
                                value={values.instituteAddress}
                                placeholder="Enter academy location "
                                name="instituteAddress"
                                onChange={handleChange} />
                            {errors.instituteAddress && <p style={{ color: 'red' }}>{errors.instituteAddress}</p>}
                        </Col>
                        <Col>
                            <Form.Control as="textarea"
                                value={values.instituteDescription}
                                placeholder="Enter the Academy description" rows={4}
                                name="instituteDescription"
                                onChange={handleChange} />
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

                    <Col md={9}></Col>

                    <Col>
                        <Button className="float-end" variant="success" type="submit" >
                          Update Academy
                        </Button>
                        
                    </Col>      
                  </Row>
                </Container>
            </Form>
        </div>
    );
}
export default EditAcademy;
