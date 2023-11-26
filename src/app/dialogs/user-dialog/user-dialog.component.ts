import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PROPERTIES_FILLED } from 'src/app/consts/functions';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { PROFILES } from 'src/app/consts/profiles';
import { AlertSaveError, AlertSaveSuccess } from 'shared/utils/alerts';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  profiles = PROFILES
  showLoadingSave: boolean = false;


  constructor(
    private dialog: MatDialogRef<UserDialogComponent>,
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog<User>
  ) { }

  closeDialog(reload: boolean = false): void {
    this.dialog.close(reload);
  }

  ngOnInit() {
  }

  create() {
    this.showLoadingSave = true
    this.service.store(this.data.model).subscribe({
      next: (response) => {
        this.showLoadingSave = false
        AlertSaveSuccess()
        this.closeDialog(true)
      },
      error: (e) => {
        this.showLoadingSave = false
        AlertSaveError()

      }
    })
  }

  update() {
    this.showLoadingSave = true
    this.service.update(this.data.model.id, this.data.model).subscribe({
      next: (response) => {
        this.showLoadingSave = false
        AlertSaveSuccess()
        this.closeDialog(true)
      },
      error: (e) => {
        this.showLoadingSave = false
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
