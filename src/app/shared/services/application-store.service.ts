import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStoreService {
  private apiUrl = 'https://68cb896b716562cf5073d505.mockapi.io/api/application';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl).pipe(
      map(apps =>
        apps.map(app => ({
          ...app,
          id: Number(app.id)
        }))
      )
    );
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`).pipe(
      map(app => ({
        ...app,
        id: Number(app.id)
      }))
    );
  }

  addApplication(data: Omit<Application, 'id'>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, data).pipe(
      map(app => ({
        ...app,
      }))
    );
  }

  updateApplication(id: number, data: Partial<Application>): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, data).pipe(
      map(app => ({
        ...app,
        id: Number(app.id)
      }))
    );
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
