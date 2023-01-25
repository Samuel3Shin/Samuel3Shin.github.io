import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  @Output() sendErrorOccurred : EventEmitter<any> = new EventEmitter();
  
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


  // autocomplete part
  cityInputControl = new FormControl();
  cities: string[] = [];
  options: string[] = [];
  showAutocomplete = true;

  filteredOptions: Observable<string[]> | undefined;

  constructor() {
    this.isChecked = false;
    // this.cityInputControl= new FormControl();
    // this.showCityErrorMessage = false;
  }

  ngOnInit(): void {
    // autocomplete
    this.filteredOptions = this.cityInputControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  valuechange(event: any) {
    console.log(event);

    if(event == "") {
      console.log("no input!");
      this.showCityErrorMessage = true;

    } else {
      this.showCityErrorMessage = false;

      this.showAutocomplete = true;
      fetch(`https://web-hw8-328723.wl.r.appspot.com/autocomplete?city=${event}`).then(
        (response) => response.json()
      ).then(
          (jsonResponse) => {
              console.log(jsonResponse);
  
              this.cities = [];
              for(var i=0; i<jsonResponse['predictions'].length; ++i) {
                this.cities.push(jsonResponse['predictions'][i]['structured_formatting']['main_text']);
              }
              this.options = this.cities;
          }
      )
    }
  }

  streetFocusOut() {
    this.showStreetErrorMessage = true;
  }

  cityFocusOut() {
    // this.showCityErrorMessage = true;
  }

  handleSubmit() {
    this.sendProgress.emit(true);
    this.sendMyEvent.emit("submit button clicked!");

    // var street = $("street_input").val();
    // var city = $("city_input").val();
    // var state = $("state_input").val();

    // console.log("street: ", street);
    // console.log("City: ", city);
    // console.log("State: ", state);

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

              if(jsonResponse == null || jsonResponse['status'] == 403) {
                this.sendErrorOccurred.emit("error_occurred");
                return;
              }

              var city_get = jsonResponse['city'];
              var state_get = jsonResponse['region'];
              lat = jsonResponse['loc'].split(",")[0];
              lng = jsonResponse['loc'].split(",")[1];
              this.sendLatLng.emit(lat + "," + lng);
              this.sendAddress.emit(city_get + "," + state_get);
          }
      ).catch((error) => {
        console.log(error);
        this.sendErrorOccurred.emit("error_occurred");
        return;
      })
      // city = this.ipInfoCity;
      // state = this.ipInfoState;
      // lat = this.lat;
      // lng = this.lng;

      // this.sendLatLng.emit(lat + "," + lng);
      // this.sendAddress.emit(city + "," + state);
    } else {
      // No auto-address
      this.sendMyEvent.emit("user input address");

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.street} ${this.cityInputControl.value} ${this.state}&key=AIzaSyB6wzX7VVJILzNoa2cbSUebst5BmBOLzEA`).then(
        (response) => response.json()
      ).then(
        (jsonResponse) => {

          var city_get = "";
          var state_get = "";

          if(jsonResponse == null || jsonResponse['results'].length == 0) {
            this.sendErrorOccurred.emit("error_occurred");
              return;
          }

          var formattedAddress = "";
          if(jsonResponse['results'][0]['formatted_address'] != undefined) {
              formattedAddress = jsonResponse['results'][0]['formatted_address'];
          }

          var addressComponents = jsonResponse['results'][0]['address_components'];
          for(var i=0; i<addressComponents.length; ++i) {
              if(addressComponents[i]['types'][0] == 'locality') {
                  city_get = addressComponents[i]['long_name'];
              } else if(addressComponents[i]['types'][0] == 'administrative_area_level_1') {
                  state_get = addressComponents[i]['long_name'];
              } else if(addressComponents[i]['types'][0] == 'route') {
                  route = addressComponents[i]['short_name'];
              }
          }

          lat = jsonResponse['results'][0]['geometry']['location']['lat'];
          lng = jsonResponse['results'][0]['geometry']['location']['lng'];

          if(formattedAddress == "") {
            formattedAddress = (route=="" ? "" : (route + ", ")) + city_get + ", " + state_get + ", " + country;
          }
          this.sendLatLng.emit(lat + "," + lng);
          this.sendAddress.emit(city_get + "," + state_get);
          // this.sendAddress.emit(route + " " + city + " " + state);
        }
      ).catch((error) => {
        console.log(error);
        this.sendErrorOccurred.emit("error_occurred");
        return;
      });      
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

      // this.street = "    ";
      // this.city = "    ";


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
      ).catch((error) => {
        console.log(error);
        this.sendErrorOccurred.emit("error_occurred");
        return;
      })

      this.checkBoxChecked = true;

      this.showStreetErrorMessage = false;
      this.showCityErrorMessage = false;
    } else {
      // auto-detection unclicked

      $("#street_input").removeAttr("disabled"); 
      $("#city_input").removeAttr("disabled"); 
      $("#state_input").removeAttr("disabled");

      $("#state_input").val("").prop("selected", true);

      $("#submit_button").attr("disabled", "true");

      this.street = '';
      this.city = '';
      this.state = '';

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
    this.state = '';

    this.showStreetErrorMessage = false;
    this.showCityErrorMessage = false;

    this.checkBoxChecked = false;
    this.userLocationDetermined = false;

  }

}
