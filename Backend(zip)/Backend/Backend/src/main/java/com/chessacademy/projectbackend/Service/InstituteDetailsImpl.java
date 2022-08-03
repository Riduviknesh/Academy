package com.chessacademy.projectbackend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chessacademy.projectbackend.Models.InstituteModel;
import com.chessacademy.projectbackend.Repository.InstituteRepository;

@Service
public class InstituteDetailsImpl implements InstituteService {

	@Autowired
	InstituteRepository instituteRepo;
	
	@Override
	public InstituteModel addInstitute(InstituteModel user) {
		// TODO Auto-generated method stub
		return instituteRepo.save(user);
	}

	@Override
	public List<InstituteModel> viewInstitute() {
		// TODO Auto-generated method stub
		return instituteRepo.findAll();
	}

	@Override
	public InstituteModel viewInstituteByName(String instituteName) {
		// TODO Auto-generated method stub
		return  instituteRepo.findByInstituteName(instituteName);
	}

	@Override
	public InstituteModel deleteInstitute(int instituteId) {
		// TODO Auto-generated method stub
		instituteRepo.deleteById(instituteId);;
		return null;
	}

	@Override
	public InstituteModel updateInstitute(InstituteModel user) {
		// TODO Auto-generated method stub
		return instituteRepo.save(user);
	}

	@Override
	public InstituteModel viewInstituteById(int instituteId) {
		// TODO Auto-generated method stub
		return instituteRepo.findByInstituteId(instituteId);
		
	}

	
}
