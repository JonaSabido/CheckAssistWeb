import { Component, Inject, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent {

  @ViewChild('map', { static: false }) mapElement: GoogleMap | undefined;
  center: google.maps.LatLngLiteral = {
    lat: this.data.model.latitude,
    lng: this.data.model.longitude
  };

  zoom = 12;

  marker = {
    position: {
      lat: this.data.model.latitude,
      lng: this.data.model.longitude,
    },
    draggable: this.data.type != 'only-view',
    options: {
      animation: google.maps.Animation.DROP,
      draggable: this.data.type != 'only-view',
      crossOnDrag: false,
    },
  }

  constructor(
    private dialog: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<Meeting>
  ) {

  }

  ngOnInit() {
    if (this.data.type === 'create' && !this.data.model.selectedLocation ) {
      this.getCurrentLocation();
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.center = currentLocation;
        this.marker.position = currentLocation;

      },
      (error) => {
        console.error('Error al obtener la posición:', error.message);
      })
  }


  onMarkerDragEnd(event: any) {
    this.center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.marker.position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.mapElement?.panTo(this.center);
  }



  closeDialog(): void {
    this.dialog.close(true);
  }

  save() {
    this.data.model.latitude = this.marker.position.lat
    this.data.model.longitude = this.marker.position.lng
    this.data.model.selectedLocation = true
    this.dialog.close(true);

  }


}
