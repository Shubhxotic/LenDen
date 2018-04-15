import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessage} from 'angular-flash-message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;

  constructor(private validateService: ValidateService,
     private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router) { 
      }

  ngOnInit() {
  }


  onRegisterSubmit(){
    const user={
      name: this.name,
      username: this.username,
      password: this.password
    }

    alert(JSON.stringify(user,null,2));

    //All fields  authenticated?
    if(!this.validateService.validateRegister(user)){
      alert("Please fill the form Correctly!!");
      return false;
      // this.flashMessage.warning("Please fill the form Correctly!!");
    }
    else{
      alert("Validation Complete");
    }

    //Register User
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        alert("Successfully Registered User");
        this.router.navigate(['/']);
      }
      else{
        alert("Could not register User");
        this.router.navigate(['/register']);
      }
    })
  } 
}
