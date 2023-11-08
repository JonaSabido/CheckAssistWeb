import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.scss']
})
export class FooterbarComponent {

  hasScrollBar = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScrollBar();
  }

  ngOnInit() {
    this.checkScrollBar();
  }

  checkScrollBar(): void {
    this.hasScrollBar = document.documentElement.scrollHeight > window.innerHeight;
  }

}
