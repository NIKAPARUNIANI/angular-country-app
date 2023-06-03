import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import countryList from '../../assets/data.json';
import { ThemeService } from '../theme.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public darkTheme: boolean = false;
  public isOpen: boolean = false;
  public selectedOption: string = 'All';
  public options: string[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public countries: Country [] = countryList;
  public searchText: string = '';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedOption = params.get('option') || 'All';
      this.searchText = params.get('search') || '';
    });
  
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }

  public get filteredCountries(): any[] {
    if (!this.searchText && this.selectedOption === 'All') {
      return this.countries;
    }
  
    const normalizedSearchText = this.searchText.toLowerCase();
    return this.countries.filter((country: any) => {
      const nameMatches = country.name.toLowerCase().includes(normalizedSearchText);
      const regionMatches = this.selectedOption === 'All' || country.region === this.selectedOption;
      return nameMatches && regionMatches;
    });
  }

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.goToFilteredResults();
  }

  public selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.goToFilteredResults();
  }  

  public goToFilteredResults(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        option: this.selectedOption,
        search: this.searchText
      },
      queryParamsHandling: 'merge'
    });
  }  

  public openCountryDetails(country: any) {
    this.router.navigate(['/country-details', country.name], {
      queryParams: {
        option: this.selectedOption,
        search: this.searchText
      }
    });
  }  
  
  public updateSearchText(): void {
    this.goToFilteredResults();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuContainer = document.querySelector('.filter');

    if (menuContainer && !menuContainer.contains(target)) {
      this.isOpen = false;
    }
  }
}