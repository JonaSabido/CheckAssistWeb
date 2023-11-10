import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeadbarComponent } from './components/headbar/headbar.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import { LayoutAdminRoutingModule } from './components/layout-admin/layout-admin-routing.module';
import { LayoutAdminModule } from './components/layout-admin/layout-admin.module';
import { MyMeetingsComponent } from './views/my-meetings/my-meetings.component';
import { HistoryMeetingsComponent } from './views/history-meetings/history-meetings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetingDialogComponent } from './dialogs/meeting-dialog/meeting-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './views/account/account.component';
import { DetailMeetingComponent } from './views/detail-meeting/detail-meeting.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { UsersComponent } from './views/users/users.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { DateMeetingValidatorDirective } from './validations/date-meeting-validator.directive';
import { EndHourValidatorDirective } from './validations/end-hour-validator.directive';
import { StartHourValidatorDirective } from './validations/start-hour-validator.directive'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    MyMeetingsComponent,
    HistoryMeetingsComponent,
    MeetingDialogComponent,
    AccountComponent,
    DetailMeetingComponent,
    UsersComponent,
    UserDialogComponent,
    DateMeetingValidatorDirective,
    EndHourValidatorDirective,
    StartHourValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutAdminModule,
    LayoutAdminRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
