import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginUserService {

  constructor(protected localStorage: LocalStorage) { }
  users = [{ username: 'admin', password: 'password' },
  { username: 'studv1', password: 'pass123' },
  { username: 'studv2', password: 'pass123' },
  { username: 'teachv1', password: 'pass123' }];

  value: Boolean = false;
  private subject = new Subject<any>();

  sendData(message: string) {
    this.subject.next(message);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
  setUSers() {
    return this.localStorage.setItem('users', this.users).delay(2000);
  };

  getUsers() {
    return this.localStorage.getItem('users').delay(2000);
  }

  isLoggedIn() {
    return this.localStorage.getItem('loggedIn').delay(2000);
  }

  logIn(key) {
    return this.localStorage.setItem('loggedIn', key).delay(2000);
  }

}
