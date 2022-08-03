const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.instituteName){
        errors.instituteName='institute name is required'
    }
   /* else if(inputs.instituteName.length<11 || inputs.instituteName.length>30){
        errors.instituteName='institute name should be of length min 10 and max 30'
    }*/

    if(!values.instituteDescription){
        errors.instituteDescription='institute Description is required'
    }
   /*else if(inputs.instituteDescription.length<11 || inputs.instituteDescription.length>30){
        errors.instituteDescription='Course Description should be of length min 10 and max 30'
    }*/
    if(!values.instituteAddress){
        errors.instituteAddress='Instiutte Address is required'
    }

    if(!values.instituteimgurl){
        errors.instituteimgurl='Institute image is required'
    }
    
 
    if(!values.mobile){
        errors.mobile='Institute mobile number is required'
    }

    else if(values.mobile.toString().length !== 10){
        errors.mobile='Phone number must contains 10 digits'
    }
   if(!values.email){
       errors.email='email address is required'
   }
   else if(!regex.test(values.email)){
          errors.email='this is not a valid email'
   }

    return errors;
  };
  
  export default validate;