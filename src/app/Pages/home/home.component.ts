import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAppApiService } from '../../Services/job-app-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobApplications: any[] = [];

  constructor(private jobAppApiService: JobAppApiService) {}

  ngOnInit(): void {
    this.jobAppApiService.getJobApplications().subscribe((data: any[]) => {
      this.jobApplications = data;
    });
    // Fetching is handled by async pipe, but you can trigger here if needed
  }
}

