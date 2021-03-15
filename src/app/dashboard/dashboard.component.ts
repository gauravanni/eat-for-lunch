import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any
  images:any
  isLoggedin:any;
  uploadForm: FormGroup;
  constructor(
    private authService:AuthService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({ image: [null] });

    this.authService.getUsers()
    .subscribe((data:any)=>{
      if(data.status){
        this.user=data.result[0].User
        this.images=data.result
      }
    },(err:any)=>{
      console.log('err',err)
    })

    this.isLoggedin=this.authService.loggedIn

  }

  logout(){
    this.authService.logout()
    this.router.navigate(['']);
  }

  onFileChange(event){
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      if(fileExt==='jpg' || fileExt==='png' || fileExt==='jpeg'){
        this.uploadForm.get('image').setValue(file);
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('image').value);
        this.authService.uploadFile(formData).subscribe(
          (data: any) => {
            if (data.status) {
              alert(data.message)
              this.uploadForm.reset()
              this.ngOnInit()
            }
            else alert(data.message)
          },
          err => {
            console.log('err upload', err);
          }
        );
      }
      else alert('Only image file supported')
    }
  }


}
