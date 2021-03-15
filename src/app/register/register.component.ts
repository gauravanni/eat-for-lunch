import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['',[Validators.required]],
      name:['',[Validators.required]],
      phone:['',[Validators.required]],
      password:['',[Validators.required]],
      cfpassword:['',[Validators.required]]
    });
  }

  onSubmit(){
    if(this.registerForm.valid){
      delete this.registerForm.value.cfpassword
      const registerForm=this.registerForm.value
      this.authService.register(registerForm)
      .subscribe((data:any)=>{
        if(data.status){
          alert(data.message)
          this.registerForm.reset()
          this.router.navigate([''])
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