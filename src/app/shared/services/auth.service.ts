import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  // Ambil semua user dari localStorage
  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  // Simpan semua user ke localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Register user baru
  register(user: User): boolean {
    const users = this.getUsers();
    const exists = users.some(u => u.email === user.email);
    if (exists) {
      return false; // email sudah dipakai
    }
    user.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push(user);
    this.saveUsers(users);
    return true;
  }

  // Login
  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
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
