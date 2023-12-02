import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertChangeStatusError, AlertChangeStatusSuccess, AlertDeleteError, AlertDeleteSuccess } from 'shared/utils/alerts';
import { Confirm } from 'shared/utils/alerts-config';
import { CHECKUSER_STATUS, TODAY, CheckUserStatusValues } from 'shared/utils/constants';
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

  showLoadingMeeting: boolean = false;
  showLoadingRegisters: boolean = false;
  showLoadingChecks: boolean = false;



  columns: string[] = ['user', 'createdAt', 'options'];

  columnsChecks: string[] = ['user', 'start_date', 'end_date', 'status', 'options'];

  typeView: 'registers' | 'checks' = 'registers';

  id: number = 0;

  today = TODAY()

  checkUserStatus = CHECKUSER_STATUS



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
    this.getMeeting()
    this.getMeetingUsers()
    this.getCheckUsers()
  }

  getMeeting() {
    this.showLoadingMeeting = true
    this.service.single(this.id).subscribe({
      next: (response) => {
        this.showLoadingMeeting = false
        this.meeting = response.data
      },
      error: (err) => {
        this.showLoadingMeeting = false
        if (err.status == 403) {
          this.router.navigate(['/'], { relativeTo: this.route });

        }
      }
    })
  }



  getMeetingUsers() {
    this.showLoadingRegisters = true
    this.serviceMeetingUser.getByMeeting(this.id).subscribe(
      {
        next: (response) => {
          this.showLoadingRegisters = false
          this.registers = response.data
        },
        error: (e) => {
          this.showLoadingRegisters = false
          this.registers = []
        }
      }
    )
  }

  getCheckUsers() {
    this.showLoadingChecks = true
    this.serviceCheckUser.getByMeeting(this.id).subscribe(
      {
        next: (response) => {
          this.showLoadingChecks = false
          this.checkUsers = response.data
        },
        error: (e) => {
          this.showLoadingChecks = false
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
      if (value) {
        this.getData()
      }
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

  changeCheckStatus(checkUser: CheckUser, status: CheckUserStatusValues) {
    Confirm.fire({
      title: `¿Esta seguro que desea ${status == this.checkUserStatus.Canceled ? 'cancelar' : 'revocar'} la asistencia de ${checkUser.meeting_user?.user?.name} ${checkUser.meeting_user?.user?.last_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.serviceCheckUser.changeStatus(checkUser.id, status).subscribe({
          next: (response) => {
            AlertChangeStatusSuccess()
            this.getCheckUsers()
          },
          error: (e) => {
            AlertChangeStatusError()
          }
        })
      }
    })
  }

  generateReport(){
    const headers = ['Apellidos', 'Nombres', 'Hora de entrada', 'Hora de salida', 'Status']
  }

}
