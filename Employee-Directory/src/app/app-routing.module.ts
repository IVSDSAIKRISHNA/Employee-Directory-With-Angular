import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtongroupComponent } from './buttongroup/buttongroup.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: ' ', redirectTo: 'employeelist', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/app.component').then((mod) => mod.AppComponent),
  },
  { path: 'buttongroup', component: ButtongroupComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'stats', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
