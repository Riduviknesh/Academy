package com.chessacademy.projectbackend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chessacademy.projectbackend.Models.InstituteModel;

@Repository
public interface InstituteRepository extends JpaRepository<InstituteModel,Integer>{

	InstituteModel findByInstituteName(String instituteName);

	InstituteModel findByInstituteId(int instituteId);
       
}
