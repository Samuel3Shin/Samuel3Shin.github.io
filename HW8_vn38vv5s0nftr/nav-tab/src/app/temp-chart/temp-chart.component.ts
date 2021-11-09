import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);


@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
export class TempChartComponent implements OnInit {
  @Input() json_data: any;
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();

  highcharts: any;
  chartOptions: any;
  chartExist = false;

  constructor() {

   }

  ngOnInit(): void {
  
  }


  ngOnChanges() { 
    if(this.json_data != null) { 
      this.chartExist = true;

      this.json_data = JSON.parse(this.json_data);
      this.sendMyEvent.emit(this.json_data['data']);

      // weather chart1 populating
      var weather_chart_data = []
      for(var i=0; i<this.json_data["data"]["timelines"][2]["intervals"].length; ++i) {
          let date = new Date(this.json_data["data"]["timelines"][2]["intervals"][i]["startTime"]);
          weather_chart_data.push([Math.round(date.getTime()), this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMin"], this.json_data["data"]["timelines"][2]["intervals"][i]["values"]["temperatureMax"]]);
      }

      this.highcharts = Highcharts;
      this.highcharts.Options = {
        chart: {
          type: 'arearange',
          zoomType: 'x',
          scrollablePlotArea: {
              minWidth: 600,
              scrollPositionX: 1
          }
        },

        title: {
            text: 'Temperature Ranges (Min, Max)'
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
      }
  
    //   this.chartOptions = this.highcharts.Options;
    this.highcharts.chart('chart_container', this.highcharts.Options);
    }
  }
}
