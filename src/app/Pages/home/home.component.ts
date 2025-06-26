import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobAppApiService } from '../../Services/job-app-api.service';
import { JobApplication, JobApplicationStatus } from '../../Models/mobil-price.model';
import { PagedResult } from '../../Models/page-result';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobApplications: JobApplication[] = [];
  totalCount: number = 0;
  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(private jobAppApiService: JobAppApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(this.pageNumber);
  }

  loadPage(page: number): void {
    this.pageNumber = page;
    this.jobAppApiService.getJobApplications(this.pageNumber, this.pageSize).subscribe((pagedResult: PagedResult<JobApplication>) => {
      this.jobApplications = pagedResult.results;
      this.totalCount = pagedResult.totalCount;
      this.pageSize = pagedResult.pageSize;
      this.pageNumber = pagedResult.pageNumber;
    });
  }

  editJob(id: number): void {
    this.router.navigate(['/edit-application', id]);
  }

  getStatusName(status: JobApplicationStatus): string {
    return JobApplicationStatus[status];
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}

