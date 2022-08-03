package com.chessacademy.projectbackend.Service;


import java.util.List;

import com.chessacademy.projectbackend.Models.*;

public interface EnrolledCourseService {

	EnrolledCourse addAdmission(EnrolledCourse student);

	EnrolledCourse viewAdmission(int id);

	String deleteAdmission(int id);

}
