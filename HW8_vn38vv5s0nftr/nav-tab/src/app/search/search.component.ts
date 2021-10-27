import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @Output() sendMyEvent : EventEmitter<any> = new EventEmitter();
  @Output() sendLatLng : EventEmitter<any> = new EventEmitter();
  @Output() sendAddress : EventEmitter<any> = new EventEmitter();
  @Output() sendProgress : EventEmitter<any> = new EventEmitter();
  
  isChecked: boolean | undefined;

  constructor() {
    this.isChecked = false;
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.sendProgress.emit(true);
    this.sendMyEvent.emit("submit button clicked!");

    var street = $("street_input").val();
    var city = $("city_input").val();
    var state = $("state_input").val();
    var country = "USA";
    var route = "";
    var lat;
    var lng;

    // auto-address
    if($("#checkbox").is(':checked')) {
      this.sendMyEvent.emit("auto-address");
      fetch("https://ipinfo.io/json?token=ecddd4a7e21254").then(
          (response) => response.json()
      ).then(
          (jsonResponse) => {
              city = jsonResponse['city'];
              state = jsonResponse['region'];
              lat = jsonResponse['loc'].split(",")[0];
              lng = jsonResponse['loc'].split(",")[1];
              this.sendLatLng.emit(lat + " " + lng);
              this.sendAddress.emit(city + " " + state);
          }
      )    
    } else {
      // No auto-address
      this.sendMyEvent.emit("user input address");

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street} ${city} ${state}&key=AIzaSyBdntW0ccDzEwtizOG019WmtcYnj34D410`).then(
        (response) => response.json()
      ).then(
        (jsonResponse) => {

          if(jsonResponse['results'].length == 0) {
              alert('There is no Geocoding API result. Please fill out addresses correctly.')
          }

          var formattedAddress = "";
          if(jsonResponse['results'][0]['formatted_address'] != undefined) {
              formattedAddress = jsonResponse['results'][0]['formatted_address'];
          }

          var addressComponents = jsonResponse['results'][0]['address_components'];
          for(var i=0; i<addressComponents.length; ++i) {
              if(addressComponents[i]['types'][0] == 'locality') {
                  city = addressComponents[i]['long_name'];
              } else if(addressComponents[i]['types'][0] == 'administrative_area_level_1') {
                  state = addressComponents[i]['long_name'];
              } else if(addressComponents[i]['types'][0] == 'route') {
                  route = state = addressComponents[i]['short_name'];
              }
          }

          lat = jsonResponse['results'][0]['geometry']['location']['lat'];
          lng = jsonResponse['results'][0]['geometry']['location']['lng'];

          if(formattedAddress == "") {
            formattedAddress = (route=="" ? "" : (route + ", ")) + city + ", " + state + ", " + country;
          } 
          this.sendLatLng.emit(lat + " " + lng);
          this.sendAddress.emit(route + " " + city + " " + state);
        }
      );      
    }
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
