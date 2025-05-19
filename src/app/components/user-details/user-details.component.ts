import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user-service/user.service';
import { Iuser } from '../../shared/interfaces/Iuser/iuser';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  detailsUser: Iuser | null = null;
  isLoading = true;
error: string | null = null;
  constructor() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getSpecificUser(id).subscribe({
      next: user => {
        this.detailsUser = user;
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}