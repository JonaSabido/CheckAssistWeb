import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private service: MeetingService,
    private serviceMeetingUser: MeetingUserService
  ) {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.service.single(this.id).subscribe(response => {
        this.meeting = response.data
      })
      this.serviceMeetingUser.list({ id_meeting: this.id }).subscribe(response => {
        this.registers = response.data
      })
    });
  }

}
