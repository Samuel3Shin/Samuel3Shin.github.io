


function populatingChart2(url) {
    fetch(url).then(
        (response) => response.json()
    ).then(
        (jsonResponse) => {

        var json_data = jsonResponse;

        humidities = [];
        precipitationsError = []; // Only for some data sets
        winds = [];
        temperatures = [];
        pressures = [];

        // Initialize
        container = 'chart2_container';

        hourly_weather_data = json_data

        var json = hourly_weather_data;

        for(i=0; i<json["data"]["timelines"][0]["intervals"].length; ++i) {
            // Get the times - only Safari can't parse ISO8601 so we need to do
            // some replacements
            // console.log(json["data"]["timelines"][0]["intervals"][0]["startTime"].slice(0, -6));

            var from = json["data"]["timelines"][0]["intervals"][i]["startTime"].slice(0, -6) + ' UTC';
        
            from = from.replace(/-/g, '/').replace('T', ' ');
            from = Date.parse(from);

            temperatures.push({
                x: from,
                y: parseInt(
                    json["data"]["timelines"][0]["intervals"][i]['values']['temperature'],
                    10
                ),
            });

            humidities.push({
                x: from,
                y: parseInt(
                    json["data"]["timelines"][0]["intervals"][i]['values']['humidity']
                )
            });

            if (i % 2 === 0) {
                winds.push({
                    x: from,
                    value: json["data"]["timelines"][0]["intervals"][i]['values']['windSpeed'],
                    direction: json["data"]["timelines"][0]["intervals"][i]['values']['windDirection']
                });
            }

            pressures.push({
                x: from,
                y: parseFloat(json["data"]["timelines"][0]["intervals"][i]['values']["pressureSeaLevel"])
            });

            // if (i === 0) {
            //     pointStart = from;
            // }
        }

        // Smooth the line
        // smoothLine(temperatures);

        var chart = new Highcharts.Chart(container, getChartOptions(humidities,
            precipitationsError, // Only for some data sets
            winds,
            temperatures,
            pressures));
            // drawBlocksForWindArrows(chart)
        }
    )   
}

/**
 * Function to smooth the temperature line. The original data provides only whole degrees,
 * which makes the line graph look jagged. So we apply a running mean on it, but preserve
 * the unaltered value in the tooltip.
 */
// var smoothLine = function (data) {
//     var i = data.length,
//         sum,
//         value;

//     while (i--) {
//         data[i].value = value = data[i].y; // preserve value for tooltip

//         // Set the smoothed value to the average of the closest points, but don't allow
//         // it to differ more than 0.5 degrees from the given value
//         sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
//         data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
//     }
// };

/**
 * Draw blocks around wind arrows, below the plot area
 */
// var drawBlocksForWindArrows = function (chart) {
//     var xAxis = chart.xAxis[0],
//         x,
//         pos,
//         max,
//         isLong,
//         isLast,
//         i;

//     for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

//         // Get the X position
//         isLast = pos === max + 36e5;
//         x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

//         // Draw the vertical dividers and ticks
//         if (this.resolution > 36e5) {
//             isLong = pos % this.resolution === 0;
//         } else {
//             isLong = i % 2 === 0;
//         }
//         chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
//             'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
//             .attr({
//                 stroke: chart.options.chart.plotBorderColor,
//                 'stroke-width': 1
//             })
//             .add();
//     }

//     // Center items in block
//     chart.get('windbarbs').markerGroup.attr({
//         translateX: chart.get('windbarbs').markerGroup.translateX + 8
//     });

// };

var getChartOptions = function (humidities,
    precipitationsError, // Only for some data sets
    winds,
    temperatures,
    pressures) {
    var meteogram = this;

    return {
        chart: {
            // renderTo: container,
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
            text: 'Hourly Weather (For Next 5 Days)',
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
            tickInterval: 4 * 36e5, // four hours
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
                format: '{value}',
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
            data: temperatures,
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
            data: precipitationsError,
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
                    if (point.maxvalue > 0) {
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
            data: humidities,
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
            data: pressures,
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
            data: winds,
            vectorLength: 12,
            yOffset: -15,
            tooltip: {
                valueSuffix: ' mph'
            }
        }]
    };
};


// End of the Meteogram protype