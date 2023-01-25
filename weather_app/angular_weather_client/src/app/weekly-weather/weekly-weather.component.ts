import { BinaryOperator } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Utils } from '../utils';

var util = new Utils();

interface WeatherInfo {
  date: string;
  status_img: string;
  status_txt: string;
  high_temp: string;
  low_temp: string;
  wind_speed: string;
}

@Component({
  selector: 'app-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {
  @Input() json_data: any;
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();
  @Output() sendDetailTrigger : EventEmitter<any> = new EventEmitter();

  weatherInfo: WeatherInfo[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.json_data = JSON.parse(this.json_data);
    // this.sendMyEvent.emit(this.json_data['data']);
  }

  onItemClick(event: any){
    // alert("Event type: " + event.toDateString());
    this.sendDetailTrigger.emit(event);
    // return (event.target as HTMLInputElement).value;
  }


  ngOnChanges() {
    if(this.json_data != null) {
        this.json_data = JSON.parse(this.json_data);
        this.sendMyEvent.emit(this.json_data['data']);
        
        for(var i=0; i<this.json_data["data"]["timelines"][2]["intervals"].length; ++i) {
            var date = new Date(this.json_data["data"]["timelines"][2]["intervals"][i]["startTime"]);
    
            // var clickElement = board.getElementsByClassName("date")[0] as HTMLElement;
            // clickElement.addEventListener("click", this.onItemClick.bind(this, date));

            const [weather_icon_img_dir, weather_icon_text] = util.weatherCodeMapper(this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["weatherCode"], false);
            
            this.weatherInfo?.push({
              date: util.weekday[date.getDay()] + ", " + date.getDate() + " " + util.month[date.getMonth()] + " " + date.getFullYear(),
              status_img: weather_icon_img_dir,
              status_txt: weather_icon_text,
              high_temp: this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMax"],
              low_temp: this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMin"],
              wind_speed: this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["windSpeed"]
            });

        }
    }
  }
}
