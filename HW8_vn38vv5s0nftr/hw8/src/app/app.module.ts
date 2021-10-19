import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';
import { WeeklyWeatherComponent } from './weekly-weather/weekly-weather.component'; 

import { HttpClientModule } from '@angular/common/http';
import { TempChartComponent } from './temp-chart/temp-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WeeklyWeatherComponent,
    TempChartComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
