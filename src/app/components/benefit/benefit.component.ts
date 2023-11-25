import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';



}
