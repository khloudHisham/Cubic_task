import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank-layout/blank.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

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
