function weatherCodeMapper(weather_code, is_sunset=false) {
    var weather_icon_img_dir = "./Images/clear_night.svg";
    var weather_icon_text = "clear";

    switch (weather_code) {
        case 1000:
            weather_icon_img_dir = "./Images/clear_day.svg"
            weather_icon_text = "Clear";
            break;
        case 1101:
            weather_icon_img_dir = "./Images/partly_cloudy_day.svg"
            weather_icon_text = "Partly Cloudy";
            break;
        case 1100:
            weather_icon_img_dir = "./Images/mostly_clear_day.svg"
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
        case 2000:
            weather_icon_img_dir = "./Images/fog.svg"
            weather_icon_text = "Fog";
            break;
        case 2100:
            weather_icon_img_dir = "./Images/fog_light.svg"
            weather_icon_text = "Light Fog";
            break;
        case 3000:
            weather_icon_img_dir = "./Images/light_wind.svg"
            weather_icon_text = "Light Wind";
            break;
        case 3001:
            weather_icon_img_dir = "./Images/wind.svg"
            weather_icon_text = "Wind";
            break;
        case 3002:
            weather_icon_img_dir = "./Images/strong_wind.svg"
            weather_icon_text = "Strong Wind";
            break;
        case 4000:
            weather_icon_img_dir = "./Images/drizzle.svg"
            weather_icon_text = "Drizzle";
            break;
        case 4001:
            weather_icon_img_dir = "./Images/rain.svg"
            weather_icon_text = "Rain";
            break;
        case 4200:
            weather_icon_img_dir = "./Images/rain_light.svg"
            weather_icon_text = "Light Rain";
            break;
        case 4201:
            weather_icon_img_dir = "./Images/rain_heavy.svg"
            weather_icon_text = "Heavy Rain";
            break;
        case 5000:
            weather_icon_img_dir = "./Images/snow.svg"
            weather_icon_text = "Snow";
            break;
        case 5001:
            weather_icon_img_dir = "./Images/flurries.svg"
            weather_icon_text = "Flurries";
            break;
        case 5100:
            weather_icon_img_dir = "./Images/snow_light.svg"
            weather_icon_text = "Light Snow";
            break;
        case 5101:
            weather_icon_img_dir = "./Images/snow_heavy.svg"
            weather_icon_text = "Heavy Snow";
            break;
        case 6000:
            weather_icon_img_dir = "./Images/freezing_drizzle.svg"
            weather_icon_text = "Freezing Drizzle";
            break;
        case 6001:
            weather_icon_img_dir = "./Images/freezing_rain.svg"
            weather_icon_text = "Freezing Rain";
            break;
        case 6200:
            weather_icon_img_dir = "./Images/freezing_rain_light.svg"
            weather_icon_text = "Light Freezing Rain";
            break;
        case 6201:
            weather_icon_img_dir = "./Images/freezing_rain_heavy.svg"
            weather_icon_text = "Heavy Freezing Rain";
            break;
        case 7000:
            weather_icon_img_dir = "./Images/ice_pellets.svg"
            weather_icon_text = "Ice Pellets";
            break;
        case 7101:
            weather_icon_img_dir = "./Images/ice_pellets_heavy.svg"
            weather_icon_text = "Heavy Ice Pellets";
            break;
        case 7102:
            weather_icon_img_dir = "./Images/ice_pellets_light.svg"
            weather_icon_text = "Light Ice Pellets";
            break;
        case 8000:
            weather_icon_img_dir = "./Images/tstorm.svg"
            weather_icon_text = "Thunderstorm";
            break;
    }

    return [weather_icon_img_dir, weather_icon_text];
}

// HttpClient 
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

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

