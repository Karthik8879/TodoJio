import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userToken: string | null = null;
 
  constructor() {}
 
  setToken(token: string): void {
    sessionStorage.setItem("karthik", token);
    this.userToken = token;
  }
 
  getToken(): string | null {
    // return this.userToken;
    return sessionStorage.getItem("karthik");
  }
 
  clearToken(): void {
    this.userToken = null;
  }
}
 