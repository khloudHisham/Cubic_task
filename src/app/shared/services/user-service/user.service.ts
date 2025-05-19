import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersMap = new Map<number, any>();
  private usersLoaded = false;


  constructor(private httpClient: HttpClient) { }
  

getAllUsers(): Observable<any[]> {
  if (this.usersLoaded) {
    return of(Array.from(this.usersMap.values()));
  }

  return this.httpClient.get<any[]>('https://fake-json-api.mock.beeceptor.com/users').pipe(
    tap((users: any[]) => {
      users.forEach(user => this.usersMap.set(user.id, user));
      this.usersLoaded = true;
    }),
    tap(() => console.log('Fetched users from API')),
  );
}

  

getSpecificUser(id: number): Observable<any> {
  const cachedUser = this.usersMap.get(id);
  if (cachedUser) {
    return of(cachedUser);
  }

  return this.httpClient.get<any>(`https://fake-json-api.mock.beeceptor.com/users/${id}`).pipe(
    tap(user => this.usersMap.set(user.id, user))
  );
}

}