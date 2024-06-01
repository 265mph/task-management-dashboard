import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeletedComponent } from './components/deleted/deleted.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/Dashboard",
    pathMatch: "full"
  },
  {
    path: "Dashboard",
    component: DashboardComponent
  },
  {
    path: "Deleted",
    component: DeletedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
