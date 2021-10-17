import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();
  isChecked: boolean | undefined;

  constructor() {
    this.isChecked = false;
  }

  ngOnInit(): void {
  }

  handleCheckboxClick(event: Event) {
    // console.log("check box clicked!");
    // this.sendMyEvent.emit("check box clicked!");

    this.sendMyEvent.emit((event.target as HTMLInputElement).checked);
    if((event.target as HTMLInputElement).checked) {
      $("#street_input").val("");
      $("#city_input").val("");
      $("#state_input").val("").prop("selected", true);

      $("#street_input").attr("disabled", "true");
      $("#city_input").attr("disabled", "true");
      $("#state_input").attr("disabled", "true");
    } else {
      $("#street_input").removeAttr("disabled"); 
      $("#city_input").removeAttr("disabled"); 
      $("#state_input").removeAttr("disabled"); 
    }
  }

  clearEverything() {
    this.sendMyEvent.emit("clear clicked!");
    if($("#checkbox").is(':checked')) {
      $("#street_input").removeAttr("disabled"); 
      $("#city_input").removeAttr("disabled"); 
      $("#state_input").removeAttr("disabled"); 
      $("#checkbox").prop("checked", false);
    }
    
    $("#street_input").val("");
    $("#city_input").val("");
    $("#state_input").val("").prop("selected", true);
  }

}
