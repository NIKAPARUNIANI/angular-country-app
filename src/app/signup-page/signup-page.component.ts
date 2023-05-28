import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ThemeService } from '../theme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };

  signupForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(private userService: UserService, private themeService: ThemeService, private router: Router) {}


  onSignUp() {
    if (this.signupForm.valid) {
      this.userService.addUser(this.signupObj);
      this.signupForm.reset();
      this.router.navigate(['/home']);
    }
  }
  

  darkTheme: boolean = false;

  ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }
}