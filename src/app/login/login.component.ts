import { Component } from '@angular/core';
import { Login } from '../login.model';
import { SignUp } from '../signup.model';

import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  signupUsers : SignUp[] = [];

  loginObj:Login = {
    email: '',
    password: '',
  };
  // router: any;

  // router: any;

  // constructor(private router: Router) {
  //   // Retrieve user data from local storage when the component is created
  //   const storedUsers = localStorage.getItem('signupUsers');
  //   this.signupUsers = storedUsers ? JSON.parse(storedUsers) : [];
  // }

  // constructor(private router: Router) {
  //   // Retrieve encrypted user data from local storage when the component is created
  //   const storedData = localStorage.getItem('signupUsers');
  //   if (storedData) {
  //     // Decrypt the data using the secret key
  //     const bytes = CryptoJS.AES.decrypt(storedData, 'secretKey');
  //     const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  //     this.signupUsers = decryptedData || [];
  //   }
  // }

  constructor(private router: Router,  private authService: AuthService) {
    // Retrieve user data from local storage when the component is created
    const storedUsers = localStorage.getItem('signupUsers');
    this.signupUsers = storedUsers ? JSON.parse(storedUsers) : [];
  }

  onLogin() {

    // console.log("users ",this.signupUsers)
    // const ifUserExisits = this.signupUsers.find(
    //   (m): any => m.email === this.loginObj.email &&
    //   m.password === this.loginObj.password,
    // );

    const user = this.signupUsers.find((m) => m.email === this.loginObj.email);

    // if user exisits
    // if(user !== undefined){
    //   // alert('Login Sucessful');
    //   this.router.navigate(['/todo']);
    // } else{
    //   alert('Invalid email or password');
    //   this.router.navigate(['/login']);
    //   this.loginObj.email = '';
    //   this.loginObj.password = '';
  
    // }

    if (user !== undefined && bcrypt.compareSync(this.loginObj.password, user.password)) {
      // Successful login, set the token and navigate to landing page
      // this.authService.setToken(this.loginObj.email); // Assuming email can be used as a simple token
      this.authService.setToken('karthik');
      // alert('Login Successful!');
      this.router.navigate(['/todo']);
    } else {
      // Invalid login, show alert
      alert('Invalid Username or Password');
      this.router.navigate(['/login']);
      // Clear email and password fields
      this.loginObj.email = '';
      this.loginObj.password = '';
    }
  }
  }


