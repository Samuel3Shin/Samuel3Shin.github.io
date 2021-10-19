export class Utils {
// weekday, month mapping
weekday = new Array(7);
month = new Array();
    static weekday: any;

constructor() {
    this.weekday[0] = "Sunday";
    this.weekday[1] = "Monday";
    this.weekday[2] = "Tuesday";
    this.weekday[3] = "Wednesday";
    this. weekday[4] = "Thursday";
    this.weekday[5] = "Friday";
    this.weekday[6] = "Saturday";

    this.month[0] = "Jan";
    this.month[1] = "Feb";
    this.month[2] = "Mar";
    this.month[3] = "Apr";
    this.month[4] = "May";
    this.month[5] = "June";
    this.month[6] = "July";
    this.month[7] = "Aug";
    this.month[8] = "Sep";
    this.month[9] = "Oct";
    this.month[10] = "Nov";
    this.month[11] = "Dec";

}

weatherCodeMapper(weather_code: any, is_sunset=false) {
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

}

