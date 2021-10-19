import { BinaryOperator } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Utils } from './../utils';

var util = new Utils();

@Component({
  selector: 'app-weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {
  @Input() json_data: any;
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    if(this.json_data != null) {
        this.json_data = JSON.parse(this.json_data);
        this.sendMyEvent.emit(this.json_data['data']);

        var weekly_weather_cards = document.getElementsByClassName("weekly_weather_card");
        
        for(var i=0; i<this.json_data["data"]["timelines"][2]["intervals"].length; ++i) {
            var board = weekly_weather_cards[i];

            
            // board.style.visibility = "visible";
    
            // board.addEventListener("click", showWeeklyWeather(json_data, i));
            board.getElementsByClassName("idx")[0].innerHTML = (i+1) + "";

            var date = new Date(this.json_data["data"]["timelines"][2]["intervals"][i]["startTime"]);
    
            board.getElementsByClassName("date")[0].innerHTML  = util.weekday[date.getDay()] + ", " + date.getDate() + " " + util.month[date.getMonth()] + " " + date.getFullYear();
            
            const [weather_icon_img_dir, weather_icon_text] = util.weatherCodeMapper(this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["weatherCode"], false);
            
            // $("#status_img").attr("src", weather_icon_img_dir);
            var img_set = board.getElementsByClassName("status_img")[0] as HTMLImageElement;
            img_set.src = weather_icon_img_dir;

            board.getElementsByClassName("status")[0].innerHTML = weather_icon_text;
    
            board.getElementsByClassName("temp_high")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMax"];
            board.getElementsByClassName("temp_low")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMin"];
            board.getElementsByClassName("wind_speed")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["windSpeed"];
            
        }

    }
    
  }

}
