import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let windbarb = require('highcharts/modules/windbarb.src');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
windbarb(Highcharts)
More(Highcharts);

@Component({
  selector: 'app-meteogram',
  templateUrl: './meteogram.component.html',
  styleUrls: ['./meteogram.component.css']
})
export class MeteogramComponent implements OnInit {
  @Input() json_data: any;
  
  highcharts: any;
  chartOptions: any;
  container = "chart2_container";

  constructor() { }

  ngOnInit(): void {
    
  }

ngOnChanges() { 
    if(this.json_data != null) {
        this.json_data = JSON.parse(this.json_data);


        var humidities = [];
        // var precipitationsError: never[] = []; // Only for some data sets
        var winds = [];
        var temperatures = [];
        var pressures = [];

        var json = this.json_data;

        for(var i=0; i<json["data"]["timelines"][1]["intervals"].length; ++i) {
            // var from = json["data"]["timelines"][1]["intervals"][i]["startTime"].slice(0, -6) + ' UTC';
      
            // from = from.replace(/-/g, '/').replace('T', ' ');
            // from = Date.parse(from).toString();
            const x = Date.parse(json["data"]["timelines"][1]["intervals"][i]["startTime"]);
            temperatures.push({
              x,
              y: parseInt(json["data"]["timelines"][1]["intervals"][i]['values']['temperature']),
                  
            });

            humidities.push({
              x,
              y: parseInt(json["data"]["timelines"][1]["intervals"][i]['values']['humidity'])
              
            });

            if (i % 2 === 0) {
                winds.push({
                    x,
                    value: json["data"]["timelines"][1]["intervals"][i]['values']['windSpeed'],
                    direction: json["data"]["timelines"][1]["intervals"][i]['values']['windDirection']
                });
            }

            pressures.push({
                x,
                y: parseInt(json["data"]["timelines"][1]["intervals"][i]['values']["pressureSeaLevel"])
            });

          }

          this.highcharts = Highcharts;
          this.highcharts.Options = {

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
  
          title: {
              text: 'Hourly Weather (For Next 5 Days)',
              align: 'center',
              style: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
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
  
  
          series: [
            {
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
                      '{series.name}: <b>{point.y}&#8451;</b><br/>'
              },
              zIndex: 1,
              color: '#FF3333',
              negativeColor: '#48AFE8'
          }, 
           {
              name: 'Humidity',
              data: humidities,
              type: 'column',
              color: '#7db1d3',
              yAxis: 1,
              groupPadding: 0,
              pointPadding: 0,
              grouping: false,
              dataLabels: {
                  enabled: true, // !meteogram.hasPrecipitationError,
                  filter: {
                      operator: '>',
                      property: 'y',
                      value: 0
                  },
                  style: {
                      fontSize: '8px',
                      color: 'gray'
                  }
              },
              tooltip: {
                  valueSuffix: ' mm'
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
                  valueSuffix: ' hPa'
              },
              dashStyle: 'shortdot',
              yAxis: 2
          }, {
              name: 'Wind',
              type: 'windbarb',
              id: 'windbarbs',
              color: '#FF3333',
              lineWidth: 0.5,
              data: winds,
              vectorLength: 12,
              yOffset: -15,
              tooltip: {
                  valueSuffix: ' m/s'
              }
          }
        ]
          }
          console.log(this.highcharts.Options);
          this.highcharts.chart('chart2_container', this.highcharts.Options);
    }
}

}