var showWeeklyWeather = function(json_data, idx) {
    return function curried_func(e) {
        // console.log(json_data["data"]["timelines"][0]["intervals"][idx]["startTime"]);
        
        var date = new Date(json_data["data"]["timelines"][0]["intervals"][idx]["startTime"]);

        weekly_specific_date.innerText = weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
        // weekly_specific_date.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["startTime"];

        [weather_icon_img_dir, weather_icon_text] = weatherCodeMapper(json_data["data"]["timelines"][0]["intervals"][idx]["values"]["weatherCode"]);
        weekly_specific_overall.innerText = weather_icon_text;
        $("#weekly_weather_code_img").attr("src",weather_icon_img_dir);
        
        weekly_specific_temperature.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["temperatureMax"] +  "°F/" + json_data["data"]["timelines"][0]["intervals"][idx]["values"]["temperatureMin"] +"°F";
        
        weekly_specific_precipitation.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["precipitationType"]
        weekly_specific_rain.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["precipitationProbability"] + "%";
        weekly_specific_wind.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["windSpeed"] + " mph";
        weekly_specific_humidity.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["humidity"] + "%";
        weekly_specific_visibility.innerText = json_data["data"]["timelines"][0]["intervals"][idx]["values"]["visibility"] + " mi";

        console.log(json_data["data"]["timelines"][0]["intervals"][idx]["values"]["sunriseTime"].slice(0, -6));

        var sunriseTime = new Date(json_data["data"]["timelines"][0]["intervals"][idx]["values"]["sunriseTime"].slice(0, -6)).getHours();
        var sunsetTime = new Date(json_data["data"]["timelines"][0]["intervals"][idx]["values"]["sunsetTime"].slice(0, -6)).getHours();
        
        weekly_specific_sunrise.innerText = (sunriseTime > 12 ? (sunriseTime - 12) : sunriseTime) + "AM/" + (sunsetTime > 12 ? (sunsetTime - 12) : sunsetTime) + "PM";

        $("#weekly_weather_card_container").css('display', 'none');
        $("#card").css('display', 'none');
        $("#weekly_specific_weather").css('display', 'block');
    }
};

var populatingWeeklyWeather = function(url) {
    var client = new HttpClient();
    client.get(url, function(response) {
    var json_data = JSON.parse(response);
    
    var weekly_weather_cards = document.getElementsByClassName("weekly_weather_card");
    
    // console.log("length: " + daily_weather_cards.length);
    // console.log(weekly_weather_cards.length);
    
    for(i=0; i<json_data["data"]["timelines"][0]["intervals"].length; ++i) {
        var board = weekly_weather_cards[i];

        board.addEventListener("click", showWeeklyWeather(json_data, i));

        var date = new Date(json_data["data"]["timelines"][0]["intervals"][i]["startTime"]);

        board.getElementsByClassName("date")[0].innerText = weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
        
        
        [weather_icon_img_dir, weather_icon_text] = weatherCodeMapper(json_data["data"]["timelines"][0]["intervals"][i]["values"]["weatherCode"], false);
        
        // $("#status_img").attr("src", weather_icon_img_dir);
        board.getElementsByClassName("status_img")[0].src = weather_icon_img_dir;
        board.getElementsByClassName("status")[0].innerText = weather_icon_text;

        board.getElementsByClassName("temp_high")[0].innerText = json_data["data"]["timelines"][0]["intervals"][i]["values"]["temperatureMax"];
        board.getElementsByClassName("temp_low")[0].innerText = json_data["data"]["timelines"][0]["intervals"][i]["values"]["temperatureMin"];
        board.getElementsByClassName("wind_speed")[0].innerText = json_data["data"]["timelines"][0]["intervals"][i]["values"]["windSpeed"];
        
    }                            

    $("#weekly_weather_card_container").css('display', 'block');
    $("#weekly_specific_weather").css('display', 'none');

});
}

var populatingCurrentWeather = function(url) {
    var client = new HttpClient();
    client.get(url, function(response) {
    
    var json_data = JSON.parse(response);
    
    // weather icon
    var weather_icon_img_dir = "./Images/clear_night.svg";
    var weather_icon_text = "clear";
    
    // TODO: Clear Sunny, Mostly Clear, Partly Cloudy <- differentiate day and night!!!
    var is_sunset = false;

    card_address_text.innerText = $("#city_input").val() + ", " + $("#state_input").val();
    [weather_icon_img_dir, weather_icon_text] = weatherCodeMapper(json_data["data"]["timelines"][0]["intervals"][0]["values"]["weatherCode"], is_sunset);

    $("#weather_code_img").attr("src", weather_icon_img_dir);
    weather_code_text.innerText = weather_icon_text;

    // console.log(typeof json_data["data"]["timelines"][0]["intervals"][0]["values"]["temperature"]);
    current_temperature.innerText = Math.round(json_data["data"]["timelines"][0]["intervals"][0]["values"]["temperature"]) + "º"

    // weather specific infos
    humidity_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["humidity"] + "%";
    pressure_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["pressureSeaLevel"] + "inHg";
    wind_speed_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["windSpeed"] + "mph";
    visibility_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["visibility"] + "mi";
    cloud_cover_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["cloudCover"] + "%";
    uv_level_value.innerText = json_data["data"]["timelines"][0]["intervals"][0]["values"]["uvIndex"];
    
    $("#card").css('display', 'block');
    });
}


