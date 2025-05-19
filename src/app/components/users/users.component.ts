import { Component, inject, OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user-service/user.service';
import { Iuser } from '../../shared/interfaces/Iuser/iuser';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: true
})
export class UsersComponent {
  private readonly userService = inject(UserService);
  users: Iuser[] = [];

  constructor() {
    this.userService.getAllUsers().subscribe({
      next: users => this.users = users,
      error: err => console.error(err)
    });
  }
}