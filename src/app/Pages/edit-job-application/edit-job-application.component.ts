import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobAppApiService } from '../../Services/job-app-api.service';
import { JobApplication, JobApplicationStatus } from '../../Models/mobil-price.model';
import { formatDate } from '../../utils/date-utils';

@Component({
  selector: 'app-edit-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-job-application.component.html',
  styleUrl: './edit-job-application.component.scss'
})
export class EditJobApplicationComponent implements OnInit {
  jobApplication!: JobApplication;
  statusEnum = JobApplicationStatus;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private jobAppApiService: JobAppApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.jobAppApiService.getJobApplicationById(id).subscribe(app => {
        if (app.applicationDate) {
          // Convert to YYYY-MM-DD if necessary
          const date = new Date(app.applicationDate);
          app.applicationDate = formatDate(date);
        }
        this.jobApplication = app;
      });
    }
  }

  updateJobApplication(): void {
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.jobAppApiService.updateJobApplication(this.jobApplication.id, this.jobApplication).subscribe({
      next: (updated) => {
        this.isSubmitting = false;
        this.successMessage = 'Job application updated successfully!';
        this.jobApplication = updated;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to update job application. ' + err.message;
      }
    });
  }

  onSubmit(): void {
    // Validate all fields
    if (!this.jobApplication.company || !this.jobApplication.position || !this.jobApplication.status || !this.jobApplication.applicationDate) {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = null;
      return;
    }
    this.updateJobApplication();
  }


  getStatusKeys(): (keyof typeof JobApplicationStatus)[] {
    return Object.keys(this.statusEnum).filter(key => isNaN(Number(key))) as (keyof typeof JobApplicationStatus)[];
  }
}
