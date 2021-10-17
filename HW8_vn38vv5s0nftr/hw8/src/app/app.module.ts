import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';
import { WeeklyWeatherComponent } from './weekly-weather/weekly-weather.component'; 

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WeeklyWeatherComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
