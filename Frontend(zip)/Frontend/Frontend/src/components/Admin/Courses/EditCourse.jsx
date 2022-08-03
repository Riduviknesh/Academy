import {Navbar} from '../Navbar';
import { useState, useEffect } from "react";
import axios from "../Config/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col ,Container } from "react-bootstrap"
import {TiArrowBack} from "react-icons/ti";
import { toast } from 'react-toastify';
import validate from './Validate';

const EditCourse = () => {

    const initialValues = {
        courseId: "",
        courseName: "",
        courseDescription: "",
        courseDuration: "",
        noOfStudents:"",
        courseTiming:"",
        instituteName: ""
       
    };

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(initialValues);
  const [initialinputs, setInitialinputs] = useState(initialValues);
  let { courseId } = useParams();
  let navigate = useNavigate();

  let [institutes, setInstitutes] = useState([]);

  const loadDataOnlyOnce = () => {
    axios.get("/admin/viewInstitutes").then((response) => {
      setInstitutes(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const viewCourseById = () => {
    axios
      .get(`/admin/viewCourseById/` + courseId)
      .then((res) => {
        setInputs(res.data);
        setInitialinputs(res.data);
        console.log(inputs);
      });
  };

  const updateCourse = (inputs) => {
    axios
      .put(`/admin/editCourse/` + courseId, inputs)
      .then((res) => {
        toast.success('Course Updated',{position: toast.POSITION.TOP_CENTER,autoClose:1000})

        console.log(res.data);

        navigate("/admin/viewCourse");
      });
  };

  useEffect(() => {
    viewCourseById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(onChangeHandler);

    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      updateCourse(inputs);
    } else {
      console.log(errors);
    }
  };
  
  const reset = () => {
    setInputs({
      ...inputs,
      courseId: initialinputs.courseId,
      courseName: initialinputs.courseId,
      courseDescription: initialinputs.courseDescription,
      courseDuration: initialinputs.courseDuration,
      noOfStudents: initialinputs.noOfStudents,
      courseTiming: initialinputs.courseTiming,
      instituteName: initialinputs.instituteName,
    });
    setErrors("");
  };

    return (
      <div>
        <Navbar/>
        <Form className="p-5" onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Form.Group className="mb-3 " >
                <Row>
                    <Col>
                        <Form.Control placeholder="Enter the Course name "
                                      type="courseName" name="courseName" 
                                      value={inputs.courseName} disabled />
                                    {/* {errors.courseName && <p style={{color:'red'}}>{errors.courseName}</p>}       */}
                    </Col>
                    <Col>
                        <Form.Control  placeholder="Enter no.of students enrolled for the course"       
                                      type="number" name="noOfStudents" 
                                      onChange={onChangeHandler} value={inputs.noOfStudents} />
                                      {errors.noOfStudents && <p style={{color:'red'}}>{errors.noOfStudents}</p>}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3 " >
                <Row>
                    <Col>
                        <Form.Control placeholder="Enter the course duration"
                                      type="number" name="courseDuration" 
                                      onChange={onChangeHandler}  value={inputs.courseDuration}  />
                                      {errors.courseDuration && <p style={{color:'red'}}>{errors.courseDuration}</p>}

                        <Form.Select 
                                id="instituteName"
                                name="instituteName"
                                value={inputs.instituteName} 
                                >

                                <option value="" label="Select Academy" />
                                {institutes.map((institute) => (

                                    <option key={institute.instituteId} value={institute.instituteName}>
                                        {institute.instituteName}
                                    </option>
                                ))}
                        </Form.Select>
                            {/* {errors.instituteName && <p style={{color:'red'}}>{errors.instituteName}</p>} */}
                    </Col>
                    <Col>
                        <Form.Control as="textarea" placeholder="Enter the course description" rows={4}
                                    type="courseDescription" name="courseDescription" 
                                      onChange={onChangeHandler} value={inputs.courseDescription}  />
                                      {errors.courseDescription && <p style={{color:'red'}}>{errors.courseDescription}</p>}
                                      
                    </Col>
                </Row>
            </Form.Group>
                <Form.Group className="mb-3 " >
                    <Row>
                        <Col>
                             <Form.Control placeholder="Enter course timings"
                                           type="courseTiming" name="courseTiming" 
                                           onChange={onChangeHandler} value={inputs.courseTiming} />
                                           {errors.courseTiming && <p style={{color:'red'}}>{errors.courseTiming}</p>}
                            <br /> 
                            <Form.Control placeholder="Enter course id"
                                          type="courseId" name="courseId" 
                                          value={inputs.courseId} disabled />
                                          {/* {errors.courseId && <p style={{color:'red'}}>{errors.courseId}</p>} */}
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

                    <Col md={9}></Col>

                    <Col>
                        <Button className="float-end" variant="success" type="submit" >
                            Update Course
                        </Button>
                        
                    </Col>      
                  </Row>
                </Container>
                
            </Form>
        </div>
   
  );
};

export default EditCourse;






















