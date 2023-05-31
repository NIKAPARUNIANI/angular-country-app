import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import countryList from '../../assets/data.json';
import { ThemeService } from '../theme.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  darkTheme: boolean = false;
  public country: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private location: Location
  ) { }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.country = countryList.find((country: any) => country.name === countryName);
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }

  goBack(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const option = queryParams.get('option');
    const search = queryParams.get('search');
  
    this.router.navigate(['/home'], { queryParams: { option, search } });
  }  
}