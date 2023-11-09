import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterParams } from 'shared/services/api.service';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { Meeting } from 'src/app/interfaces/meeting.interface'
import { JwtService } from 'src/app/services/jwt.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-history-meetings',
  templateUrl: './history-meetings.component.html',
  styleUrls: ['./history-meetings.component.scss']
})
export class HistoryMeetingsComponent {

  entities: Meeting[] = []

  filters: FilterParams<Meeting> = {}

  showFilters: boolean = false;

  columns: string[] = ['name', 'date_meeting', 'start_hour', 'end_hour', 'options'];

  authUser: AuthUser = {
    id: 0,
    name: '',
    last_name: '',
    id_profile: 0,
  }

  constructor(
    private service: MeetingService,
    private jwtService: JwtService
  ) {

  }

  ngOnInit(): void {
    this.authUser = this.jwtService.getData(this.jwtService.getToken())
    this.filters.id_user = this.authUser.id
    this.reload()
  }

  reload() {
    this.service.history(this.filters).subscribe({
      next: (response) => {
        this.entities = response.data
      },
      error: (e) => {
        this.entities = []
      }
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
