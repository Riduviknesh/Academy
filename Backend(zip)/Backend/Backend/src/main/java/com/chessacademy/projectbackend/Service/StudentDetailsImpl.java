package com.chessacademy.projectbackend.Service;

import java.util.ArrayList;
import java.util.List;

import com.chessacademy.projectbackend.Models.EnrolledCourse;
import com.chessacademy.projectbackend.Models.StudentModel;
import com.chessacademy.projectbackend.Repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Override
    public StudentModel addStudent(StudentModel user) {
        return studentRepository.save(user);
    }

    @Override
    public List<StudentModel> viewStudent() {
        return studentRepository.findAll();
    }

    @Override
    public StudentModel viewStudentByName(String firstName) {
        return studentRepository.findByFirstName(firstName);
    }

    @Override
    public StudentModel viewStudentById(int studentId) {
        return studentRepository.findByStudentId(studentId);
    }

    @Override
    public StudentModel updateStudent(int id, StudentModel user) {
        StudentModel student = studentRepository.findByStudentId(id);
        student.setFatherName(user.getFirstName());
        student.setLastName(user.getLastName());
        student.setGender(user.getGender());
        student.setFatherName(user.getFatherName());
        student.setMotherName(user.getMotherName());
        student.setEmail(user.getEmail());
        student.setDob(user.getDob());
        student.setPhoneNumber1(user.getPhoneNumber1());
        student.setPhoneNumber2(user.getPhoneNumber2());
        student.setAddress1(user.getAddress1());
        student.setAddress2(user.getAddress2());
        student.setCity(user.getCity());
        student.setState(user.getState());
        student.setPincode(user.getPincode());
        student.setNationality(user.getNationality());
        return studentRepository.save(student);
    }

    @Override
    public StudentModel deleteStudent(int studentId) {

        StudentModel student = studentRepository.findByStudentId(studentId);
        studentRepository.delete(student);
        return student;
    }

	@Override
	public Boolean existsByEmail(String email) {
		return studentRepository.existsByEmail(email);
	}

	@Override
	public Boolean checkAdmission(String email, long courseID) {
		return studentRepository.existsByEmailAndEnrolledCourses_Course_CourseId(email, courseID);
	}

	@Override
	public StudentModel enrolleCourse(String email, StudentModel student) {
		StudentModel editStud = studentRepository.findByEmail(email);
		List<EnrolledCourse> course = new ArrayList<EnrolledCourse>();
		course.addAll(student.getEnrolledCourses());
		course.addAll(editStud.getEnrolledCourses());
		editStud.setEnrolledCourses(course);
        return studentRepository.save(editStud);
	}

	@Override
	public Integer getStudentId(String email) {
		return studentRepository.getStudentId(email);
	}

}
