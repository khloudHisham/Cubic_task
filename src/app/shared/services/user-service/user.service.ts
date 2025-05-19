import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient:HttpClient) { }
  
getAllUsers():Observable<any>
  {
return this.httpClient.get('https://fake-json-api.mock.beeceptor.com/users')
  }

   getSpecificUser(id:number):Observable<any>
  {
return this.httpClient.get(`https://fake-json-api.mock.beeceptor.com/users/${id}`)
  }
}
