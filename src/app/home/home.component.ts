import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import countryList from '../../assets/data.json';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  darkTheme: boolean = false;

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
  public countries: {
    name: string,
    population: number,
    region: string,
    capital: string,
    flags: any,
    svg: string
  }[] = countryList;

  public searchText: string = '';

  get filteredCountries(): any[] {
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

  

  isOpen = false;
  selectedOption: string = 'All';
  options: string[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.goToFilteredResults();
  }
  

  selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.goToFilteredResults();
  }  

  goToFilteredResults(): void {
    this.router.navigate(['/home'], {
      queryParams: {
        option: this.selectedOption,
        search: this.searchText
      },
      queryParamsHandling: 'merge'
    });
  }  


  openCountryDetails(country: any) {
    this.router.navigate(['/country-details', country.name], {
      queryParams: {
        option: this.selectedOption,
        search: this.searchText
      }
    });
  }  
  
  updateSearchText(): void {
    this.goToFilteredResults();
  }
}