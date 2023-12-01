import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent {
  showSidebar: boolean = true;

  switchShowSidebar() {
    this.showSidebar = !this.showSidebar
  }
}
