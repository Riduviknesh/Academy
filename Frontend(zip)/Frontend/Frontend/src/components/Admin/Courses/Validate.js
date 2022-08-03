const validate = (values) => {
    const errors = {};

    if(!values.courseName){
        errors.courseName='Course name is required'
    }
    else if(values.courseName.length<11 || values.courseName.length>30){
        errors.courseName='Course name should be of length min 10 and max 30'
    }

    if(!values.courseDescription){
        errors.courseDescription='Course Description is required'
    }
    else if(values.courseDescription.length<11 || values.courseDescription.length>30){
        errors.courseDescription='Course Description should be of length min 10 and max 30'
    }

    if(!values.courseId){
        errors.courseId='Course Id is required'
    }
    else if(values.courseId.length>3){
        errors.courseId='Course Id should be 3 digit number'
    }

    if(!values.courseDuration){
        errors.courseDuration='Course Duration is required'
    }
    else if(values.courseDuration.length>1){
        errors.courseDuration='Course Duration is max 1 year'
    }
 
    if(!values.courseTiming){
        errors.courseTiming='Check course Timing'
    }

    if(!values.noOfStudents){
        errors.noOfStudents='No. of students is required'
    }
    else if(values.noOfStudents.length>3){
        errors.noOfStudents='For each course students are limited to 999'
    }


    // if(!values.instituteName){
    //     errors.instituteName='Institute name is required'
    // }

    return errors;
  };
  
  export default validate;
  
