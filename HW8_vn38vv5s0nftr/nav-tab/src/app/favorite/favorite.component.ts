import { Component, OnInit } from '@angular/core';

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
  favoriteItems: FavoriteItem[] = [];

  constructor() {
    var saved_items = JSON.parse(localStorage.getItem("favorites")!);
    console.log("item length:", saved_items.length);

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

  onDeleteClick(event: any){
    console.log("delete button clicked!");

    var saved_items = JSON.parse(localStorage.getItem("favorites")!);
    // saved_items.delete(event);

    saved_items.splice(event, 1);
    this.favoriteItems.splice(event, 1);

    localStorage.setItem("favorites", JSON.stringify(saved_items));
    console.log(JSON.stringify(saved_items));

    // alert("Event type: " + event.toDateString());
    // this.sendDetailTrigger.emit(event);
    // return (event.target as HTMLInputElement).value;
  }
}
