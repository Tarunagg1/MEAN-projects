import { Routes } from '@angular/router';
import { ManageCategoryComponent } from '../components/manage-category/manage-category.component';
import { ManageProductComponent } from '../components/manage-product/manage-product.component';
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
  {
    path: 'product',
    component: ManageProductComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['admin']
    },
  },

];
