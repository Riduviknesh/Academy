package com.chessacademy.projectbackend.Service;

import java.util.List;
import com.chessacademy.projectbackend.Models.CourseModel;
public interface CourseServices {
    public List<CourseModel> getCourses();

    public CourseModel getCourse(long courseId);


    public CourseModel updateCourse(CourseModel course);

    public String deleteCourse(long parseLong);

	public CourseModel getCourseByName(String courseName);

	public CourseModel addNewCourse(CourseModel course);

	public List<CourseModel> viewCourseByInstituteId(int instituteId);

	
	public int findTotalPage(int pageSize);

    public List<CourseModel> findCoursesWithPagination(int offset,
            int pageSize);




}