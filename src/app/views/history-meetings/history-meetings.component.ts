import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterParams } from 'shared/services/api.service';
import { AlertDeleteError, AlertDeleteSuccess } from 'shared/utils/alerts';
import { Confirm } from 'shared/utils/alerts-config';
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

  showLoading: boolean = false;


  columns: string[] = ['name', 'date_meeting', 'start_hour', 'end_hour', 'options'];



  constructor(
    private service: MeetingService,
  ) {

  }

  ngOnInit(): void {
    this.reload()
  }

  reload() {
    this.showLoading = true
    this.entities = []
    this.service.history(this.filters).subscribe({
      next: (response) => {
        this.showLoading = false
        this.entities = response.data
      },
      error: (e) => {
        this.showLoading = false
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

  delete(name: string, id: number) {
    Confirm.fire({
      title: '¿Esta seguro que desea eliminar el evento: ' + name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        this.service.destroy(id).subscribe({
          next: (response) => {
            AlertDeleteSuccess()
            this.reload()
          },
          error: (e) => {
            AlertDeleteError()
          }
        })
      }
    })
  }

}
