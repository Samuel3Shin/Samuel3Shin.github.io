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
  latitude: any;
  longitude: any;
  
  resultExist = false;
  isProgressBar = false;
  isFavorite = false;
  isError = true;

  constructor(private http: HttpClient) { }

  getEventThanks(event: any){
    console.log(event);
  }

  getProgress(event: any){
    this.isProgressBar = event;
  }

  getClear(event: any){
    if(event == true) {
      this.resultExist = false;
      this.isProgressBar = false;
      this.isFavorite = false;
    }
  }

  clickResult() {
    this.resultExist = true;
    this.isFavorite = false;
    // this.sendIsFavorite.emit(true);
    // this.sendMyEvent.emit("Favorite clicked!");
  }

  clickFavorite() {
    this.resultExist = false;
    this.isFavorite = true;
    // this.sendIsFavorite.emit(true);
    // this.sendMyEvent.emit("Favorite clicked!");
  }

  async getErrorOccurred(event: any) {
    if(event == "error_occurred") {
      this.isProgressBar = false;
      this.resultExist = true;
      this.isError = true;
      this.isFavorite = false;
    }
  }

  async getAddress(event: any) {
    // const state = event.split("/")[0];
    // const city = event.split("/")[1];

    this.address = event;
  }

  async getLatLng(event: any) {
    const lat = event.split(",")[0];
    const lng = event.split(",")[1];

    this.latitude = lat;
    this.longitude = lng;
    
    console.log(lat);
    console.log(lng);
    // const response = await fetch(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`);
    // const json_data = await response.json();

    // console.log(json_data);

    this.http.get<any>(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`).subscribe({
      next: json_data => {
          console.log(json_data["data"]["timelines"][2]["intervals"][0]["values"]["precipitationType"]);
          // console.log(typeof(JSON.stringify(json_data)));
          this.weather_data = JSON.stringify(json_data);
          this.isProgressBar = false;
          this.resultExist = true;
          this.isError = false;
          this.isFavorite = false;
          // console.log(json_data["data"]);
      },
      error: error => {
        this.isProgressBar = false;
        this.resultExist = true;
        this.isError = true;
        this.isFavorite = false;
        
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }
}
