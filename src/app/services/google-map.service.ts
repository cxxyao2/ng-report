import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapService {
  mapKey = environment.mapKey;
  constructor(private http: HttpClient) {}

  getPositionByZipCode(zipCode: string): void {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.mapKey}&components=postal_code:${zipCode}`;
    this.http.post(url, {}).subscribe((data: any) => {
      const latitude = data.results[0].geometry.location.lat;
      const longitude = data.results[0].geometry.location.lng;
      alert('Lat = ' + latitude + '- Long = ' + longitude);
    });
  }
}