var populatingChart1 = function (url) {
    var client = new HttpClient();
    
    client.get(url, function(response) {
    var json_data = JSON.parse(response);

    console.log('It started');
    // weather chart1 populating
    var weather_chart_data = []
        for(i=0; i<15; ++i) {
            let date = new Date(json_data["data"]["timelines"][0]["intervals"][i]["startTime"]);
            weather_chart_data.push([Math.round(date.getTime()), json_data["data"]["timelines"][0]["intervals"][i]["values"]["temperatureMin"], json_data["data"]["timelines"][0]["intervals"][i]["values"]["temperatureMax"]]);
        }

        Highcharts.chart('chart1_container', {

            chart: {
                type: 'arearange',
                zoomType: 'x',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },

            title: {
                text: 'Temperature Ranges (Min, MAX)'
            },

            xAxis: {
                type: 'datetime',
                accessibility: {
                    // rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.'
                }
            },

            yAxis: {
                title: {
                    text: null
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: '°F',
                xDateFormat: '%A, %b %e'
            },

            legend: {
                enabled: false
            },

            series: [{
                name: 'Temperatures',
                data: weather_chart_data,

                // fillColor: '#eebd59',
                lineColor: '#ffb10b',

                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#feb315'], // start
                        [0.5, '#dfcb98'], // middle
                        [1, '#dce9f5'] // end
                    ]
                }
            }],

            colors: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, '#eebd59'], // start
                [0.5, '#dad4bf'], // middle
                [1, '#dce9f1'] // end
            ]
            }
        });
    });
}

var populatingChart2 = function(url) {
    var client = new HttpClient();
    client.get(url, function(response) {
        var json_data = JSON.parse(response);
        window.meteogram = new Meteogram(json_data, 'chart2_container');
    });
}


// Start of the Meteogram protype

function Meteogram(json_data, container) {
    // Parallel arrays for the chart data, these are populated as the XML/JSON file
    // is loaded
    this.humidities = [];
    this.precipitationsError = []; // Only for some data sets
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.container = container;

    this.hourly_weather_data = json_data

    // Run
    this.parseYrData();
}

/**
 * Function to smooth the temperature line. The original data provides only whole degrees,
 * which makes the line graph look jagged. So we apply a running mean on it, but preserve
 * the unaltered value in the tooltip.
 */
Meteogram.prototype.smoothLine = function (data) {
    var i = data.length,
        sum,
        value;

    while (i--) {
        data[i].value = value = data[i].y; // preserve value for tooltip

        // Set the smoothed value to the average of the closest points, but don't allow
        // it to differ more than 0.5 degrees from the given value
        sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
        data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
    }
};

/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    var xAxis = chart.xAxis[0],
        x,
        pos,
        max,
        isLong,
        isLast,
        i;

    for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

        // Get the X position
        isLast = pos === max + 36e5;
        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        if (this.resolution > 36e5) {
            isLong = pos % this.resolution === 0;
        } else {
            isLong = i % 2 === 0;
        }
        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
            'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
            .attr({
                stroke: chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
    }

    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
        translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });

};

/**
 * Get the title based on the XML data
 */
Meteogram.prototype.getTitle = function () {
    return 'Hourly Weather (For Next 5 Days)'
};

/**
 * Build and return the Highcharts options structure
 */
