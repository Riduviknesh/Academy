package com.chessacademy.projectbackend.Service;

import com.chessacademy.projectbackend.Models.CourseModel;
import com.chessacademy.projectbackend.Models.InstituteModel;
import com.chessacademy.projectbackend.Repository.CourseRepository;
import com.chessacademy.projectbackend.Repository.InstituteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CourseServiceimpl implements CourseServices{

    @Autowired
    private CourseRepository courseDao;
    
    @Autowired
    private InstituteRepository instituteRepo;

    public CourseServiceimpl(){

    }


    @Override
    public List<CourseModel> getCourses() {
        return courseDao.findAll();
    }

    @Override
    public CourseModel getCourse(long courseId) {
        CourseModel entity=courseDao.findById(courseId).orElse(null);
        if(Objects.isNull(entity)){
            return null;
        }
        else{
            return courseDao.getById(courseId);
        }
    }

  
  
    @Override
    public CourseModel updateCourse(CourseModel course) {

        courseDao.save(course);
        return course;
    }

    @Override
    public String deleteCourse(long parseLong) {

        CourseModel entity=courseDao.findById(parseLong).orElse(null);

        if(Objects.isNull(entity)){
            return "CourseID not found ";

        }else{
            courseDao.delete(entity);
            return "deleted";
        }

    }


	@Override
	public CourseModel getCourseByName(String courseName) {
		// TODO Auto-generated method stub
		return courseDao.findByCourseName(courseName);
	}


	@Override
	public CourseModel addNewCourse(CourseModel course) {
//		System.out.println(course.toString());
		InstituteModel institute = instituteRepo.findByInstituteName(course.getInstitute().getInstituteName());
		course.setInstitute(institute);
		return courseDao.save(course);
	}


	@Override
	public List<CourseModel> viewCourseByInstituteId(int instituteId) {
		return courseDao.findByInstitute_InstituteId(instituteId);
	}
	
	
	 @Override
	    public int findTotalPage(int pageSize) {
	        List<CourseModel> courses = courseDao.findAll();
	        int recordCount = courses.size();
	        int size = recordCount / pageSize + 1;
	        return size;
	    }

	 @Override
	    public List<CourseModel> findCoursesWithPagination(int offset, int pageSize) {

	        Page<CourseModel> coursespage = courseDao.findAll(PageRequest.of(offset, pageSize));
	        List<CourseModel> courses = coursespage.toList();
	        return courses;
	    }


}