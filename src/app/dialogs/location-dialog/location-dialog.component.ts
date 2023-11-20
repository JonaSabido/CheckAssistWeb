import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent {

  constructor(
    private dialog: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<Meeting>

  ) {

  }

  closeDialog(): void {
    this.dialog.close(true);
  }


}
