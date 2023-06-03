import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ThemeService } from '../theme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from '../models/login.model';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  public signupObj: signup = {
    userName: '',
    email: '',
    password: ''
  };
  public signupForm: FormGroup = new FormGroup({
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
  public darkTheme: boolean = false;

  constructor(private userService: UserService, private themeService: ThemeService, private router: Router) {}

  ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }
  
  public onSignUp() {
    if (this.signupForm.valid) {
      this.userService.addUser(this.signupObj);
      this.signupForm.reset();
      this.router.navigate(['/home']);
    }
  }

  public goBack(): void {
    this.router.navigate(['/home']);
  }  
}