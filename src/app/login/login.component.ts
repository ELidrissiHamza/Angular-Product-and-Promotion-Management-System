import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userFormGroup!:FormGroup;
errorMesage:any;

  constructor(private fb:FormBuilder,private authService:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username:this.fb.control(null),
      password:this.fb.control(null)
    })
  }

  handleLogin() {
let username=this.userFormGroup.value.username;
let password=this.userFormGroup.value.password;
this.authService.login(username,password).subscribe({
  next:appUser=>{
    this.authService.AuthentificatedUser(appUser).subscribe({
      next:data =>{
        this.router.navigateByUrl('/admin');
      },
      error:err=>{

      }
    });
  },
  error:err=>{
    this.errorMesage=err.message;
  }
});
  }
}
