import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  darkTheme: boolean = false;
  isLoggedIn: boolean = false;
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
    this.userService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.showMenu = false;
  }

  darkThemeToggle() {
    this.themeService.toggleDarkTheme();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  signOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.updateLocalStorage();
    this.showMenu = false;
    this.router.navigate(['/home']);
  }
}