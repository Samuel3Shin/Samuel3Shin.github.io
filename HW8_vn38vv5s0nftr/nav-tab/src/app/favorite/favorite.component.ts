import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface FavoriteItem {
  lat: string;
  lng: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Output() sendLatLng : EventEmitter<any> = new EventEmitter();
  @Output() sendAddress : EventEmitter<any> = new EventEmitter();

  itemExist = false;

  favoriteItems: FavoriteItem[] = [];

  constructor() {
    var saved_items = JSON.parse(localStorage.getItem("favorites")!);
    
    if(saved_items == null) {
      saved_items = [];
    }

    if(saved_items.length > 0){
      this.itemExist = true;
    }

    for(var i=0; i<saved_items.length; ++i) {
      console.log("favorite item index: ", i);
      var stringArr = saved_items[i].split(",");

      var lat_get = stringArr[0];
      var lng_get = stringArr[1];

      var city_get = stringArr[2]
      var state_get = stringArr[3]

      this.favoriteItems?.push({
        lat: lat_get,
        lng: lng_get,
        city: city_get,
        state: state_get
      });
    }

  }

  ngOnInit(): void {
  }

  onCityClick(event: any) {
    console.log("city clicked!");

    this.sendLatLng.emit(this.favoriteItems[event]["lat"] + "," + this.favoriteItems[event]["lng"]);
    this.sendAddress.emit(this.favoriteItems[event]["city"] + "," + this.favoriteItems[event]["state"]);
  }

  onDeleteClick(event: any){
    console.log("delete button clicked!");

    var saved_items = JSON.parse(localStorage.getItem("favorites")!);

    saved_items.splice(event, 1);
    this.favoriteItems.splice(event, 1);

    localStorage.setItem("favorites", JSON.stringify(saved_items));
    console.log(JSON.stringify(saved_items));

    if(this.favoriteItems.length == 0) {
      this.itemExist = false;
    }

  }
}
