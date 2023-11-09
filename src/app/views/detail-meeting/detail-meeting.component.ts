import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MeetingDialogComponent } from 'src/app/dialogs/meeting-dialog/meeting-dialog.component';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { MeetingUser } from 'src/app/interfaces/meetinguser.interface';
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

  id: number = 0;

  today = new Date().toISOString().slice(0,10)



  constructor(
    private route: ActivatedRoute,
    private service: MeetingService,
    private serviceMeetingUser: MeetingUserService,
    private dialog: MatDialog,

  ) {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.getData();
    });
  }

  getData() {
    this.service.single(this.id).subscribe(response => {
      this.meeting = response.data

    })
    this.serviceMeetingUser.list({ id_meeting: this.id }).subscribe(response => {
      this.registers = response.data
    })
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

}
