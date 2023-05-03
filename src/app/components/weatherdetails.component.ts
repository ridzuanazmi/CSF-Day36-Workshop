import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy {

  openweatherApiKey: string = environment.openWeatherApiKey;
  private city: string = "London";
  // private country!: string;
  // private imageUrl!: string;

  param$!: Subscription;
  model = new Weather(this.city, 0, 0, 0, "", "", 0, 0);

  constructor(private weatherSrvc: WeatherService, private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.city = params['city']
      }
    )
    this.getWeatherDetailsFromAPI(this.city);
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
  }

  getWeatherDetailsFromAPI(city: string) {
    this.weatherSrvc.getWeather(city, this.openweatherApiKey)
      .then((result) => {
        console.log(result);
        const cityObj = this.weatherSrvc.getCityUrl(city);
        this.model = new Weather(
          city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityObj!.imageUrl,
          result.wind.degree,
          result.wind.speed
        )
      }).catch((err) => {
        console.log(err);
        this.router.navigate(['']);
      })
  }
}
