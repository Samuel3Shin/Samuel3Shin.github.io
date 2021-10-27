import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nav-tab';

  errorMessage: any;
  weather_data: any;
  address: string | undefined;
  
  resultExist = false;
  isProgressBar = false;

  constructor(private http: HttpClient) { }

  getEventThanks(event: any){
    console.log(event);
  }

  getProgress(event: any){
    this.isProgressBar = event;
  }

  async getAddress(event: any) {
    // const state = event.split("/")[0];
    // const city = event.split("/")[1];

    this.address = event;
  }

  async getLatLng(event: any) {
    const lat = event.split(" ")[0];
    const lng = event.split(" ")[1];
    console.log(lat);
    console.log(lng);
    // const response = await fetch(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`);
    // const json_data = await response.json();

    // console.log(json_data);

    //TODO: I need to pass json data to child component

    this.http.get<any>(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`).subscribe({
      next: json_data => {
          console.log(json_data["data"]["timelines"][2]["intervals"][0]["values"]["precipitationType"]);
          // console.log(typeof(JSON.stringify(json_data)));
          this.weather_data = JSON.stringify(json_data);
          this.isProgressBar = false;
          this.resultExist = true;
          // console.log(json_data["data"]);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })

  }
}
