import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  offsetY = 0
  isHome = window.location.pathname === '/#catalogo' || window.location.pathname === '/'

  @HostListener("window:scroll", ['$event'])
  
  doSomethingOnWindowsScroll($event: Event) {
    this.offsetY = window.pageYOffset
  }

}