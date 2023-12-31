import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterParams } from 'shared/services/api.service';
import { AlertDeleteError, AlertDeleteSuccess } from 'shared/utils/alerts';
import { Confirm } from 'shared/utils/alerts-config';
import { PROFILES } from 'src/app/consts/profiles';
import { UserDialogComponent } from 'src/app/dialogs/user-dialog/user-dialog.component';
import { AuthUser } from 'src/app/interfaces/auth.interface';
import { DataDialog } from 'src/app/interfaces/data-dialog.interface';
import { User } from 'src/app/interfaces/user.interface';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  entity: User = {
    id: 0,
    name: '',
    last_name: '',
    id_profile: 0,
    email: '',
    password: ''
  }

  entities: User[] = []

  filters: FilterParams<User> = {
    id_profile: 0
  }

  showFilters: boolean = false;

  showLoading: boolean = false;


  columns: string[] = ['name', 'last_name', 'email', 'profile_name', 'options'];

  authUser: AuthUser = {
    id: 0,
    name: '',
    last_name: '',
    id_profile: 0,
  }

  profiles = PROFILES

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private jwtService: JwtService
  ) {

  }

  ngOnInit(): void {
    this.authUser = this.jwtService.getData(this.jwtService.getToken())
    this.reload()
  }

  reload() {
    this.showLoading = true
    this.entities = []
    this.service.list(this.filters).subscribe({
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

  openDialog(type: 'create' | 'edit', user?: User) {
    const dialogData: DataDialog<User> = {
      type: type,
      model: user ? user : this.entity
    }

    this.dialog.open(UserDialogComponent, {
      data: dialogData,
      width: '75%',
      panelClass: '',
      autoFocus: false

    }).afterClosed().subscribe(value => {
      if (value) {
        this.reload()
      }
    })
  }

  switchFilters() {
    this.showFilters = !this.showFilters
    if (!this.showFilters) {
      this.filters = {
        id_profile: 0
      }
      this.reload()
    }
  }

  delete(email: string, id: number) {
    Confirm.fire({
      title: '¿Esta seguro que desea eliminar el usuario: ' + email + '?',
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
