import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobAppApiService } from '../../Services/job-app-api.service';
import { JobApplication, JobApplicationStatus } from '../../Models/mobil-price.model';
import { formatDate } from '../../utils/date-utils';

@Component({
  selector: 'app-add-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-job-application.component.html',
  styleUrls: ['./add-job-application.component.scss']
})
export class AddJobApplicationComponent implements OnInit {
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
    this.jobApplication = {
      id: 0,
      company: '',
      position: '',
      status: JobApplicationStatus.Applied,
      applicationDate: formatDate(new Date()),
      created: new Date(),
      updated: new Date()
    };
  }

  addJobApplication(): void {
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    this.jobAppApiService.addJobApplication(this.jobApplication).subscribe({
      next: (created) => {
        this.successMessage = 'Job application added successfully!';
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to add job application. ' + err.message;
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
    this.addJobApplication();
  }

  getStatusKeys(): (keyof typeof JobApplicationStatus)[] {
    return Object.keys(this.statusEnum).filter(key => isNaN(Number(key))) as (keyof typeof JobApplicationStatus)[];
  }
}
