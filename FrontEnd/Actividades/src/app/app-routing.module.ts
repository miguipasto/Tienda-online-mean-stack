import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateActivitiesComponent } from './components/create-activities/create-activities.component';
import { UpdateActivitiesComponent } from './components/update-activities/update-activities.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'createActivities', component: CreateActivitiesComponent },
  { path: 'updateActivities', component: UpdateActivitiesComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 
export class AppRoutingModule { }