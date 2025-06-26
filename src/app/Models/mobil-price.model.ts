export enum JobApplicationStatus {
  Applied = 1,
  Interview = 2,
  Offer = 3,
  Accepted = 4,
  Rejected = 5
}

export class JobApplication {
  company!: string;
  position!: string;
  status!: JobApplicationStatus;
  applicationDate!: any;
  id!: number;
  created!: Date;
  updated!: Date;
}

