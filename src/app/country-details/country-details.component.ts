import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import countryList from '../../assets/data.json';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  darkTheme: boolean = false;
  public country: any;

  constructor(private route: ActivatedRoute, private themeService: ThemeService) { }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.country = countryList.find((country: any) => country.name === countryName);
    this.themeService.darkTheme.subscribe(theme => {
      this.darkTheme = theme;
    });
  }
}