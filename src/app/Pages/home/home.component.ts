import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobAppApiService } from '../../Services/job-app-api.service';
import { JobApplication, JobApplicationStatus } from '../../Models/mobil-price.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobApplications: JobApplication[] = [];

  constructor(private jobAppApiService: JobAppApiService, private router: Router) {}

  ngOnInit(): void {
    this.jobAppApiService.getJobApplications().subscribe((data: JobApplication[]) => {
      this.jobApplications = data;
    });
    // Fetching is handled by async pipe, but you can trigger here if needed
  }

  editJob(id: number): void {
    this.router.navigate(['/edit-application', id]);
  }

  getStatusName(status: JobApplicationStatus): string {
    return JobApplicationStatus[status];
  }
}

