import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations'

@Component({
  selector: 'app-result-tab',
  templateUrl: './result-tab.component.html',
  styleUrls: ['./result-tab.component.css'],
  animations: [
    // trigger('slideRight', [
    //   transition(':enter',      [
    //     style({ position: 'fixed', width: '100%', transform: 'translateX(-100%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
    //   ]),
    //   transition(':leave', [
    //     style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
    //   ])
    // ]),

    // trigger('slideLeft', [
    //   transition(':enter',      [
    //     style({ position: 'fixed', width: '100%', transform: 'translateX(100%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
    //   ]),
    //   transition(':leave', [
    //     style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
    //     animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
    //   ])
    // ])


    trigger('slideWeekly', [
      transition(':enter',      [
        style({ position: 'fixed', width: '100%', transform: 'translateX(-100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      
      transition(':leave', [
        style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-100%)' })),
      ])
    ]),

    trigger('slideDetail', [
      transition(':enter',      [
        style({ position: 'fixed', width: '100%', transform: 'translateX(100%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({position: 'fixed', width: '100%', transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(100%)' })),
      ])
    ])
  ]
})
export class ResultTabComponent implements OnInit {
  @Input() json_data: any;
  @Input() address_data: any;
  
  weather_data: any;
  address: string | undefined;
  isDetail = false;
  
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() { 
    if(this.json_data != null) {
      this.weather_data = this.json_data;
      this.address = this.address_data;
    }
  
  }

  async getDetailTrigger(event: any) {
    if(!this.isDetail) {
      this.isDetail = true;
      // alert(event);
    }
    
    // const state = event.split("/")[0];
    // const city = event.split("/")[1];

    // this.address = state + " " + city;
  }

  listClick() {
    this.isDetail = false;
    // alert(this.isDetail);
  }

  

}
