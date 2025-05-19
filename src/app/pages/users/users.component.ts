import { Component, inject, OnInit, } from '@angular/core';
import { Iuser } from '../../shared/interfaces/Iuser/iuser';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user-service/user.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

private readonly userService=inject(UserService);
users:Iuser[]=[];
 getUsersData():void{
this.userService.getAllUsers().subscribe({
  next:(res)=>{
console.log(res);
this.users=res;
    },
   error:(err)=>{console.log(err)}
  })
 }
ngOnInit(): void {
  this.getUsersData();
}}
