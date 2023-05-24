import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkTheme = this.darkThemeSubject.asObservable();

  constructor() {}

  toggleDarkTheme() {
    const currentTheme = this.darkThemeSubject.getValue();
    this.darkThemeSubject.next(!currentTheme);
  }
}
