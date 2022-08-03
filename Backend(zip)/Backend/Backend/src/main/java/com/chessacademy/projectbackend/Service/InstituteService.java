package com.chessacademy.projectbackend.Service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.chessacademy.projectbackend.Models.InstituteModel;


@Service
public interface InstituteService {
	

	InstituteModel addInstitute(InstituteModel user);

	List<InstituteModel> viewInstitute();

	@Transactional
	InstituteModel viewInstituteByName(String instituteName);

	InstituteModel deleteInstitute(int instituteId);

	InstituteModel updateInstitute(InstituteModel user);

	InstituteModel viewInstituteById(int instituteId);

	
}
