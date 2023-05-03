import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./listcities.component.css']
})
export class ListcitiesComponent implements OnInit {

  cities: any;

  constructor(private weatherSrvc: WeatherService){

  }

  ngOnInit(): void {
    this.weatherSrvc.sortCities();
    this.cities = this.weatherSrvc.countries;    
  }

}
