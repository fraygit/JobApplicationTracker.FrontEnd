import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AddJobApplicationComponent } from './Pages/add-job-application/add-job-application.component';
import { EditJobApplicationComponent } from './Pages/edit-job-application/edit-job-application.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'add-application',
    component: AddJobApplicationComponent
  },
  {
    path: 'edit-application/:id',
    component: EditJobApplicationComponent
  }
];
