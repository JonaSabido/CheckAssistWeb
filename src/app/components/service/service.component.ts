import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @Input() bgClass: string = ''
  @Input() title: string = ''
  @Input() afterBr: string = ''
  @Input() descriptions: string[] = []

}
