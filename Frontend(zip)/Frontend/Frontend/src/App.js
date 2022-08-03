import "./App.css";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddAcademy from "./components/Admin/Academy/AddAcademy";
import ViewAcademy from "./components/Admin/Academy/ViewAcademy";

import ViewCourse from "./components/Admin/Courses/ViewCourse";
import AddCourse from "./components/Admin/Courses/AddCourse";

import  ViewStudent from "./components/Admin/Students/ViewStudent";
import { UpdateStudent } from "./components/Admin/Students/UpdateStudent";
import { AddStudent } from "./components/Admin/Students/AddStudent";
import Viewacademy from "./components/User/Viewacademy";
import Mylearning from "./components/User/Mylearning";
import Payload from "./components/User/Payload";
import EnrolledCourse from "./components/User/EnrolledCourse";
import ViewAcademyCourses from "./components/User/ViewAcademyCourses";
import { EnrollForm } from "./components/User/EnrollForm";
import EditAcademy from "./components/Admin/Academy/EditAcademy";
import EditCourse from "./components/Admin/Courses/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>

        <Route exact path="/admin/addInstitute" element={<AddAcademy />}></Route>
        <Route exact path="/admin/viewInstitutes" element={<ViewAcademy />}></Route>
        <Route exact path="/admin/editInstitute/:instituteId" element={<EditAcademy/>}/>

        <Route exact path="/admin/addCourse" element={<AddCourse />}></Route>
        <Route exact path="/admin/viewCourse" element={<ViewCourse />}></Route>
        <Route exact path="/admin/editCourse/:courseId" element={<EditCourse/>}></Route>

        <Route exact path="/admin/ViewStudent" element={<ViewStudent />}></Route>  
        <Route exact path="/admin/addStudent/" element={<AddStudent />}></Route>
        <Route exact path="/admin/updateStudent/:studentId" element={<UpdateStudent />}></Route>


        {/* USER */}

        <Route exact path="/user/viewacademy" element={<Viewacademy/>}></Route>
        <Route exact path='/user/enrolledCourse' element={<EnrolledCourse/>}></Route>
        <Route exact path='/user/viewacademycourses/:instituteId' element={<ViewAcademyCourses/>}></Route> 
        <Route exact path='/user/enrollForm' element={<EnrollForm/>} ></Route>
        <Route exact path="/user/Mylearning" element={<Mylearning/>}></Route>
        <Route exact path="/user/Payload" element={<Payload/>}></Route>

        <Route
          path="/404"
          element={
            <div>
              <h3>404 Error</h3>
              <h3>Page Not Found</h3>
            </div>
          }
        />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;


