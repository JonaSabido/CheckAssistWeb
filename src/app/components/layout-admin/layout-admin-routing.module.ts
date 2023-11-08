import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin.component';
import { MyMeetingsComponent } from 'src/app/views/my-meetings/my-meetings.component';
import { HistoryMeetingsComponent } from 'src/app/views/history-meetings/history-meetings.component';
import { AccountComponent } from 'src/app/views/account/account.component';
import { DetailMeetingComponent } from 'src/app/views/detail-meeting/detail-meeting.component';
import { UsersComponent } from 'src/app/views/users/users.component';

const routes: Routes = [{
  path: '',
  component: LayoutAdminComponent,
  children: [
    {
      path: 'my-meetings',
      component: MyMeetingsComponent
    },
    {
      path: 'history-meetings',
      component: HistoryMeetingsComponent
    },
    {
      path: 'account',
      component: AccountComponent
    },
    {
      path: 'details/:id',
      component: DetailMeetingComponent
    },
    {
      path: 'users',
      component: UsersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule { }
