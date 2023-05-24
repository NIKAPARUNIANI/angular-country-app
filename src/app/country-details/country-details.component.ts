import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import countryList from '../../assets/data.json';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public country: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.country = countryList.find((country: any) => country.name === countryName);
  }
}