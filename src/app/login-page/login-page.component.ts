import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ThemeService } from '../theme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../models/login.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public darkTheme: boolean = false;
  public loginObj: login = {
    userName: '',
    password: ''
  };
  public isLoggedIn: boolean = false;
  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  })
  constructor(private userService: UserService, private themeService: ThemeService, private router: Router) {}
  ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }
  public onLogin() {
    const isUserExist: boolean = this.userService.checkUserExist(this.loginObj.userName, this.loginObj.password);
    if (isUserExist) {
      this.userService.isLoggedIn.next(true);
      this.userService.loggedInUser = this.loginObj;
      this.userService.updateLocalStorage();
      this.router.navigate(['/home']);
    } else {
      alert('User does not exist');
    }
  }

  public goBack(): void {
    this.router.navigate(['/home']);
  }
}