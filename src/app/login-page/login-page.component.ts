import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ThemeService } from '../theme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginObj: any = {
    userName: '',
    password: ''
  };

  isLoggedIn = false;

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(private userService: UserService, private themeService: ThemeService, private router: Router) {}

  onLogin() {
    const isUserExist = this.userService.checkUserExist(this.loginObj.userName, this.loginObj.password);
    if (isUserExist) {
      this.userService.addUser(this.loginObj);
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    } else {
      alert('User does not exist');
    }
  }

  darkTheme: boolean = false;

  ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }
}