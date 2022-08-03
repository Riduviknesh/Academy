package com.chessacademy.projectbackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chessacademy.projectbackend.Repository.*;
import com.chessacademy.projectbackend.Models.*;

@Service
public class EnrolledCourseServiceImpl implements EnrolledCourseService {
	@Autowired
	EnrolledCourseRepo enrolledCourseRepo;

	@Override
	public EnrolledCourse addAdmission(EnrolledCourse enrolledCourse) {
		return enrolledCourseRepo.save(enrolledCourse);
	}

	@Override
	public EnrolledCourse viewAdmission(int id) {
		return enrolledCourseRepo.findByEnrolledCourseId(id);
	}

	@Override
	public String deleteAdmission(int id) {
		enrolledCourseRepo.deleteById(id);
		return "Deleted id " + id;
	}
}
