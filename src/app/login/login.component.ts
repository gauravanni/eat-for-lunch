import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      delete this.loginForm.value.cfpassword
      const loginForm=this.loginForm.value
      this.authService.login(loginForm)
      .subscribe((data:any)=>{
        if(data.status){
          this.authService.setToken(data.accessToken,data.refreshToken)
          alert(data.message)
          this.loginForm.reset()
          this.router.navigate(['/dashboard'])
        }
        else alert(data.message)
      },(err:any)=>{
        console.log('err',err)
      })
    }
    else {
      alert('Form is invalid')
    }
  }

}
