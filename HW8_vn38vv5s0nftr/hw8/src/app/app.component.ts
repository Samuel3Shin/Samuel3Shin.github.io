import { Component } from '@angular/core';
import fetch from 'node-fetch';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hw8';
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getEventThanks(event: any){
    console.log(event);
  }


  async getLatLng(event: any) {
    
    const lat = event.split(" ")[0];
    const lng = event.split(" ")[1];
    console.log(lat);
    console.log(lng);
    // const response = await fetch(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`);
    // const json_data = await response.json();

    // console.log(json_data);

    this.http.get<any>(`http://localhost:8080/weather?lat=${lat}&lng=${lng}`).subscribe({
      next: json_data => {
          console.log(json_data["data"]["timelines"][2]["intervals"][0]["values"]["precipitationType"]);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })

  }
}


