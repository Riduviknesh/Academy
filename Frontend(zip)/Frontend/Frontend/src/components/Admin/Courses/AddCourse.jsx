import { useState, useEffect } from "react";
import { Navbar } from '../Navbar';
import axios from "../Config/axios";
import { Form, Button, Row, Col,Container } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import validate from './Validate';
import { BiReset } from "react-icons/bi";
import {TiArrowBack} from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import {toast} from 'react-toastify';


function AddCourse() {

    const initialValues = {
      courseId: "",
      courseName: "",
      instituteName: "",
      courseDescription: "",
      courseDuration: "",
      noOfStudents: "",
      courseTiming: "",
    };

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialValues);
    let [institutes, setInstitutes] = useState([]);
    let navigate = useNavigate();

    const loadDataOnlyOnce = () => {
      axios
        .get("/admin/viewInstitutes")
        .then((response) => {
          setInstitutes(response.data);
          console.log(response.data);
        });
    };

    useEffect(() => {
      loadDataOnlyOnce();
    }, []);

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    

    

    const handleSubmit = (event) => {
      const course = {
        courseId: values.courseId,
        courseName: values.courseName,
        institute: {
          instituteName: values.instituteName,
        },
        courseDescription: values.courseDescription,
        courseDuration: values.courseDuration,
        noOfStudents: values.noOfStudents,
        courseTiming: values.courseTiming,
      };

      event.preventDefault();
      const validationErrors = validate(values);
      const noErrors = Object.keys(validationErrors).length === 0;
      setErrors(validationErrors);
      
      if (noErrors) {
        axios
          .post("/admin/addCourse", course)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
          
        setValues({
          ...values,
          courseId: "",
          courseName: "",
          instituteName: "",
          courseDescription: "",
          courseDuration: "",
          noOfStudents: "",
          courseTiming: "",
        });
        console.log("data posted to database");
        toast.success('Course Added',{position: toast.POSITION.TOP_CENTER,autoClose:1000})
        navigate("/admin/viewCourse");

      } else {
        console.log("errors try again", validationErrors);
      }
    };

    const reset = () => {
      setValues({
        ...values,
        courseId: "",
        courseName: "",
        courseDescription: "",
        courseDuration: "",
        noOfStudents: "",
        courseTiming: "",
        instituteName: "",
      });
      setErrors("");
    };

  

    return (
        <div>
            <Navbar />
            <Form className="p-5" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                        <Form.Control placeholder="Enter the Course name " 
                                      type="courseName" name="courseName" 
                                      onChange={onChangeHandler} value={values.courseName} />
                                    {errors.courseName && <p style={{color:'red'}}>{errors.courseName}</p>}    
                        </Col>
                        <Col>
                            <Form.Control type="number"
                                value={values.noOfStudents}
                                placeholder="Enter no.of students enrolled for the course"
                                name="noOfStudents"
                                onChange={onChangeHandler} />
                                {errors.noOfStudents && <p style={{color:'red'}}>{errors.noOfStudents}</p>}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                            <Form.Control type="number"
                                value={values.courseDuration}
                                placeholder="Enter the course duration"
                                name="courseDuration"
                                onChange={onChangeHandler}/>
                                {errors.courseDuration && <p style={{color:'red'}}>{errors.courseDuration}</p>}
                        
                            <Form.Select 
                                id="instituteName"
                                name="instituteName"
                                value={values.instituteName}
                                onChange={onChangeHandler}>

                                <option value="" label="Select Academy" />
                                {institutes.map((institute) => (

                                    <option key={institute.instituteId} value={institute.instituteName}>
                                        {institute.instituteName}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.instituteName && <p style={{color:'red'}}>{errors.instituteName}</p>}
                        </Col>
                        <Col>
                            <Form.Control as="textarea" 
                                value={values.courseDescription}
                                placeholder="Enter the course description" rows={5}
                                name="courseDescription"
                                onChange={onChangeHandler}/>
                                {errors.courseDescription && <p style={{color:'red'}}>{errors.courseDescription}</p>}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                            <Form.Control type="text"
                                value={values.courseTiming} 
                                placeholder="Enter course timings"
                                name="courseTiming"
                                onChange={onChangeHandler}/>
                                {errors.courseTiming && <p style={{color:'red'}}>{errors.courseTiming}</p>}
                            <br />
                            <Form.Control type="text"
                                value={values.courseId}
                                placeholder="Enter course id"
                                name="courseId"
                                onChange={onChangeHandler}/>
                                {errors.courseId && <p style={{color:'red'}}>{errors.courseId}</p>}
                        </Col>

                    </Row>
                </Form.Group>

                <Container>
                  <Row>
                    <Col >
                        <Button className="float-end" variant="light" type="submit" href='/admin/viewCourse'>
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
                          <IoIosAddCircle />Add Course
                        </Button>
                        
                    </Col>      
                  </Row>
                </Container>
            </Form>
        </div>
    )
}

export default AddCourse;