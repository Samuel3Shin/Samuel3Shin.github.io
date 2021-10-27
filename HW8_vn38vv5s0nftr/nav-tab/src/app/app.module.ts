import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { HighchartsChartModule } from 'highcharts-angular';

import { ResultTabComponent } from './result-tab/result-tab.component';
import { SearchComponent } from './search/search.component';
import { WeeklyWeatherComponent } from './weekly-weather/weekly-weather.component';
import { TempChartComponent } from './temp-chart/temp-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DemoMaterialModule} from './material-module';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ResultTabComponent,
    SearchComponent,
    WeeklyWeatherComponent,
    TempChartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatTabsModule,
    DemoMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6wzX7VVJILzNoa2cbSUebst5BmBOLzEA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
