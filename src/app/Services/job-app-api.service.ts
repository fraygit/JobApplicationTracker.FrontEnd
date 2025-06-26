import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../Models/mobil-price.model';

@Injectable({
  providedIn: 'root'
})
export class JobAppApiService {

  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/api/applications`);
  }

  getJobApplicationById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/api/applications/${id}`);
  }

  updateJobApplication(id: number, job: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/api/applications/${id}`, job);
  }
}
