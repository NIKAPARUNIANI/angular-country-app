import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public darkTheme: boolean = false;
  public isLoggedIn: boolean = false;
  public isOpen: boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    public userService: UserService
  ) {}

  public ngOnInit() {
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
    this.userService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.isOpen = false;
  }
  public darkThemeToggle() {
    this.themeService.toggleDarkTheme();
  }
  public toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  public signOut() {
    this.userService.isLoggedIn.next(false);
    this.userService.updateLocalStorage();
    this.isOpen = false;
    this.router.navigate(['/home']);
  }
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuContainer = document.querySelector('.menu-container');

    if (menuContainer && !menuContainer.contains(target)) {
      this.isOpen = false;
    }
  }
}