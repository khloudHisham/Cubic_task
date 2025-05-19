import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersMap = new Map<number, any>();
  private usersLoaded = false;
  private users$?: Observable<any[]>;

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    if (this.usersLoaded) {
      return of(Array.from(this.usersMap.values()));
    }

    if (!this.users$) {
      this.users$ = this.httpClient.get<any[]>('https://fake-json-api.mock.beeceptor.com/users').pipe(
        tap(users => {
          users.forEach(user => this.usersMap.set(user.id, user));
          this.usersLoaded = true;
        }),
        shareReplay(1) 
      );
    }
    
    return this.users$;
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
