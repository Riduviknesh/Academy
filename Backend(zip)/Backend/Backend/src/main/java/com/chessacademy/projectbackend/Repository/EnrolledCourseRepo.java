package com.chessacademy.projectbackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chessacademy.projectbackend.Models.*;

public interface EnrolledCourseRepo extends JpaRepository<EnrolledCourse, Integer> {
	
	EnrolledCourse findByEnrolledCourseId(int enrolledCourseId);
	
	List<EnrolledCourse> findByCourseCourseId(int courseId);
	
}
