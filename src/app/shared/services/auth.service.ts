import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'https://68cb896b716562cf5073d505.mockapi.io/api/user';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  // Ambil semua user dari API
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  // Register user baru ke API
  register(user: User): Observable<User> {
    console.log('User registered:', user);
    return this.http.post<User>(this.api, user);
  }

  // Login (cek user dari API)
  login(email: string, password: string): Observable<boolean> {
  return this.http.get<User[]>(`${this.api}?email=${email}&password=${password}`).pipe(
    map(users => {
      if (users.length > 0) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(users[0]));
        return true;
      }
      return false;
    }),
    catchError(() => of(false))
  );
}

  // Logout
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  // Ambil user yang sedang login
  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  // Cek apakah user login
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
