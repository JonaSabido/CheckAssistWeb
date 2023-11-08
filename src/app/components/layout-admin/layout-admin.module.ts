import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeadbarComponent } from '../headbar/headbar.component';
import { FooterbarComponent } from '../footerbar/footerbar.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    LayoutAdminComponent,
    SidebarComponent,
    HeadbarComponent,
    FooterbarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LayoutAdminRoutingModule
  ]
})
export class LayoutAdminModule { }
