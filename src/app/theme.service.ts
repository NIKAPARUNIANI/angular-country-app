import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public darkTheme = this.darkThemeSubject.asObservable();

  constructor() {
    const storedTheme = localStorage.getItem('darkTheme');

    if (storedTheme !== null) {
      this.darkThemeSubject.next(storedTheme === 'true');
    }
  }

  toggleDarkTheme() {
    const currentTheme = this.darkThemeSubject.getValue();
    const newTheme = !currentTheme;
    this.darkThemeSubject.next(newTheme);

    localStorage.setItem('darkTheme', newTheme.toString());
  }
}