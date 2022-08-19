import { Routes } from '@angular/router';
import { ManageCategoryComponent } from '../components/manage-category/manage-category.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../guard/auth.guard';

export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['admin']
    },
  },
];
