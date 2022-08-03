package com.chessacademy.projectbackend.Models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "students")
public class StudentModel {
    public StudentModel() {
		super();
		
	}


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;
    private String firstName;
    private String lastName;
    private String gender;
    private String fatherName;
    private String motherName;
    private String email;
    private String dob;
    private String phoneNumber1;
    private String phoneNumber2;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String pincode;
    private String nationality;
    

	@OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "studentId", referencedColumnName = "studentId")
    private List<EnrolledCourse> enrolledCourses;
   
	public int getStudentId() {
		return studentId;
	}


	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getFatherName() {
		return fatherName;
	}


	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}


	public String getMotherName() {
		return motherName;
	}


	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getDob() {
		return dob;
	}


	public void setDob(String dob) {
		this.dob = dob;
	}


	public String getPhoneNumber1() {
		return phoneNumber1;
	}


	public void setPhoneNumber1(String phoneNumber1) {
		this.phoneNumber1 = phoneNumber1;
	}


	public String getPhoneNumber2() {
		return phoneNumber2;
	}


	public void setPhoneNumber2(String phoneNumber2) {
		this.phoneNumber2 = phoneNumber2;
	}


	public String getAddress1() {
		return address1;
	}


	public void setAddress1(String address1) {
		this.address1 = address1;
	}


	public String getAddress2() {
		return address2;
	}


	public void setAddress2(String address2) {
		this.address2 = address2;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getPincode() {
		return pincode;
	}


	public void setPincode(String pincode) {
		this.pincode = pincode;
	}


	public String getNationality() {
		return nationality;
	}


	public void setNationality(String nationality) {
		this.nationality = nationality;
	}


	public List<EnrolledCourse> getEnrolledCourses() {
		return enrolledCourses;
	}


	public void setEnrolledCourses(List<EnrolledCourse> enrolledCourses) {
		this.enrolledCourses = enrolledCourses;
	}


	public StudentModel(int studentId, String firstName, String lastName, String gender, String fatherName,
			String motherName, String email, String dob, String phoneNumber1, String phoneNumber2, String address1,
			String address2, String city, String state, String pincode, String nationality,
			List<EnrolledCourse> enrolledCourses) {
		super();
		this.studentId = studentId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.fatherName = fatherName;
		this.motherName = motherName;
		this.email = email;
		this.dob = dob;
		this.phoneNumber1 = phoneNumber1;
		this.phoneNumber2 = phoneNumber2;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.nationality = nationality;
		this.enrolledCourses = enrolledCourses;
	}
}

    