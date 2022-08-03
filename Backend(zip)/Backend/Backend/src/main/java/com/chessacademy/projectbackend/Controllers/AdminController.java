package com.chessacademy.projectbackend.Controllers;

import java.util.List;

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

import com.chessacademy.projectbackend.Models.CourseModel;
import com.chessacademy.projectbackend.Models.InstituteModel;
import com.chessacademy.projectbackend.Models.StudentModel;
import com.chessacademy.projectbackend.Payload.Response.ViewResponse;
import com.chessacademy.projectbackend.Service.CourseServices;
import com.chessacademy.projectbackend.Service.InstituteService;
import com.chessacademy.projectbackend.Service.StudentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@Component
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private InstituteService instituteDetailsService;


	@Autowired
	private CourseServices courseService;


	@Autowired
	private StudentService studentService;
	//INSTITUTE CONTROLLER

	@PostMapping("/addInstitute")
	public InstituteModel addAcademy(@RequestBody InstituteModel user) {

		return instituteDetailsService.addInstitute(user);
	}

	@GetMapping("/viewInstitutes")
	public List<InstituteModel> findAll() {
		return instituteDetailsService.viewInstitute();
	}

	@GetMapping("/viewInstituteByName/{instituteName}")
	public InstituteModel getInstituteByName(@PathVariable String instituteName) {

		return instituteDetailsService.viewInstituteByName(instituteName);
	}

	@GetMapping("/viewInstituteById/{instituteId}")
	public InstituteModel getInstituteById(@PathVariable int instituteId) {

		return instituteDetailsService.viewInstituteById(instituteId);
	}

	@PutMapping("/updateInstitute/{instituteId}")
	public InstituteModel saveOrUpdateAcademy(@RequestBody InstituteModel user) {

		return instituteDetailsService.addInstitute(user);
	}

	@DeleteMapping("/deleteInstitute/{instituteId}")
	public InstituteModel deleteInstitute(@PathVariable int instituteId) {
		return instituteDetailsService.deleteInstitute(instituteId);

	}



	
	

	//COURSE CONTROLLER

	@GetMapping("/viewCourse/{offset}/{pageSize}")
	private ViewResponse getCourseWithPagination(@PathVariable int offset,
			@PathVariable int pageSize) {
		int totalPages = courseService.findTotalPage(pageSize);
		List<CourseModel> courses = courseService.findCoursesWithPagination(offset, pageSize);
		return new ViewResponse(courses, totalPages);

	}
	


	@GetMapping("viewCourseById/{courseId}")
	public ResponseEntity<?> getCourse(@PathVariable String courseId){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.courseService.getCourse(Long.parseLong(courseId)));
		}catch(Exception e){
			return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/viewCourseByName/{courseName}")
	public ResponseEntity<?> getCourseByName(@PathVariable String courseName){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.courseService.getCourseByName(courseName));
		}catch(Exception e){
			return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/getCourseByInstituteName/{instituteId}")
	public List<CourseModel> viewCourseByInstituteName(@PathVariable int instituteId) {
		return courseService.viewCourseByInstituteId(instituteId);
	}

	@PostMapping("/addCourse")
    public CourseModel addCourse(@RequestBody CourseModel course) {
        return courseService.addNewCourse(course);
    }
	
	@PutMapping("/editCourse/{courseId}")
	public ResponseEntity<?> updateCourse(@RequestBody CourseModel course){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.courseService.updateCourse(course));
		}catch(Exception e){
			return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/deleteCourse/{courseId}")
	public ResponseEntity<?> deleteCourse(@PathVariable String courseId){
		try{
			return  ResponseEntity.status(HttpStatus.OK).body(this.courseService.deleteCourse(Long.parseLong(courseId)));
		}catch(Exception e){
			//return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("INTERNAL_SERVER_ERROR");
			return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

