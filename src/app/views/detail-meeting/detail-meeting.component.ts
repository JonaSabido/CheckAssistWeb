import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDeleteError, AlertDeleteSuccess } from 'shared/utils/alerts';
import { Confirm } from 'shared/utils/alerts-config';
import { TODAY } from 'shared/utils/constants';
import { CheckDialogComponent } from 'src/app/dialogs/check-dialog/check-dialog.component';
import { LocationDialogComponent } from 'src/app/dialogs/location-dialog/location-dialog.component';
import { MeetingDialogComponent } from 'src/app/dialogs/meeting-dialog/meeting-dialog.component';
import { CheckUser } from 'src/app/interfaces/checkuser.interface';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { MeetingUser } from 'src/app/interfaces/meetinguser.interface';
import { CheckUserService } from 'src/app/services/checkuser.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { MeetingUserService } from 'src/app/services/meetingusers.service';

@Component({
  selector: 'app-detail-meeting',
  templateUrl: './detail-meeting.component.html',
  styleUrls: ['./detail-meeting.component.scss']
})
export class DetailMeetingComponent {
  entities: Meeting[] = []

  registers: MeetingUser[] = []

  checkUsers: CheckUser[] = []


  meeting: Meeting = {
    id: 0,
    id_user: 0,
    code_meeting: '',
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    date_meeting: '',
    start_hour: '',
    end_hour: ''
  }

  columns: string[] = ['user', 'createdAt', 'options'];

  columnsChecks: string[] = ['user', 'start_date', 'end_date', 'status', 'options'];


  typeView: 'registers' | 'checks' = 'registers';

  id: number = 0;

  today = TODAY



  constructor(
    private route: ActivatedRoute,
    private service: MeetingService,
    private serviceMeetingUser: MeetingUserService,
    private serviceCheckUser: CheckUserService,
    private dialog: MatDialog,
    public router: Router

  ) {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.getData();
    });
  }

  switchView(typeView: 'registers' | 'checks') {
    this.typeView = typeView
  }

  getData() {
    this.service.single(this.id).subscribe({
      next: (response) => {
        this.meeting = response.data
      },
      error: (err) => {
        if (err.status == 403) {
          this.router.navigate(['/'], { relativeTo: this.route });

        }
      }
    })
    this.getMeetingUsers()
    this.getCheckUsers()
  }



  getMeetingUsers() {
    this.serviceMeetingUser.getByMeeting(this.id).subscribe(
      {
        next: (response) => {
          this.registers = response.data
        },
        error: (e) => {
          this.registers = []
        }
      }
    )
  }

  getCheckUsers() {
    this.serviceCheckUser.getByMeeting(this.id).subscribe(
      {
        next: (response) => {
          this.checkUsers = response.data
        },
        error: (e) => {
          this.checkUsers = []
        }
      }
    )
  }

  openDialog(type: 'create' | 'edit',) {
    const dialogData: DataDialog<Meeting> = {
      type: type,
      model: this.meeting
    }

    this.dialog.open(MeetingDialogComponent, {
      data: dialogData,
      width: '75%',
      panelClass: '',
      autoFocus: false

    }).afterClosed().subscribe(value => {
      this.getData()
    })
  }

  openDialogCheck(checkuser: CheckUser) {
    const dialogData: CheckUser = checkuser

    this.dialog.open(CheckDialogComponent, {
      data: dialogData,
      width: '75%',
      panelClass: '',
      autoFocus: false
    }).afterClosed().subscribe(value => {

    })
  }

  openDialogLocation() {
    const dialogData: DataDialog<Meeting> = {
      type: 'only-view',
      model: this.meeting
    }

    this.dialog.open(LocationDialogComponent, {
      data: dialogData,
      width: '100%',
      panelClass: '',
      autoFocus: false

    }).afterClosed().subscribe(value => {
    })
  }


  delete() {
    Confirm.fire({
      title: '¿Esta seguro que desea eliminar este evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.service.destroy(this.meeting.id).subscribe({
          next: (response) => {
            AlertDeleteSuccess()
            this.router.navigate(['/my-meetings'], { relativeTo: this.route });

          },
          error: (e) => {
            AlertDeleteError()
          }
        })
      }
    })
  }

  deleteMeetingUser(meetinguser: MeetingUser) {
    Confirm.fire({
      title: `¿Esta seguro que desea eliminar al usuario ${meetinguser.user?.name} ${meetinguser.user?.last_name} de este evento?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.serviceMeetingUser.destroy(meetinguser.id).subscribe({
          next: (response) => {
            AlertDeleteSuccess()
            this.getMeetingUsers()
          },
          error: (e) => {
            AlertDeleteError()
          }
        })
      }
    })
  }

}
