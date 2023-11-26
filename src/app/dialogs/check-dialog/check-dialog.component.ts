import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckUser } from 'src/app/interfaces/checkuser.interface';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { CheckUserService } from 'src/app/services/checkuser.service';

@Component({
  selector: 'app-check-dialog',
  templateUrl: './check-dialog.component.html',
  styleUrls: ['./check-dialog.component.scss']
})
export class CheckDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<CheckDialogComponent>,
    private service: CheckUserService,
    @Inject(MAT_DIALOG_DATA) public data: CheckUser

  ) { }

  closeDialog(reload: boolean = false): void {
    this.dialog.close(reload);
  }

  ngOnInit(): void {
    this.service.single(this.data.id).subscribe({
      next: (response) => {
        this.data = response.data
      },
      error: (e) => {

      }
    })
  }
}
