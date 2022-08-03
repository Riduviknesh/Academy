import { useState, useEffect } from "react";
import { Layout } from './Layout';
import { IoIosAddCircle } from "react-icons/io";
import axios from "../Admin/Config/axios";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";


function ViewAcademyCourses() {
    let users = localStorage.getItem("userInformation");
    let navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [courseName, setcourseName] = useState("");
    const params = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${courseName}`)
        setcourseName("")
    }

    const getDetails = () => {
        axios.get(`/admin/getCourseByInstituteName/${params.state.instituteId}`).then(
            (response) => {
                setCourse(response.data);
                console.log(response.data)
            }
        );
    };
    useEffect(() => {
        getDetails();
    }, []);

    const viewCourseByName = (courseName) => {
        axios.get(`/admin/viewCourseByName/${courseName}`).then(
            (res) => {
                setCourse([]);
                setCourse([res.data]);
                console.log(res.data);

            }
        )
    }
    const enrollCourse = (courseId, duration) => {
        let d = new Date();
        let date = d.getDate();
        let month = ("0" + (d.getMonth() + 1)).slice(-2);
        let year = d.getFullYear();
        let joinedDate = date + "/" + month + "/" + year;

        let joinDate = new Date();
        let d2 = new Date();
        d2.setMonth(joinDate.getMonth() + duration);
        d2.setDate(joinDate.getDate());
        let date2 = d2.getDate();
        let month2 = ("0" + (d2.getMonth() + 1)).slice(-2);
        let year2 = d2.getFullYear();
        let endDate = date2 + "/" + month2 + "/" + year2;
        axios.get(`/admin/checkStudentMailId/${users}`).then(
            (res) => {
                console.log("1")
                if (!res.data) {
                    toast.warn("Add your personal details !");
                    navigate('/user/enrollForm');
                } else {
                    console.log(users, "      ",courseId) 
                    axios.get("/admin/checkAdmission/" + users + "/" +courseId).then((resource) => {
                        console.log(resource.data)
                        if (!resource.data) {
                            var enrollCourse = {
                                enrolledCourses: [
                                    {
                                        course: {
                                            courseId: courseId
                                        },
                                        joinedDate: joinedDate,
                                        endDate: endDate,
                                    },
                                ],
                            };
                            axios.put("/admin/addAdmission/" +users,enrollCourse).then((reso) => {
                                toast("New course enrolled sucessfully");
                                navigate("/user/enrolledCourse");
                            });
                        } else {
                            toast.warn("You have already enrolled this course!")
                        }

                    });
                }
            }
        )
    }

    return (
        <div >
            <Layout />
            <form className="mb-3 p-5" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <div className="row" >
                        <div className="col-10">
                            <Form.Control type="text"
                                value={courseName}
                                placeholder="Type here to search course"
                                onChange={(e) => setcourseName(e.target.value)}
                            /><br />
                        </div >
                        <div className="col-2">
                            <Button variant="success" type="submit" onClick={() => viewCourseByName(courseName)}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <Container style={{ width: '60%' }}>
                {
                    course?.map((course) => (

                        <tr key={course.id}>
                            <Row style={{ border: '1px solid black', backgroundColor: '#D3D3D3' }}>
                                <Row >
                                    <   Col>
                                        Course Id : {course.courseId}<br />
                                    </Col>
                                    <Col>
                                        Number of students :  {course.noOfStudents}<br />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Course name : {course.courseName} <br />
                                    </Col>
                                    <Col>
                                        Course description :  {course.courseDescription}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Course duration : {course.courseDuration}<br />
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        Course available timings :  {course.courseTiming}<br />
                                    </Col>
                                </Row>
                                <div >
                                    <Row className='float-end'>
                                        <Col>

                                            <button className="btn btn-success"
                                                onClick={() => enrollCourse(course.courseId, course.courseDuration)}>
                                                Enroll Course</button>

                                        </Col>
                                    </Row>
                                </div>

                            </Row><br></br>
                        </tr>
                    ))
                }
            </Container>
            <div className="float-end">
                <a href="/admin/addCourse" className="btn btn-success">
                    <IoIosAddCircle />Add Course</a>
            </div>
        </div>
    )
}


export default ViewAcademyCourses;