Meteogram.prototype.getChartOptions = function () {
    var meteogram = this;

    return {
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 400,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },

        defs: {
            patterns: [{
                id: 'precipitation-error',
                path: {
                    d: [
                        'M', 3.3, 0, 'L', -6.7, 10,
                        'M', 6.7, 0, 'L', -3.3, 10,
                        'M', 10, 0, 'L', 0, 10,
                        'M', 13.3, 0, 'L', 3.3, 10,
                        'M', 16.7, 0, 'L', 6.7, 10
                    ].join(' '),
                    stroke: '#68CFE8',
                    strokeWidth: 1
                }
            }]
        },

        title: {
            text: this.getTitle(),
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },

        credits: {
            text: 'Forecast',
            position: {
                x: -40
            }
        },

        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat:
                '<small>{point.x:%A, %b %e, %H:%M}</small><br>'
        },

        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 2 * 36e5, // two hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: -5
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 1
        }],

        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'

        }, { // precipitation axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0,
            minRange: 10,
            min: 0

        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: '#f4b840'
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color: '#f4b840'
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },


        series: [{
            name: 'Temperature',
            data: this.temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' + 
                    '{series.name}: <b>{point.value}&#8457</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        }, {
            name: 'Precipitation',
            data: this.precipitationsError,
            type: 'column',
            color: 'url(#precipitation-error)',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            tooltip: {
                valueSuffix: ' mm',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.minvalue} mm - {point.maxvalue} mm</b><br/>'
            },
            grouping: false,
            dataLabels: {
                enabled: meteogram.hasPrecipitationError,
                formatter: function () {
                    if (this.point.maxvalue > 0) {
                        return this.point.maxvalue;
                    }
                },
                style: {
                    fontSize: '8px',
                    color: 'gray'
                }
            }
        }, {
            name: 'Humidity',
            data: this.humidities,
            type: 'column',
            color: '#7db1d3',
            yAxis: 1,
            groupPadding: 0,
            pointPadding: 0,
            grouping: false,
            dataLabels: {
                enabled: !meteogram.hasPrecipitationError,
                formatter: function () {
                    if (this.y > 0) {
                        return this.y;
                    }
                },
                style: {
                    fontSize: '8px',
                    color: 'gray'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: 'Air pressure',
            color: '#f4b840',
            data: this.pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' inHg'
            },
            dashStyle: 'shortdot',
            yAxis: 2
        }, {
            name: 'Wind',
            type: 'windbarb',
            id: 'windbarbs',
            color: Highcharts.getOptions().colors[1],
            lineWidth: 0.5,
            data: this.winds,
            vectorLength: 12,
            yOffset: -15,
            tooltip: {
                valueSuffix: ' mph'
            }
        }]
    };
};

/**
 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {
    this.drawBlocksForWindArrows(chart);
};

/**
 * Create the chart. This function is called async when the data file is loaded and parsed.
 */
Meteogram.prototype.createChart = function () {
    var meteogram = this;
    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
        meteogram.onChartLoad(chart);
    });
};

Meteogram.prototype.error = function () {
    document.getElementById('loading').innerHTML = '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
};

/**
 * Handle the data. This part of the code is not Highcharts specific, but deals with yr.no's
 * specific data format
 */
Meteogram.prototype.parseYrData = function () {

    var meteogram = this;
    var json = this.hourly_weather_data;

    for(i=0; i<json["data"]["timelines"][0]["intervals"].length; ++i) {
        // Get the times - only Safari can't parse ISO8601 so we need to do
        // some replacements
        // console.log(json["data"]["timelines"][0]["intervals"][0]["startTime"].slice(0, -6));

        var from = json["data"]["timelines"][0]["intervals"][i]["startTime"].slice(0, -6) + ' UTC';
    
        from = from.replace(/-/g, '/').replace('T', ' ');
        from = Date.parse(from);

        meteogram.temperatures.push({
            x: from,
            y: parseInt(
                json["data"]["timelines"][0]["intervals"][i]['values']['temperature'],
                10
            ),
        });

        meteogram.humidities.push({
            x: from,
            y: parseInt(
                json["data"]["timelines"][0]["intervals"][i]['values']['humidity']
            )
        });

        if (i % 2 === 0) {
            meteogram.winds.push({
                x: from,
                value: json["data"]["timelines"][0]["intervals"][i]['values']['windSpeed'],
                direction: json["data"]["timelines"][0]["intervals"][i]['values']['windDirection']
            });
        }

        meteogram.pressures.push({
            x: from,
            y: parseFloat(json["data"]["timelines"][0]["intervals"][i]['values']["pressureSeaLevel"])
        });

        if (i === 0) {
            pointStart = from;
        }
    }

    // Smooth the line
    this.smoothLine(this.temperatures);

    // Create the chart when the data is loaded
    this.createChart();
};
// End of the Meteogram protype