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

  errorMessage = '';
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
  infoContent = 'aaa';
  tourLength = 300;

  todo = ['Bas-Laurant', 'Lac-Saint', 'Capitale', 'Maurice'];

  done = ['Estrie', 'Cote-nord', 'Madeleine', 'Laval', 'Mongteregie'];
  coords = [
    { name: 'Bas-Laurant', lat: 45.47, lng: -73.63 },
    { name: 'Lac-Saint', lat: 45.47, lng: -73.6 },
    { name: 'Capitale', lat: 45.47, lng: -72 },
    { name: 'Maurice', lat: 45.47, lng: -72.6 },
    { name: 'Estrie', lat: 45.47, lng: -72.5 },
    { name: 'Cote-nord', lat: 45.47, lng: -72.1 },
    { name: 'Madeleine', lat: 45.47, lng: -73.4 },
    { name: 'Laval', lat: 45.47, lng: -73.1 },
    { name: 'Mongteregie', lat: 45.8, lng: -73 },
  ];

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
    this.addMarker();
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
    this.markers = [];
    this.todo.forEach((locationName) => {
      const idx = this.coords.findIndex(
        (location: any) => location.name === locationName
      );
      if (idx >= 0) {
        this.markers.push({
          position: {
            lat: this.coords[idx].lat,
            lng: this.coords[idx].lng,
          },
          label: {
            color: 'red',
            text: locationName,
          },
          title: locationName,
          info: locationName,
          options: {
            animation: google.maps.Animation.DROP,
          },
        });
      }
    });
  }

  openInfo(marker: MapMarker, content: string): void {
    this.infoContent = content + ' is a excellent location';
    this.info.open(marker);
  }
}
