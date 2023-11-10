import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterParams } from 'shared/services/api.service';
import { MeetingDialogComponent } from 'src/app/dialogs/meeting-dialog/meeting-dialog.component';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { JwtService } from 'src/app/services/jwt.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.scss']
})
export class MyMeetingsComponent implements OnInit {

  entity: Meeting = {
    id: 0,
    id_user: 0,
    code_meeting: '',
    name: '',
    description: '',
    date_meeting: '',
    start_hour: '',
    end_hour: '',
    latitude: 0,
    longitude: 0
  }

  entities: Meeting[] = []

  authUser: AuthUser = {
    id: 0,
    name: '',
    last_name: '',
    id_profile: 0,
  }

  filters: FilterParams<Meeting> = {}

  showFilters: boolean = false;

  constructor(
    private dialog: MatDialog,
    private service: MeetingService,
    private jwtService: JwtService
  ) {

  }

  ngOnInit(): void {
    this.authUser = this.jwtService.getData(this.jwtService.getToken())
    this.filters.id_user = this.authUser.id
    this.entity.id_user = this.authUser.id
    this.reload()
  }

  reload() {
    this.service.availables(this.filters).subscribe({
      next: (response) => {
        this.entities = response.data
      },
      error: (e) => {
        this.entities = []
      }
    })
  }

  openDialog(type: 'create' | 'edit', meeting?: Meeting) {
    const dialogData: DataDialog<Meeting> = {
      type: type,
      model: meeting ? meeting : this.entity
    }

    this.dialog.open(MeetingDialogComponent, {
      data: dialogData,
      width: '75%',
      panelClass: '',
      autoFocus: false

    }).afterClosed().subscribe(value => {
      this.reload()
    })
  }

  switchFilters() {
    this.showFilters = !this.showFilters
    if (!this.showFilters) {
      this.filters = {}
      this.reload()
    }
  }


}