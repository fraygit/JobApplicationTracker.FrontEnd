import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobAppApiService } from '../../Services/job-app-api.service';
import { JobApplication, JobApplicationStatus } from '../../Models/mobil-price.model';

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

  constructor(
    private route: ActivatedRoute,
    private jobAppApiService: JobAppApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.jobAppApiService.getJobApplicationById(id).subscribe(app => {
        this.jobApplication = app;
      });
    }
  }

  getStatusKeys(): (keyof typeof JobApplicationStatus)[] {
    return Object.keys(this.statusEnum).filter(key => isNaN(Number(key))) as (keyof typeof JobApplicationStatus)[];
  }
}
