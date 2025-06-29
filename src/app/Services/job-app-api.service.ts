import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../Models/mobil-price.model';
import { PagedResult } from '../Models/page-result';

@Injectable({
  providedIn: 'root'
})
export class JobAppApiService {

  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getJobApplications(pageNumber: number = 1, pageSize: number = 5): Observable<PagedResult<JobApplication>> {
    return this.http.get<PagedResult<JobApplication>>(
      `${this.apiUrl}/api/applications/${pageNumber}/${pageSize}`
    );
  }

  getJobApplicationById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.apiUrl}/api/applications/${id}`);
  }

  updateJobApplication(id: number, job: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/api/applications/${id}`, job);
  }

  addJobApplication(job: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/api/applications`, job);
  }
}
