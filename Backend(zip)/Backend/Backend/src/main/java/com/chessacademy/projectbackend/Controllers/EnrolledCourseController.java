package com.chessacademy.projectbackend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import com.chessacademy.projectbackend.Models.*;
import com.chessacademy.projectbackend.Service.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class EnrolledCourseController {
	@Autowired
	EnrolledCourseService enrolledCourseService;
	
	@PostMapping("/addAdmission")
	public EnrolledCourse addAdmission(@RequestBody EnrolledCourse course) {
	    return enrolledCourseService.addAdmission(course);
	}
	
	@GetMapping("/viewAdmission/{id}")
	public EnrolledCourse viewAdmission(@PathVariable int id) {
		return enrolledCourseService.viewAdmission(id);
	}
	
	@DeleteMapping("/deleteAdmission/{id}")
    public String deleteAdmission(@PathVariable int id) {
        return enrolledCourseService.deleteAdmission(id);
    }
}
