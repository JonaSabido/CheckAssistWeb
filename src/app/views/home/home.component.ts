import { Component, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.initTyped();
  }

  private initTyped(): void {
    const options = {
      strings: [
        '<span class="color-primary-500">¡Registrate</span> en tu evento! <span class="color-primary-500">Ubicate</span> y confirma tu <span class="color-primary-500">asistencia.</span'
        ,
      ],
      typeSpeed: 50, // Velocidad de escritura en milisegundos
      backSpeed: 25, // Velocidad de retroceso en milisegundos
      startDelay: 500, // Retraso antes de comenzar en milisegundos
      backDelay: 10000, // Retraso después de escribir en milisegundos
      loop: true, // Repetir la animación
    };

    const typed = new Typed(this.el.nativeElement.querySelector('.typed-text'), options);
    const typed2 = new Typed(this.el.nativeElement.querySelector('.typed-text-2'), options);

  }

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
