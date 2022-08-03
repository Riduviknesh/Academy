package com.chessacademy.projectbackend.Repository;


import com.chessacademy.projectbackend.Models.CourseModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CourseRepository extends JpaRepository<CourseModel,Long> {

	CourseModel findByCourseName(String courseName);

	List<CourseModel> findByInstitute_InstituteId(int instituteId);
}