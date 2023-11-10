import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { Dialog } from '@angular/cdk/dialog';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { PROPERTIES_FILLED } from 'src/app/consts/functions';
import { MeetingService } from 'src/app/services/meeting.service';
import { AlertDeleteError, AlertDeleteSuccess, AlertSaveError, AlertSaveSuccess, AlertShowCode } from 'shared/utils/alerts';
import { TODAY } from 'shared/utils/constants';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss']
})
export class MeetingDialogComponent {

  today = TODAY

  constructor(
    private dialog: MatDialogRef<MeetingDialogComponent>,
    private service: MeetingService,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<Meeting>
  ) { }

  closeDialog(): void {
    this.dialog.close(true);
  }


  create() {
    this.service.store(this.data.model).subscribe({
      next: (response) => {
        this.closeDialog()
        AlertSaveSuccess(1000).then(value => {
          AlertShowCode(response.data.code_meeting)
        })
      },
      error: (e) => {
        AlertSaveError()
      }
    })
  }

  update() {
    this.service.update(this.data.model.id, this.data.model).subscribe({
      next: (response) => {
        AlertSaveSuccess()
        this.closeDialog()
      },
      error: (e) => {
        AlertSaveError()
      }
    })
  }

  onSubmit() {
    if (PROPERTIES_FILLED(this.data.model)) {
      if (this.data.type == 'create') {
        this.create()
      }
      else {
        this.update()
      }

    }

  }

}
