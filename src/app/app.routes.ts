import { Routes } from '@angular/router';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { UsersComponent } from './pages/users/users.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BlankComponent } from './layouts/blank-layout/blank.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customer-form', pathMatch: 'full' },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'customer-form',
        component: CustomerFormComponent,
        title: 'Customer form',
      },
      { path: 'users', component: UsersComponent, title: 'All users' },
      {
        path: 'user/:id',
        component: UserDetailsComponent,
        title: 'user details',
      },
      { path: '**', component: NotfoundComponent },
    ],
  },
];
