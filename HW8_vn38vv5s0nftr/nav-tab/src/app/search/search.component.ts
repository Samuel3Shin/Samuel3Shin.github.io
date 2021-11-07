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
  @Output() sendClear : EventEmitter<any> = new EventEmitter();

  street: string = '';
  city: string = '';
  state: string = '';
  lat: any;
  lng: any;

  ipInfoCity: any;
  ipInfoState: any;

  showStreetErrorMessage = false;
  showCityErrorMessage = false;
  userLocationDetermined = false;
  checkBoxChecked = false;
  
  isChecked: boolean | undefined;

  constructor() {
    this.isChecked = false;

    // favorites local storage init
    var saved_items: string[] = [];
    localStorage.setItem("favorites", JSON.stringify(saved_items));
  }

  ngOnInit(): void {

  }

  streetFocusOut() {
    this.showStreetErrorMessage = true;
  }

  cityFocusOut() {
    this.showCityErrorMessage = true;
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
      // fetch("https://ipinfo.io/json?token=ecddd4a7e21254").then(
      //     (response) => response.json()
      // ).then(
      //     (jsonResponse) => {
      //         city = jsonResponse['city'];
      //         state = jsonResponse['region'];
      //         lat = jsonResponse['loc'].split(",")[0];
      //         lng = jsonResponse['loc'].split(",")[1];
      //         this.sendLatLng.emit(lat + " " + lng);
      //         this.sendAddress.emit(city + " " + state);
      //     }
      // )
      city = this.ipInfoCity;
      state = this.ipInfoState;
      lat = this.lat;
      lng = this.lng;

      this.sendLatLng.emit(lat + " " + lng);
      this.sendAddress.emit(city + " " + state);
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
      // this.street = '';
      // this.city = '';
      
      // auto-detection clicked
      // this.street = 'LA';
      // this.city = 'CA';

      $("#street_input").val("");
      $("#city_input").val("");
      $("#state_input").val("").prop("selected", true);

      this.street = "    ";
      this.city = "    ";


      $("#street_input").attr("disabled", "true");
      $("#city_input").attr("disabled", "true");
      $("#state_input").attr("disabled", "true");

      $("#submit_button").removeAttr("disabled");

      fetch("https://ipinfo.io/json?token=ecddd4a7e21254").then(
          (response) => response.json()
      ).then(
          (jsonResponse) => {
              this.ipInfoCity = jsonResponse['city'];
              this.ipInfoState = jsonResponse['region'];
              this.lat = jsonResponse['loc'].split(",")[0];
              this.lng = jsonResponse['loc'].split(",")[1];
              this.userLocationDetermined = true;
          }
      )

      this.checkBoxChecked = true;
    } else {
      // auto-detection unclicked

      $("#street_input").removeAttr("disabled"); 
      $("#city_input").removeAttr("disabled"); 
      $("#state_input").removeAttr("disabled");

      $("#submit_button").attr("disabled", "true");

      this.street = '';
      this.city = '';

      this.showStreetErrorMessage = false;
      this.showCityErrorMessage = false;

      this.checkBoxChecked = false;
      this.userLocationDetermined = false;
    }
  }

  clearEverything() {
    this.sendMyEvent.emit("clear clicked!");
    this.sendClear.emit(true);
    if($("#checkbox").is(':checked')) {
      $("#street_input").removeAttr("disabled"); 
      $("#city_input").removeAttr("disabled"); 
      $("#state_input").removeAttr("disabled"); 
      $("#checkbox").prop("checked", false);
    }
    
    $("#street_input").val("");
    $("#city_input").val("");
    $("#state_input").val("").prop("selected", true);

    $("#submit_button").attr("disabled", "true");

    this.street = '';
    this.city = '';

    this.showStreetErrorMessage = false;
    this.showCityErrorMessage = false;

    this.checkBoxChecked = false;
    this.userLocationDetermined = false;
  }

}
