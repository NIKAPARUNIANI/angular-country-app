import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ThemeService } from '../theme.service';
import { Location } from '@angular/common';
import countryList from '../../assets/data.json';
import { detailCountry } from '../models/detailCountry.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public darkTheme: boolean = false;
  public country!: detailCountry;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const countryName = params.get('countryName');
      this.country = countryList.find((country: detailCountry) => country.name === countryName);
    });

    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      const option = queryParams.get('option');
      const search = queryParams.get('search');
    });

    this.themeService.darkTheme.subscribe((theme: boolean) => {
      this.darkTheme = theme;
    });
  }

  public goBack(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    const option = queryParams.get('option');
    const search = queryParams.get('search');
    this.router.navigate(['/home'], { queryParams: { option, search } });
  }

  public navigateToCountry(countryName: string): void {
    if (countryName !== 'None') {
      this.router.navigate(['/country-details', countryName], {
        queryParams: {
          option: this.route.snapshot.queryParamMap.get('option'),
          search: this.route.snapshot.queryParamMap.get('search')
        }
      });
    }
  }  

  public getFullBorders(): string[] {
    const borders: string[] = [];
    if (this.country && this.country.borders) {
      for (const borderCode of this.country.borders) {
        const borderCountry = countryList.find((country: detailCountry) => country.cioc === borderCode);
        if (borderCountry) {
          borders.push(borderCountry.name);
        }
      }
    }
    return borders.length > 0 ? borders : ['None'];
  }
}