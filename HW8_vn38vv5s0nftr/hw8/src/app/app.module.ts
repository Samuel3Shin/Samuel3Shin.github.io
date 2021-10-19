import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HighchartsChartModule } from 'highcharts-angular';

import { WeeklyWeatherComponent } from './weekly-weather/weekly-weather.component'; 
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
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
