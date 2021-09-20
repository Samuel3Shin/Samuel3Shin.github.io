function weatherCodeMapper(weather_code, is_sunset=false) {
    var weather_icon_img_dir = "./Images/clear_night.svg";
    var weather_icon_text = "clear";

    switch (weather_code) {
        case 1000:
            if(is_sunset) {
                weather_icon_img_dir = "./Images/clear_night.svg"
            } else {
                weather_icon_img_dir = "./Images/clear_day.svg"
            }
            weather_icon_text = "Clear";
            break;
        case 1101:
            if(is_sunset) {
                weather_icon_img_dir = "./Images/partly_cloudy_night.svg"
            } else {
                weather_icon_img_dir = "./Images/partly_cloudy_day.svg"
            }
            weather_icon_text = "Partly Cloudy";
            break;
        case 1100:
            if(is_sunset) {
                weather_icon_img_dir = "./Images/mostly_clear_night.svg"
            } else {
                weather_icon_img_dir = "./Images/mostly_clear_day.svg"
            }
            weather_icon_text = "Mostly Clear";
            break;
        case 1001:
            weather_icon_img_dir = "./Images/cloudy.svg"
            weather_icon_text = "Cloudy";
            break;
        case 1102:
            weather_icon_img_dir = "./Images/mostly_cloudy.svg"
            weather_icon_text = "Mostly Cloudy";
            break;
        case 4201:
            weather_icon_img_dir = "./Images/rain_heavy.svg"
            weather_icon_text = "Heavy Rain";
            break;
        case 4001:
            weather_icon_img_dir = "./Images/rain.svg"
            weather_icon_text = "Rain";
            break;
        case 4200:
            weather_icon_img_dir = "./Images/rain_light.svg"
            weather_icon_text = "Light Rain";
            break;
        case 6201:
            weather_icon_img_dir = "./Images/freezing_rain_heavy.svg"
            weather_icon_text = "Heavy Freezing Rain";
            break;
        case 6001:
            weather_icon_img_dir = "./Images/freezing_rain.svg"
            weather_icon_text = "Freezing Rain";
            break;
        case 6200:
            weather_icon_img_dir = "./Images/freezing_rain_light.svg"
            weather_icon_text = "Light Freezing Rain";
            break;
        case 6000:
            weather_icon_img_dir = "./Images/freezing_drizzle.svg"
            weather_icon_text = "Freezing Drizzle";
            break;
        case 4000:
            weather_icon_img_dir = "./Images/drizzle.svg"
            weather_icon_text = "Drizzle";
            break;
        case 7101:
            weather_icon_img_dir = "./Images/ice_pellets_heavy.svg"
            weather_icon_text = "Heavy Ice Pellets";
            break;
        case 7000:
            weather_icon_img_dir = "./Images/ice_pellets.svg"
            weather_icon_text = "Ice Pellets";
            break;
        case 7101:
            weather_icon_img_dir = "./Images/ice_pellets_light.svg"
            weather_icon_text = "Light Ice Pellets";
            break;
        case 5101:
            weather_icon_img_dir = "./Images/snow_heavy.svg"
            weather_icon_text = "Heavy Snow";
            break;
        case 5000:
            weather_icon_img_dir = "./Images/snow.svg"
            weather_icon_text = "Snow";
            break;
        case 5100:
            weather_icon_img_dir = "./Images/snow_light.svg"
            weather_icon_text = "Light Snow";
            break;
        case 5001:
            weather_icon_img_dir = "./Images/flurries.svg"
            weather_icon_text = "Flurries";
            break;
        case 8000:
            weather_icon_img_dir = "./Images/tstorm.svg"
            weather_icon_text = "Thunderstorm";
            break;
        case 2100:
            weather_icon_img_dir = "./Images/fog_light.svg"
            weather_icon_text = "Light Fog";
            break;
        case 2000:
            weather_icon_img_dir = "./Images/fog.svg"
            weather_icon_text = "Fog";
            break;
    }

    return [weather_icon_img_dir, weather_icon_text];
}