import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap; // false: resolve after change detection.
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers: Array<any> = [];
  infoContent = '';
  tourLength = 300;

  todo = ['Bas-Laurant', 'Lac-Saint', 'Capitale', 'Maurice'];

  done = ['Estrie', 'Cote-nord', 'Madeleint', 'Laval', 'Mongteregie'];
  
  ngOnInit(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      alert('not support google map');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('p2 is', position);
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (err) => {
          console.log('err', err);
        }
      );
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.tourLength = this.todo.length * 50; // TODO google map distance
  }

  zoomIn(): void {
    if (this.zoom < (this.options.maxZoom ? this.options.maxZoom : 7)) {
      this.zoom++;
    }
  }

  zoomOut(): void {
    if (this.zoom > (this.options.minZoom ? this.options.minZoom : 7)) {
      this.zoom--;
    }
  }

  click(event: google.maps.MapMouseEvent): void {
    console.log('event', event);
  }

  logCenter(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      console.log('boj is pr');
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('p2 is', position);
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (err) => {
        console.log('err', err);
      },
      options
    );
  }

  addMarker(): void {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: any, content = ''): void {
    this.infoContent = content;
    this.info.open(marker);
  }
}
