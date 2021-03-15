import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.BASE_URI;
  authToken: any;
  constructor(private http: HttpClient) { }

  register(formData){
    console.log(formData)
    return this.http.post(`${this.apiUrl}/register`,formData)
  }
  login(formData){
    console.log(formData)
    return this.http.post(`${this.apiUrl}/login`,formData)
  }
  setToken(accessToken,refreshToken){
    localStorage.setItem('accessToken',accessToken)
    localStorage.setItem('refreshToken',refreshToken)
    this.authToken = accessToken;
  }
  loadToken() {
    const token = localStorage.getItem('accessToken');
    this.authToken = token;
  }
  createAuthHeader() {
    this.loadToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
    return { headers };
  }
  logout() {
    this.authToken = null;
    localStorage.clear()
    }

  loggedIn() {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    return false;
  }
  getUser(){
    return this.http.get(`${this.apiUrl}/user`,this.createAuthHeader())
  }
  getUsers(){
    return this.http.get(`${this.apiUrl}/users`,this.createAuthHeader())
  }
  uploadFile(formData){
    return this.http.post(`${this.apiUrl}/upload`,formData,this.createAuthHeader())
  }
}
