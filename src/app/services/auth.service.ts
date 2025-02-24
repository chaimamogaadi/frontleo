import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8094/home/api/users';

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
