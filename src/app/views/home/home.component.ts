import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('benefits') benefitsSection: ElementRef | undefined;
  @ViewChild('use') useSection: ElementRef | undefined;
  @ViewChild('about') aboutSection: ElementRef | undefined;
  @ViewChild('services') servicesSection: ElementRef | undefined;


  scrollToBenefits() {
    this.benefitsSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  scrollToUse() {
    this.useSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
  scrollToAbout() {
    this.aboutSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  scrollToServices() {
    this.servicesSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
