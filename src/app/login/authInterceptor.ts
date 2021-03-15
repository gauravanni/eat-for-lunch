import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(
    req.url.includes('/api/register') 
    || req.url.includes('/api/login')){
    return next.handle(req)
  }
    const token = localStorage.getItem('access_token');
    if(token){
    const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    return next.handle(modifiedReq)
    }
    
  }
}
