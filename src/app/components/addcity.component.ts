import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { City } from '../model/city';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  country!: string;
  city!: string;
  imageUrl!: string;
  cityObj!: City;

  constructor(private fb: FormBuilder, private router: Router,
    private weatherSrvc: WeatherService) {

  }

  add() {
    this.country = this.form?.value["countryName"] // the question mark means it can be null or undefined
    this.city = this.form?.value["city"] // the question mark means it can be null or undefined
    this.imageUrl = this.form?.value["imageUrl"] // the question mark means it can be null or undefined
    this.cityObj = { country: this.country, city: this.city, imageUrl: this.imageUrl }
    this.weatherSrvc.addCity(this.cityObj);
    this.router.navigate(['/']); 
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    
  }

  private createForm(): FormGroup {
    return this.fb.group({
      countryName: this.fb.control(''),
      city: this.fb.control(''),
      imageUrl: this.fb.control('')
    })
  }
}
