import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
export class TempChartComponent implements OnInit {
  @Input() json_data: any;
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    
  }

}
