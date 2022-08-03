import { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import Table from "react-bootstrap/Table";
import { IoIosAddCircle } from "react-icons/io";
import axios from "../Config/axios";
import {BiEdit} from 'react-icons/bi';
import {RiDeleteBin4Fill} from 'react-icons/ri';
import { useNavigate } from "react-router-dom";

function ViewStudent() {
  const [student, setStudent] = useState([]);
  const [Search, setSearch] = useState([]);
  const [Del, setDel] = useState([]);
  const [studentFirstName, setstudentName] = useState("");
  let navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${studentFirstName}`)
    setstudentName("")
}

const viewstudentByFirstName = (studentFirstName) => {
  axios.get(`/admin/viewStudentByName/${studentFirstName}`).then(
      (res) => {
          setStudent([]);
          setStudent([res.data]);
          console.log(res.data);

      }
  )
}
  const getDetails = () => {
    axios.get("/admin/viewStudents").then((response) => {
      setStudent(response.data);
      console.log(response.data);
    });
  };

  const editStudent = (studentId) => {
    navigate(`/admin/updateStudent/${studentId}`);
    console.log(studentId);
  };

  const deleteStudent = (studentId) => {
    axios
      .delete(`/admin/deleteStudent/${studentId}`)
      .then((res) => {
        setDel(res.data);
        console.log(res.data);
        getDetails();
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='mb-1 p-1'>
                        <div className='form-group'> 
                            <form onSubmit={handleSubmit}>
                                <div className="form">
                                    <div className='row'>
                                        <div className='col-10'>
                                            <input type="search"  className="form-control rounded"
                                            placeholder='Type here to search course' value={studentFirstName}
                                            onChange={(e) => setstudentName(e.target.value)}/>
                                        </div>
                                        <div className='col-2'>
                                            <button type="button" class="btn btn-success" onClick={() => viewstudentByFirstName(studentFirstName)}>Search</button>
                                        </div>
                                    </div>       
                                </div>
                            </form>
                        </div>    
                    </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>StudentID</th>
            <th>Student name</th>
            <th>Enrolled Course</th>
            <th>Mobile No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((student) => (
            <>
              <tr key={student.id}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{
                  student.enrolledCourses.map((enCourse, index) => [
                    index > 0 && ", ",
                    <span key={index}>
                      {enCourse.course.courseName}
                    </span>
                  ])}</td>
                <td>{student.phoneNumber1}</td>
                <td>
                  <a onClick={() => editStudent(student.studentId)}>
                    <BiEdit size={30} />
                  </a>
                  <a onClick={() => deleteStudent(student.studentId)}>
                    <RiDeleteBin4Fill size={30} />
                  </a>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      <div className="float-end">
        <a href="/admin/addStudent" className="btn btn-success">
          <IoIosAddCircle />
          Add student
        </a>
      </div>
    </div>
  );
}

export default ViewStudent;