import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin.component';
import { MyMeetingsComponent } from 'src/app/views/my-meetings/my-meetings.component';
import { HistoryMeetingsComponent } from 'src/app/views/history-meetings/history-meetings.component';
import { AccountComponent } from 'src/app/views/account/account.component';
import { DetailMeetingComponent } from 'src/app/views/detail-meeting/detail-meeting.component';
import { UsersComponent } from 'src/app/views/users/users.component';
import { AdminGuard } from 'src/app/helpers/guards/admin-guard';
import { OrganizerGuard } from 'src/app/helpers/guards/organizer-guard';
import { AnyGuard } from 'src/app/helpers/guards/any-guard';
import { MeetingsComponent } from 'src/app/views/meetings/meetings.component';
import { DashboardComponent } from 'src/app/views/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: LayoutAdminComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [OrganizerGuard],

    },
    {
      path: 'my-meetings',
      component: MyMeetingsComponent,
      canActivate: [OrganizerGuard],

    },
    {
      path: 'history-meetings',
      component: HistoryMeetingsComponent,
      canActivate: [OrganizerGuard],

    },
    {
      path: 'account',
      component: AccountComponent,
      canActivate: [AnyGuard],

    },
    {
      path: 'details/:id',
      component: DetailMeetingComponent,
      canActivate: [AnyGuard],
    },
    {
      path: 'meetings',
      component: MeetingsComponent,
      canActivate: [AdminGuard],
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AdminGuard],
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule { }
