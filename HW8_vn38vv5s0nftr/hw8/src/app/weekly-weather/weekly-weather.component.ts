import { BinaryOperator } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// weekday, month mapping
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";


function weatherCodeMapper(weather_code: any, is_sunset=false) {
  var weather_icon_img_dir = "../../assets/clear_night.svg";
  var weather_icon_text = "clear";

  switch (weather_code) {
      case 1000:
          weather_icon_img_dir = "../../assets/clear_day.svg"
          weather_icon_text = "Clear";
          break;
      case 1101:
          weather_icon_img_dir = "../../assets/partly_cloudy_day.svg"
          weather_icon_text = "Partly Cloudy";
          break;
      case 1100:
          weather_icon_img_dir = "../../assets/mostly_clear_day.svg"
          weather_icon_text = "Mostly Clear";
          break;
      case 1001:
          weather_icon_img_dir = "../../assets/cloudy.svg"
          weather_icon_text = "Cloudy";
          break;
      case 1102:
          weather_icon_img_dir = "../../assets/mostly_cloudy.svg"
          weather_icon_text = "Mostly Cloudy";
          break;
      case 2000:
          weather_icon_img_dir = "../../assets/fog.svg"
          weather_icon_text = "Fog";
          break;
      case 2100:
          weather_icon_img_dir = "../../assets/fog_light.svg"
          weather_icon_text = "Light Fog";
          break;
      case 3000:
          weather_icon_img_dir = "../../assets/light_wind.svg"
          weather_icon_text = "Light Wind";
          break;
      case 3001:
          weather_icon_img_dir = "../../assets/wind.svg"
          weather_icon_text = "Wind";
          break;
      case 3002:
          weather_icon_img_dir = "../../assets/strong_wind.svg"
          weather_icon_text = "Strong Wind";
          break;
      case 4000:
          weather_icon_img_dir = "../../assets/drizzle.svg"
          weather_icon_text = "Drizzle";
          break;
      case 4001:
          weather_icon_img_dir = "../../assets/rain.svg"
          weather_icon_text = "Rain";
          break;
      case 4200:
          weather_icon_img_dir = "../../assets/rain_light.svg"
          weather_icon_text = "Light Rain";
          break;
      case 4201:
          weather_icon_img_dir = "../../assets/rain_heavy.svg"
          weather_icon_text = "Heavy Rain";
          break;
      case 5000:
          weather_icon_img_dir = "../../assets/snow.svg"
          weather_icon_text = "Snow";
          break;
      case 5001:
          weather_icon_img_dir = "../../assets/flurries.svg"
          weather_icon_text = "Flurries";
          break;
      case 5100:
          weather_icon_img_dir = "../../assets/snow_light.svg"
          weather_icon_text = "Light Snow";
          break;
      case 5101:
          weather_icon_img_dir = "../../assets/snow_heavy.svg"
          weather_icon_text = "Heavy Snow";
          break;
      case 6000:
          weather_icon_img_dir = "../../assets/freezing_drizzle.svg"
          weather_icon_text = "Freezing Drizzle";
          break;
      case 6001:
          weather_icon_img_dir = "../../assets/freezing_rain.svg"
          weather_icon_text = "Freezing Rain";
          break;
      case 6200:
          weather_icon_img_dir = "../../assets/freezing_rain_light.svg"
          weather_icon_text = "Light Freezing Rain";
          break;
      case 6201:
          weather_icon_img_dir = "../../assets/freezing_rain_heavy.svg"
          weather_icon_text = "Heavy Freezing Rain";
          break;
      case 7000:
          weather_icon_img_dir = "../../assets/ice_pellets.svg"
          weather_icon_text = "Ice Pellets";
          break;
      case 7101:
          weather_icon_img_dir = "../../assets/ice_pellets_heavy.svg"
          weather_icon_text = "Heavy Ice Pellets";
          break;
      case 7102:
          weather_icon_img_dir = "../../assets/ice_pellets_light.svg"
          weather_icon_text = "Light Ice Pellets";
          break;
      case 8000:
          weather_icon_img_dir = "../../assets/tstorm.svg"
          weather_icon_text = "Thunderstorm";
          break;
  }

  return [weather_icon_img_dir, weather_icon_text];
}


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
    // this.sendMyEvent.emit("data: " + this.json_data);
    // this.json_data = JSON.parse(this.json_data);
    // const weekly_weather_cards = document.getElementsByClassName("weekly_weather_card");
    // this.sendMyEvent.emit("cards length: " + weekly_weather_cards.length);
    // let json = JSON.parse(this.json_data);
    // var json_object = JSON.parse(this.json_data)
    // this.json_data = JSON.parse(this.json_data);
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
    
            board.getElementsByClassName("date")[0].innerHTML  = weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
            
            const [weather_icon_img_dir, weather_icon_text] = weatherCodeMapper(this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["weatherCode"], false);
            
            // $("#status_img").attr("src", weather_icon_img_dir);
            var img_set = board.getElementsByClassName("status_img")[0] as HTMLImageElement;
            img_set.src = weather_icon_img_dir;

            board.getElementsByClassName("status")[0].innerHTML = weather_icon_text;
    
            board.getElementsByClassName("temp_high")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMax"];
            board.getElementsByClassName("temp_low")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMin"];
            board.getElementsByClassName("wind_speed")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["windSpeed"];
            
        }

    }
    
    // for(var i=0; i<this.json_data["data"]["timelines"][0]["intervals"].length; ++i) {
    //     this.sendMyEvent.emit("json_data: " + i);
    // }

    // this.sendMyEvent.emit("json_data: " + json_object);
    // this.sendMyEvent.emit("cards length: " + weekly_weather_cards.length);

    
    // for(var i=0; i<this.json_data["data"]["timelines"][2]["intervals"].length; ++i) {
      // var board = weekly_weather_cards[i];

    //   // board.style.visibility = "visible";

    //   // board.addEventListener("click", showWeeklyWeather(json_data, i));

    //   var date = new Date(this.json_data["data"]["timelines"][2]["intervals"][i]["startTime"]);

    //   board.getElementsByClassName("date")[0].innerHTML = weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
      
      
    //   const [weather_icon_img_dir, weather_icon_text] = weatherCodeMapper(this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["weatherCode"], false);
      
    //   // $("#status_img").attr("src", weather_icon_img_dir);
    //   // board.getElementsByClassName("status_img")[0]. = weather_icon_img_dir;
    //   board.getElementsByClassName("status")[0].innerHTML = weather_icon_text;

    //   board.getElementsByClassName("temp_high")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMax"];
    //   board.getElementsByClassName("temp_low")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMin"];
    //   board.getElementsByClassName("wind_speed")[0].innerHTML = this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["windSpeed"];
      
    // }       
  }

}
