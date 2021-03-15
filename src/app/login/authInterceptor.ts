import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private http:HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(
    req.url.includes('/api/register') 
    || req.url.includes('/api/login')){
    return next.handle(req)
  }

  return next.handle(req).pipe(
    catchError((error: any) => {
      // if token expires call refresh token api
      if(error.status==401){
        this.http.post('http://localhost:3000/api/refreshtoken',{refreshToken:localStorage.getItem('refreshToken')})
        .subscribe((data:any)=>{
          if(data.success){
            localStorage.setItem("accessToken", data.accessToken);
            // set authorization header
            req=req.clone({ 
              headers: req.headers.set('Authorization',`Bearer ${data.accessToken}`)
            });
            return next.handle(req)
          }
        })
      }
      return throwError(error);
    })
);
}
    
  }
