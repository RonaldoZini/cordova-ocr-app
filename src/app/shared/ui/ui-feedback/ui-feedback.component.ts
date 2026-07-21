import { Component, Input } from '@angular/core';
import { FeedbackType } from '../../types/feedback.type';

@Component({
  selector: 'ui-feedback',
  templateUrl: 'ui-feedback.component.html',
  styleUrls: ['ui-feedback.component.scss'],
  standalone: false,
})
export class UIFeedbackComponent {

  @Input({ required: false }) type: FeedbackType = 'none';

  constructor() { }
}
