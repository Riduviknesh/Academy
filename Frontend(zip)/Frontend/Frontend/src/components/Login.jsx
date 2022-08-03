import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import authHeader from "./auth-header";
import { toast } from "react-toastify";

import "./Styles.css";

export class Login extends Component {
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
                
                password:"",

              }       
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    isEmailValid = email => {
        //eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
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
     
     
     
      handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    
        switch (name) {
            case "email":
                this.validateEmail(value);
                break;
            
            case "password":
              this.validatePassword(value);
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
        
        else{
            this.setState({
                
                email: "",
                
                password: "",
                
            })
            // alert(`Logged in`)
        }
        event.preventDefault();
        
        const user = {
            email: this.state.email,
            
            password: this.state.password,
        }
        axios.post('http://localhost:8080/signin', user,{ headers: authHeader() })
        .then((response) => {
             console.log(response);
             console.log("role"+response.data.roles[0]);
            
            if(response.data.roles[0]==="ROLE_ADMIN"){
                toast.success('Admin Logged in',{position: toast.POSITION.TOP_RIGHT,autoClose:3000})
                window.location.href="/admin/viewInstitutes";
            }
            else if(response.data.roles[0]==="ROLE_USER") {
                toast.success('User Logged in',{position: toast.POSITION.TOP_RIGHT,autoClose:3000})
                window.location.href="/user/viewacademy";
            }
            
        })
        .catch((error) => {
            console.log("Error posting data to database "+ error);
            toast.warning('Incorrect Credentials or Unauthorized')
        });
  };

  

  

 render() {
      const {email,password}=this.state
      const isEnabled = this.isEmailValid(email) 
                               

    return(
        <div className='m'>
            <div className='containe'>
                <div className="Regox">
                    <form className='Regform'onSubmit={this.handleSubmit}>
                        <h1 align ="center" id='h1'>Login</h1>
                        <p></p>
                        <p></p>
                        
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" value={email} name='email' onChange={this.handleChange} className="form-control" placeholder="Enter Email" id="email" autocomplete="off" required/>
                            {this.state.errors.email && <span style={{color:"yellow"}}>{this.state.errors.email}</span>}
                        </div>
                        
                        
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={password} name='password' onChange={this.handleChange} className="form-control" placeholder="Enter Password" id="password" autoComplete='off' required/>
                            {this.state.errors.password && <span style={{color:"yellow"}}>{this.state.errors.password}</span>}

                        </div>
                        
                        <button disabled={!isEnabled} type="submit" value="Submit" className="btn btn-primary">Register</button>
                        
                        <p id='h1'>New User/Admin? <Link to="/signup">Signup</Link></p>
                        
                    </form>
                </div>
            </div>
        </div>
        )
    }
}