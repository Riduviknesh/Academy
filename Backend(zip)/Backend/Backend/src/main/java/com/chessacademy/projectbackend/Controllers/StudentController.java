package com.chessacademy.projectbackend.Controllers;

import com.chessacademy.projectbackend.Service.StudentService;

import java.util.List;


import com.chessacademy.projectbackend.Models.StudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/addStudent")
    public StudentModel addStudent(@RequestBody StudentModel user) {

        return studentService.addStudent(user);
    }

    @GetMapping("/viewStudents")
    public List<StudentModel> findAllStudents() {
        return studentService.viewStudent();
    }

    @GetMapping("/viewStudentByName/{firstName}")
    public StudentModel getStudentByName(@PathVariable String firstName) {

        return studentService.viewStudentByName(firstName);
    }

    @GetMapping("/viewStudentById/{studentId}")
    public StudentModel getStudentById(@PathVariable int studentId) {

        return studentService.viewStudentById(studentId);
    }

    @PutMapping("/updateStudent/{studentId}")
    public StudentModel saveOrUpdateStudent(@PathVariable int studentId, @RequestBody StudentModel user) {

        return studentService.updateStudent(studentId, user);
    }

    @DeleteMapping("/deleteStudent/{studentId}")
    public StudentModel deleteStudent(@PathVariable int studentId) {
        return studentService.deleteStudent(studentId);

    }
    @GetMapping("/checkStudentMailId/{email}")
	public String emailValidation(@PathVariable String email) {
		Boolean bool = studentService.existsByEmail(email);
		if(bool)
			return "true";
		else 
			return "false"; 
    }
    @GetMapping("/checkAdmission/{email}/{courseID}")
	public Boolean checkAdmission(@PathVariable String email, @PathVariable long courseID) {
	    Boolean bool =  studentService.checkAdmission(email, courseID);
	    if(bool) {
	    	return true;
	    }else {
	    	return false;
	    }
	} 
    @PutMapping("/addAdmission/{email}")
	public StudentModel enrolleCourse(@PathVariable String email, @RequestBody StudentModel student) {
	    return studentService.enrolleCourse(email, student);
	} 
    
    @GetMapping("/getStudentId/{email}")
    public Integer getStudentId(@PathVariable String email) {
        return studentService.getStudentId(email);
    }
	
}
