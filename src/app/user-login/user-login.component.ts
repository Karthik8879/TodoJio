import { Component, OnInit } from '@angular/core';
import { SignUp } from '../signup.model';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit{
  // router: any;


  signupUsers : SignUp[] = [];

  signupObj:SignUp = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(private router : Router) {}

  ngOnInit(): void {
    // console.log("hi")
  }

    // onSignUp(){
    //   console.log("hihi")
    //   this.signupUsers.push(this.signupObj);
    //   // local storage (2 params)
    //   localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    //   this.signupObj = {
    //     userName : '',
    //     email : '',
    //     password : ''
    //   };
    //   alert('Signup successful!');
    //   // this.router.navigate(['/login']);
    // }



    // onSignUp() {
    //   console.log('hihi');
    //   this.signupUsers.push(this.signupObj);
  
    //   // Local storage encryption
    //   const encryptedData = CryptoJS.AES.encrypt(
    //     JSON.stringify(this.signupUsers),
    //     'secretKey' // You should replace 'secretKey' with a strong secret key
    //   );
  
    //   localStorage.setItem('signupUsers', encryptedData.toString());

    //   this.signupObj = {
    //     userName: '',
    //     email: '',
    //     password: '',
    //   };
  
    //   alert('Signup successful!');


  // test() {
  //   console.log("hi")
  // }
// }
 redirect(){
  this.router.navigateByUrl('/login')
}

  onSignUp(){
    const hashed = bcrypt.hashSync(this.signupObj.password);
    this.signupObj.password = hashed;

    this.signupUsers.push(this.signupObj);

    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName : '',
      email : '',
      password : '',
    };
    alert('User signUp sucessfully');
  }
}
