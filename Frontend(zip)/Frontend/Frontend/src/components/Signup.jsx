import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


import "./Styles.css";

export class Signup extends Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
            username: "",
            mobileNumber:"",
            confirmPassword: "",
            role:[""],
            errors: {
                email: "",
                username:"",
                mobileNumber:"",
                password:"",
                confirmPassword:""
              }       
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    isEmailValid = email => {
        //eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };
    
    
    validateEmail = email => {
        const errors = {
          email: "",
        };
    
        if (!this.isEmailValid(email)) {
          errors.email = "Email is invalid";
        }

        this.setState(state => ({ ...state, errors }));
    };
    
    // validateUsername=username=>{
    //     const errors={
    //         username:""
    //     };
    //     if (this.state.username.toString().length<2  ) {
    //         errors.username= "Username should be of minimum length 3 ";
    //     }
    //      else if((this.state.username.search(/[0-9]/)===-1) | (this.state.username.search(/[a-z]/)===-1 &
    //                  this.state.username.search(/[A-Z]/)===-1))
    //                  {   
    //          errors.username="Username should be alpha numeric "
    //     }
         
   
    //    this.setState(state => ({ ...state, errors }));

    // }
    validateMobile=mobileNumber=>{
         const errors={
             mobileNumber:""
         };
         if (this.state.mobileNumber.length!==9  ) {
            errors.mobileNumber= "Mobile number should be of length 10";
          }
          
          
    
        this.setState(state => ({ ...state, errors }));

     }
     validatePassword= password =>{
         const errors={
             password:""
         };
         if(this.state.password.toString().length <6){
             errors.password="Password must contain atleast 6 characters."
         }
         //eslint-disable-next-line
         else if(this.state.password.search(/[0-9]/)===0 || this.state.password.search(/[a-z]/)===-1 ||
                    this.state.password.search(/[A-Z]/)===-1 || 
                    //eslint-disable-next-line
                    this.state.password.search(/[!\@\#\$\^\&\*\(\)\+\=\-\/\?\.\,\>\<\}\{\]\[\'\"\;\:\]\}\{\`\~]/)===-1 )
                    {   
            errors.password="Password must contain atleast 1 number, 1 Uppercase, 1 Lowercase & 1 Special character."
        }
        
        this.setState(state => ({ ...state, errors }));
     }
     
     validateconfirmPassword= confirmPassword =>{
        const errors={
            confirmPassword:""
        };
       if(this.state.password!==this.state.confirmPassword)
       {
           //errors.confirmPassword="password and confirm password must be same"
       }
       this.setState(state => ({ ...state, errors }));
    }
     
      handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    
        switch (name) {
            case "email":
                this.validateEmail(value);
                break;
            case "mobileNumber":
                this.validateMobile(value);
                break;
            // case "username":
            //     this.validateUsername(value);
            //     break;
            case "password":
              this.validatePassword(value);
              break;
            case "confirmPassword":
                this.validateconfirmPassword(value);
                break;
            default:
            break;
        }
      };
    

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    // handleValidations=(event)=>{
    //     if(this.state.password>0)
    //         return true;
    // }
  
    handleSubmit = (event) => {

        if(this.state.password.toString().length <6)
        {
            alert(`Password must contain atleast 6 characters and contain atleast 1 number, 1 Uppercase, 1 Lowercase & 1 Special character.`)
        }
        else if(this.state.password.search(/[0-9]/)===-1 || this.state.password.search(/[a-z]/)===-1 
        || this.state.password.search(/[A-Z]/)===-1 || this.state.password.search(/[!\@\#\$\^\&\*\(\)\+\=\-\/\?\.\,\>\<\}\{\]\[\'\"\;\:\]\}\{\`\~]/)===-1 )
        {
            alert(`Password must contain atleast 6 characters and contain atleast 1 number, 1 Uppercase, 1 Lowercase & 1 Special character.`)
        }
        else if(this.state.password!==this.state.confirmPassword)
        {
            alert(`Password and Confirm Password should be same`)
        }
        else{
            this.setState({
                role:"",
                email: "",
                username: "",
                mobileNumber: "",
                password: "",
                confirmPassword: "",
            })
            alert(`Congratulations! "${this.state.username}" you are registered successfully.`)
        }
        event.preventDefault();
        
        console.log(this.state);
        const user = {
            email: this.state.email,
            username: this.state.username,
            mobileNumber: this.state.mobileNumber,
            password: this.state.password,
            role:this.state.role
        }
        axios.post("http://localhost:8080/signup", user)
            .then((response) => {
                console.log(response);
                toast.success( `Congratulations! "${user.username}" you are registered successfully`,{ position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
            });
        
    }
    
  render() {
      const {role,email,username,mobileNumber,password,confirmPassword}=this.state
      const isEnabled =this.isEmailValid(email) && this.state.username.length>3 &&this.state.mobileNumber.length==10 && this.state.password==this.state.confirmPassword
                               

    return(
        <div className='m'>
            <div className='containe'>
                <div className="Regox">
                    <form className='Regform'onSubmit={this.handleSubmit}>
                        <h1 align ="center" id='h1'>Register</h1>
                        <p></p>
                        <p></p>
                        <p id='h1'> *all fields are mandatory to fill.</p>
                        
                        <div>
                            <select value={role[""]} name='role[]' onChange={this.onChangeHandler} className="form-select" aria-label="Default select example" required>
                                <option value="">Role</option>
                                <option value="Male">User</option>
                                <option value="Female">Admin</option>
                                
                            </select> 
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" value={email} name='email' onChange={this.handleChange} className="form-control" placeholder="Enter Email" id="email" autocomplete="off" required/>
                            {this.state.errors.email && <span style={{color:"yellow"}}>{this.state.errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={username} name='username' onChange={this.handleChange} className="form-control" placeholder="Enter Name" id="username" autocomplete="off" required/>
                            {this.state.errors.username && <span style={{color:"yellow"}}>{this.state.errors.username}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                            <input type="number" value={mobileNumber} name='mobileNumber' onChange={this.handleChange} className="form-control" placeholder="Enter Phone No." id="mobileNumber" autoComplete='off'  required/>
                            {this.state.errors.mobileNumber && <span style={{color:"yellow"}}>{this.state.errors.mobileNumber}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={password} name='password' onChange={this.handleChange} className="form-control" placeholder="Enter Password" id="password" autoComplete='off' required/>
                            {this.state.errors.password && <span style={{color:"yellow"}}>{this.state.errors.password}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input type="password" value={confirmPassword} name='confirmPassword' onChange={this.handleChange} className="form-control" placeholder="Re Enter Password" id="confirmPassword" autoComplete='off' required/>
                            {this.state.errors.confirmPassword && <span style={{color:"yellow"}}>{this.state.errors.confirmPassword}</span>}

                        </div>
                        <button disabled={!isEnabled} type="submit" value="Submit" className="btn btn-primary">Register</button>
                        <p id='h1'>Already have an account? <Link to="/login">Login</Link></p>
                        
                    </form>
                </div>
            </div>
        </div>
        )
    }
}





