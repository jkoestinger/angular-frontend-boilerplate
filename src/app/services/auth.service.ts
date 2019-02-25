import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import {tap, flatMap} from 'rxjs/operators'
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn = new BehaviorSubject<boolean>(false)
  public readonly loggedIn = this._loggedIn.asObservable()

  public urlAfterLogin = false


  private _user = new BehaviorSubject<User>(null)
  public readonly user = this._user.asObservable()

  constructor(private api: ApiService, private router: Router) {
    const user = localStorage.getItem(USER_KEY)
    const token = localStorage.getItem(TOKEN_KEY)
    this.api.token = token
    this._user.next(JSON.parse(user))
    if(!!user) {
      this._loggedIn.next(true)
    }
  }

  logout() {
    this._user.next(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
    this._loggedIn.next(false)
    this.api.token = null
    this.router.navigate(['/'])
  }

  login(username: string, password: string) {
    // Getting the JWT
    return this.api.post<{access: string, refresh: string}>('login/', {
      username,
      password
    }).pipe(
      tap(data => {
        localStorage.setItem(TOKEN_KEY, data.access)
        this.api.token = data.access
      }),
      flatMap(data => {
        // Getting the user data
        return this.api.get<User>('user/')
      }),
      tap(data => {
        this._loggedIn.next(true)
        localStorage.setItem(USER_KEY, JSON.stringify(data))
        this._user.next(data)
        this.router.navigate([this.urlAfterLogin ? this.urlAfterLogin : '/'])
        this.urlAfterLogin = false
      })
    )
  }
}
