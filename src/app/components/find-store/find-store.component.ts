import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { GoogleMapService } from 'src/app/services/google-map.service';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Stream } from 'stream';

export interface Store {
  name: string;
  ranking: number;
  distance: string;
  address: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-find-store',
  templateUrl: './find-store.component.html',
  styleUrls: ['./find-store.component.scss'],
})
export class FindStoreComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap; // false: resolve after change detection.
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  storeArray: Store[] = [];

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

  constructor(private mapService: GoogleMapService) {}

  ngOnInit(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      console.log('not support');
    } else {
      this.getCurrentPosition()
        .then((data) => {
          this.center = {
            lat: data.lat,
            lng: data.lng,
          };
        })
        .catch((err) => alert(err));
    }
  }

  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  ngAfterViewInit() {}

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

    // if (!this.center) {
    //   const xx = this.map.getCenter();
    //   this.center = {
    //     lat: xx.lat(),
    //     lng: xx.lng(),
    //   };
    // }
    // console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker(): void {
    this.storeArray.forEach((store) => {
      this.markers.push({
        position: {
          lat: store.lat,
          lng: store.lng,
        },
        label: {
          color: 'gray',
          text: store.name,
        },
        title: store.name,
        info: store.name,
        options: {
          animation: google.maps.Animation.BOUNCE,
        },
      });
    });
  }

  openInfo(marker: any, content = ''): void {
    this.infoContent = content;
    this.info.open(marker);
  }

  getPositionByZipCode(zipCode: string): void {
    // this.mapService.getPositionByZipCode(zipCode);
    this.storeArray = [
      {
        name: 'Bas-Laurant',
        ranking: 1,
        distance: '0.1km',
        address: '5815 Sherbrooke St W, Montreal, Quebec H4A 1X4',
        lat: 45.47,
        lng: -73.63,
      },
      {
        name: 'Lac-Saint',
        ranking: 2,
        distance: '0.2km',
        address: '5107 Sherbrooke St W, Montreal',
        lat: 45.47,
        lng: -73.6,
      },
      {
        name: 'Capitale',
        ranking: 3,
        distance: '1.1km',
        address: '5107 Sherbrooke St W, Montreal',
        lat: 45.47,
        lng: -73.62,
      },
      {
        name: 'Maurice',
        ranking: 4,
        distance: '2.1km',
        address: '5351 Côte Saint Luc Rd, Montreal, Quebec H3X 2C3',
        lat: 45.47,
        lng: -73.65,
      },
      {
        name: 'Estrie',
        ranking: 5,
        distance: '3.0km',
        address: '5351 Côte Saint Luc Rd, Montreal, Quebec H3X 2C3',
        lat: 45.47,
        lng: -73.5,
      },
    ];
    this.addMarker();
  }

  calculateDistance(pointA: any, pointB: any): void {
    pointA = { lat: 40.7767644, lng: -73.9761399 }; // google.maps.LatLng

    pointB = { lat: 40.771209, lng: -73.9673991 };
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map.googleMap ? this.map.googleMap : null);

    // Existing map object displays directions
    // Create route from existing points used for markers

    const route = {
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING, // BICYCLING, TRANSIT, WALKING
    };

    directionsService.route(route, (response, status) => {
      // anonymous function to capture directions
      if (status !== 'OK') {
        window.alert('Directions request failed due to ' + status);
        return;
      } else {
        directionsRenderer.setDirections(response);
        // Add route to the map
        let directionsData = response.routes[0].legs[0];
        // Get data about the mapped route
        if (!directionsData) {
          window.alert('Directions request failed');
          return;
        } else {
          const distanceMessage =
            ' Driving distance is ' +
            directionsData.distance.text +
            ' (' +
            directionsData.duration.text +
            ').';
        }
      }
    });
  }
}
