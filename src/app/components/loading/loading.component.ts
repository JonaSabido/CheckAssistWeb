import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() color: 'primary-500' | 'primary-300' | 'white' = 'primary-500'
  @Input() size: 'big' | 'medium' | 'small' = 'big'

}
