import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations'
import * as $ from 'jquery';

import { Utils } from './../utils';

var util = new Utils();

interface WeatherDetail {
  name: string;
  value: string;
}

@Component({
  selector: 'app-result-tab',
  templateUrl: './result-tab.component.html',
  styleUrls: ['./result-tab.component.css'],
  animations: [
    // trigger('slideRight', [
    //   transition(':enter',      [
    //     style({ position: 'fixed', width: '100%', transform: 'translateX(-100%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
    //   ]),
    //   transition(':leave', [
    //     style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
    //   ])
    // ]),

    // trigger('slideLeft', [
    //   transition(':enter',      [
    //     style({ position: 'fixed', width: '100%', transform: 'translateX(100%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
    //   ]),
    //   transition(':leave', [
    //     style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
    //   ])
    // ])


    trigger('slideWeekly', [
      transition(':enter',      [
        style({ position: 'fixed', width: '100%', transform: 'translateX(-100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      
      transition(':leave', [
        style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
      ])
    ]),

    trigger('slideDetail', [
      transition(':enter',      [
        style({ position: 'fixed', width: '100%', transform: 'translateX(100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
      ])
    ])
  ]
})
export class ResultTabComponent implements OnInit {
  @Input() json_data: any;
  @Input() address_data: any;
  @Input() lat: any;
  @Input() lng: any;
  @Input() isError_data: any;

  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();

  weatherDetails: WeatherDetail[] = [];
  isError = false;
  
  weather_data: any;
  address: string | undefined;
  isDetail = false;
  idx: any;
  date: any;

  latitude: any;
  longitude: any;

  favorite_icon = "star_border";
  favoriteAdded = false;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() { 
    // if(this.json_data != null) {
      this.isError = this.isError_data;
      this.weather_data = this.json_data;
      this.address = this.address_data;

      this.latitude = parseFloat(this.lat);
      this.longitude = parseFloat(this.lng);

      this.sendMyEvent.emit("lat: " + this.latitude + " lng: " + this.longitude);
      // this.sendMyEvent.emit(this.weather_data);
    // }
  }

  getDetailTrigger(event: any) {
    if(!this.isDetail) {
      this.isDetail = true;
      this.idx = event;
      // this.sendMyEvent.emit(this.weather_data);

      var data = JSON.parse(this.weather_data);
      var date_obj = new Date(data["data"]["timelines"][2]["intervals"][this.idx]["startTime"]);

      this.date = util.weekday[date_obj.getDay()] + ", " + date_obj.getDate() + " " + util.month[date_obj.getMonth()] + " " + date_obj.getFullYear();
      
      const [weather_icon_img_dir, weather_icon_text] = util.weatherCodeMapper(data["data"]["timelines"][2]["intervals"][this.idx]["values"]["weatherCode"], false);
            
      this.weatherDetails.push({
        name: "Status",
        value: weather_icon_text
      })

      this.weatherDetails.push({
        name: "Max Temperature",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["temperatureMax"] + " °F"
      })

      this.weatherDetails.push({
        name: "Min Temperature",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["temperatureMin"] + " °F"
      })

      this.weatherDetails.push({
        name: "Apparent Temperature",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["temperatureApparent"] + " °F"
      })

      this.weatherDetails.push({
        name: "Sun Rise Time",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["sunriseTime"].slice(11, -6)
      })

      this.weatherDetails.push({
        name: "Sun Set Time",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["sunsetTime"].slice(11, -6)
      })

      this.weatherDetails.push({
        name: "Humidity",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["humidity"] + " %"
      })

      this.weatherDetails.push({
        name: "Wind Speed",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["windSpeed"] + " mph"
      })

      this.weatherDetails.push({
        name: "Visibility",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["visibility"] + " mi"
      })

      this.weatherDetails.push({
        name: "Cloud Cover",
        value: data["data"]["timelines"][2]["intervals"][this.idx]["values"]["cloudCover"] + " %"
      })

      // alert(event);

      if(this.favoriteAdded) $("#star_icon").css("color", "#feda00");
    }
    
    // const state = event.split("/")[0];
    // const city = event.split("/")[1];

    // this.address = state + " " + city;
  }

  listClick() {
    this.isDetail = false;
    this.weatherDetails = [];
    // alert(this.isDetail);
  }

  twit() {
    var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    window.open(`https://twitter.com/intent/tweet?text=The temperature in ${this.address} on ${this.date} is ${this.weatherDetails[3]["value"]}. The weather conditions are ${this.weatherDetails[0]["value"]} %23CSCI571WeatherSearch`, "", strWindowFeatures);
    // alert("twit!");
  }

  addFavorite() {
    // alert("star button clicked!");


    // adding favorite
    if(!this.favoriteAdded) {
      var saved_items = JSON.parse(localStorage.getItem("favorites")!);
      if(saved_items == null) {
        saved_items = [];
      }

      saved_items.push(this.latitude + "," + this.longitude + "," + this.address);
  
      localStorage.setItem("favorites", JSON.stringify(saved_items));
      console.log(JSON.stringify(saved_items));

      this.favorite_icon = "star";
      this.favoriteAdded = !this.favoriteAdded;
      $("#star_icon").css("color", "#feda00");

    } else {
      var saved_items = JSON.parse(localStorage.getItem("favorites")!);

      saved_items.forEach((element: string,index: any)=>{
        if(element==this.latitude + "," + this.longitude + "," + this.address) saved_items.splice(index,1);
      });

      localStorage.setItem("favorites", JSON.stringify(saved_items));
      console.log(JSON.stringify(saved_items));
      this.favorite_icon = "star_border";
      this.favoriteAdded = !this.favoriteAdded;
      $("#star_icon").css("color", "black");
    }

    // if(this.favorite_icon == "star_border") {
    //   this.favorite_icon = "star";
    // } else {
    //   this.favorite_icon = "star_border";
    // }

  }

  
}
