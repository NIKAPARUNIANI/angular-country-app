import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private signupUsers: any[] = [];
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInUser: any;

  constructor() {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    this.isLoggedIn.next(localStorage.getItem('isLoggedIn') === 'true');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  addUser(user: any) {
    this.signupUsers.push(user);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.isLoggedIn.next(true);
    this.loggedInUser = user;
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('isLoggedIn', this.isLoggedIn.getValue().toString());
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
  }

  checkUserExist(username: string, password: string): boolean {
    const isUserExist = this.signupUsers.find(user => user.userName === username && user.password === password);
    return isUserExist !== undefined;
  }
}