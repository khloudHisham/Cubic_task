import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../shared/services/user-service/user.service';
import { Iuser } from '../../shared/interfaces/Iuser/iuser';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [], 
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  detailsUser: Iuser | null = null;
  isLoading = true;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const userId = params.get('id');
        
        if (userId) {
          this.userService.getSpecificUser(+userId).subscribe({
            next: (res) => {
                  console.log('Response from API:', res); 

              this.detailsUser = res;
              this.isLoading = false;
            },
            error: (err) => {
              this.error = 'Failed to load user details';
              this.isLoading = false;
              console.error(err);
            }
          });
        } else {
          this.error = 'User ID not provided';
          this.isLoading = false;
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}